/**
 * [INPUT]: Uses the English catalog, canonical metadata, and ChangelogPageView
 * [OUTPUT]: Statically renders the unprefixed English Changelog route
 * [POS]: Canonical English and x-default Changelog entry
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { ChangelogPageView } from "@/components/pages/changelog-page";
import { getCatalog } from "@/lib/i18n";
import { buildMetadata } from "@/lib/i18n/metadata";

const catalog = getCatalog("en");
export const metadata = buildMetadata({
  locale: "en",
  logicalPath: "/changelog/",
  title: catalog.changelog.metaTitle,
  description: catalog.changelog.metaDescription,
  catalog,
});

export default function EnglishChangelogPage() {
  return <ChangelogPageView locale="en" />;
}
