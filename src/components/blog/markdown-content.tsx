import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

type MarkdownContentProps = {
  content: string;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1({ children }) {
            return <h2>{children}</h2>;
          },
          h2({ children }) {
            return <h2>{children}</h2>;
          },
          h3({ children }) {
            return <h3>{children}</h3>;
          },
          a({ href, children }) {
            const safeHref = normalizeString(href);
            if (!safeHref) {
              return <span>{children}</span>;
            }

            if (isExternalHref(safeHref)) {
              return (
                <a href={safeHref} target="_blank" rel="noreferrer noopener">
                  {children}
                </a>
              );
            }

            return <Link href={safeHref}>{children}</Link>;
          },
          img({ src, alt }) {
            const safeSrc = normalizeString(src);
            const safeAlt = normalizeString(alt) ?? "";

            if (!safeSrc) {
              return null;
            }

            return (
              <figure>
                <span className="relative block aspect-[16/9] overflow-hidden border-4 border-base-content bg-base-200">
                  <Image
                    src={safeSrc}
                    alt={safeAlt}
                    fill
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="object-cover"
                  />
                </span>
                {safeAlt ? (
                  <figcaption className="text-sm text-base-content/70">{safeAlt}</figcaption>
                ) : null}
              </figure>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
