/**
 * [INPUT]: 依赖 ./surface-chrome 的 DC/Sk
 * [OUTPUT]: 对外提供 CanvasSurface
 * [POS]: Design Canvas 那一台。四角常驻浮层围着一整片画布——几何逐项取自
 *        resources/apps/Bottega-app-design-canvas/gui/styles.css：
 *        同心圆角 12/8/6、控件 28（内 24）、字 12、图标 14 stroke 1.5。
 *        白板里那一页留骨架，不是为了省事：那是 Agent 写的 HTML，
 *        不可信内容本就不该被读，只该被认出「那是一页」
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { DC, Sk } from "./surface-chrome";

/** 锚点坞里那三条。编号锚点是这只 App 唯一不可替代的那件事。 */
const PINS = [
  { n: 1, sel: "section.hero > h1" },
  { n: 2, sel: ".pricing .card:nth-child(2)" },
  { n: 3, sel: "footer .newsletter", stale: true },
];

export function CanvasSurface() {
  return (
    <div className="dc">
      {/* 舞台里那块白板：Fit 之后是 16:10，下面露出的那截是纸面本身，
          不是把白板拉长——真值见 gui/styles.css 的 .stage / .viewport。 */}
      <div className="dc-stage">
        <div className="dc-viewport">
          <div className="dc-page">
            <div className="dc-page-bar">
              <Sk w={104} h={14} />
              <span style={{ flex: 1 }} />
              <Sk w={52} />
              <Sk w={52} />
              <Sk w={52} />
              <Sk w={76} h={26} />
            </div>
            <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, minWidth: 0 }}>
                <Sk w="74%" h={30} />
                <Sk w="52%" h={30} />
                <Sk w="88%" />
                <Sk w="70%" />
                <span style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  <Sk w={96} h={30} />
                  <Sk w={78} h={30} />
                </span>
              </div>
              <Sk w="34%" h={168} />
            </div>
            <div className="dc-page-cards">
              {["76%", "68%", "82%"].map((width) => (
                <div className="dc-page-card" key={width}>
                  <Sk w="100%" h={92} />
                  <Sk w={width} />
                  <Sk w="90%" />
                  <Sk w="58%" />
                </div>
              ))}
            </div>
            <div className="dc-page-foot">
              <Sk w={88} />
              <Sk w={64} />
              <Sk w={72} />
              <span style={{ flex: 1 }} />
              <Sk w={120} />
            </div>
          </div>
        </div>
      </div>

      {/* 左上：你在看哪一份画布、哪一个版本。文档栏撤销之后，这个落点必须常驻。 */}
      <div className="dc-float dc-doc">
        <span className="dc-sel w-file">
          <span>landing-hero.html</span>
          {DC.chevron}
        </span>
        <span className="dc-sep" />
        <span className="dc-sel w-ver">
          <span>Live</span>
          {DC.chevron}
        </span>
      </div>

      {/* 右上：三态视图组 + 三态选择模式。994 > 860，按真规则标签是露出来的。 */}
      <div className="dc-float dc-view">
        <span className="dc-group">
          <span className="dc-btn on">{DC.focus}<b>Focus</b></span>
          <span className="dc-btn">{DC.directions}<b>Directions</b></span>
          <span className="dc-btn">{DC.compare}<b>Compare</b></span>
        </span>
        <span className="dc-sep" />
        <span className="dc-group">
          <span className="dc-btn">{DC.browse}<b>Browse</b></span>
          <span className="dc-btn on">{DC.element}<b>Element</b></span>
          <span className="dc-btn">{DC.region}<b>Region</b></span>
        </span>
      </div>

      {/* 右下：视口与缩放，只在有画布可看时存在。 */}
      <div className="dc-float dc-port">
        <span className="dc-group">
          <span className="dc-btn on">{DC.desktop}<b>Desktop</b></span>
          <span className="dc-btn">{DC.tablet}<b>Tablet</b></span>
          <span className="dc-btn">{DC.mobile}<b>Mobile</b></span>
        </span>
        <span className="dc-sep" />
        <span className="dc-btn">{DC.minus}</span>
        <span className="dc-sel w-zoom">
          <span>Fit</span>
          {DC.chevron}
        </span>
        <span className="dc-btn">{DC.plus}</span>
      </div>

      {/* 左下：锚点坞。收起是一颗胶囊，展开向上长成面板——横铺整条底边
          会把「画布铺满」这个前提当场作废，所以它只能向上生长。 */}
      <div className="dc-float dc-pins">
        <div className="dc-pins-head">
          <span className="dc-pin-mark">{DC.pin}</span>
          <h4>Anchors</h4>
          <span className="dc-tally">3 selected</span>
          <span className="dc-collapse">{DC.chevron}</span>
        </div>
        <ol className="dc-pin-list">
          {PINS.map((pin) => (
            <li key={pin.n}>
              <span className="dc-badge">{pin.n}</span>
              <code>{pin.sel}</code>
              {pin.stale && <span className="dc-state">stale</span>}
            </li>
          ))}
        </ol>
        <div className="dc-pin-actions">
          <span className="dc-budget">3 / 32</span>
          <span className="dc-quiet">Clear</span>
          <span className="dc-primary">Add to chat</span>
        </div>
      </div>
    </div>
  );
}
