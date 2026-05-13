import type { Metadata } from "next";
import Link from "next/link";
import { BillingPlans } from "@/components/billing/billing-plans";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Dashboard",
  description:
    "Starter application shell for authenticated product routes, dashboards, and internal workflows.",
  path: "/dashboard",
  robots: {
    index: false,
    follow: false,
  },
});

const dashboardCards = [
  {
    description: "Attach your auth provider here and guard private routes from a shared platform module.",
    title: "Auth boundary",
  },
  {
    description: "Mount product navigation, dashboards, and empty states here instead of mixing them into the marketing site.",
    title: "App surface",
  },
  {
    description: "Add billing, analytics, and data providers as reusable modules when the product requirements are known.",
    title: "Provider slots",
  },
] as const;

export default function DashboardPage() {
  return (
    <Section className="py-12" containerClassName="space-y-8">
      <header className="space-y-3">
        <p className="font-mono-label text-sm font-semibold uppercase tracking-wider text-base-content/70">
          App Shell
        </p>
        <h1 className="font-display text-4xl font-black uppercase tracking-tight">
          Dashboard starter
        </h1>
        <p className="max-w-3xl border-l-4 border-base-content pl-4 text-base-content/70">
          Use this route group for authenticated product pages, account settings, and dashboard
          flows. Keep the public landing experience in the marketing group.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card) => (
          <div
            key={card.title}
            className="border-4 border-base-content bg-base-100 p-6 shadow-[4px_4px_0_0_var(--brutal-ink)]"
          >
            <div className="space-y-3">
              <h2 className="font-display text-xl font-black uppercase">{card.title}</h2>
              <p className="font-mono-label text-sm uppercase leading-6 text-base-content/70">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-4 border-dashed border-base-content bg-primary p-6 shadow-[4px_4px_0_0_var(--brutal-ink)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-black uppercase">
              Suggested next build step
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-base-content/75">
              Route protection, app navigation, and billing checkout wiring now live behind this
              shell. Continue extending providers without coupling them to marketing routes.
            </p>
          </div>
          <Link href="/" className="brutal-button brutal-button-dark px-5 py-3">
            Back to marketing site
          </Link>
        </div>
      </div>

      <BillingPlans />
    </Section>
  );
}
