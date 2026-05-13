import { siteConfig } from "./site";

export const blogConfig = {
  title: "Blog",
  description: `Read the latest ${siteConfig.name} updates, guides, and insights.`,
  postsPerPage: 6,
  readingTime: {
    wordsPerMinute: 200,
  },
  author: {
    name: siteConfig.name,
    url: siteConfig.url,
  },
} as const;

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  date: string;
  author?: string;
  image?: string;
  tags?: string[];
  draft?: boolean;
};