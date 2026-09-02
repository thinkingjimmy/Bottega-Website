/**
 * [INPUT]: Uses localized SiteCatalog/DemoData and the AppsStage presentation
 * [OUTPUT]: Exports the localized AppsSection shell
 * [POS]: Home Apps section alternating a live product surface with its catalog
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { AppsStage } from "./apps/apps-stage";
import { Reveal } from "./reveal";
import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";

export function AppsSection({ demo, catalog, locale }: { demo: DemoData; catalog: SiteCatalog; locale: Locale }) {
  return (
    <section className="section" id="apps">
      <Reveal>
        <div className="wrap">
          <AppsStage demo={demo} copy={catalog.home.apps} readMore={catalog.common.readMore} locale={locale} />
        </div>
      </Reveal>
    </section>
  );
}
