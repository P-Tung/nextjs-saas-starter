"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { pricingPlans, type PricingPlanKey } from "@/config/pricing";
import { useAuth } from "@/contexts/auth-context";

type CheckoutResponse = {
  checkoutUrl?: string;
  error?: string;
};

export function BillingPlans() {
  const { user, configured, loading } = useAuth();
  const [submittingPlanKey, setSubmittingPlanKey] = useState<PricingPlanKey | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canCheckout = useMemo(() => {
    return Boolean(configured && !loading && user);
  }, [configured, loading, user]);
  const hasCheckoutPlans = pricingPlans.some((plan) => plan.productId);

  async function handleCheckout(planKey: PricingPlanKey) {
    if (!user) {
      setError("Please sign in before starting checkout.");
      return;
    }

    setError(null);
    setSubmittingPlanKey(planKey);

    try {
      const idToken = await user.getIdToken();

      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ planKey }),
      });

      const payload = (await response.json()) as CheckoutResponse;

      if (!response.ok || !payload.checkoutUrl) {
        setError(payload.error || "Failed to create checkout session.");
        return;
      }

      window.location.href = payload.checkoutUrl;
    } catch {
      setError("Could not connect to checkout. Please try again.");
    } finally {
      setSubmittingPlanKey(null);
    }
  }

  return (
    <section className="space-y-4" aria-labelledby="billing-plans-title">
      <div className="space-y-2">
        <h2 id="billing-plans-title" className="font-display text-2xl font-black uppercase">
          Billing plans
        </h2>
        <p className="max-w-3xl text-sm text-base-content/70">
          Template and CMS offers can link to local routes, waitlists, contact flows, or Polar
          checkout when product IDs are configured.
        </p>
      </div>

      {hasCheckoutPlans && !canCheckout ? (
        <div className="border-4 border-base-content bg-base-100 p-4 font-mono-label text-sm uppercase brutal-shadow">
          <span>Sign in to enable checkout actions.</span>
        </div>
      ) : null}

      {error ? (
        <div
          className="border-4 border-error bg-base-100 p-4 font-mono-label text-sm uppercase text-error brutal-shadow"
          role="alert"
        >
          <span>{error}</span>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {pricingPlans.map((plan) => {
          const isLoading = submittingPlanKey === plan.key;
          const isDisabled = !canCheckout || !plan.productId || Boolean(submittingPlanKey);

          return (
            <article
              key={plan.key}
              className={`border-4 border-base-content p-6 shadow-[4px_4px_0_0_var(--brutal-ink)] ${
                plan.featured ? "bg-primary" : "bg-base-100"
              }`}
            >
              <div className="flex h-full flex-col gap-4">
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-black uppercase">{plan.name}</h3>
                  <p className="text-sm leading-6 text-base-content/70">{plan.description}</p>
                </div>

                {plan.productId ? (
                  <button
                    type="button"
                    className={`brutal-button mt-auto px-5 py-3 ${
                      plan.featured ? "brutal-button-dark" : ""
                    }`}
                    onClick={() => handleCheckout(plan.key)}
                    disabled={isDisabled}
                  >
                    {isLoading ? "Redirecting..." : plan.ctaLabel}
                  </button>
                ) : (
                  <Link
                    href={plan.ctaHref}
                    className={`brutal-button mt-auto px-5 py-3 ${
                      plan.featured ? "brutal-button-dark" : ""
                    }`}
                  >
                    {plan.ctaLabel}
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
