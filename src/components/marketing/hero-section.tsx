import { Blocks } from "lucide-react";
import { AbstractProductPanel } from "@/components/marketing/abstract-product-panel";
import { WaitlistForm } from "./waitlist-form";
import Link from "next/link";
import type { HeroBlockContent } from "@/types/cms";

type HeroSectionProps = {
  content: HeroBlockContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  const isPrimaryExternal = content.primaryCta.href.startsWith("http");
  const isSecondaryExternal = content.secondaryCta.href.startsWith("http");

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="space-y-6 lg:col-span-8">
        <div className="inline-flex w-max items-center gap-2 border-4 border-base-content bg-base-100 px-4 py-2 font-mono-label text-sm uppercase brutal-shadow">
          <Blocks className="h-4 w-4" />
          {content.badge.text}
        </div>
        <div className="space-y-4">
          <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tight text-base-content sm:text-6xl lg:text-7xl">
            {content.headline} {content.headlineAccent}
          </h1>
        </div>
        <p className="max-w-3xl border-l-4 border-base-content pl-4 text-lg font-semibold leading-8 text-base-content/75">
          {content.subheadline}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href={content.primaryCta.href}
            target={isPrimaryExternal ? "_blank" : undefined}
            rel={isPrimaryExternal ? "noopener noreferrer" : undefined}
            className="brutal-button brutal-button-dark px-8 py-4"
          >
            {content.primaryCta.text}
          </Link>
          <Link
            href={content.secondaryCta.href}
            target={isSecondaryExternal ? "_blank" : undefined}
            rel={isSecondaryExternal ? "noopener noreferrer" : undefined}
            className="brutal-button px-8 py-4"
          >
            {content.secondaryCta.text}
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {content.stackBadges.map((badge) => (
            <span
              key={badge}
              className="border-4 border-base-content bg-base-100 px-3 py-2 font-mono-label text-xs uppercase brutal-shadow"
            >
              {badge}
            </span>
          ))}
        </div>
        <WaitlistForm
          source="hero"
          placeholder={content.waitlist.placeholder}
          buttonText={content.waitlist.buttonText}
          loadingText={content.waitlist.loadingText}
          successMessage={content.waitlist.successMessage}
          errorMessage={content.waitlist.errorMessage}
          duplicateMessage={content.waitlist.duplicateMessage}
          className="max-w-2xl"
        />
      </div>
      <div className="lg:col-span-4">
        <AbstractProductPanel />
      </div>
    </div>
  );
}
