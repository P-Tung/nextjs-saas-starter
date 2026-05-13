import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { getCollectionBySlug } from "@/lib/cms/content";
import { createMetadata } from "@/lib/metadata";

type CollectionPageProps = {
  params: Promise<{
    collection: string;
  }>;
};

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { collection } = await params;
  const bundle = await getCollectionBySlug(collection);

  if (!bundle) {
    return createMetadata({
      title: "Collection Not Found",
      path: `/${collection}`,
      robots: {
        index: false,
        follow: false,
      },
    });
  }

  return createMetadata({
    title: bundle.model.name,
    description: bundle.model.description,
    path: `/${bundle.model.slug}`,
  });
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collection } = await params;
  const bundle = await getCollectionBySlug(collection);

  if (!bundle) {
    notFound();
  }

  const publishedEntries = bundle.entries.filter((entry) => entry.status === "published");

  return (
    <Section containerClassName="py-16 space-y-8">
      <header className="max-w-3xl space-y-3">
        <p className="font-mono-label text-sm font-semibold uppercase tracking-wider text-base-content/70">
          CMS Collection
        </p>
        <h1 className="font-display text-4xl font-black uppercase tracking-tight">
          {bundle.model.name}
        </h1>
        {bundle.model.description ? (
          <p className="border-l-4 border-base-content pl-4 text-base leading-7 text-base-content/70">
            {bundle.model.description}
          </p>
        ) : null}
      </header>

      {publishedEntries.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {publishedEntries.map((entry) => {
            const title = String(entry.data.title ?? entry.slug);
            const description =
              typeof entry.data.description === "string" ? entry.data.description : null;

            return (
              <article
                key={entry.id}
                className="border-4 border-base-content bg-base-100 p-6 shadow-[4px_4px_0_0_var(--brutal-ink)]"
              >
                <div className="flex h-full flex-col gap-4">
                  <h2 className="font-display text-xl font-black uppercase">{title}</h2>
                  {description ? (
                    <p className="text-sm leading-6 text-base-content/70">
                      {description}
                    </p>
                  ) : null}
                  <div className="mt-auto">
                    <Link
                      href={`/${bundle.model.slug}/${entry.slug}`}
                      className="brutal-button px-4 py-2 text-xs"
                    >
                      Read entry
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="border-4 border-base-content bg-base-100 p-4 font-mono-label text-sm uppercase brutal-shadow">
          <span>No published entries are available in this collection.</span>
        </div>
      )}
    </Section>
  );
}
