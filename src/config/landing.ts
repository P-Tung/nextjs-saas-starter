import type { LandingBlock } from "@/types/cms";
import { siteConfig } from "@/config/site";

const templateSourceHref = siteConfig.social.github ?? "/dashboard";

const waitlistCopy = {
  placeholder: "Enter your email",
  buttonText: "Join CMS waitlist",
  loadingText: "Joining...",
  successMessage: "Thanks. We will send the CMS launch details soon.",
  errorMessage: "Something went wrong. Please try again.",
  duplicateMessage: "You are already on the waitlist.",
} as const;

export const landingBlocks: readonly LandingBlock[] = [
  {
    id: "hero",
    type: "hero",
    enabled: true,
    content: {
      badge: {
        icon: "blocks",
        text: "SaaS template plus dynamic CMS",
      },
      headline: "Launch with a SaaS foundation.",
      headlineAccent: "Edit content with a CMS.",
      subheadline:
        "Start with the public Next.js SaaS template today: auth, billing, SEO, blog, legal pages, and a dashboard shell are already shaped. Join the CMS waitlist when you want editable landing blocks, custom collections, and hosted content control.",
      primaryCta: {
        text: "View public template",
        href: templateSourceHref,
      },
      secondaryCta: {
        text: "Join CMS waitlist",
        href: "#cms-waitlist",
      },
      stackBadges: ["Next.js", "Firebase", "Polar", "Dynamic CMS"],
      waitlist: waitlistCopy,
    },
  },
  {
    id: "feature-proof",
    type: "featureGrid",
    enabled: true,
    content: {
      sectionTitle: "Everything around the core feature is already shaped",
      sectionSubtitle:
        "Use the public template as the lead magnet now, then validate CMS demand from waitlist signups.",
      items: [
        {
          icon: "blocks",
          title: "CMS-ready blocks",
          description:
            "Landing sections render from typed blocks that work from local config today and hosted CMS data later.",
        },
        {
          icon: "database",
          title: "Dynamic collections",
          description:
            "Model blog posts, docs, resources, jobs, changelogs, or customer content without making the CMS blog-only.",
        },
        {
          icon: "shield",
          title: "SaaS scaffolding",
          description:
            "Auth, billing, SEO metadata, legal pages, analytics hooks, and dashboard routes are ready to customize.",
        },
        {
          icon: "globe",
          title: "Local fallback",
          description:
            "The template stays useful without CMS credentials and falls back safely if CMS content is unavailable.",
        },
      ],
    },
  },
  {
    id: "launch-system",
    type: "howItWorks",
    enabled: true,
    content: {
      sectionTitle: "A practical SaaS launch system",
      sectionSubtitle:
        "Publish the source code first, then use CMS signups to decide what to build next.",
      steps: [
        {
          step: 1,
          title: "Clone the public template",
          description:
            "Use the free source code as the SaaS foundation and replace the config with your own brand.",
        },
        {
          step: 2,
          title: "Join the CMS waitlist",
          description:
            "Waitlist demand decides when hosted editing, landing blocks, SEO fields, and custom collections get built out.",
        },
        {
          step: 3,
          title: "Build the unique feature",
          description:
            "Founders and developers focus engineering time on the actual product logic instead of rebuilding launch plumbing.",
        },
      ],
    },
  },
  {
    id: "pricing",
    type: "pricing",
    enabled: true,
    content: {
      sectionTitle: "Choose the level of control",
      sectionSubtitle:
        "Start free with the public source code. Join the waitlist when you want hosted CMS control.",
    },
  },
  {
    id: "faq",
    type: "faq",
    enabled: true,
    content: {
      sectionTitle: "Frequently asked questions",
      sectionSubtitle: "What the template and CMS are responsible for",
      items: [
        {
          question: "Is the CMS only for blogs?",
          answer:
            "No. The CMS is planned around dynamic content models, so teams can manage landing pages, docs, changelogs, resources, jobs, and other structured collections.",
        },
        {
          question: "Does the CMS build custom SaaS features?",
          answer:
            "No. The CMS manages content and structured data. The customer still builds product-specific app logic inside the template codebase.",
        },
        {
          question: "Does the template work without the CMS?",
          answer:
            "Yes. The public template runs from local config. CMS data only overrides local content when CMS credentials are configured and valid.",
        },
        {
          question: "Who should buy the self-hosted CMS codebase?",
          answer:
            "Agencies, advanced teams, and enterprise buyers who need full control over the CMS platform should use the self-hosted package.",
        },
      ],
    },
  },
  {
    id: "final-cta",
    type: "cta",
    enabled: true,
    content: {
      title: "Ship the foundation.",
      titleAccent: "Keep content flexible.",
      subtitle:
        "Use the public template to avoid rebuilding SaaS plumbing, then join the CMS waitlist when your team needs editable pages and custom collections.",
      primaryButton: {
        text: "Join CMS waitlist",
        href: "#cms-waitlist",
      },
      secondaryButton: {
        text: "View public template",
        href: templateSourceHref,
      },
      waitlist: waitlistCopy,
    },
  },
] as const;
