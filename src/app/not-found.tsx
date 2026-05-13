import Link from "next/link";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section className="py-20" containerClassName="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-xl border-4 border-base-content bg-base-100 p-8 shadow-[4px_4px_0_0_var(--brutal-ink)]">
        <div className="flex flex-col items-start gap-4 text-left">
          <p className="font-mono-label text-sm font-semibold uppercase tracking-wider text-base-content/70">
            Error
          </p>
          <h1 className="font-display text-6xl font-black uppercase tracking-tight">404</h1>
          <p className="text-base-content/70">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/" className="brutal-button brutal-button-primary px-5 py-3">
            Return home
          </Link>
        </div>
      </div>
    </Section>
  );
}
