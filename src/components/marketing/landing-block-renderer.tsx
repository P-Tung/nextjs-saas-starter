import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { FeatureGridSection } from "@/components/marketing/feature-grid-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { Section } from "@/components/ui/section";
import type { LandingBlock } from "@/types/cms";

type LandingBlockRendererProps = {
  blocks: LandingBlock[];
};

function getSectionClassName(block: LandingBlock) {
  if (block.type === "hero") {
    return "border-b-4 border-base-content bg-primary py-16 md:py-24 technical-grid";
  }

  if (block.type === "howItWorks" || block.type === "faq") {
    return "border-b-4 border-base-content bg-base-200 py-16 md:py-20";
  }

  return "border-b-4 border-base-content bg-base-100 py-16 md:py-20";
}

function getContainerClassName(block: LandingBlock) {
  if (block.type === "hero") {
    return "flex min-h-[calc(100vh-8rem)] flex-col justify-center gap-10";
  }

  return "";
}

function renderBlock(block: LandingBlock) {
  switch (block.type) {
    case "hero":
      return <HeroSection content={block.content} />;
    case "featureGrid":
      return <FeatureGridSection content={block.content} />;
    case "howItWorks":
      return <HowItWorksSection content={block.content} />;
    case "pricing":
      return <PricingSection content={block.content} />;
    case "faq":
      return <FaqSection content={block.content} />;
    case "cta":
      return <CtaSection content={block.content} />;
    default:
      return null;
  }
}

export function LandingBlockRenderer({ blocks }: LandingBlockRendererProps) {
  return (
    <>
      {blocks
        .filter((block) => block.enabled)
        .map((block) => (
          <Section
            key={block.id}
            className={getSectionClassName(block)}
            containerClassName={getContainerClassName(block)}
          >
            {renderBlock(block)}
          </Section>
        ))}
    </>
  );
}
