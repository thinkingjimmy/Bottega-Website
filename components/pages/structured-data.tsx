/**
 * [INPUT]: Uses page metadata inputs and the server-side JSON-LD builder
 * [OUTPUT]: Exports PageStructuredData with safe serialization into static HTML
 * [POS]: Shared semantic markup boundary for the three page compositions
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */

import type { PageMetadataInput } from "@/lib/i18n/metadata";
import { buildStructuredData } from "@/lib/seo/structured-data";

export function PageStructuredData(props: PageMetadataInput) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildStructuredData(props)).replace(/</g, "\\u003c"),
      }}
    />
  );
}
