import type { Metadata } from "next";
import { LandingBlockRenderer } from "@/components/marketing/landing-block-renderer";
import { StructuredData } from "@/components/seo/structured-data";
import { getLandingPageContent } from "@/lib/cms/content";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "CMS-Ready SaaS Template",
  description:
    "A CMS-ready Next.js SaaS template with auth, billing, SEO, landing blocks, custom collections, and local fallback content.",
  path: "/",
});

export default async function HomePage() {
  const { blocks } = await getLandingPageContent();
  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      {
        name: "Home",
        path: "",
      },
    ],
  });

  return (
    <>
      <StructuredData id="breadcrumb-schema" data={breadcrumbSchema} />
      <LandingBlockRenderer blocks={blocks} />
    </>
  );
}
