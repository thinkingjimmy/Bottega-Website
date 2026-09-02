/**
 * [INPUT]: Uses locale-aware path construction, next/link, and the shared arrow icon
 * [OUTPUT]: Exports FeatureLink for localized home-section detail CTAs
 * [POS]: Single language-preserving detail action shared by all home feature sections
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n/locale";

import { Stroke, glyph } from "../icons";
import type { FeatureSlug } from "./catalog";

export function FeatureLink({ slug, locale, label }: { slug: FeatureSlug; locale: Locale; label: string }) {
  return (
    <Link className="feature-more" href={localizedPath(locale, `/features/${slug}/`)}>
      <span>{label}</span>
      <Stroke d={glyph("arrowRight")} size={15} width={1.8} />
    </Link>
  );
}
