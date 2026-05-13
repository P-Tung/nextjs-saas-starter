import { Blocks, Database, FileText, Globe, Shield } from "lucide-react";
import { FeatureCard } from "@/components/ui/feature-card";
import type { FeatureGridBlockContent } from "@/types/cms";

const iconMap = {
  blocks: Blocks,
  database: Database,
  fileText: FileText,
  globe: Globe,
  shield: Shield,
} as const;

type FeatureGridSectionProps = {
  content: FeatureGridBlockContent;
};

export function FeatureGridSection({ content }: FeatureGridSectionProps) {
  return (
    <div className="space-y-8">
      {content.sectionTitle && (
        <div>
          <h2 className="inline-block border-b-4 border-base-content pb-4 pr-12 font-display text-3xl font-black uppercase tracking-tight text-base-content sm:text-4xl">
            {content.sectionTitle}
          </h2>
          {content.sectionSubtitle && (
            <p className="mt-5 max-w-3xl border-l-4 border-base-content pl-4 text-base-content/70">
              {content.sectionSubtitle}
            </p>
          )}
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {content.items.map((item) => (
          <FeatureCard
            key={item.title}
            icon={iconMap[item.icon as keyof typeof iconMap]}
            title={item.title}
            body={item.description}
          />
        ))}
      </div>
    </div>
  );
}
