import { localCollections } from "@/config/collections";
import { landingBlocks } from "@/config/landing";
import { fetchCmsJson } from "@/lib/cms/client";
import {
  validateCollectionBundles,
  validateLandingBlocks,
} from "@/lib/cms/validation";
import type { CollectionBundle, CollectionEntry, LandingBlock } from "@/types/cms";

export type ContentSource = "local" | "cms";

export type LandingPageContent = {
  source: ContentSource;
  blocks: LandingBlock[];
};

export type CollectionsContent = {
  source: ContentSource;
  collections: CollectionBundle[];
};

export async function getLandingPageContent(): Promise<LandingPageContent> {
  const cmsPayload = await fetchCmsJson({
    path: "/landing",
    tags: ["landing"],
  });
  const cmsBlocks = validateLandingBlocks(cmsPayload);

  if (cmsBlocks) {
    return {
      source: "cms",
      blocks: cmsBlocks,
    };
  }

  return {
    source: "local",
    blocks: [...landingBlocks],
  };
}

export async function getCollectionsContent(): Promise<CollectionsContent> {
  const cmsPayload = await fetchCmsJson({
    path: "/collections",
    tags: ["collections"],
  });
  const cmsCollections = validateCollectionBundles(cmsPayload);

  if (cmsCollections) {
    return {
      source: "cms",
      collections: cmsCollections,
    };
  }

  return {
    source: "local",
    collections: [...localCollections],
  };
}

export async function getCollectionBySlug(slug: string) {
  const { collections, source } = await getCollectionsContent();
  const bundle = collections.find((collection) => collection.model.slug === slug);

  return bundle ? { ...bundle, source } : null;
}

export async function getCollectionEntry(
  collectionSlug: string,
  entrySlug: string,
): Promise<{
  source: ContentSource;
  collection: CollectionBundle;
  entry: CollectionEntry;
} | null> {
  const { collections, source } = await getCollectionsContent();
  const collection = collections.find((item) => item.model.slug === collectionSlug);
  const entry = collection?.entries.find(
    (item) => item.slug === entrySlug && item.status === "published",
  );

  if (!collection || !entry) {
    return null;
  }

  return {
    source,
    collection,
    entry,
  };
}
