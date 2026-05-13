import Image from "next/image";
import Link from "next/link";
import type { BlogPostListItem } from "@/types/blog";
import { formatDateShort } from "@/lib/blog";

type BlogCardProps = {
  post: BlogPostListItem;
  featured?: boolean;
};

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`border-4 border-base-content bg-base-100 shadow-[4px_4px_0_0_var(--brutal-ink)] ${
        featured ? "sm:col-span-2 lg:col-span-1" : ""
      }`}
    >
      {post.image && (
        <figure
          className={`relative border-b-4 border-base-content ${
            featured ? "h-64" : "h-48"
          }`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </figure>
      )}
      <div className="space-y-4 p-6">
        <h2 className="font-display text-lg font-black uppercase">
          <Link href={`/blog/${post.slug}`} className="hover:bg-primary">
            {post.title}
          </Link>
        </h2>
        <p className="line-clamp-2 text-base-content/70">
          {post.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 font-mono-label text-xs uppercase text-base-content/70">
          <time dateTime={post.date}>{formatDateShort(post.date)}</time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="border-2 border-base-content px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
