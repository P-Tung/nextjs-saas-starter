import { env } from "@/lib/env";
import { siteConfig } from "@/config/site";

export type PricingPlanKey = "liteTemplate" | "hostedCms" | "selfHostedCms";

export type PricingPlan = {
  key: PricingPlanKey;
  name: string;
  description: string;
  priceLabel: string;
  productId: string | undefined;
  featured?: boolean;
  ctaLabel: string;
  ctaHref: string;
  includes: string[];
};

export const pricingPlans: readonly PricingPlan[] = [
  {
    key: "liteTemplate",
    name: "Lite Template",
    description: "Public source-code starter for developers and technical founders.",
    priceLabel: "Free public repo",
    productId: env.optional.polarProductLiteTemplate,
    ctaLabel: "View source",
    ctaHref: siteConfig.social.github ?? "/dashboard",
    includes: [
      "Next.js App Router foundation",
      "Local landing blocks and config",
      "SEO, blog, legal, and dashboard shell",
      "Firebase and Polar scaffolding",
    ],
  },
  {
    key: "hostedCms",
    name: "Hosted CMS",
    description:
      "Hosted content models for editable SaaS pages and collections, planned from waitlist demand.",
    priceLabel: "Coming soon",
    productId: env.optional.polarProductHostedCms,
    featured: true,
    ctaLabel: "Join CMS waitlist",
    ctaHref: "#cms-waitlist",
    includes: [
      "Everything in Lite Template",
      "Hosted CMS project access when launched",
      "Editable landing blocks and SEO fields",
      "Custom collections for docs, resources, updates, and more",
    ],
  },
  {
    key: "selfHostedCms",
    name: "Self-Hosted CMS",
    description:
      "High-ticket package for teams that need to own and customize the CMS codebase.",
    priceLabel: "Enterprise",
    productId: env.optional.polarProductSelfHostedCms,
    ctaLabel: "Contact sales",
    ctaHref: `mailto:${env.supportEmail}`,
    includes: [
      "Template and CMS source code access",
      "Self-hosting deployment guidance",
      "Private updates and support terms",
      "Best for agencies and advanced teams",
    ],
  },
] as const;

export function getPricingPlan(planKey: string): PricingPlan | null {
  return pricingPlans.find((plan) => plan.key === planKey) ?? null;
}
