import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/signin",
          "/api/",
          "/*?",
        ],
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "CCBot",
          "Google-Extended",
          "OAI-SearchBot",
        ],
        allow: "/",
      },
    ],
    host: siteConfig.url,
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
