/**
 * [INPUT]: Uses Next.js crawler metadata and the production site URL builder
 * [OUTPUT]: Exports a static robots.txt allowing public pages and advertising the canonical sitemap
 * [POS]: Root crawler discovery entry in the static export
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */

import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
