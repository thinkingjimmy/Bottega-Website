/**
 * [INPUT]: Uses English fallback catalog metadata and ChangelogPageView
 * [OUTPUT]: Statically renders the unprefixed Auto Changelog route
 * [POS]: x-default Changelog entry with an English no-JavaScript fallback
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
  auto: true,
});

export default function AutoChangelogPage() {
  return <ChangelogPageView locale="en" />;
}
