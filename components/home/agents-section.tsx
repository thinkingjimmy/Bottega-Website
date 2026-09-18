/**
 * [INPUT]: Uses BACKENDS/ANNOUNCED facts, localized SiteCatalog/DemoData, Reveal, the icon primitives, HandoffFigure, DataStory, and the Story vocabulary
 * [OUTPUT]: Exports the localized AgentsSection — the CLI roster, the Handoff story, and the Data space story
 * [POS]: First home section after the hero; it owns the whole "your Agents, your plan, one workspace" argument
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { ANNOUNCED, BACKENDS } from "@/lib/agents";
import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import { AgentLogo, AnnouncedLogo } from "../icons";
import { Reveal } from "../reveal";
import { DataStory } from "./data-story";
import { HandoffFigure } from "./figures/handoff-figure";
import { FigureCard, Story } from "./story";

export function AgentsSection({ demo, catalog, locale }: { demo: DemoData; catalog: SiteCatalog; locale: Locale }) {
  const copy = catalog.home.agents;
  const readMore = catalog.common.readMore;
  return (
    <section className="home-section" id="agents">
      <Reveal>
        <p className="eyebrow">{copy.eyebrow}</p>
        {/* 全页唯一的 h1：首屏没有标题，这一句就是这一页的主标题。 */}
        <h1 className="home-title">
          {copy.title[0]}
          <br />
          {copy.title[1]}
        </h1>
        <p className="home-lede">{copy.lede}</p>

        {/* 名单一行五格：每家一条登录命令——那就是全部设置，与标题说的是同一件事。
            命令是产品在 Agent 未登录时自己印出来的那一句，不是站点编的。 */}
        <div className="cell-grid cell-grid--5">
          {BACKENDS.map((backend) => (
            <div className="cell" key={backend.id}>
              <div className="cell-head">
                <AgentLogo backend={backend.id} size={18} />
                <span>{backend.cli}</span>
              </div>
              <span className="cell-cmd">{backend.login}</span>
              <p>{copy.roster[backend.id]}</p>
            </div>
          ))}
          <div className="cell">
            <div className="cell-head">
              <span className="cell-marks">
                {ANNOUNCED.map((agent) => (
                  <span key={agent.id}>
                    <AnnouncedLogo id={agent.id} size={18} />
                    <span className="sr-only">{agent.label}</span>
                  </span>
                ))}
              </span>
              <span>{copy.roster.more}</span>
            </div>
            <span className="cell-cmd" style={{ fontFamily: "inherit" }}>{copy.roster.soon}</span>
            <p>{copy.roster.moreBody}</p>
          </div>
        </div>

        <div className="stories">
          <Story
            number="01"
            eyebrow={copy.handoff.eyebrow}
            title={copy.handoff.title}
            body={copy.handoff.body}
            note={copy.handoff.note}
            slug="agents"
            locale={locale}
            readMore={readMore}
            figure={
              <FigureCard position="50% 30%">
                <HandoffFigure demo={demo} />
              </FigureCard>
            }
          />
          <DataStory demo={demo} copy={copy.data} readMore={readMore} locale={locale} />
        </div>
      </Reveal>
    </section>
  );
}
