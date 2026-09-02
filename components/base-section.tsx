"use client";

/**
 * [INPUT]: 依赖 ./reels/use-play-when-seen 与 ./reels/use-carousel，
 *          依赖 ./reels/base-views-reel 的 BaseViewsReel，
 *          依赖 @/lib/agents 的 BASE_VIEWS，依赖 ./icons 的 Stroke/glyph
 * [OUTPUT]: 对外提供 BaseSection 组件
 * [POS]: Bottega-Website 讲内置 Base 那一节，也是正文最后一节。图左文右。
 *        右栏那份视图目录既是名单也是那台机器的换挡杆——与 Apps 一节同一个
 *        做法：一份名字同时干两件事，重复就不存在了。
 *        标题写 chat 而不是 App 是事实不是措辞：Base 工具的提示原话是
 *        「Base 是当前 chat 可写的本地数据表：优先使用 chat 自有 Base，
 *        无自有 Base 时使用所属 Project 的共享 Base」
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { BASE_VIEWS } from "@/lib/agents";
import { Stroke, glyph } from "./icons";
import { BaseViewsReel } from "./reels/base-views-reel";
import { useCarousel } from "./reels/use-carousel";
import { usePlayWhenSeen } from "./reels/use-play-when-seen";
import { Reveal } from "./reveal";

export function BaseSection() {
  /* 被看见了才开始换挡：一段在视口外空转的跑马灯，等人滚到这儿时
     早已停在随机的一格上——那等于把「第一眼说什么」交给了随机数。 */
  const { frame, play } = usePlayWhenSeen();
  const { active, auto, pick } = useCarousel(BASE_VIEWS.length, play);

  return (
    <section className="section" id="base">
      <Reveal>
        <div className="wrap split split-figure-first">
          <BaseViewsReel active={active} frame={frame} />

          <div className="copy">
            <h2>Every chat comes with a Base.</h2>
            <p>
              Bottega uses it to structure, analyze, and visualize your data. Ask for totals, summaries, category breakdowns, or trends—then explore the same data as a table, chart, gallery, or map. No exports required.
            </p>

            {/* 目录即开关，与 Apps 一节同构。四种视图摆成方阵读起来是「就这四种」；
                竖着排一列则暗示「还能往下接」——而这四种是这本账真有的四个视图。 */}
            <ul className="app-switch" data-active={active} data-auto={auto ? "on" : "off"}>
              {BASE_VIEWS.map((view, at) => (
                <li key={view.name}>
                  <button type="button" aria-pressed={at === active} onClick={() => pick(at)}>
                    <span className="app-switch-head">
                      <span className="app-switch-icon" aria-hidden="true">
                        <Stroke d={glyph(view.icon)} size={15} width={1.8} />
                      </span>
                      <span className="app-switch-name">{view.name}</span>
                    </span>
                    <span className="mono app-switch-shape">{view.blurb}</span>
                  </button>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </Reveal>
    </section>
  );
}
