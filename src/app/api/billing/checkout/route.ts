import { NextResponse } from "next/server";
import { getPricingPlan, type PricingPlanKey } from "@/config/pricing";
import { env } from "@/lib/env";
import { createPolarCheckout } from "@/lib/billing/polar";
import { getAdminAuth } from "@/lib/firebase/admin";

type CheckoutRequestBody = {
  planKey?: PricingPlanKey;
};

function extractBearerToken(authorizationHeader: string | null) {
  if (!authorizationHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.replace("Bearer ", "").trim() || null;
}

export async function POST(request: Request) {
  try {
    const token = extractBearerToken(request.headers.get("authorization"));

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized", code: "UNAUTHORIZED" },
        { status: 401 },
      );
    }

    const body = (await request.json()) as CheckoutRequestBody;
    const plan = body.planKey ? getPricingPlan(body.planKey) : null;

    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan", code: "INVALID_PLAN" },
        { status: 400 },
      );
    }

    if (!plan.productId) {
      return NextResponse.json(
        {
          error: "Plan is not configured in environment variables",
          code: "PLAN_NOT_CONFIGURED",
        },
        { status: 400 },
      );
    }

    const decodedToken = await getAdminAuth().verifyIdToken(token);

    const checkout = await createPolarCheckout({
      productId: plan.productId,
      successUrl: `${env.appUrl}/billing/success`,
      returnUrl: `${env.appUrl}/dashboard?checkout=cancel`,
      customerEmail: decodedToken.email,
      externalCustomerId: decodedToken.uid,
      metadata: {
        firebaseUid: decodedToken.uid,
        planKey: plan.key,
      },
    });

    return NextResponse.json({ checkoutUrl: checkout.url });
  } catch {
    return NextResponse.json(
      { error: "Failed to create checkout", code: "CHECKOUT_CREATE_FAILED" },
      { status: 500 },
    );
  }
}
