import type { ContentField } from "@/types/cms";

type CollectionFieldProps = {
  field: ContentField;
  value: unknown;
};

function formatValue(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return null;
}

export function CollectionField({ field, value }: CollectionFieldProps) {
  const formattedValue = formatValue(value);

  if (!formattedValue) {
    return null;
  }

  if (field.type === "richText") {
    return (
      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/40">
          {field.label}
        </h2>
        <p className="whitespace-pre-wrap text-base leading-7 text-base-content/75">
          {formattedValue}
        </p>
      </section>
    );
  }

  if (field.type === "image") {
    return (
      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/40">
          {field.label}
        </h2>
        <a href={formattedValue} className="link link-primary break-all">
          {formattedValue}
        </a>
      </section>
    );
  }

  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/40">
        {field.label}
      </h2>
      <p className="text-base leading-7 text-base-content/75">{formattedValue}</p>
    </section>
  );
}
