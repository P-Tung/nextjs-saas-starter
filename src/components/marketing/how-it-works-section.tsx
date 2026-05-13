import type { HowItWorksBlockContent } from "@/types/cms";

type HowItWorksSectionProps = {
  content: HowItWorksBlockContent;
};

export function HowItWorksSection({ content }: HowItWorksSectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-black uppercase tracking-tight text-base-content sm:text-4xl">
          {content.sectionTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base-content/70">{content.sectionSubtitle}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {content.steps.map((step) => (
          <div
            key={step.step}
            className="border-4 border-base-content bg-base-100 p-6 shadow-[4px_4px_0_0_var(--brutal-ink)]"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center border-4 border-base-content bg-primary">
              <span className="font-display text-xl font-black">{step.step}</span>
            </div>
            <h3 className="mb-3 font-display text-xl font-black uppercase">{step.title}</h3>
            <p className="font-mono-label text-sm uppercase leading-relaxed text-base-content/70">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
