import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { StructuredData } from "@/components/seo/structured-data";
import { legalPageContent } from "@/config/legal";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: legalPageContent.policy.title,
  description: legalPageContent.policy.description,
  path: "/policy",
});

export default function PolicyPage() {
  return (
    <>
      <StructuredData
        id="policy-schema"
        data={createBreadcrumbSchema({
          items: [
            { name: "Home", path: "" },
            { name: legalPageContent.policy.title, path: "/policy" },
          ],
        })}
      />
      <LegalPage {...legalPageContent.policy} />
    </>
  );
}
