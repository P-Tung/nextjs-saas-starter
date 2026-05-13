import { getApps, initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "@/lib/env";
import type { BlogPost, BlogPostListItem } from "@/types/blog";
import { blogConfig } from "@/config/blog";
import { calculateReadingTime } from "@/lib/blog";

type FirestoreBlogPost = {
  slug?: string;
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  image?: string;
  tags?: string[];
  content?: string;
  draft?: boolean;
  published?: boolean;
};

const POSTS_COLLECTION = "posts";

function getAdminDb() {
  const existingApps = getApps();

  if (existingApps.length === 0) {
    const serviceAccountJson = env.optional.firebaseServiceAccountJson;
    const storageBucket = env.optional.firebaseAdminStorageBucket;

    if (serviceAccountJson) {
      const serviceAccount = JSON.parse(serviceAccountJson) as {
        project_id: string;
        client_email: string;
        private_key: string;
      };

      initializeApp({
        credential: cert({
          projectId: serviceAccount.project_id,
          clientEmail: serviceAccount.client_email,
          privateKey: serviceAccount.private_key,
        }),
        ...(storageBucket ? { storageBucket } : {}),
      });
    } else {
      initializeApp({
        credential: applicationDefault(),
        ...(storageBucket ? { storageBucket } : {}),
      });
    }
  }

  return getFirestore();
}

function isPostVisible(post: FirestoreBlogPost): boolean {
  return post.published === true && post.draft !== true;
}

function toListItem(post: FirestoreBlogPost): BlogPostListItem | null {
  if (!post.slug || !post.title || !post.description || !post.date || !post.author) {
    return null;
  }

  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    author: post.author,
    image: post.image,
    tags: post.tags,
  };
}

export async function getAllPosts(): Promise<BlogPostListItem[]> {
  try {
    const db = getAdminDb();
    const snapshot = await db.collection(POSTS_COLLECTION).orderBy("date", "desc").get();

    return snapshot.docs
      .map((doc) => {
        const data = doc.data() as FirestoreBlogPost;
        return {
          ...data,
          slug: data.slug ?? doc.id,
        } satisfies FirestoreBlogPost;
      })
      .filter((post) => isPostVisible(post))
      .map((post) => toListItem(post))
      .filter((post): post is BlogPostListItem => post !== null);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const db = getAdminDb();
    const docSnap = await db.collection(POSTS_COLLECTION).doc(slug).get();

    if (!docSnap.exists) {
      return null;
    }

    const post = docSnap.data() as FirestoreBlogPost;
    if (!isPostVisible(post)) {
      return null;
    }

    if (
      !post.title ||
      !post.description ||
      !post.date ||
      !post.author ||
      !post.content
    ) {
      return null;
    }

    return {
      slug,
      title: post.title,
      description: post.description,
      date: post.date,
      author: post.author,
      image: post.image,
      tags: post.tags,
      content: post.content,
      draft: post.draft,
      readingTime: calculateReadingTime(post.content),
    };
  } catch {
    return null;
  }
}

export async function getPostsPaginated(page: number = 1): Promise<{
  posts: BlogPostListItem[];
  pagination: {
    current: number;
    total: number;
    hasMore: boolean;
  };
}> {
  const posts = await getAllPosts();
  const postsPerPage = blogConfig.postsPerPage;
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = posts.slice(start, end);

  return {
    posts: pagePosts,
    pagination: {
      current: page,
      total: totalPages,
      hasMore: end < posts.length,
    },
  };
}

export async function getRelatedPosts(
  currentSlug: string,
  limit: number = 3,
): Promise<BlogPostListItem[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.slug !== currentSlug).slice(0, limit);
}