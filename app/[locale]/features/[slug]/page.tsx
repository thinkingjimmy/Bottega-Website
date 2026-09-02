/**
 * [INPUT]: Uses locale/feature static params, localized metadata, and FeaturePageView
 * [OUTPUT]: Statically renders twenty canonical locale-prefixed feature pages
 * [POS]: Canonical localized feature route
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { notFound } from "next/navigation";
import { FeaturePageView } from "@/components/pages/feature-page";
import { FEATURE_SLUGS, featureBySlug } from "@/components/features/catalog";
import { getCatalog, parseLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/i18n/metadata";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => FEATURE_SLUGS.map((slug) => ({ slug }));

export async function generateMetadata({ params }: Props) {
  const values = await params;
  const locale = parseLocale(values.locale);
  if (!locale) return {};
  const catalog = getCatalog(locale);
  const feature = featureBySlug(catalog, values.slug);
  if (!feature) return {};
  return buildMetadata({
    locale,
    logicalPath: `/features/${feature.slug}/`,
    title: feature.label,
    description: feature.deck,
    catalog,
    image: feature.layout === "document"
      ? { url: feature.image, width: 1229, height: 768, alt: feature.imageAlt }
      : undefined,
  });
}

export default async function LocalizedFeaturePage({ params }: Props) {
  const values = await params;
  const locale = parseLocale(values.locale);
  if (!locale || !FEATURE_SLUGS.includes(values.slug as (typeof FEATURE_SLUGS)[number])) notFound();
  return <FeaturePageView locale={locale} slug={values.slug} />;
}
