"use client";

/**
 * [INPUT]: Uses localized SiteCatalog/DemoData, carousel hooks, four product surfaces, and FeatureLink
 * [OUTPUT]: Exports the localized AppsStage component
 * [POS]: Complete Apps home feature with one language-specific surface switcher and detail route
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import { FeatureLink } from "../features/feature-link";
import { useCarousel } from "../reels/use-carousel";
import { usePlayWhenSeen } from "../reels/use-play-when-seen";
import { CanvasSurface } from "./surface-canvas";
import { KanbanSurface } from "./surface-kanban";
import { LedgerSurface } from "./surface-ledger";
import { FitnessSurface } from "./surface-fitness";

/* 顺序即 APPS 的顺序：一份目录驱动一台机器，不会各排各的。 */
const SURFACES = [CanvasSurface, KanbanSurface, LedgerSurface, FitnessSurface];

export function AppsStage({
  demo,
  copy,
  readMore,
  locale,
}: {
  demo: DemoData;
  copy: SiteCatalog["home"]["apps"];
  readMore: string;
  locale: Locale;
}) {
  /* 被看见了才开始换挡。原来它一挂载就转，等人滚到这儿，跑马灯早已在
     视口外走了不知多少格——「第一眼看到哪一只 App」于是交给了随机数。 */
  const { frame, play } = usePlayWhenSeen();
  const { active, auto, pick } = useCarousel(demo.apps.length, play);

  return (
    <div className="split split-figure-first">
      {/* 这一栏只负责撑高与居中，不再画桌面：机器自己那圈边与落影
          已经够把它从纸面上抬起来。 */}
      <div className="desk">
        <div className="app-stage" data-active={active} ref={frame} aria-hidden="true">
          {SURFACES.map((Surface, at) => (
            <div className="app-pane" key={demo.apps[at].id}>
              <Surface demo={demo} />
            </div>
          ))}
        </div>
      </div>

      <div className="copy">
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>

        {/* 目录即开关。四只 App 是一组同辈，摆成方阵读起来是「就这四只」；
            竖着排一列则暗示「还能往下接」——而这一节要说的恰恰是数目已定。 */}
        <ul className="app-switch" data-active={active} data-auto={auto ? "on" : "off"}>
          {demo.apps.map((app, at) => (
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
        <FeatureLink slug="apps" locale={locale} label={readMore} />
      </div>
    </div>
  );
}
