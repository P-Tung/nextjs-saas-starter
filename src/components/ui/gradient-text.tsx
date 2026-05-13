"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
};

export function GradientText({
  children,
  className,
  as: Component = "span",
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        "text-gradient font-bold tracking-tight",
        className
      )}
    >
      {children}
    </Component>
  );
}
