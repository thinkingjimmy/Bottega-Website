"use client";

/**
 * [INPUT]: Uses localized SiteCatalog/DemoData, the four App surfaces, the shared carousel/visibility hooks, Reveal, FeatureLink, and FigureCard/Cases
 * [OUTPUT]: Exports the localized AppsSection — the App stage beside the section copy and the four-App case list that drives it
 * [POS]: Third home section; the one section that is itself a single story
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import { APP_SURFACES } from "../apps/surfaces";
import { FeatureLink } from "../features/feature-link";
import { useCarousel } from "../reels/use-carousel";
import { usePlayWhenSeen } from "../reels/use-play-when-seen";
import { Reveal } from "../reveal";
import { Cases, FigureCard } from "./story";

export function AppsSection({ demo, catalog, locale }: { demo: DemoData; catalog: SiteCatalog; locale: Locale }) {
  const copy = catalog.home.apps;
  /* 轮播只在舞台进入视口后起跑，否则等人滚到时它早已停在随机的一只上。 */
  const { frame, play } = usePlayWhenSeen();
  const { active, auto, pick } = useCarousel(demo.apps.length, play);
  const items = demo.apps.map((app) => ({ icon: app.mark, name: app.name, description: app.description }));

  return (
    <section className="home-section" id="apps">
      <Reveal>
        <div className="story story--figure-first">
          <FigureCard position="50% 55%" fill>
            {/* 顺序即目录的顺序：一份目录驱动一台机器，不会各排各的。 */}
            <div className="app-stage" data-active={active} ref={frame}>
              {demo.apps.map((app) => {
                const Surface = APP_SURFACES[app.id];
                return (
                  <div className="app-pane" key={app.id}>
                    <Surface demo={demo} />
                  </div>
                );
              })}
            </div>
          </FigureCard>
          <div className="story-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="home-title">{copy.title}</h2>
            <p>{copy.body}</p>
            <Cases items={items} active={active} auto={auto} onPick={pick} />
            <FeatureLink slug="apps" locale={locale} label={catalog.common.readMore} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
