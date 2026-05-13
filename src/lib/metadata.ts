import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetadataInput = {
  description?: string;
  keywords?: string[];
  path?: string;
  robots?: Metadata["robots"];
  title?: string;
};

export function createMetadata({
  description = siteConfig.description,
  keywords = [...siteConfig.seo.keywords],
  path = "/",
  robots,
  title,
}: MetadataInput = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const canonicalPath = path === "/" ? "" : path;
  const canonicalUrl = `${siteConfig.url}${canonicalPath}`;

  return {
    title: pageTitle,
    description,
    applicationName: siteConfig.name,
    category: siteConfig.seo.primaryCategory,
    classification: siteConfig.seo.classification,
    keywords,
    creator: siteConfig.name,
    publisher: siteConfig.name,
    authors: [
      {
        name: siteConfig.name,
      },
    ],
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [siteConfig.ogImage],
    },
    robots,
  };
}
