import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { StructuredData } from "@/components/seo/structured-data";
import { legalPageContent } from "@/config/legal";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: legalPageContent.tos.title,
  description: legalPageContent.tos.description,
  path: "/tos",
});

export default function TosPage() {
  return (
    <>
      <StructuredData
        id="tos-schema"
        data={createBreadcrumbSchema({
          items: [
            { name: "Home", path: "" },
            { name: legalPageContent.tos.title, path: "/tos" },
          ],
        })}
      />
      <LegalPage {...legalPageContent.tos} />
    </>
  );
}
