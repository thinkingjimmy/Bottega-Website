/**
 * [INPUT]: Uses SiteCatalog feature copy and the shared GlyphName contract
 * [OUTPUT]: Exports stable feature identities, localized feature records, slug lookup, and public types
 * [POS]: Assembly boundary shared by home CTAs, header, sidebar, metadata, and feature pages
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { SiteCatalog } from "@/lib/i18n";
import type { GlyphName } from "../icons";

export const FEATURE_SLUGS = ["agents", "apps", "customizable", "base"] as const;
export type FeatureSlug = (typeof FEATURE_SLUGS)[number];

type FeatureSection = {
  heading: string;
  paragraphs: string[];
  points: string[];
};

type FeatureIdentity = {
  slug: FeatureSlug;
  label: string;
  menuCopy: string;
  icon: GlyphName;
  title: string;
  deck: string;
};

export type AgentsFeatureRecord = FeatureIdentity & {
  slug: "agents";
  layout: "agents";
};

export type DocumentFeatureRecord = FeatureIdentity & {
  layout: "document";
  image: string;
  imageAlt: string;
  imageCaption: string;
  sections: FeatureSection[];
};

export type FeatureRecord = AgentsFeatureRecord | DocumentFeatureRecord;

const DOCUMENT_SHELLS = {
  apps: { icon: "grid", image: "/features/apps-library.jpg" },
  customizable: { icon: "pencilLine", image: "/features/app-detail.jpg" },
  base: { icon: "table", image: "/features/base-data.jpg" },
} as const satisfies Record<Exclude<FeatureSlug, "agents">, { icon: GlyphName; image: string }>;

function documentFeature(
  catalog: SiteCatalog,
  slug: keyof typeof DOCUMENT_SHELLS
): DocumentFeatureRecord {
  const copy = catalog.features[slug];
  const shell = DOCUMENT_SHELLS[slug];
  return {
    slug,
    layout: "document",
    icon: shell.icon,
    image: shell.image,
    label: copy.label,
    menuCopy: copy.menuCopy,
    title: copy.title,
    deck: copy.deck,
    imageAlt: copy.imageAlt,
    imageCaption: copy.imageCaption,
    sections: copy.sections.map((section) => ({
      heading: section.heading,
      paragraphs: [...section.paragraphs],
      points: [...section.points],
    })),
  };
}

export function featuresFor(catalog: SiteCatalog): FeatureRecord[] {
  const agents = catalog.features.agents;
  return [
    {
      slug: "agents",
      layout: "agents",
      icon: "sparkle",
      label: agents.label,
      menuCopy: agents.menuCopy,
      title: agents.title,
      deck: agents.deck,
    },
    documentFeature(catalog, "apps"),
    documentFeature(catalog, "customizable"),
    documentFeature(catalog, "base"),
  ];
}

export const featureBySlug = (catalog: SiteCatalog, slug: string) =>
  featuresFor(catalog).find((feature) => feature.slug === slug);
