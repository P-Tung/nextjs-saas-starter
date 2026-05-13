import { Polar } from "@polar-sh/sdk";
import { env } from "@/lib/env";

type CheckoutMetadataValue = string | number | boolean;

export type CreatePolarCheckoutInput = {
  productId: string;
  successUrl: string;
  returnUrl: string;
  customerEmail?: string;
  externalCustomerId?: string;
  metadata?: Record<string, CheckoutMetadataValue>;
};

let polarClient: Polar | null = null;

export function getPolarClient() {
  if (polarClient) {
    return polarClient;
  }

  if (!env.optional.polarAccessToken) {
    throw new Error("POLAR_ACCESS_TOKEN is required");
  }

  polarClient = new Polar({
    accessToken: env.optional.polarAccessToken,
    server: "production",
  });

  return polarClient;
}

export async function createPolarCheckout(input: CreatePolarCheckoutInput) {
  const polar = getPolarClient();

  const checkout = await polar.checkouts.create({
    products: [input.productId],
    successUrl: input.successUrl,
    returnUrl: input.returnUrl,
    customerEmail: input.customerEmail,
    externalCustomerId: input.externalCustomerId,
    metadata: input.metadata,
    allowDiscountCodes: true,
  });

  return checkout;
}
