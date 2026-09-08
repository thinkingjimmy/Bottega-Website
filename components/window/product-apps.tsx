/**
 * [INPUT]: Uses localized DemoData App identities, the shared APP_SURFACES lookup, and product icons
 * [OUTPUT]: Exports AppsGallery and AppStudioWindow
 * [POS]: The Hero window's App surface: the Apps page inside the main column, and the standalone Studio window that opens over the desktop
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { App, DemoData } from "@/lib/agents";
import { APP_SURFACES } from "../apps/surfaces";
import { D, Stroke } from "../icons";

/* ── Apps 页：产品的 AppsListView ─────────────────────────────────
 * 一张 gap-4 的卡片网格铺在 p-4 的滚动区里。产品的列数看视口：这台机器
 * 960 宽，落在 `sm` 而够不着 `lg`，于是两列——不是「四只排两行好看」，
 * 是同一条断点在同一个宽度上给出的同一个答案。
 * 卡片自己就是那颗按钮。产品里覆着一张铺满整卡的透明按钮，两种写法
 * 落到访客身上是同一件事：按下去，那只 App 开出来。
 * ────────────────────────────────────────────────────────── */
export function AppsGallery({
  apps,
  ready,
  covered,
  lead,
  onOpen,
}: {
  apps: App[];
  ready: string;
  /* 被那扇 App 窗口盖住了：看不见的按钮不该被 Tab 停一脚。 */
  covered: boolean;
  /* 那一拍还没落下。与 covered 分开写，是因为关掉窗口之后这一页重新露出来，
     但那一下按压不该跟着再演一遍——它演的是「机器自己动了一次手」，
     不是「这一页现在看得见」。 */
  lead: boolean;
  onOpen?: (app: App) => void;
}) {
  const card = (app: App) => (
    <div className="ac-head">
      {/* 名字与那句话住在左栏里，右上角那两枚不参与换行——产品的卡片
          就是这么分栏的。 */}
      <div className="ac-main">
        <div className="ac-id">
          <span className="ac-icon">{app.icon}</span>
          {/* 徽标只说状态，不说分类：卡片已经用图标、名字和一句话
              说清自己是什么了。 */}
          <span className="ac-badge">{ready}</span>
        </div>
        <div className="ac-name">{app.name}</div>
        <p className="ac-desc">{app.description}</p>
      </div>
      {/* 钉与「⋯」不接事件：产品里它们各自通向一条真的岔路，
          这台机器给不出那条岔路，就不该长出按得下去的样子。 */}
      <div className="ac-tools" aria-hidden="true">
        <span className="icon-slot">
          <Stroke d={D.pin} size={15} width={1.8} />
        </span>
        <span className="icon-slot">
          <Stroke d={D.moreHorizontal} size={15} width={1.8} />
        </span>
      </div>
    </div>
  );

  return (
    <div className="app-gallery" data-auto={lead ? "on" : undefined} inert={covered}>
      {apps.map((app) =>
        onOpen ? (
          <button type="button" className="app-card" key={app.id} onClick={() => onOpen(app)}>
            {card(app)}
          </button>
        ) : (
          <div className="app-card" key={app.id}>
            {card(app)}
          </div>
        )
      )}
    </div>
  );
}

/* ── 独立窗口：一只 App 自己的那扇窗 ──────────────────────────────
 * 产品里点开一只 App 得到的就是这个：页头一行（红绿灯、`icon + 全名`、
 * 「⋯」、正中两枚页签、右端那两颗第三栏开关），下面一条 44px 的入口行
 * 写着 index.html 与刷新，再下面才是 App 自己画的那一页。
 *
 * 它盖在主窗口上而不是长在主窗口里：两扇窗才说得出「App 是一件独立的
 * 东西」这句话。长在里面的那种读起来是一块面板，而面板是属于宿主的。
 *
 * 里面那一页按 1120×780 的自然尺寸落笔，整块缩到 --z——与 Apps 一节那四台
 * 同一套办法（见 styles/apps/stage.css）：裁掉的是内容，缩掉的只是观看距离。
 * ────────────────────────────────────────────────────────── */
export function AppStudioWindow({
  demo,
  app,
  onClose,
}: {
  demo: DemoData;
  app: App;
  onClose?: () => void;
}) {
  const Surface = APP_SURFACES[app.id];
  const chrome = demo.copy.chrome;
  /* 标题栏读 manifest 里的全名。Design Canvas 在 app.json 里叫
     Bottega Design Canvas，站点目录那条短名是给目录用的。 */
  const title = app.id === demo.designApp.id ? demo.designAppWindowTitle : app.name;

  return (
    <div className="app-studio" aria-hidden="true">
      <div className="as-shell">
        <div className="as-head">
          {/* 红的那颗真的关得掉——一扇窗就是这么关的，而访客要试的也正是
              这一颗。另外两颗不接事件：给按不动的东西悬停反馈，等于许一个
              兑现不了的诺。tabIndex 是 -1，因为整台机器对读屏是隐藏的，
              一颗能被 Tab 停住的按钮藏在里面比没有按钮更坏；键盘要用的那
              两颗芯片就在下面。 */}
          <div className="traffic">
            {onClose ? (
              <button type="button" className="as-close" tabIndex={-1} onClick={onClose} />
            ) : (
              <i style={{ background: "#FF5F57" }} />
            )}
            <i style={{ background: "#FEBC2E" }} />
            <i style={{ background: "#28C840" }} />
          </div>
          <span className="as-id">
            <span className="emoji">{app.icon}</span>
            <span className="as-title">{title}</span>
          </span>
          <span className="icon-slot">
            <Stroke d={D.moreHorizontal} size={16} width={1.8} />
          </span>
          {/* 页签在页头正中，与两侧 chrome 同高——产品把那条独占的 40px
              横带收进了页头，内容区因此白拿一整条。 */}
          <div className="as-tabs">
            <span className="on">{chrome.appTab}</span>
            <span>{chrome.dataTab}</span>
          </div>
          <div className="as-actions">
            <span className="icon-slot">
              <Stroke d={D.settings2} size={16} width={1.8} />
            </span>
            <span className="icon-slot">
              <Stroke d={D.message} size={16} width={1.8} />
            </span>
          </div>
        </div>

        <div className="as-bar">
          <span className="as-entry">index.html</span>
          <span className="icon-slot">
            <Stroke d={D.refreshCw} size={16} width={1.8} />
          </span>
        </div>

        <div className="as-body">
          <div className="as-canvas">
            <Surface demo={demo} />
          </div>
        </div>
      </div>
    </div>
  );
}
