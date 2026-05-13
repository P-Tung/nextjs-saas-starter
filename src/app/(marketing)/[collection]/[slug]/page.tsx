import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionField } from "@/components/cms/collection-field";
import { Section } from "@/components/ui/section";
import { getCollectionEntry } from "@/lib/cms/content";
import { createMetadata } from "@/lib/metadata";

type CollectionEntryPageProps = {
  params: Promise<{
    collection: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CollectionEntryPageProps): Promise<Metadata> {
  const { collection, slug } = await params;
  const result = await getCollectionEntry(collection, slug);

  if (!result) {
    return createMetadata({
      title: "Entry Not Found",
      path: `/${collection}/${slug}`,
      robots: {
        index: false,
        follow: false,
      },
    });
  }

  const title = String(result.entry.data.title ?? result.entry.slug);
  const description =
    typeof result.entry.data.description === "string"
      ? result.entry.data.description
      : result.collection.model.description;

  return createMetadata({
    title,
    description,
    path: `/${result.collection.model.slug}/${result.entry.slug}`,
  });
}

export default async function CollectionEntryPage({
  params,
}: CollectionEntryPageProps) {
  const { collection, slug } = await params;
  const result = await getCollectionEntry(collection, slug);

  if (!result) {
    notFound();
  }

  const title = String(result.entry.data.title ?? result.entry.slug);
  const fieldsToRender = result.collection.model.fields.filter(
    (field) => field.id !== "title" && field.id !== "description",
  );

  return (
    <Section containerClassName="py-16">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4">
          <Link
            href={`/${result.collection.model.slug}`}
            className="font-mono-label text-sm uppercase hover:bg-primary"
          >
            Back to {result.collection.model.name}
          </Link>
          <p className="font-mono-label text-sm font-semibold uppercase tracking-wider text-base-content/70">
            {result.collection.model.name}
          </p>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight">{title}</h1>
          {typeof result.entry.data.description === "string" ? (
            <p className="border-l-4 border-base-content pl-4 text-base leading-7 text-base-content/70">
              {result.entry.data.description}
            </p>
          ) : null}
        </header>

        <div className="space-y-8">
          {fieldsToRender.map((field) => (
            <CollectionField
              key={field.id}
              field={field}
              value={result.entry.data[field.id]}
            />
          ))}
        </div>
      </article>
    </Section>
  );
}
