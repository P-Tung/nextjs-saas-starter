import type {
  CollectionBundle,
  CollectionEntry,
  CollectionModel,
  ContentField,
  LandingBlock,
} from "@/types/cms";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isLandingCta(value: unknown) {
  return isRecord(value) && isString(value.text) && isString(value.href);
}

function isWaitlistContent(value: unknown) {
  return (
    isRecord(value) &&
    isString(value.placeholder) &&
    isString(value.buttonText) &&
    isString(value.loadingText) &&
    isString(value.successMessage) &&
    isString(value.errorMessage) &&
    isString(value.duplicateMessage)
  );
}

function hasBaseBlockShape(value: unknown): value is Record<string, unknown> {
  if (!isRecord(value)) {
    return false;
  }

  return isString(value.id) && isString(value.type) && isBoolean(value.enabled) && isRecord(value.content);
}

function isHeroBlock(value: Record<string, unknown>): value is LandingBlock {
  const content = value.content;

  return (
    value.type === "hero" &&
    isRecord(content) &&
    isRecord(content.badge) &&
    isString(content.badge.text) &&
    isString(content.headline) &&
    isString(content.headlineAccent) &&
    isString(content.subheadline) &&
    isLandingCta(content.primaryCta) &&
    isLandingCta(content.secondaryCta) &&
    Array.isArray(content.stackBadges) &&
    content.stackBadges.every(isString) &&
    isWaitlistContent(content.waitlist)
  );
}

function isFeatureGridBlock(value: Record<string, unknown>): value is LandingBlock {
  const content = value.content;

  return (
    value.type === "featureGrid" &&
    isRecord(content) &&
    isString(content.sectionTitle) &&
    isString(content.sectionSubtitle) &&
    Array.isArray(content.items) &&
    content.items.every(
      (item) =>
        isRecord(item) &&
        isString(item.icon) &&
        isString(item.title) &&
        isString(item.description),
    )
  );
}

function isHowItWorksBlock(value: Record<string, unknown>): value is LandingBlock {
  const content = value.content;

  return (
    value.type === "howItWorks" &&
    isRecord(content) &&
    isString(content.sectionTitle) &&
    isString(content.sectionSubtitle) &&
    Array.isArray(content.steps) &&
    content.steps.every(
      (step) =>
        isRecord(step) &&
        typeof step.step === "number" &&
        isString(step.title) &&
        isString(step.description),
    )
  );
}

function isPricingBlock(value: Record<string, unknown>): value is LandingBlock {
  const content = value.content;

  return (
    value.type === "pricing" &&
    isRecord(content) &&
    isString(content.sectionTitle) &&
    isString(content.sectionSubtitle)
  );
}

function isFaqBlock(value: Record<string, unknown>): value is LandingBlock {
  const content = value.content;

  return (
    value.type === "faq" &&
    isRecord(content) &&
    isString(content.sectionTitle) &&
    isString(content.sectionSubtitle) &&
    Array.isArray(content.items) &&
    content.items.every(
      (item) =>
        isRecord(item) &&
        isString(item.question) &&
        isString(item.answer),
    )
  );
}

function isCtaBlock(value: Record<string, unknown>): value is LandingBlock {
  const content = value.content;

  return (
    value.type === "cta" &&
    isRecord(content) &&
    isString(content.title) &&
    isString(content.titleAccent) &&
    isString(content.subtitle) &&
    isLandingCta(content.primaryButton) &&
    isLandingCta(content.secondaryButton) &&
    isWaitlistContent(content.waitlist)
  );
}

function isLandingBlock(value: unknown): value is LandingBlock {
  if (!hasBaseBlockShape(value)) {
    return false;
  }

  return (
    isHeroBlock(value) ||
    isFeatureGridBlock(value) ||
    isHowItWorksBlock(value) ||
    isPricingBlock(value) ||
    isFaqBlock(value) ||
    isCtaBlock(value)
  );
}

export function validateLandingBlocks(value: unknown): LandingBlock[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const blocks = value.filter(isLandingBlock);

  return blocks.length > 0 ? blocks : null;
}

function isContentField(value: unknown): value is ContentField {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.id) &&
    isString(value.label) &&
    isString(value.type) &&
    ["text", "richText", "image", "date", "boolean", "select", "relation"].includes(value.type)
  );
}

function isCollectionModel(value: unknown): value is CollectionModel {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.id) &&
    isString(value.name) &&
    isString(value.slug) &&
    Array.isArray(value.fields) &&
    value.fields.every(isContentField)
  );
}

function isCollectionEntry(value: unknown): value is CollectionEntry {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.id) &&
    isString(value.collectionId) &&
    isString(value.slug) &&
    (value.status === "draft" || value.status === "published") &&
    isRecord(value.data)
  );
}

function isCollectionBundle(value: unknown): value is CollectionBundle {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isCollectionModel(value.model) &&
    Array.isArray(value.entries) &&
    value.entries.every(isCollectionEntry)
  );
}

export function validateCollectionBundles(value: unknown): CollectionBundle[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const bundles = value.filter(isCollectionBundle);

  return bundles.length > 0 ? bundles : null;
}
