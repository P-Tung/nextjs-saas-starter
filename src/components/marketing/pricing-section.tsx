import Link from "next/link";
import { Check } from "lucide-react";
import { pricingPlans } from "@/config/pricing";
import type { PricingBlockContent } from "@/types/cms";

type PricingSectionProps = {
  content: PricingBlockContent;
};

export function PricingSection({ content }: PricingSectionProps) {
  return (
    <div id="pricing" className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-black uppercase tracking-tight text-base-content sm:text-4xl">
          {content.sectionTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base-content/70">{content.sectionSubtitle}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => {
          const isExternalCta = plan.ctaHref.startsWith("http");

          return (
            <div
              key={plan.key}
              className={`relative flex flex-col border-4 border-base-content p-6 shadow-[4px_4px_0_0_var(--brutal-ink)] ${
                plan.featured ? "bg-primary" : "bg-base-100"
              }`}
            >
              <div className="flex h-full flex-col gap-4">
                {plan.featured && (
                  <div className="absolute -right-4 -top-4 border-4 border-base-content bg-base-content px-4 py-1 font-display text-xs font-black uppercase text-primary shadow-[4px_4px_0_0_var(--brutal-paper)]">
                    Main product
                  </div>
                )}
                <div>
                  <h3 className="font-display text-2xl font-black uppercase">
                    {plan.name}
                  </h3>
                  <p className="mt-3 font-display text-4xl font-black uppercase">
                    {plan.priceLabel}
                  </p>
                </div>
                <div className="h-1 w-full bg-base-content" />
                <p className="text-base-content/75">{plan.description}</p>
                <ul className="space-y-3 text-sm text-base-content/80">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-2 font-mono-label uppercase">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-base-content" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Link
                    href={plan.ctaHref}
                    target={isExternalCta ? "_blank" : undefined}
                    rel={isExternalCta ? "noopener noreferrer" : undefined}
                    className={`brutal-button w-full justify-center px-5 py-3 ${
                      plan.featured ? "brutal-button-dark" : ""
                    }`}
                  >
                    {plan.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
