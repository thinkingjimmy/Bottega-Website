/**
 * [INPUT]: Uses the public site origin, five locales, localized paths, and six logical routes
 * [OUTPUT]: Exports a static sitemap containing exactly thirty self-canonical localized pages
 * [POS]: Search discovery map for the complete localized static site
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { MetadataRoute } from "next";
import { FEATURE_SLUGS } from "@/components/features/catalog";
import { LOCALES, localizedPath } from "@/lib/i18n/locale";
import { SITE_URL } from "@/lib/i18n/metadata";

const LOGICAL_PATHS = [
  "/",
  "/changelog/",
  ...FEATURE_SLUGS.map((slug) => `/features/${slug}/`),
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return LOGICAL_PATHS.flatMap((logicalPath) => {
    const languages = Object.fromEntries([
      ["x-default", `${SITE_URL}${logicalPath}`],
      ...LOCALES.map((locale) => [locale, `${SITE_URL}${localizedPath(locale, logicalPath)}`]),
    ]);
    return LOCALES.map((locale) => ({
      url: `${SITE_URL}${localizedPath(locale, logicalPath)}`,
      alternates: { languages },
    }));
  });
}
