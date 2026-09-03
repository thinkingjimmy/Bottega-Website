"use client";

/**
 * [INPUT]: Uses localized SiteCatalog/DemoData, Base carousel hooks, Reveal, icons, and FeatureLink
 * [OUTPUT]: Exports the localized BaseSection component
 * [POS]: Final home feature showing four localized Base projections and the detailed data model route
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import { FeatureLink } from "./features/feature-link";
import { Stroke, glyph } from "./icons";
import { BaseViewsReel } from "./reels/base-views-reel";
import { useCarousel } from "./reels/use-carousel";
import { usePlayWhenSeen } from "./reels/use-play-when-seen";
import { Reveal } from "./reveal";

export function BaseSection({
  demo,
  copy,
  readMore,
  locale,
}: {
  demo: DemoData;
  copy: SiteCatalog["home"]["base"];
  readMore: string;
  locale: Locale;
}) {
  /* 被看见了才开始换挡：一段在视口外空转的跑马灯，等人滚到这儿时
     早已停在随机的一格上——那等于把「第一眼说什么」交给了随机数。 */
  const { frame, play } = usePlayWhenSeen();
  const { active, auto, pick } = useCarousel(demo.baseViews.length, play);

  return (
    <section className="section" id="base">
      <Reveal>
        <div className="wrap split split-figure-first">
          <BaseViewsReel active={active} frame={frame} demo={demo} />

          <div className="copy">
            <h2>{copy.title}</h2>
            <p>{copy.body}</p>

            {/* 目录即开关，与 Apps 一节同构。四种视图摆成方阵读起来是「就这四种」；
                竖着排一列则暗示「还能往下接」——而这四种是这本账真有的四个视图。 */}
            <ul className="app-switch" data-active={active} data-auto={auto ? "on" : "off"}>
              {demo.baseViews.map((view, at) => (
                <li key={view.name}>
                  <button type="button" aria-pressed={at === active} onClick={() => pick(at)}>
                    <span className="app-switch-head">
                      <span className="app-switch-icon" aria-hidden="true">
                        <Stroke d={glyph(view.icon)} size={15} width={1.8} />
                      </span>
                      <span className="app-switch-name">{view.name}</span>
                    </span>
                    <span className="mono app-switch-description">{view.blurb}</span>
                  </button>
                </li>
              ))}
            </ul>
            <FeatureLink slug="base" locale={locale} label={readMore} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
