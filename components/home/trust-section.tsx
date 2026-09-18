/**
 * [INPUT]: Uses localized SiteCatalog/DemoData, Reveal, the Stroke/glyph primitives, SyncFigure, and the Story vocabulary
 * [OUTPUT]: Exports the localized TrustSection — four local-first claims and the encrypted sync story
 * [POS]: Second home section; it argues that the work stays on the machine and leaves it only as ciphertext
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import { Stroke, glyph } from "../icons";
import { Reveal } from "../reveal";
import { SyncFigure } from "./figures/sync-figure";
import { FigureCard, Story } from "./story";

/* 四条主张各配一枚描边图标，顺序与目录里的四条一一对应。 */
const CLAIM_ICONS = ["folder", "monitor", "gitFork", "shieldCheck"];

export function TrustSection({ demo, catalog, locale }: { demo: DemoData; catalog: SiteCatalog; locale: Locale }) {
  const copy = catalog.home.trust;
  const time = catalog.home.hero.date.trim().split(/\s+/).pop() ?? "";
  return (
    <section className="home-section" id="local-first">
      <Reveal>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="home-title">
          {copy.title[0]}
          <br />
          {copy.title[1]}
        </h2>
        <p className="home-lede">{copy.lede}</p>

        <div className="cell-grid cell-grid--4">
          {copy.claims.map((claim, at) => (
            <div className="cell" key={claim.title}>
              <div className="cell-head">
                <Stroke d={glyph(CLAIM_ICONS[at])} size={16} width={1.9} />
                <span>{claim.title}</span>
              </div>
              <p>{claim.body}</p>
            </div>
          ))}
        </div>

        <div className="stories">
          <Story
            number="03"
            eyebrow={copy.sync.eyebrow}
            title={copy.sync.title}
            body={copy.sync.body}
            slug="agents"
            locale={locale}
            readMore={catalog.common.readMore}
            figureFirst
            figure={
              <FigureCard position="55% 60%">
                <SyncFigure demo={demo} time={time} />
              </FigureCard>
            }
          />
        </div>
      </Reveal>
    </section>
  );
}
