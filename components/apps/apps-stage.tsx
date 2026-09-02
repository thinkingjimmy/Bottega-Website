"use client";

/**
 * [INPUT]: 依赖 ../reels/use-carousel 与 ../reels/use-play-when-seen，依赖 @/lib/agents 的 APPS，
 *          依赖四支表面组件
 * [OUTPUT]: 对外提供 AppsStage 组件
 * [POS]: Apps 一节的整只主体：左边一台机器，右边一份目录，目录就是那台
 *        机器的换挡杆。四台机器叠在同一只画框里，一次露一台
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { APPS } from "@/lib/agents";
import { useCarousel } from "../reels/use-carousel";
import { usePlayWhenSeen } from "../reels/use-play-when-seen";
import { CanvasSurface } from "./surface-canvas";
import { KanbanSurface } from "./surface-kanban";
import { LedgerSurface } from "./surface-ledger";
import { FitnessSurface } from "./surface-fitness";

/* 顺序即 APPS 的顺序：一份目录驱动一台机器，不会各排各的。 */
const SURFACES = [CanvasSurface, KanbanSurface, LedgerSurface, FitnessSurface];

export function AppsStage() {
  /* 被看见了才开始换挡。原来它一挂载就转，等人滚到这儿，跑马灯早已在
     视口外走了不知多少格——「第一眼看到哪一只 App」于是交给了随机数。 */
  const { frame, play } = usePlayWhenSeen();
  const { active, auto, pick } = useCarousel(APPS.length, play);

  return (
    <div className="split split-figure-first">
      {/* 这一栏只负责撑高与居中，不再画桌面：机器自己那圈边与落影
          已经够把它从纸面上抬起来。 */}
      <div className="desk">
        <div className="app-stage" data-active={active} ref={frame} aria-hidden="true">
          {SURFACES.map((Surface, at) => (
            <div className="app-pane" key={APPS[at].id}>
              <Surface />
            </div>
          ))}
        </div>
      </div>

      <div className="copy">
        <h2>Build AI-native apps.</h2>
        <p>
          Build an AI fitness coach, an AI expense tracker, or something entirely your own. 
          Describe the idea—Bottega turns it into a working app, from data to interface.
          Here are the four apps that come with Bottega:
        </p>

        {/* 目录即开关。四只 App 是一组同辈，摆成方阵读起来是「就这四只」；
            竖着排一列则暗示「还能往下接」——而这一节要说的恰恰是数目已定。 */}
        <ul className="app-switch" data-active={active} data-auto={auto ? "on" : "off"}>
          {APPS.map((app, at) => (
            <li key={app.id}>
              <button
                type="button"
                aria-pressed={at === active}
                onClick={() => pick(at)}
              >
                <span className="app-switch-head">
                  <span className="app-switch-icon" aria-hidden="true">
                    {app.icon}
                  </span>
                  <span className="app-switch-name">{app.name}</span>
                </span>
                <span className="mono app-switch-shape">{app.shape}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
