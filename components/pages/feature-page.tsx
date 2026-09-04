/**
 * [INPUT]: Uses locale/slug, localized feature assembly, DemoData, feature articles, and shared site chrome
 * [OUTPUT]: Exports FeaturePageView for canonical English and prefixed feature routes
 * [POS]: Locale-neutral feature composition with one specialized Agents branch
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { notFound } from "next/navigation";
import { createDemoData } from "@/lib/agents";
import { getCatalog, type Locale } from "@/lib/i18n";
import { AgentsFeatureArticle } from "../features/agents-feature-article";
import { DocumentFeatureArticle } from "../features/document-feature-article";
import { featureBySlug, featuresFor } from "../features/catalog";
import { FeatureSidebar } from "../features/feature-sidebar";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";

export function FeaturePageView({ locale, slug }: { locale: Locale; slug: string }) {
  const catalog = getCatalog(locale);
  const features = featuresFor(catalog);
  const feature = featureBySlug(catalog, slug);
  if (!feature) notFound();
  const demo = createDemoData(catalog.demo);
  const logicalPath = `/features/${feature.slug}/`;

  return (
    <div className="content">
      <SiteHeader variant="framed" locale={locale} copy={catalog.nav} features={features} />
      <div className="wrap feature-layout">
        <FeatureSidebar
          active={feature.slug}
          features={features}
          locale={locale}
          label={catalog.features.sidebarLabel}
          navigationLabel={catalog.features.sidebarNavigation}
        />
        {feature.layout === "agents"
          ? <AgentsFeatureArticle feature={feature} catalog={catalog} demo={demo} />
          : <DocumentFeatureArticle feature={feature} breadcrumb={catalog.features.breadcrumb} />}
      </div>
      <SiteFooter locale={locale} catalog={catalog} logicalPath={logicalPath} />
    </div>
  );
}
