import Link from "next/link";
import type { BlogPostListItem } from "@/types/blog";
import { BlogCard } from "./blog-card";

type BlogListProps = {
  posts: BlogPostListItem[];
  pagination?: {
    current: number;
    total: number;
  };
};

export function BlogList({ posts, pagination }: BlogListProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <BlogCard key={post.slug} post={post} featured={index === 0} />
        ))}
      </div>

      {pagination && pagination.total > 1 && (
        <div className="flex justify-center gap-2">
          {pagination.current > 1 && (
            <Link
              href={`/blog/page/${pagination.current - 1}`}
              className="brutal-button px-4 py-2 text-xs"
            >
              Previous
            </Link>
          )}
          <span className="border-4 border-base-content bg-base-100 px-4 py-2 font-mono-label text-xs uppercase">
            Page {pagination.current} of {pagination.total}
          </span>
          {pagination.current < pagination.total && (
            <Link
              href={`/blog/page/${pagination.current + 1}`}
              className="brutal-button px-4 py-2 text-xs"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
