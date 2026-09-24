"use client";

/**
 * [INPUT]: Uses localized SiteCatalog/DemoData, the four App surfaces, the shared carousel/visibility hooks, AppTile, and Story/FigureCard/Cases
 * [OUTPUT]: Exports AppsStory — the App stage beside the build story and the four-App case list that drives it
 * [POS]: First story of the Apps section (05); one of the two client stories that section uses, because it holds carousel state
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import { APP_SURFACES } from "../../apps/surfaces";
import { useCarousel } from "../../reels/use-carousel";
import { usePlayWhenSeen } from "../../reels/use-play-when-seen";
import { AppTile } from "../figures/dock-marks";
import { Cases, FigureCard, Story } from "../story";

export function AppsStory({
  demo,
  copy,
  readMore,
  locale,
}: {
  demo: DemoData;
  copy: SiteCatalog["home"]["apps"]["build"];
  readMore: string;
  locale: Locale;
}) {
  /* 轮播只在舞台进入视口后起跑，否则等人滚到时它早已停在随机的一只上。 */
  const { frame, play } = usePlayWhenSeen();
  const { active, auto, pick } = useCarousel(demo.apps.length, play);
  const items = demo.apps.map((app) => ({
    icon: <AppTile id={app.id} size={18} />,
    name: app.name,
    description: app.description,
  }));

  return (
    <Story
      number="05"
      eyebrow={copy.eyebrow}
      title={copy.title}
      body={copy.body}
      slug="apps"
      locale={locale}
      readMore={readMore}
      figureFirst
      figure={
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
      }
    >
      <Cases items={items} active={active} auto={auto} onPick={pick} />
    </Story>
  );
}
