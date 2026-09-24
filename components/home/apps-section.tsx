/**
 * [INPUT]: Uses localized SiteCatalog/DemoData, Reveal, the Stroke/D primitives, the dock-marks AppTile/DockIcon/LimitRing/Tile, AppsStory, DockFigure, WidgetsFigure, and the Story vocabulary
 * [OUTPUT]: Exports the localized AppsSection — Apps, Bottega Dock and Widgets in three cells, then the build, Dock and Widgets stories
 * [POS]: Third home section; it argues that what your Agent builds stays one click away on the Mac
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import type { SiteCatalog } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/locale";
import { D, Stroke } from "../icons";
import { Reveal } from "../reveal";
import { AppsStory } from "./apps-story";
import { DockFigure } from "./figures/dock-figure";
import { AppTile, DockIcon, LimitRing, Tile } from "./figures/dock-marks";
import { WidgetsFigure } from "./figures/widgets-figure";
import { CaseList, FigureCard, Story } from "./story";

/* 三格各配一枚它自己的记号，顺序与目录里的三格一一对应：一只 App、
   Dock 上的访达、一枚额度环。 */
const CELL_MARKS = [
  <AppTile id="expense-tracker" size={20} key="apps" />,
  <DockIcon id="finder" size={20} key="dock" />,
  <LimitRing size={22} value={87} key="widgets" />,
];

export function AppsSection({ demo, catalog, locale }: { demo: DemoData; catalog: SiteCatalog; locale: Locale }) {
  const copy = catalog.home.apps;
  const names = demo.copy.widgets;
  const readMore = catalog.common.readMore;
  const widgetCases = [
    { icon: <LimitRing size={18} value={64} />, name: names.limits, description: copy.widgets.cases[0] },
    {
      icon: (
        <Tile tone="graphite" size={18}>
          <Stroke d={D.sigma} size={11} width={2.4} />
        </Tile>
      ),
      name: names.usage,
      description: copy.widgets.cases[1],
    },
  ];

  return (
    <section className="home-section" id="apps">
      <Reveal>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="home-title">
          {copy.title[0]}
          <br />
          {copy.title[1]}
        </h2>
        <p className="home-lede">{copy.lede}</p>

        <div className="cell-grid cell-grid--3">
          {copy.cells.map((cell, at) => (
            <div className="cell" key={cell.title}>
              <div className="cell-head">
                {CELL_MARKS[at]}
                <span>{cell.title}</span>
              </div>
              <span className="cell-cmd">{cell.tag}</span>
              <p>{cell.body}</p>
            </div>
          ))}
        </div>

        <div className="stories">
          <AppsStory demo={demo} copy={copy.build} readMore={readMore} locale={locale} />
          <Story
            number="05"
            eyebrow={copy.dock.eyebrow}
            title={copy.dock.title}
            body={copy.dock.body}
            locale={locale}
            readMore={readMore}
            figure={
              <FigureCard position="50% 72%" fill>
                <DockFigure demo={demo} />
              </FigureCard>
            }
          >
            <ul className="checks">
              {copy.dock.points.map((point) => (
                <li key={point}>
                  <Stroke d={D.check} size={15} width={2.2} />
                  {point}
                </li>
              ))}
            </ul>
          </Story>
          <Story
            number="06"
            eyebrow={copy.widgets.eyebrow}
            title={copy.widgets.title}
            body={copy.widgets.body}
            locale={locale}
            readMore={readMore}
            figureFirst
            figure={
              <FigureCard position="70% 88%" fill>
                <WidgetsFigure demo={demo} />
              </FigureCard>
            }
          >
            <CaseList items={widgetCases} />
            <p className="story-aside">{copy.widgets.privacy}</p>
          </Story>
        </div>
      </Reveal>
    </section>
  );
}
