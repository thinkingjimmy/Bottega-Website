/**
 * [INPUT]: Uses one Locale to select SiteCatalog, page structured data, localized demo data, the hero, the floating header, and home sections
 * [OUTPUT]: Exports HomePageView with static website/application JSON-LD for all five locales
 * [POS]: Locale-neutral home composition; route files only choose locale and metadata policy
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */

import { createDemoData } from "@/lib/agents";
import { getCatalog, type Locale } from "@/lib/i18n";
import { FloatingHeader } from "../floating-header";
import { Hero } from "../hero";
import { AgentsSection } from "../home/agents-section";
import { AppsSection } from "../home/apps-section";
import { FaqSection } from "../home/faq-section";
import { TrustSection } from "../home/trust-section";
import { SiteFooter } from "../site-footer";
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
      <FloatingHeader locale={locale} copy={catalog.nav} download={catalog.download} features={features} />
      <div className="content">
        <AgentsSection demo={demo} catalog={catalog} locale={locale} />
        <TrustSection demo={demo} catalog={catalog} locale={locale} />
        <AppsSection demo={demo} catalog={catalog} locale={locale} />
        <FaqSection catalog={catalog} />
        <SiteFooter locale={locale} catalog={catalog} logicalPath="/" />
      </div>
    </>
  );
}
