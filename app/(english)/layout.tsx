/**
 * [INPUT]: Uses global CSS and SiteDocument with the canonical English locale
 * [OUTPUT]: Exports the root layout for six unprefixed English routes
 * [POS]: Default-language route tree shared by English and x-default URLs
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import "../globals.css";
import { SiteDocument } from "@/components/site-document";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
