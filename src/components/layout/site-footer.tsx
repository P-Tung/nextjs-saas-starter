import Link from "next/link";
import { Container } from "@/components/layout/container";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-4 border-base-content bg-base-100">
      <Container className="py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="size-6 border-4 border-base-content bg-primary" />
              <p className="font-display text-lg font-black uppercase tracking-tight">
                {siteConfig.name}
              </p>
            </div>
            <p className="max-w-xs border-l-4 border-base-content pl-3 text-sm leading-relaxed text-base-content/70">
              {siteConfig.footerTagline}
            </p>
            <p className="font-mono-label text-[10px] font-medium uppercase tracking-widest text-base-content/60">
              © {year} {siteConfig.name}. Built from a reusable SaaS template.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <div className="flex flex-wrap gap-8 sm:justify-end">
              {footerNavigation.map((section) => (
                <div key={section.group} className="space-y-3">
                  <p className="font-display text-xs font-black uppercase tracking-widest text-base-content">
                    {section.group}
                  </p>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            link.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="font-mono-label text-sm uppercase text-base-content/70 hover:bg-primary hover:text-base-content"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="font-mono-label text-xs uppercase text-base-content/70 sm:text-right">
              Contact:{" "}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                suppressHydrationWarning
                className="text-base-content hover:bg-primary hover:underline"
              >
                {siteConfig.supportEmail}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
