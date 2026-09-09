/**
 * [INPUT]: Uses localized SiteCatalog/DemoData, AgentsReel, Reveal, and FeatureLink
 * [OUTPUT]: Exports the localized AgentsSection component
 * [POS]: Home feature naming four official Agent backends and linking to their localized documentation
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { AgentsReel } from "./reels/agents-reel";
import { FeatureLink } from "./features/feature-link";
import { Reveal } from "./reveal";
import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";

export function AgentsSection({ demo, catalog, locale }: { demo: DemoData; catalog: SiteCatalog; locale: Locale }) {
  return (
    <section className="section" id="agents">
      <Reveal>
        <div className="wrap split">
          <div className="copy">
            <h1 className="agents-title">{catalog.home.agents.title}</h1>
            <p>{catalog.home.agents.body}</p>
            <FeatureLink slug="agents" locale={locale} label={catalog.common.readMore} />
          </div>

          <AgentsReel demo={demo} replayLabel={catalog.common.replay} />
        </div>
      </Reveal>
    </section>
  );
}
