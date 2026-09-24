"use client";

/**
 * [INPUT]: Uses localized SiteCatalog/DemoData, the shared carousel/visibility hooks, the dock-marks AppTile/LimitRing/Tile, the Stroke/D primitives, WidgetsFigure, and Story/FigureCard/Cases
 * [OUTPUT]: Exports WidgetsStory — the four-widget case list that drives the centred widget and its open slot on the Dock
 * [POS]: Last story of the Apps section; a client component only because it holds carousel state
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import { D, Stroke } from "../../icons";
import { useCarousel } from "../../reels/use-carousel";
import { usePlayWhenSeen } from "../../reels/use-play-when-seen";
import { AppTile, LimitRing, Tile } from "../figures/dock-marks";
import { WIDGET_CASES, WidgetsFigure } from "../figures/widgets-figure";
import { Cases, FigureCard, Story } from "../story";

export function WidgetsStory({
  demo,
  copy,
  readMore,
  locale,
}: {
  demo: DemoData;
  copy: SiteCatalog["home"]["apps"]["widgets"];
  readMore: string;
  locale: Locale;
}) {
  const { frame, play } = usePlayWhenSeen();
  const { active, auto, pick } = useCarousel(WIDGET_CASES.length, play);
  const names = demo.copy.widgets;
  const items = [
    { icon: <LimitRing size={18} value={64} />, name: names.limits, description: copy.cases[0] },
    {
      icon: (
        <Tile tone="graphite" size={18}>
          <Stroke d={D.sigma} size={11} width={2.4} />
        </Tile>
      ),
      name: names.usage,
      description: copy.cases[1],
    },
    { icon: <AppTile id="expense-tracker" size={18} />, name: names.spend, description: copy.cases[2] },
    { icon: <AppTile id="fitness-log" size={18} />, name: names.streak, description: copy.cases[3] },
  ];

  return (
    <Story
      number="07"
      eyebrow={copy.eyebrow}
      title={copy.title}
      body={copy.body}
      locale={locale}
      readMore={readMore}
      figureFirst
      figure={
        <FigureCard position="70% 88%" fill>
          <WidgetsFigure demo={demo} active={active} frame={frame} />
        </FigureCard>
      }
    >
      <Cases items={items} active={active} auto={auto} onPick={pick} />
    </Story>
  );
}
