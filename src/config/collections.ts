import type { CollectionBundle } from "@/types/cms";

export const localCollections: readonly CollectionBundle[] = [
  {
    model: {
      id: "resources",
      name: "Resources",
      slug: "resources",
      description:
        "Example CMS-ready collection for guides, templates, docs, updates, or any founder-defined content.",
      fields: [
        { id: "title", label: "Title", type: "text", required: true },
        { id: "description", label: "Description", type: "text" },
        { id: "content", label: "Content", type: "richText" },
        { id: "category", label: "Category", type: "select", options: ["Guide", "Update", "Template"] },
        { id: "publishedAt", label: "Published at", type: "date" },
      ],
    },
    entries: [
      {
        id: "cms-ready-content-models",
        collectionId: "resources",
        slug: "cms-ready-content-models",
        status: "published",
        data: {
          title: "CMS-ready content models",
          description:
            "Use the same rendering layer for blog posts, docs, changelogs, resource directories, and custom collections.",
          content:
            "This example entry is stored as local fallback content. Hosted CMS projects can replace it with user-defined collections without changing the template renderer.",
          category: "Guide",
          publishedAt: "2026-05-12",
        },
      },
    ],
  },
] as const;
