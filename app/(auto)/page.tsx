/**
 * [INPUT]: Uses English fallback catalog metadata and HomePageView
 * [OUTPUT]: Statically renders the unprefixed Auto home route
 * [POS]: x-default home entry; AutoLayout performs pre-paint language resolution
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { HomePageView } from "@/components/pages/home-page";
import { getCatalog } from "@/lib/i18n";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata({
  locale: "en",
  logicalPath: "/",
  catalog: getCatalog("en"),
  auto: true,
});

export default function AutoHomePage() {
  return <HomePageView locale="en" />;
}
