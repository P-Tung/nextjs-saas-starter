import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCollectionsContent } from "@/lib/cms/content";
import { getAllPosts } from "@/lib/blog-posts";

const STATIC_ROUTES = ["", "/policy", "/tos", "/blog"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticSitemap = STATIC_ROUTES.map((route) => ({
    changeFrequency: route === "" || route === "/blog" ? "weekly" as const : "monthly" as const,
    lastModified: now,
    priority: route === "" ? 1 : route === "/blog" ? 0.8 : 0.6,
    url: `${siteConfig.url}${route}`,
  }));

  const posts = await getAllPosts();
  const dynamicSitemap = posts.map((post) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(post.date),
    priority: 0.7,
    url: `${siteConfig.url}/blog/${post.slug}`,
  }));

  const { collections } = await getCollectionsContent();
  const collectionSitemap = collections.flatMap((collection) => {
    const collectionUrl = {
      changeFrequency: "weekly" as const,
      lastModified: now,
      priority: 0.7,
      url: `${siteConfig.url}/${collection.model.slug}`,
    };
    const entryUrls = collection.entries
      .filter((entry) => entry.status === "published")
      .map((entry) => ({
        changeFrequency: "monthly" as const,
        lastModified: now,
        priority: 0.6,
        url: `${siteConfig.url}/${collection.model.slug}/${entry.slug}`,
      }));

    return [collectionUrl, ...entryUrls];
  });

  return [...staticSitemap, ...dynamicSitemap, ...collectionSitemap];
}
