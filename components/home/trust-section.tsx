/**
 * [INPUT]: Uses localized SiteCatalog/DemoData, the repository URL, Reveal, the Glyph/Stroke/D primitives, the dock-marks Tile, TerminalFigure, SyncFigure, and the Story vocabulary
 * [OUTPUT]: Exports the localized TrustSection — four local-first claims, the Open source story (read it, fork it, ship your own), and the encrypted sync story
 * [POS]: Second home section; it argues that the work stays on the machine, that the code proving it is public, and that it leaves the machine only as ciphertext
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import { REPO } from "@/lib/release";
import { D, Glyph, Stroke } from "../icons";
import { Reveal } from "../reveal";
import { Tile, type TileTone } from "./figures/dock-marks";
import { SyncFigure } from "./figures/sync-figure";
import { TerminalFigure } from "./figures/terminal-figure";
import { FigureCard, Story } from "./story";

/* 四条主张各配一枚彩色方章（与 Apps 节同一套），顺序与目录里的四条一一对应。
   白色字形在渐变底上要比纸上的描边粗一档，才压得住底色。 */
const CLAIM_TILES: { d: string; tone: TileTone }[] = [
  { d: D.folder, tone: "blue" },
  { d: D.monitor, tone: "graphite" },
  { d: D.gitFork, tone: "violet" },
  { d: D.shieldCheck, tone: "green" },
];

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
                <Tile tone={CLAIM_TILES[at].tone} size={28} lifted>
                  <Stroke d={CLAIM_TILES[at].d} size={16} width={2.1} />
                </Tile>
                <span>{claim.title}</span>
              </div>
              <p>{claim.body}</p>
            </div>
          ))}
        </div>

        <div className="stories">
          <Story
            number="03"
            eyebrow={copy.source.eyebrow}
            title={copy.source.title}
            body={copy.source.body}
            locale={locale}
            readMore={catalog.common.readMore}
            figure={
              <FigureCard position="40% 50%">
                <TerminalFigure copy={copy.source} />
              </FigureCard>
            }
          >
            {/* 开源说的是两件事：能读它（隐私声明可查证），也能拿走它发自己的版本。 */}
            <div className="source-actions">
              <a className="source-button source-button--primary" href={REPO} rel="noreferrer" target="_blank">
                <Glyph d={D.github} size={16} />
                {copy.source.fork}
              </a>
              <a className="source-button" href={REPO} rel="noreferrer" target="_blank">
                {copy.source.browse}
              </a>
            </div>
            <p className="source-license">{copy.source.license} · thinkingjimmy/Bottega</p>
          </Story>
          <Story
            number="04"
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
