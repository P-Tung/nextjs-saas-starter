import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Payment Successful",
  description: "Confirmation page shown after a successful checkout.",
  path: "/billing/success",
  robots: {
    index: false,
    follow: false,
  },
});

export default function BillingSuccessPage() {
  return (
    <Section className="py-20" containerClassName="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-2xl border-4 border-base-content bg-base-100 p-8 shadow-[4px_4px_0_0_var(--brutal-ink)]">
        <div className="space-y-5 text-left">
          <p className="font-mono-label text-sm font-semibold uppercase tracking-wider text-success">
            Success
          </p>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight">
            Payment successful
          </h1>
          <p className="text-base-content/70">
            Thank you for your purchase. Your checkout is complete and your account can now continue
            with the selected plan.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="brutal-button brutal-button-primary px-5 py-3">
              Go to dashboard
            </Link>
            <Link href="/" className="brutal-button px-5 py-3">
              Return home
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
