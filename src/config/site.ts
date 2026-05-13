import { env } from "@/lib/env";

export const siteConfig = {
  name: env.appName,
  description:
    "A CMS-ready Next.js SaaS template with auth, billing, SEO, landing blocks, custom collections, and local fallback content.",
  tagline: "Launch with code, edit with CMS",
  footerTagline:
    "A SaaS launch system with a developer-owned template and CMS-ready content models.",
  url: env.appUrl,
  supportEmail: env.supportEmail,
  language: "en",
  locale: "en_US",
  company: {
    name: env.appName,
    legalName: "Your Company Legal Name",
    foundedYear: 2024,
  },
  social: {
    twitter: undefined,
    github: env.optional.githubRepoUrl,
    linkedin: undefined,
    discord: undefined,
  },
  seo: {
    primaryCategory: "software",
    classification: "Business Software",
    categories: ["software", "business"],
    keywords: [
      "next.js saas template",
      "cms ready saas template",
      "hosted cms for saas",
      "open source saas template",
      "saas starter kit",
      "next.js starter",
      "saas template",
      "firebase saas template",
      "polar billing template",
    ],
    googleSiteVerification: env.optional.googleSiteVerification,
  },
  ogImage: "/og-image.png",
} as const;
