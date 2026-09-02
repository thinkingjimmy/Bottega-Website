/**
 * [INPUT]: Uses feature static params, English fallback catalog metadata, and FeaturePageView
 * [OUTPUT]: Statically renders four unprefixed Auto feature routes
 * [POS]: x-default feature entry with an English no-JavaScript fallback
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { FeaturePageView } from "@/components/pages/feature-page";
import { FEATURE_SLUGS, featureBySlug } from "@/components/features/catalog";
import { getCatalog } from "@/lib/i18n";
import { buildMetadata } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => FEATURE_SLUGS.map((slug) => ({ slug }));

export async function generateMetadata({ params }: Props) {
  const catalog = getCatalog("en");
  const feature = featureBySlug(catalog, (await params).slug);
  if (!feature) return {};
  return buildMetadata({
    locale: "en",
    logicalPath: `/features/${feature.slug}/`,
    title: feature.label,
    description: feature.deck,
    catalog,
    auto: true,
    image: feature.layout === "document"
      ? { url: feature.image, width: 1229, height: 768, alt: feature.imageAlt }
      : undefined,
  });
}

export default async function AutoFeaturePage({ params }: Props) {
  return <FeaturePageView locale="en" slug={(await params).slug} />;
}
