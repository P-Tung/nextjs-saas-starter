import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function Section({
  children,
  className = "",
  containerClassName = "",
}: SectionProps) {
  return (
    <section className={className}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
