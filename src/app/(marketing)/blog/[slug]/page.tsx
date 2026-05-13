import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { StructuredData } from "@/components/seo/structured-data";
import { blogConfig } from "@/config/blog";
import { createBlogMetadata, formatDate, getPostUrl } from "@/lib/blog";
import {
  createBreadcrumbSchema,
  createArticleSchema,
} from "@/lib/structured-data";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";
import { BlogCard } from "@/components/blog/blog-card";
import { MarkdownContent } from "@/components/blog/markdown-content";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return createBlogMetadata({
      indexed: false,
    });
  }

  return createBlogMetadata({
    title: post.title,
    description: post.description,
    image: post.image,
    path: `/blog/${post.slug}`,
    publishedTime: post.date,
    modifiedTime: post.date,
    author: post.author,
    tags: post.tags,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = getPostUrl(post);
  const relatedPosts = await getRelatedPosts(slug, 3);

  const breadcrumbSchema = createBreadcrumbSchema({
    items: [
      { name: "Home", path: "" },
      { name: blogConfig.title, path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ],
  });

  const articleSchema = createArticleSchema({
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: post.author,
    url: postUrl,
  });

  return (
    <>
      <StructuredData id="blog-post-schema" data={[breadcrumbSchema, articleSchema]} />
      <Section containerClassName="py-16">
        <article className="prose prose-lg max-w-none">
          <header className="not-prose mb-8">
            <Link
              href="/blog"
              className="mb-4 inline-flex font-mono-label text-sm uppercase hover:bg-primary"
            >
              ← Back to Blog
            </Link>
            <h1 className="font-display text-4xl font-black uppercase">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 font-mono-label text-xs uppercase text-base-content/70">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>•</span>
              <span>{post.readingTime} min read</span>
              {post.tags && post.tags.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="border-2 border-base-content px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>

          {post.image && (
            <figure className="not-prose relative mb-8 aspect-[16/9] overflow-hidden border-4 border-base-content bg-base-200">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </figure>
          )}

          <MarkdownContent content={post.content} />
        </article>

        {relatedPosts.length > 0 && (
          <aside className="not-prose mt-16 border-t-4 border-base-content pt-8">
            <h2 className="mb-6 font-display text-2xl font-black uppercase">Related Posts</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </aside>
        )}
      </Section>
    </>
  );
}
