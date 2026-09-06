"use client";

/**
 * [INPUT]: Uses localized DemoData, the shared reel playback hooks, Base chart shapes, the receipt drawing, and product icons\n * [NOTE]: The map draws central Washington, DC — the product runs MapLibre/OSM, so a real city is the faithful basemap
 * [OUTPUT]: Exports BaseViewsFigure — one Base panel cycling through its six view types
 * [POS]: The Base feature page's second figure; the only animated surface outside the home narrative
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
import { BaseDonut, BaseSparkline } from "../base-charts";
import { D, Stroke } from "../icons";
import { usePlayWhenSeen } from "../reels/use-play-when-seen";
import { useCarousel } from "../reels/use-carousel";
import { Receipt } from "./base-receipt";

/* 六枚页签，与 bases/chrome/base-view-tabs.tsx 的 VIEW_TYPES 同序同标。 */
const VIEW_ICONS = [D.table, D.list, D.kanban, D.map, D.chartPie, D.images];

/* 视图配置条上那四颗，与首屏那一支同一组：筛选、字段、排序、更多。 */
const BAR_ACTIONS = [D.funnel, D.columns3, D.sortAsc, D.moreHorizontal] as const;

/* 备注列的宽度示意。写死是因为随机数每次构建都会换一张脸。 */
const NOTE_W = ["62%", "38%", "48%", "30%", "56%", "44%", "34%", "52%",
  "40%", "58%", "36%", "46%", "42%", "50%", "33%", "60%", "45%", "55%"];

type Row = DemoData["ledgerLong"][number];

export function BaseViewsFigure({ demo }: { demo: DemoData }) {
  /* 被看见了才开始换挡：一段在视口外空转的跑马灯，等人滚到这儿时早已
     停在随机的一格上——那等于把「第一眼说什么」交给了随机数。 */
  const { frame, play } = usePlayWhenSeen();
  const { active, pick } = useCarousel(VIEW_ICONS.length, play);

  const copy = demo.copy.baseVisual;
  const { chrome, ledger } = demo.copy;
  const rows = demo.ledgerLong;
  const tone = new Map(demo.categoryShare.map((slice) => [slice.label, slice.tone]));
  /* 泳道按 select 列的声明次序排——产品的 lane 次序就是选项目录的次序，
     按行首次出现排会让同一张表在两次渲染间换序。 */
  const lanes = ledger.categories.map((name) => ({
    name,
    tone: tone.get(name),
    items: rows.filter((row) => row.category === name),
  }));

  const panes = [
    <TableView key="table" rows={rows} chrome={chrome} sum={demo.ledgerLongSum} />,
    <ListView key="list" rows={rows.slice(0, 8)} tone={tone} />,
    <KanbanView key="kanban" lanes={lanes} />,
    <MapView key="map" ledger={ledger} category={chrome.category} />,
    <ChartView key="chart" demo={demo} />,
    <GalleryView key="gallery" rows={rows.slice(0, 12)} />,
  ];

  return (
    <figure className="bfd-figure">
      <div className="bfd-visual bfd-views" ref={frame}>
        <div className="bfd-bar">
          {/* 页签是真开关：点得动，点了就停在那一格。给一个按不动的东西
              悬停反馈，等于许一个兑现不了的诺。 */}
          <div className="bfd-tabs" role="tablist" aria-label={copy.viewsLabel}>
            {VIEW_ICONS.map((icon, at) => (
              <button
                aria-controls={`bfd-view-panel-${at}`}
                aria-selected={at === active}
                className="bfd-tab"
                id={`bfd-view-tab-${at}`}
                key={copy.viewNames[at]}
                onClick={() => pick(at)}
                role="tab"
                type="button"
              >
                <Stroke d={icon} size={13} width={1.8} />
                {copy.viewNames[at]}
              </button>
            ))}
            <span className="bfd-bar-icon">
              <Stroke d={D.plus} size={14} width={1.8} />
            </span>
          </div>
          <div className="bfd-bar-actions" aria-hidden="true">
            {BAR_ACTIONS.map((icon) => (
              <span className="bfd-bar-icon" key={icon}>
                <Stroke d={icon} size={14} width={1.8} />
              </span>
            ))}
          </div>
        </div>

        <div className="bfd-stage">
          {panes.map((pane, at) => (
            <div
              aria-labelledby={`bfd-view-tab-${at}`}
              className="bfd-pane"
              hidden={at !== active}
              id={`bfd-view-panel-${at}`}
              key={copy.viewNames[at]}
              role="tabpanel"
              tabIndex={-1}
            >
              {pane}
            </div>
          ))}
        </div>
      </div>
      <figcaption>{copy.viewsCaption}</figcaption>
    </figure>
  );
}

/* ── 表格：表头 34 粘顶、行 34、逐格右分隔、汇总条钉底 ────────────── */
function TableView({
  rows,
  chrome,
  sum,
}: {
  rows: readonly Row[];
  chrome: DemoData["copy"]["chrome"];
  sum: string;
}) {
  return (
    <div className="bv-table">
      <div className="bv-rows">
        <div className="bv-tr bv-th">
          <span className="t-num" />
          <span className="t-date">{chrome.date}</span>
          <span className="t-amt">{chrome.amount}</span>
          <span className="t-cat">{chrome.category}</span>
          <span className="t-note">{chrome.note}</span>
          <span className="t-add"><Stroke d={D.plus} size={14} width={1.8} /></span>
        </div>
        {rows.map((row, at) => (
          <div className="bv-tr" key={row.date}>
            <span className="t-num">{at + 1}</span>
            <span className="t-date">{row.date}</span>
            <span className="t-amt">{row.amount}</span>
            <span className="t-cat">
              {row.category}
              <Stroke d={D.chevronDown} size={12} width={1.8} />
            </span>
            <span className="t-note"><i className="sk" style={{ width: NOTE_W[at] }} /></span>
            <span className="t-add" />
          </div>
        ))}
      </div>
      <div className="bv-tr bv-foot">
        <span className="t-num" />
        <span className="t-date" />
        <span className="t-amt"><i>{chrome.sum}</i>{sum}</span>
      </div>
    </div>
  );
}

/* ── 列表：标题、状态点、尾部属性 ────────────────────────────────
 * 行位投影照 views/list/list-properties.tsx：**首列即标题**，故这本账的
 * 行标题是日期而不是备注——把备注挪上去好看一点，画出来的就是另一台机器。
 * 分类只作一枚色点（ListSelectDot），金额与备注落在尾部属性上。
 * ────────────────────────────────────────────────────────── */
function ListView({ rows, tone }: { rows: readonly Row[]; tone: Map<string, string> }) {
  return (
    <div className="bv-list">
      {rows.map((row) => (
        <div className="bv-li" key={row.date}>
          <span className="bv-dot" style={{ background: tone.get(row.category) }} />
          <span className="bv-li-title">{row.date}</span>
          <span className="bv-chips">
            <span className="bv-chip">{row.amount}</span>
            <span className="bv-chip">{row.note}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── 看板：泳道即 select 选项，卡面照 views/kanban/kanban-fields.ts ── */
function KanbanView({
  lanes,
}: {
  lanes: { name: string; tone?: string; items: readonly Row[] }[];
}) {
  return (
    <div className="bv-kanban">
      {lanes.map((lane) => (
        <div className="bv-lane" key={lane.name}>
          <p className="bv-lane-head">
            <span className="bv-dot" style={{ background: lane.tone }} />
            {lane.name}
            <i>{lane.items.length}</i>
          </p>
          {lane.items.map((row) => (
            <div className="bv-card" key={row.date}>
              <b>{row.date}</b>
              <span className="bv-chips">
                <span className="bv-chip">{row.amount}</span>
              </span>
              <span className="bv-card-note">{row.note}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── 地图：视图配置条 + 一幅华盛顿特区 ────────────────────────────
 * 底图画的是真地方：波托马克河自西北来、阿纳科斯蒂亚河自东北来，两条河在
 * 西南角汇合；国家广场是那条东西向的绿带，西端林肯纪念堂、东端国会山，
 * 潮汐湖挂在广场西南；对角线大道与几个圆环是这座城市的签名。
 *
 * 从前这里画的是一张抽象方格，理由是「真机跑的是瓦片，仿一张假街道图
 * 就是替产品许一个它没许的诺」。那句话说反了一半：产品跑的是 MapLibre/OSM
 * （见 bases/views/base-map-view.tsx），它本来就会画出一座真城市——画一张
 * 谁也不是的方格，才是那个不实的承诺。
 *
 * 落点画进 svg 里而不是拿百分比定位在外面：底图用 slice 铺满会裁边，
 * 外面按百分比摆的图钉会跟地物脱开——一枚落在河心的图钉，比一张糙一点的
 * 底图更假。
 * ────────────────────────────────────────────────────────── */

/* 七处落点，全在陆上：乔治城、杜邦圆环、白宫一带、联合车站、国会山、
   海军船坞、西南滨水。坐标就是底图那 858×382 的坐标系。 */
const DC_PINS: [number, number][] = [
  [178, 128], [304, 66], [472, 126], [664, 122], [706, 206], [668, 300], [470, 322],
];

function DistrictPlate() {
  const land = "color-mix(in srgb, var(--app-muted-fg) 7%, transparent)";
  const water = "color-mix(in srgb, #3b82f6 24%, transparent)";
  const park = "color-mix(in srgb, #4e9430 22%, transparent)";
  const street = "color-mix(in srgb, var(--app-muted-fg) 28%, transparent)";
  const avenue = "color-mix(in srgb, var(--app-muted-fg) 42%, transparent)";
  return (
    <svg
      className="bv-plate"
      viewBox="0 0 858 382"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="858" height="382" fill={land} />

      {/* 画序即图层序：街网最底，公园压住街网，水压住公园（河岸吃掉伸到
          岸边的绿地，潮汐湖吃掉自己那圈公园的内半），落点最上。真地图
          不会把街画过水面，而这个次序让「不画」自己发生，不必逐条裁。 */}
      <g stroke={street} strokeWidth="1" fill="none">
        <path d="M104 0V382M160 0V382M216 0V382M272 0V382M328 0V382M384 0V382M440 0V382M496 0V382M552 0V382M608 0V382M664 0V382M720 0V382M776 0V382M832 0V382" />
        <path d="M0 42H858M0 88H858M0 134H858M0 170H858M0 256H858M0 300H858M0 344H858" />
      </g>

      {/* 放射状大道与圆环：这座城市最认得出来的一笔。宾夕法尼亚大道从
          国会山斜上白宫，其余几条各自出城。 */}
      <g stroke={avenue} strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M652 212 L474 168" />
        <path d="M474 168 L332 96 L262 30" />
        <path d="M478 162 L706 58" />
        <path d="M120 316 L840 62" />
        <path d="M646 232 L436 330" />
      </g>
      <g stroke={avenue} strokeWidth="1.8" fill="none">
        <circle cx="304" cy="66" r="9" />
        <circle cx="404" cy="92" r="7" />
        <circle cx="238" cy="126" r="7" />
      </g>

      <g fill={park}>
        {/* 国家广场：西端林肯纪念堂，东端国会山，中间那截是方尖碑草地。 */}
        <rect x="300" y="194" width="352" height="38" />
        <rect x="282" y="186" width="30" height="54" rx="5" />
        <rect x="640" y="188" width="44" height="50" rx="6" />
        {/* 白宫南草坪与椭圆草坪 */}
        <rect x="452" y="160" width="46" height="30" rx="5" />
        {/* 潮汐湖那一圈公园，内半马上被水盖掉，留下的正是岸上那一环 */}
        <circle cx="352" cy="286" r="56" />
        {/* 东波托马克公园：水道与河之间那条地 */}
        <path d="M398 306 C 452 330, 500 348, 546 360 L 528 372 C 470 356, 424 336, 386 316 Z" />
      </g>

      {/* 两条河与那道水道。宽笔画代替多边形：河岸的精度不是这张图要许的诺。 */}
      <g fill="none" stroke={water} strokeLinecap="round">
        <path
          d="M96 -12 C 126 70, 116 132, 156 188 C 186 228, 196 264, 240 298 C 296 332, 380 346, 460 354 L 880 376"
          strokeWidth="48"
        />
        <path d="M880 92 C 800 128, 728 190, 666 250 C 630 288, 600 320, 566 348" strokeWidth="30" />
        <path d="M392 300 C 442 322, 492 340, 542 354" strokeWidth="15" />
      </g>
      <ellipse cx="352" cy="286" rx="47" ry="35" fill={water} />

      {DC_PINS.map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x - 11} ${y - 21}) scale(0.92)`}>
          <path
            d={D.mapPin}
            fill="color-mix(in srgb, #c94f2f 20%, transparent)"
            stroke="#c94f2f"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  );
}

function MapView({
  ledger,
  category,
}: {
  ledger: DemoData["copy"]["ledger"];
  category: string;
}) {
  return (
    <div className="bv-map-pane">
      <div className="bv-cfg">
        <span>
          {ledger.location}
          <b>{ledger.where}<Stroke d={D.chevronDown} size={11} width={1.8} /></b>
        </span>
        <span>
          {ledger.label}
          <b>{category}<Stroke d={D.chevronDown} size={11} width={1.8} /></b>
        </span>
      </div>
      <div className="bv-map">
        <DistrictPlate />
      </div>
    </div>
  );
}

/* ── 图表：三张卡 ────────────────────────────────────────────────
 * base-ops 举的月度 dashboard 例子是「一张 pie + 一张 line」，第三张补一组
 * 横条：环说的是「哪一类占得多」，折线说的是「哪几天花得多」，横条说的是
 * 「最大的几笔是什么」——三个问题，三种笔，没有一张在复述另一张。
 * 栅格照产品的 4 列 colSpan：环 2、折线 2、横条 4。
 * ────────────────────────────────────────────────────────── */
const amountOf = (value: string) => Number(value.replace(/,/g, ""));

function ChartView({ demo }: { demo: DemoData }) {
  const { ledger } = demo.copy;
  /* 前五笔按金额真实排序，条长按最大那笔归一——排出来跟表里对不上的榜，
     这张卡就成了装饰。 */
  const top = [...demo.ledgerLong]
    .sort((left, right) => amountOf(right.amount) - amountOf(left.amount))
    .slice(0, 5);
  const peak = amountOf(top[0].amount);
  const tone = new Map(demo.categoryShare.map((slice) => [slice.label, slice.tone]));
  return (
    <div className="bv-charts">
      <div className="bv-ch bv-ch--half">
        <div className="bv-ch-head">{ledger.categoryShare}</div>
        <div className="bv-ch-body">
          <BaseDonut slices={demo.categoryShare} />
          <div className="bv-legend">
            {demo.categoryShare.map((slice) => (
              <span key={slice.label}>
                <i style={{ background: slice.tone }} />
                {slice.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="bv-ch bv-ch--half">
        <div className="bv-ch-head">{ledger.dailySpend}</div>
        <div className="bv-ch-body bv-ch-body--plot">
          <BaseSparkline points={demo.dailySpend} />
        </div>
      </div>
      <div className="bv-ch bv-ch--wide">
        <div className="bv-ch-head">{ledger.topExpenses}</div>
        <div className="bv-ch-body bv-ch-body--bars">
          {top.map((row) => (
            <div className="bv-bar-row" key={row.date}>
              <span className="bv-bar-label">{row.note}</span>
              <span className="bv-bar-track">
                <i
                  style={{
                    width: `${Math.round((amountOf(row.amount) / peak) * 100)}%`,
                    background: tone.get(row.category),
                  }}
                />
              </span>
              <span className="bv-bar-value">{row.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 画廊：附件列变成封面，标题即行标题，金额作图注 ────────────────── */
function GalleryView({ rows }: { rows: readonly Row[] }) {
  return (
    <div className="bv-gallery">
      {rows.map((row) => (
        <figure className="bv-tile" key={row.date}>
          <div className="bv-tile-cover"><Receipt size={64} /></div>
          <figcaption>
            <b>{row.date}</b>
            <span>{row.amount}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
