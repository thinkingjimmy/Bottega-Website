/**
 * [INPUT]: Uses localized SiteCatalog/DemoData, Agent identities, AgentsReel, Reveal, and FeatureLink
 * [OUTPUT]: Exports the localized AgentsSection component
 * [POS]: Home feature naming four official Agent backends and linking to their localized documentation
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { BACKENDS, backendLabel } from "@/lib/agents";
import { AgentsReel } from "./reels/agents-reel";
import { FeatureLink } from "./features/feature-link";
import { AgentLogo } from "./icons";
import { Reveal } from "./reveal";
import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";

export function AgentsSection({ demo, catalog, locale }: { demo: DemoData; catalog: SiteCatalog; locale: Locale }) {
  return (
    <section className="section" id="agents">
      <Reveal>
        <div className="wrap split">
          <div>
            <h1 className="agents-title">
              {catalog.home.agents.title}
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--ink-2)", marginBottom: 18, maxWidth: "56ch" }}>
              {catalog.home.agents.paragraphs[0]}
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--ink-2)", marginBottom: 30, maxWidth: "56ch" }}>
              {catalog.home.agents.paragraphs[1]}
            </p>

            {/* 四枚标记就是那句「有谁」的全部证据。名字写在 title 里而不是画在
                旁边：一行 logo 读得比一行名字快，而读不出来的人一 hover 就有。 */}
            <ul className="agent-marks">
              {BACKENDS.map((backend) => (
                <li key={backend.id} title={backendLabel(backend.id)}>
                  <AgentLogo backend={backend.id} size={28} />
                  <span className="sr-only">{backendLabel(backend.id)}</span>
                </li>
              ))}
            </ul>
            <FeatureLink slug="agents" locale={locale} label={catalog.common.readMore} />
          </div>

          <AgentsReel demo={demo} replayLabel={catalog.common.replay} />
        </div>
      </Reveal>
    </section>
  );
}
