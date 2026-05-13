export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags?: string[];
  content: string;
  readingTime: number;
  draft?: boolean;
};

export type BlogPostListItem = Pick<
  BlogPost,
  "slug" | "title" | "description" | "date" | "author" | "image" | "tags"
>;

export type Pagination = {
  current: number;
  total: number;
  hasMore: boolean;
};