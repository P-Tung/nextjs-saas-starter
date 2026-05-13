const panelRows = ["Auth", "CMS", "Billing", "SEO"] as const;

export function AbstractProductPanel() {
  return (
    <div
      className="relative hidden aspect-square overflow-hidden border-4 border-base-content bg-base-100 p-5 shadow-[4px_4px_0_0_var(--brutal-ink)] lg:block"
      aria-hidden="true"
    >
      <div className="absolute inset-5 border-4 border-base-content bg-primary shadow-[4px_4px_0_0_var(--brutal-ink)]" />
      <div className="absolute inset-14 rotate-12 border-4 border-base-content bg-secondary p-5 shadow-[4px_4px_0_0_var(--brutal-ink)]">
        <div className="space-y-3">
          {panelRows.map((row, index) => (
            <div
              key={row}
              className="flex items-center justify-between border-2 border-base-content bg-base-100 px-3 py-2 font-mono-label text-xs uppercase text-base-content"
            >
              <span>{row}</span>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-5 left-5 right-5 border-4 border-base-content bg-base-content p-3 font-mono-label text-xs uppercase text-base-100">
        Template modules ready
      </div>
    </div>
  );
}
