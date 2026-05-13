import { getApps, initializeApp, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const slug = "hello-world";

const post = {
  slug,
  title: "Hello World: Welcome to Our Blog",
  description:
    "Welcome to our blog! This is our first post where we introduce what we'll be sharing - updates, guides, and insights to help you build better products.",
  date: "2026-04-28",
  author: "SaaS Template",
  tags: ["intro", "welcome"],
  content: `Welcome to our blog! We're excited to have you here.

## Why We Started This Blog

Our goal is simple: to share what we learn while building products. We believe in learning out loud, and this blog is where we'll be documenting our journey.

## What You'll Find Here

- **Product Updates**: New features, improvements, and what's coming next
- **Technical Guides**: How-to articles to help you build better software
- **Insights**: Our thoughts on product development, design, and growth

## Stay Connected

We'd love to have you follow along. Here's to building something great together!

If you have topics you'd like us to cover, don't hesitate to reach out.
`,
  draft: false,
  published: true,
};

function initAdminApp() {
  if (getApps().length > 0) {
    return;
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  if (serviceAccountJson) {
    const serviceAccount = JSON.parse(serviceAccountJson);

    initializeApp({
      credential: cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
      }),
      ...(storageBucket ? { storageBucket } : {}),
    });

    return;
  }

  initializeApp({
    credential: applicationDefault(),
    ...(storageBucket ? { storageBucket } : {}),
  });
}

async function main() {
  initAdminApp();
  const db = getFirestore();

  await db.collection("posts").doc(slug).set(post, { merge: true });
  console.log(`Seeded Firestore post: posts/${slug}`);
}

main().catch((error) => {
  console.error("Failed to seed hello-world post:", error);
  process.exit(1);
});
