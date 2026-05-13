import Script from "next/script";

type StructuredDataProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  id?: string;
};

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

export function StructuredData({ data, id }: StructuredDataProps) {
  return (
    <Script
      id={id || "structured-data"}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: safeJsonLd(data),
      }}
    />
  );
}
