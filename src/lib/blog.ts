import type { Metadata } from "next";
import { blogConfig } from "@/config/blog";
import { siteConfig } from "@/config/site";
import type { BlogPost, BlogPostListItem } from "@/types/blog";

export type BlogMetadataInput = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  type?: "article" | "website";
  indexed?: boolean;
};

export function createBlogMetadata({
  title,
  description,
  image,
  path = "/blog",
  publishedTime,
  modifiedTime,
  author = blogConfig.author.name,
  tags = [],
  type = "article",
  indexed = true,
}: BlogMetadataInput = {}): Metadata {
  const pageTitle = title ? `${title} | ${blogConfig.title}` : blogConfig.title;
  const canonicalPath = path === "/" ? "" : path;
  const canonicalUrl = `${siteConfig.url}${canonicalPath}`;
  const fullImage = image ? `${siteConfig.url}${image}` : undefined;

  const base: Metadata = {
    title: pageTitle,
    description: description || blogConfig.description,
    applicationName: siteConfig.name,
    category: "technology",
    classification: "Blog",
    keywords: [...siteConfig.seo.keywords, ...tags],
    authors: [{ name: author }],
    creator: author,
    publisher: siteConfig.name,
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: description || blogConfig.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(fullImage && {
        images: [
          {
            url: fullImage,
            width: 1200,
            height: 630,
            alt: title || blogConfig.title,
          },
        ],
      }),
      ...(publishedTime && {
        publishedTime,
        ...(modifiedTime && { modifiedTime }),
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description || blogConfig.description,
      ...(fullImage && { images: [fullImage] }),
    },
    robots: indexed
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": 0,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: false,
        },
  };

  return base;
}

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(
    words / blogConfig.readingTime.wordsPerMinute
  );
  return minutes;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getPostUrl(post: BlogPostListItem | BlogPost): string {
  return `${siteConfig.url}/blog/${post.slug}`;
}