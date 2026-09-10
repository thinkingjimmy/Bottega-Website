/**
 * [INPUT]: Uses one Locale to select SiteCatalog, page structured data, localized demo data, and home sections
 * [OUTPUT]: Exports HomePageView with static website/application JSON-LD for all five locales
 * [POS]: Locale-neutral home composition; route files only choose locale and metadata policy
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */

import { createDemoData } from "@/lib/agents";
import { getCatalog, type Locale } from "@/lib/i18n";
import { AgentsSection } from "../agents-section";
import { AppsSection } from "../apps-section";
import { BaseSection } from "../base-section";
import { CollaborationSection } from "../collaboration-section";
import { CustomizableSection } from "../customizable-section";
import { ForkBand } from "../fork-band";
import { Hero } from "../hero";
import { SiteFooter } from "../site-footer";
import { SubscriptionSection } from "../subscription-section";
import { featuresFor } from "../features/catalog";
import { PageStructuredData } from "./structured-data";

export function HomePageView({ locale }: { locale: Locale }) {
  const catalog = getCatalog(locale);
  const demo = createDemoData(catalog.demo);
  const features = featuresFor(catalog);

  return (
    <>
      <PageStructuredData locale={locale} logicalPath="/" catalog={catalog} />
      <Hero
        demo={demo}
        copy={catalog.home.hero}
        nav={catalog.nav}
        download={catalog.download}
        language={catalog.language}
        features={features}
        locale={locale}
      />
      <div className="content">
        <AgentsSection demo={demo} catalog={catalog} locale={locale} />
        <SubscriptionSection copy={catalog.home.subscription} readMore={catalog.common.readMore} locale={locale} />
        <CollaborationSection
          demo={demo}
          copy={catalog.home.collaboration}
          readMore={catalog.common.readMore}
          locale={locale}
        />
        <AppsSection demo={demo} catalog={catalog} locale={locale} />
        <CustomizableSection demo={demo} catalog={catalog} locale={locale} />
        <BaseSection demo={demo} copy={catalog.home.base} readMore={catalog.common.readMore} locale={locale} />
        <ForkBand catalog={catalog} />
        <SiteFooter locale={locale} catalog={catalog} logicalPath="/" />
      </div>
    </>
  );
}
