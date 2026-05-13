"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PremiumCardProps = {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  glass?: boolean;
  id?: string;
};

export function PremiumCard({
  children,
  className,
  hoverable = true,
  glass = true,
  id,
}: PremiumCardProps) {
  return (
    <div
      id={id}
      className={cn(
        "relative border-4 border-base-content bg-base-100 p-6 shadow-[4px_4px_0_0_var(--brutal-ink)]",
        glass ? "bg-base-100" : "bg-base-200",
        hoverable && "transition-transform duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
