"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqBlockContent } from "@/types/cms";

type FaqSectionProps = {
  content: FaqBlockContent;
};

export function FaqSection({ content }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-black uppercase tracking-tight text-base-content sm:text-4xl">
          {content.sectionTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base-content/70">{content.sectionSubtitle}</p>
      </div>
      <div className="mx-auto max-w-3xl space-y-4">
        {content.items.map((item, index) => (
          <div
            key={item.question}
            className="collapse border-4 border-base-content bg-base-100 shadow-[4px_4px_0_0_var(--brutal-ink)]"
          >
            <input
              type="radio"
              name="faq-accordion"
              checked={openIndex === index}
              onChange={() => setOpenIndex(openIndex === index ? null : index)}
            />
            <div className="collapse-title flex items-center justify-between gap-4 pr-4 font-display text-xl font-black uppercase">
              {item.question}
              <ChevronDown
                className={`h-5 w-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
              />
            </div>
            <div className="collapse-content">
              <p className="border-t-4 border-base-content pt-4 text-base-content/70">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
