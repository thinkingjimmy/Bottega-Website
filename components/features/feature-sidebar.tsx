/**
 * [INPUT]: Uses localized feature records/copy, locale-aware paths, next/link, and FeatureIcon
 * [OUTPUT]: Exports FeatureSidebar with one current-page-aware localized link per feature
 * [POS]: Sticky wiki-style local navigation shared by every localized feature page
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import Link from "next/link";

import type { FeatureRecord, FeatureSlug } from "./catalog";
import { FeatureIcon } from "./feature-icon";
import { localizedPath, type Locale } from "@/lib/i18n/locale";

export function FeatureSidebar({
  active,
  features,
  locale,
  label,
  navigationLabel,
}: {
  active: FeatureSlug;
  features: FeatureRecord[];
  locale: Locale;
  label: string;
  navigationLabel: string;
}) {
  return (
    <aside className="feature-aside">
      <p className="mono feature-aside-label">{label}</p>
      <nav aria-label={navigationLabel}>
        <ul className="feature-side-list">
          {features.map((feature) => (
            <li key={feature.slug}>
              <Link
                aria-current={feature.slug === active ? "page" : undefined}
                className="feature-side-link"
                href={localizedPath(locale, `/features/${feature.slug}/`)}
              >
                <FeatureIcon feature={feature} />
                <span>{feature.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
