import type { LucideIcon } from "lucide-react";
import { PremiumCard } from "./premium-card";

type FeatureCardProps = {
  body: string;
  icon: LucideIcon;
  title: string;
};

export function FeatureCard({ body, icon: Icon, title }: FeatureCardProps) {
  return (
    <PremiumCard className="h-full bg-base-100 hover:bg-primary">
      <div className="space-y-4">
        <div className="flex h-12 w-12 items-center justify-center border-4 border-base-content bg-base-100 text-base-content">
          <Icon className="h-6 w-6" />
        </div>
        <div className="h-1 w-full bg-base-content" />
        <div className="space-y-2">
          <h2 className="font-display text-xl font-black uppercase tracking-tight">{title}</h2>
          <p className="font-mono-label text-sm uppercase leading-relaxed text-base-content/70">
            {body}
          </p>
        </div>
      </div>
    </PremiumCard>
  );
}
