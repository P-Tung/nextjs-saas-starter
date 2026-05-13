import { siteConfig } from "@/config/site";

type NavItem = {
  href: string;
  label: string;
  variant: "ghost" | "primary";
};

export const marketingNavigation: NavItem[] = [
  {
    href: "/#pricing",
    label: "Pricing",
    variant: "ghost",
  },
  {
    href: "/blog",
    label: "Blog",
    variant: "ghost",
  },
  {
    href: "/resources",
    label: "Resources",
    variant: "ghost",
  },
  ...(siteConfig.social.github
    ? [
        {
          href: siteConfig.social.github,
          label: "GitHub",
          variant: "primary" as const,
        },
      ]
    : []),
];

export const footerNavigation = [
  {
    group: "Product",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/resources", label: "Resources" },
      ...(siteConfig.social.github
        ? [{ href: siteConfig.social.github, label: "GitHub" }]
        : []),
    ],
  },
  {
    group: "Legal",
    links: [
      { href: "/policy", label: "Privacy Policy" },
      { href: "/tos", label: "Terms of Service" },
    ],
  },
] as const;

export const appNavigation = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
] as const;
