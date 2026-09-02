/**
 * [INPUT]: Uses next/link, the feature catalog, and FeatureIcon
 * [OUTPUT]: Exports FeatureSidebar with one current-page-aware link per feature
 * [POS]: Sticky wiki-style local navigation shared by every feature detail page
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import Link from "next/link";

import { FEATURES, type FeatureSlug } from "./catalog";
import { FeatureIcon } from "./feature-icon";

export function FeatureSidebar({ active }: { active: FeatureSlug }) {
  return (
    <aside className="feature-aside">
      <p className="mono feature-aside-label">Features</p>
      <nav aria-label="Feature documentation">
        <ul className="feature-side-list">
          {FEATURES.map((feature) => (
            <li key={feature.slug}>
              <Link
                aria-current={feature.slug === active ? "page" : undefined}
                className="feature-side-link"
                href={`/features/${feature.slug}/`}
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
