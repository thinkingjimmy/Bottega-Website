/**
 * [INPUT]: Uses one Locale to select SiteCatalog and assemble localized demo data and home sections
 * [OUTPUT]: Exports HomePageView for Auto fallback and five canonical locale routes
 * [POS]: Locale-neutral home composition; route files only choose locale and metadata policy
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { createDemoData } from "@/lib/agents";
import { getCatalog, type Locale } from "@/lib/i18n";
import { AgentsSection } from "../agents-section";
import { AppsSection } from "../apps-section";
import { BaseSection } from "../base-section";
import { CustomizableSection } from "../customizable-section";
import { ForkBand } from "../fork-band";
import { Hero } from "../hero";
import { SiteFooter } from "../site-footer";
import { featuresFor } from "../features/catalog";

export function HomePageView({ locale }: { locale: Locale }) {
  const catalog = getCatalog(locale);
  const demo = createDemoData(catalog.demo);
  const features = featuresFor(catalog);

  return (
    <>
      <Hero demo={demo} copy={catalog.home.hero} nav={catalog.nav} features={features} locale={locale} />
      <div className="content">
        <AgentsSection demo={demo} catalog={catalog} locale={locale} />
        <AppsSection demo={demo} catalog={catalog} locale={locale} />
        <CustomizableSection demo={demo} catalog={catalog} locale={locale} />
        <BaseSection demo={demo} copy={catalog.home.base} readMore={catalog.common.readMore} locale={locale} />
        <ForkBand catalog={catalog} />
        <SiteFooter locale={locale} catalog={catalog} logicalPath="/" />
      </div>
    </>
  );
}
