/**
 * [INPUT]: 依赖 ../icons 的 Stroke/D
 * [OUTPUT]: 对外提供 BaseChrome（Base App 的工具条与视图页签）、Sk（骨架条）、
 *           以及 Design Canvas 那套 20 网格图标 DC
 * [POS]: apps/ 这一层的公共零件。两只 Base App 共用同一套 chrome，
 *        因为产品里它们本就是同一个 BaseWorkbench 被两份 manifest 消费；
 *        Design Canvas 的图标另立一套，因为它的 GUI 本就画在另一张网格上
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { D, Stroke } from "../icons";

/* ── 骨架条 ────────────────────────────────────────────────────────
 * 在 1:1 的机器里画，被 .stage 统一缩到 0.58 之后正好是站点 .sk-bar 的那一档。
 * 宽度是「这一行本来会有多长」的示意，不是随机数。
 * ────────────────────────────────────────────────────────── */
export function Sk({ w, h = 10 }: { w: string | number; h?: number }) {
  return <span className="sk" style={{ width: w, height: h, borderRadius: 4 }} />;
}

/* ── Base App 的机身 ──────────────────────────────────────────────
 * 数逐项取自 bases/chrome/base-toolbar.tsx（h-10 / px-2 / gap-1）与
 * base-view-tabs.tsx（h-6 / rounded-md / pr-1 pl-2 / text-xs / size-3）。
 * 工具条高度由容器一口咬定 40px，不由内容决定——产品里这条规则是用一次
 * 「切视图时 tab 条自己往上跳 4px」的 bug 换来的。
 * ────────────────────────────────────────────────────────── */
export type BaseTab = { icon: keyof typeof D; name: string };

export function BaseChrome({ tabs, active }: { tabs: BaseTab[]; active: number }) {
  return (
    <div className="ba-toolbar">
      <div className="ba-tabs">
        {tabs.map((tab, at) => (
          <span className={`ba-tab${at === active ? " on" : ""}`} key={tab.name}>
            <Stroke d={D[tab.icon]} size={12} width={1.6} />
            {tab.name}
          </span>
        ))}
        <span className="ba-icon">
          <Stroke d={D.plus} size={14} width={1.6} />
        </span>
      </div>
      <div className="ba-actions">
        {(["funnel", "columns3", "sortAsc", "search", "moreHorizontal"] as const).map((name) => (
          <span className="ba-icon" key={name}>
            <Stroke d={D[name]} size={14} width={1.6} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Design Canvas 自己的图标 ──────────────────────────────────────
 * 逐字取自 resources/apps/Bottega-app-design-canvas/gui/index.html：
 * 20 网格、1.5px 线宽。三枚带 <rect>、一枚带 stroke-dasharray，
 * 都不是单条 path 能表达的，所以这一套不走 D 表——它本就是另一族。
 * ────────────────────────────────────────────────────────── */
function Tool({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const DC = {
  focus: <Tool><path d="M7.5 3H3v4.5M12.5 3H17v4.5M17 12.5V17h-4.5M7.5 17H3v-4.5" /></Tool>,
  directions: (
    <Tool>
      <rect x="3" y="3" width="5" height="5" rx="1" />
      <rect x="12" y="3" width="5" height="5" rx="1" />
      <rect x="3" y="12" width="5" height="5" rx="1" />
      <rect x="12" y="12" width="5" height="5" rx="1" />
    </Tool>
  ),
  compare: (
    <Tool>
      <rect x="2.5" y="4" width="6.5" height="12" rx="1.5" />
      <rect x="11" y="4" width="6.5" height="12" rx="1.5" />
    </Tool>
  ),
  browse: <Tool><path d="m4 2 10.8 8.2-5 .8-2.7 4.4L4 2Z" /></Tool>,
  element: (
    <Tool>
      <path d="M4 7V4h3M13 4h3v3M16 13v3h-3M7 16H4v-3" />
      <rect x="7" y="7" width="6" height="6" rx="1" />
    </Tool>
  ),
  region: <Tool><rect x="3" y="3" width="14" height="14" rx="2" strokeDasharray="2.4 2.4" /></Tool>,
  desktop: (
    <Tool>
      <rect x="2.5" y="3.5" width="15" height="10.5" rx="1.5" />
      <path d="M7 17h6M10 14v3" />
    </Tool>
  ),
  tablet: (
    <Tool>
      <rect x="4.5" y="2.5" width="11" height="15" rx="1.8" />
      <path d="M8.5 14.7h3" />
    </Tool>
  ),
  mobile: (
    <Tool>
      <rect x="6" y="2" width="8" height="16" rx="1.8" />
      <path d="M9 15.2h2" />
    </Tool>
  ),
  chevron: <Tool><path d="m5 8 5 5 5-5" /></Tool>,
  minus: <Tool><path d="M5 10h10" /></Tool>,
  plus: <Tool><path d="M5 10h10M10 5v10" /></Tool>,
  pin: (
    <Tool>
      <path d="M7.4 2.4h5.2l-.8 5.2 3.1 2.8H5.1l3.1-2.8z" />
      <path d="M10 10.4v7.2" />
    </Tool>
  ),
};
