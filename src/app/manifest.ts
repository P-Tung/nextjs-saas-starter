import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f9f9f9",
    theme_color: "#ffd600",
    lang: siteConfig.language,
    categories: [...siteConfig.seo.categories],
    icons: [
      {
        src: "/icon.png",
        sizes: "1254x1254",
        type: "image/png",
      },
    ],
  };
}
