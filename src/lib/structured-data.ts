import { siteConfig } from "@/config/site";
import { blogConfig } from "@/config/blog";

type BreadcrumbListInput = {
  items: Array<{
    name: string;
    path: string;
  }>;
};

type ArticleSchemaInput = {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
};

export function createArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image ? `${siteConfig.url}${image}` : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author: [
      {
        "@type": "Person",
        name: author,
        url: blogConfig.author.url,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };
}

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.supportEmail,
      },
    ],
  };
}

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    url: siteConfig.url,
  };
}

export function createSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: siteConfig.url,
    offers: {
      "@type": "Offer",
      category: "SaaS template and hosted CMS",
      availability: "https://schema.org/InStock",
    },
  };
}

export function createBreadcrumbSchema({ items }: BreadcrumbListInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
