import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/ui/page-header";
import { BlogList } from "@/components/blog/blog-list";
import { StructuredData } from "@/components/seo/structured-data";
import { blogConfig } from "@/config/blog";
import { createBlogMetadata } from "@/lib/blog";
import { createBreadcrumbSchema } from "@/lib/structured-data";
import { getPostsPaginated } from "@/lib/blog-posts";

export const metadata: Metadata = createBlogMetadata({
  title: blogConfig.title,
  description: blogConfig.description,
  path: "/blog",
  type: "website",
});

export default async function BlogPage() {
  const { posts, pagination } = await getPostsPaginated(1);

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", path: "" },
      { name: blogConfig.title, path: "/blog" },
    ],
  });

  return (
    <Section containerClassName="py-16">
      <StructuredData id="blog-breadcrumb" data={breadcrumbSchema} />
      <PageHeader
        title={blogConfig.title}
        description={blogConfig.description}
      />
      {posts.length > 0 ? (
        <BlogList posts={posts} pagination={pagination} />
      ) : (
        <div className="border-4 border-base-content bg-base-100 p-6 shadow-[4px_4px_0_0_var(--brutal-ink)]">
          <div className="space-y-3">
            <h2 className="font-display text-xl font-black uppercase">No posts published yet</h2>
            <p className="text-base-content/70">
              Connect this app to the correct Firestore project and publish at least one post to
              populate the blog index.
            </p>
          </div>
        </div>
      )}
    </Section>
  );
}
