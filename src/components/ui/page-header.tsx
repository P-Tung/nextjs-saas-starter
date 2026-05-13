type PageHeaderProps = {
  description: string;
  eyebrow?: string;
  title: string;
};

export function PageHeader({
  description,
  eyebrow,
  title,
}: PageHeaderProps) {
  return (
    <header className="space-y-3">
      {eyebrow && (
        <p className="font-mono-label text-sm font-semibold uppercase tracking-wider text-base-content/70">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-2xl border-l-4 border-base-content pl-4 text-base-content/70">
        {description}
      </p>
    </header>
  );
}
