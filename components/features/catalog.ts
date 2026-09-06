/**
 * [INPUT]: Uses SiteCatalog feature copy and the shared GlyphName contract
 * [OUTPUT]: Exports stable feature identities, localized feature records, slug lookup, the Open Graph image, and public types
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

/* 截图是一样东西的三个部分（路径、替代文本、图注），它们从来一起出现、
   一起缺席——拆成三个平行字段，「Base 没有截图」就得写成三个 undefined。
   合成一个可选对象之后，「有没有截图」只有一个答案。 */
export type FeatureScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

export type DocumentFeatureRecord = FeatureIdentity & {
  layout: "document";
  /** 缺席即这一页不靠截图立论——Base 用三张代码画的图代替它。 */
  screenshot?: FeatureScreenshot;
  sections: FeatureSection[];
};

export type FeatureRecord = AgentsFeatureRecord | DocumentFeatureRecord;

/* 结构型而不是 `SiteCatalog["features"]["base"]`：目录是 as const 的字面量，
   每一页的 points 各自是定长元组，拿其中一页的类型去收另一页必然对不上长度。
   这里要的是「一页文档版式的文案长什么样」，不是「Base 那一页长什么样」。 */
type DocumentCopy = {
  label: string;
  menuCopy: string;
  title: string;
  deck: string;
  sections: readonly {
    heading: string;
    paragraphs: readonly string[];
    points: readonly string[];
  }[];
};

function documentFeature(
  slug: Exclude<FeatureSlug, "agents">,
  icon: GlyphName,
  copy: DocumentCopy,
  screenshot?: FeatureScreenshot
): DocumentFeatureRecord {
  return {
    slug,
    layout: "document",
    icon,
    label: copy.label,
    menuCopy: copy.menuCopy,
    title: copy.title,
    deck: copy.deck,
    ...(screenshot ? { screenshot } : {}),
    sections: copy.sections.map((section) => ({
      heading: section.heading,
      paragraphs: [...section.paragraphs],
      points: [...section.points],
    })),
  };
}

export function featuresFor(catalog: SiteCatalog): FeatureRecord[] {
  const { agents, apps, customizable, base } = catalog.features;
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
    documentFeature("apps", "grid", apps, {
      src: "/features/apps-library.jpg",
      ...apps.screenshot,
    }),
    documentFeature("customizable", "pencilLine", customizable, {
      src: "/features/app-detail.jpg",
      ...customizable.screenshot,
    }),
    documentFeature("base", "table", base),
  ];
}

/* 两条路由的 generateMetadata 从前各写一遍同一个三元表达式；同一个决定
   写两遍，迟早只改了一遍。 */
export const featureOpenGraphImage = (feature: FeatureRecord) =>
  feature.layout === "document" && feature.screenshot
    ? {
        url: feature.screenshot.src,
        width: 1229,
        height: 768,
        alt: feature.screenshot.alt,
      }
    : undefined;

export const featureBySlug = (catalog: SiteCatalog, slug: string) =>
  featuresFor(catalog).find((feature) => feature.slug === slug);
