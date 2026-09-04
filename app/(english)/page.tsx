/**
 * [INPUT]: Uses the English catalog, canonical metadata, and HomePageView
 * [OUTPUT]: Statically renders the unprefixed English home route
 * [POS]: Canonical English and x-default home entry
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { HomePageView } from "@/components/pages/home-page";
import { getCatalog } from "@/lib/i18n";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata({
  locale: "en",
  logicalPath: "/",
  catalog: getCatalog("en"),
});

export default function EnglishHomePage() {
  return <HomePageView locale="en" />;
}
