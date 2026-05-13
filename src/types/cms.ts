export type LandingBlockType =
  | "hero"
  | "featureGrid"
  | "howItWorks"
  | "pricing"
  | "faq"
  | "cta";

export type LandingCta = {
  text: string;
  href: string;
};

export type WaitlistContent = {
  placeholder: string;
  buttonText: string;
  loadingText: string;
  successMessage: string;
  errorMessage: string;
  duplicateMessage: string;
};

export type HeroBlockContent = {
  badge: {
    icon: "blocks";
    text: string;
  };
  headline: string;
  headlineAccent: string;
  subheadline: string;
  primaryCta: LandingCta;
  secondaryCta: LandingCta;
  stackBadges: string[];
  waitlist: WaitlistContent;
};

export type FeatureGridBlockContent = {
  sectionTitle: string;
  sectionSubtitle: string;
  items: Array<{
    icon: "blocks" | "database" | "fileText" | "globe" | "shield";
    title: string;
    description: string;
  }>;
};

export type HowItWorksBlockContent = {
  sectionTitle: string;
  sectionSubtitle: string;
  steps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
};

export type PricingBlockContent = {
  sectionTitle: string;
  sectionSubtitle: string;
};

export type FaqBlockContent = {
  sectionTitle: string;
  sectionSubtitle: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export type CtaBlockContent = {
  title: string;
  titleAccent: string;
  subtitle: string;
  primaryButton: LandingCta;
  secondaryButton: LandingCta;
  waitlist: WaitlistContent;
};

export type HeroLandingBlock = {
  id: string;
  type: "hero";
  enabled: boolean;
  content: HeroBlockContent;
};

export type FeatureGridLandingBlock = {
  id: string;
  type: "featureGrid";
  enabled: boolean;
  content: FeatureGridBlockContent;
};

export type HowItWorksLandingBlock = {
  id: string;
  type: "howItWorks";
  enabled: boolean;
  content: HowItWorksBlockContent;
};

export type PricingLandingBlock = {
  id: string;
  type: "pricing";
  enabled: boolean;
  content: PricingBlockContent;
};

export type FaqLandingBlock = {
  id: string;
  type: "faq";
  enabled: boolean;
  content: FaqBlockContent;
};

export type CtaLandingBlock = {
  id: string;
  type: "cta";
  enabled: boolean;
  content: CtaBlockContent;
};

export type LandingBlock =
  | HeroLandingBlock
  | FeatureGridLandingBlock
  | HowItWorksLandingBlock
  | PricingLandingBlock
  | FaqLandingBlock
  | CtaLandingBlock;

export type ContentFieldType =
  | "text"
  | "richText"
  | "image"
  | "date"
  | "boolean"
  | "select"
  | "relation";

export type ContentField = {
  id: string;
  label: string;
  type: ContentFieldType;
  required?: boolean;
  options?: string[];
};

export type CollectionModel = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  fields: ContentField[];
};

export type CollectionEntryStatus = "draft" | "published";

export type CollectionEntry = {
  id: string;
  collectionId: string;
  slug: string;
  status: CollectionEntryStatus;
  data: Record<string, unknown>;
};

export type CollectionBundle = {
  model: CollectionModel;
  entries: CollectionEntry[];
};
