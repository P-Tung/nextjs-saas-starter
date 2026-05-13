import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";

export type LegalSection =
  | string
  | { heading: string; paragraphs: readonly string[] };

type LegalPageProps = {
  description: string;
  lastUpdated?: string;
  sections: readonly LegalSection[];
  title: string;
};

export function LegalPage({
  description,
  lastUpdated,
  sections,
  title,
}: LegalPageProps) {
  return (
    <Section className="py-12" containerClassName="max-w-4xl">
      <div>
        <Link href="/" className="mb-8 inline-flex items-center gap-2 font-mono-label text-sm uppercase hover:bg-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <section className="space-y-8">
          <PageHeader title={title} description={description} />

          {lastUpdated && (
            <p className="font-mono-label text-sm uppercase text-base-content/70">
              Last updated: {lastUpdated}
            </p>
          )}

          <div className="border-4 border-base-content bg-base-100 p-6 shadow-[4px_4px_0_0_var(--brutal-ink)]">
            <div className="prose max-w-none prose-headings:font-display prose-headings:uppercase prose-a:text-base-content hover:prose-a:bg-primary">
              {sections.map((section, i) => {
                if (typeof section === "string") {
                  return <p key={i}>{section}</p>;
                }
                return (
                  <div key={i}>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Section>
  );
}
