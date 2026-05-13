import { validateEvent, WebhookVerificationError } from "@polar-sh/sdk/webhooks";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getAdminDb } from "@/lib/firebase/admin";

type SupportedSubscriptionEventType =
  | "subscription.created"
  | "subscription.updated"
  | "subscription.active"
  | "subscription.canceled"
  | "subscription.revoked"
  | "subscription.uncanceled"
  | "subscription.past_due";

type SubscriptionEvent = {
  type: SupportedSubscriptionEventType;
  data: {
    id: string;
    productId: string;
    status: string;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    customerId: string;
    metadata: Record<string, unknown>;
    customer: {
      externalId?: string | null;
      email?: string | null;
    };
  };
};

const SUBSCRIPTION_EVENT_TYPES: readonly SupportedSubscriptionEventType[] = [
  "subscription.created",
  "subscription.updated",
  "subscription.active",
  "subscription.canceled",
  "subscription.revoked",
  "subscription.uncanceled",
  "subscription.past_due",
] as const;

function toHeadersRecord(headers: Headers): Record<string, string> {
  return Object.fromEntries(headers.entries());
}

function resolveFirebaseUid(event: SubscriptionEvent): string | null {
  const metadataUid = event.data.metadata.firebaseUid;
  if (typeof metadataUid === "string" && metadataUid.trim().length > 0) {
    return metadataUid;
  }

  const externalId = event.data.customer.externalId;
  if (typeof externalId === "string" && externalId.trim().length > 0) {
    return externalId;
  }

  return null;
}

function isSubscriptionEvent(event: { type: string }): event is SubscriptionEvent {
  return SUBSCRIPTION_EVENT_TYPES.includes(event.type as SupportedSubscriptionEventType);
}

export async function GET() {
  return new Response(null, { status: 200 });
}

async function updateUserBillingState(event: SubscriptionEvent) {
  const firebaseUid = resolveFirebaseUid(event);
  if (!firebaseUid) {
    return false;
  }

  const db = getAdminDb();
  const userRef = db.collection("users").doc(firebaseUid);

  await userRef.set(
    {
      billing: {
        provider: "polar",
        subscriptionId: event.data.id,
        customerId: event.data.customerId,
        productId: event.data.productId,
        status: event.data.status,
        cancelAtPeriodEnd: event.data.cancelAtPeriodEnd,
        currentPeriodStart: event.data.currentPeriodStart.toISOString(),
        currentPeriodEnd: event.data.currentPeriodEnd.toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    { merge: true },
  );

  return true;
}

export async function POST(request: Request) {
  if (!env.optional.polarWebhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret is missing", code: "WEBHOOK_NOT_CONFIGURED" },
      { status: 500 },
    );
  }

  const rawBody = await request.text();

  try {
    const event = validateEvent(
      rawBody,
      toHeadersRecord(request.headers),
      env.optional.polarWebhookSecret,
    );

    if (!isSubscriptionEvent(event)) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const synced = await updateUserBillingState(event);

    return NextResponse.json({ received: true, synced });
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      return NextResponse.json(
        { error: "Invalid webhook signature", code: "INVALID_SIGNATURE" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { error: "Failed to process webhook", code: "WEBHOOK_PROCESSING_FAILED" },
      { status: 500 },
    );
  }
}
