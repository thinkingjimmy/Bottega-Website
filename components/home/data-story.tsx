"use client";

/**
 * [INPUT]: Uses localized DemoData, BaseViewsReel, the shared carousel/visibility hooks, and Story/FigureCard/Cases
 * [OUTPUT]: Exports DataStory — the Data space story whose four-view case list drives the Base reel
 * [POS]: Second story of the Agents section; the only client component that section needs
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import { BaseViewsReel } from "../reels/base-views-reel";
import { useCarousel } from "../reels/use-carousel";
import { usePlayWhenSeen } from "../reels/use-play-when-seen";
import { Cases, FigureCard, Story } from "./story";

export function DataStory({
  demo,
  copy,
  readMore,
  locale,
}: {
  demo: DemoData;
  copy: SiteCatalog["home"]["agents"]["data"];
  readMore: string;
  locale: Locale;
}) {
  /* 轮播只在图进入视口后起跑：一段在视口外空转的跑马灯，等人滚到时
     早已停在随机的一格上——那等于把「第一眼说什么」交给了随机数。 */
  const { frame, play } = usePlayWhenSeen();
  const { active, auto, pick } = useCarousel(demo.baseViews.length, play);
  const views = demo.baseViews.map((view) => ({ icon: view.icon, name: view.name, description: view.blurb }));

  return (
    <Story
      number="02"
      eyebrow={copy.eyebrow}
      title={copy.title}
      body={copy.body}
      slug="base"
      locale={locale}
      readMore={readMore}
      figureFirst
      figure={
        <FigureCard position="60% 70%" fill>
          <BaseViewsReel active={active} frame={frame} demo={demo} />
        </FigureCard>
      }
    >
      <Cases items={views} active={active} auto={auto} onPick={pick} />
    </Story>
  );
}
