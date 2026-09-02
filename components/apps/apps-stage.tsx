"use client";

/**
 * [INPUT]: 依赖 react 的 useEffect/useRef/useState，依赖 @/lib/agents 的 APPS，
 *          依赖四支表面组件
 * [OUTPUT]: 对外提供 AppsStage 组件
 * [POS]: Apps 一节的整只主体：左边一台机器，右边一份目录，目录就是那台
 *        机器的换挡杆。四台机器叠在同一只画框里，一次露一台
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { useEffect, useRef, useState } from "react";
import { APPS } from "@/lib/agents";
import { CanvasSurface } from "./surface-canvas";
import { KanbanSurface } from "./surface-kanban";
import { LedgerSurface } from "./surface-ledger";
import { FitnessSurface } from "./surface-fitness";

/* 顺序即 APPS 的顺序：一份目录驱动一台机器，不会各排各的。 */
const SURFACES = [CanvasSurface, KanbanSurface, LedgerSurface, FitnessSurface];

/** 一格停留五秒。比四秒读得完一张表，比六秒不至于让人以为它卡住了。 */
const DWELL = 5000;

/* ── 自动走一格，点过即停 ──────────────────────────────────────────
 * 人一伸手，机器就该让位：点过之后不再回到跑马灯，也不设「过一会儿恢复」——
 * 那等于把观众刚做的选择判为暂时的。
 *
 * 关掉动效的人不该被跑马灯追着跑，所以 reduce 之下一格都不走，停在第一台。
 * 停下来那一格是「这一节要说的话」的开头，不是随机的一帧。
 * ────────────────────────────────────────────────────────── */
function useCarousel(count: number) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
      return;
    }
    timer.current = setInterval(() => setActive((at) => (at + 1) % count), DWELL);
    return () => clearInterval(timer.current);
  }, [count]);

  const pick = (index: number) => {
    clearInterval(timer.current);
    setAuto(false);
    setActive(index);
  };

  return { active, auto, pick };
}

export function AppsStage() {
  const { active, auto, pick } = useCarousel(APPS.length);

  return (
    <div className="split split-figure-first">
      {/* 桌面色的桌子，机器浮在上面。两者同色时读起来是「一台机器浮在白里」，
          画框与机身分不出边界——Design Canvas 自带的暖纸尤其吃这一亏。 */}
      <div className="desk">
        <div className="app-stage" data-active={active} aria-hidden="true">
          {SURFACES.map((Surface, at) => (
            <div className="app-pane" key={APPS[at].id}>
              <Surface />
            </div>
          ))}
        </div>
      </div>

      <div className="copy">
        <h2>Fully customizable.</h2>
        <p>
          An App is an installable Agent workflow with its own data boundary and its own
          surface.
        </p>
        <p>
          What it may read, write and present is declared in its manifest — nothing more.
          Four ship with Bottega; the scaffolds are in the box for the next one.
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
