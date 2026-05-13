import { WaitlistForm } from "./waitlist-form";
import Link from "next/link";
import type { CtaBlockContent } from "@/types/cms";

type CtaSectionProps = {
  content: CtaBlockContent;
};

export function CtaSection({ content }: CtaSectionProps) {
  const isPrimaryExternal = content.primaryButton.href.startsWith("http");
  const isSecondaryExternal = content.secondaryButton.href.startsWith("http");

  return (
    <div
      id="cms-waitlist"
      className="border-4 border-base-content bg-primary p-6 shadow-[4px_4px_0_0_var(--brutal-ink)] md:p-8"
    >
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight">
            {content.title} {content.titleAccent}
          </h2>
          <p className="mt-3 max-w-3xl border-l-4 border-base-content pl-4 text-sm font-semibold leading-relaxed text-base-content/75">
            {content.subtitle}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <WaitlistForm
            source="cta"
            placeholder={content.waitlist.placeholder}
            buttonText={content.waitlist.buttonText}
            loadingText={content.waitlist.loadingText}
            successMessage={content.waitlist.successMessage}
            errorMessage={content.waitlist.errorMessage}
            duplicateMessage={content.waitlist.duplicateMessage}
            className="flex-1"
          />
          <div className="flex gap-3">
            <Link
              href={content.primaryButton.href}
              target={isPrimaryExternal ? "_blank" : undefined}
              rel={isPrimaryExternal ? "noopener noreferrer" : undefined}
              className="brutal-button brutal-button-dark px-5 py-3"
            >
              {content.primaryButton.text}
            </Link>
            <Link
              href={content.secondaryButton.href}
              target={isSecondaryExternal ? "_blank" : undefined}
              rel={isSecondaryExternal ? "noopener noreferrer" : undefined}
              className="brutal-button px-5 py-3"
            >
              {content.secondaryButton.text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
