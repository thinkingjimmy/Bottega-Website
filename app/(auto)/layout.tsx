/**
 * [INPUT]: Uses global CSS and SiteDocument with the English no-JavaScript fallback
 * [OUTPUT]: Exports the root layout for six unprefixed Auto routes
 * [POS]: x-default route tree that redirects before paint while remaining useful without JavaScript
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import "../globals.css";
import { SiteDocument } from "@/components/site-document";

export default function AutoLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="en" autoRedirect>{children}</SiteDocument>;
}
