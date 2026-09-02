/**
 * [INPUT]: Uses localized SiteCatalog/DemoData, AppMenuReel, Reveal, and FeatureLink
 * [OUTPUT]: Exports the localized CustomizableSection component
 * [POS]: Home feature explaining that editable Apps reopen as Agent Chats bound to source Projects
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { FeatureLink } from "./features/feature-link";
import { AppMenuReel } from "./reels/app-menu-reel";
import { Reveal } from "./reveal";
import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";

export function CustomizableSection({ demo, catalog, locale }: { demo: DemoData; catalog: SiteCatalog; locale: Locale }) {
  return (
    <section className="section" id="customizable">
      <Reveal>
        <div className="wrap split">
          <div className="copy">
            <h2>{catalog.home.customizable.title}</h2>
            <p>{catalog.home.customizable.body}</p>
            <FeatureLink slug="customizable" locale={locale} label={catalog.common.readMore} />
          </div>

          <AppMenuReel demo={demo} replayLabel={catalog.common.replay} />
        </div>
      </Reveal>
    </section>
  );
}
