/**
 * [INPUT]: Uses localized Design Canvas copy and shared surface chrome primitives
 * [OUTPUT]: Exports the localized CanvasSurface product demonstration
 * [POS]: Design Canvas surface with stable product geometry and translated controls
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { DC, Sk } from "./surface-chrome";
import type { DemoData } from "@/lib/agents";

/** 锚点坞里那三条。编号锚点是这只 App 唯一不可替代的那件事。 */
const PINS = [
  { n: 1, sel: "section.hero > h1" },
  { n: 2, sel: ".pricing .card:nth-child(2)" },
  { n: 3, sel: "footer .newsletter", stale: true },
];

export function CanvasSurface({ demo }: { demo: DemoData }) {
  const copy = demo.copy.canvas;
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
          <span>{copy.live}</span>
          {DC.chevron}
        </span>
      </div>

      {/* 右上：三态视图组 + 三态选择模式。994 > 860，按真规则标签是露出来的。 */}
      <div className="dc-float dc-view">
        <span className="dc-group">
          <span className="dc-btn on">{DC.focus}<b>{copy.focus}</b></span>
          <span className="dc-btn">{DC.directions}<b>{copy.directions}</b></span>
          <span className="dc-btn">{DC.compare}<b>{copy.compare}</b></span>
        </span>
        <span className="dc-sep" />
        <span className="dc-group">
          <span className="dc-btn">{DC.browse}<b>{copy.browse}</b></span>
          <span className="dc-btn on">{DC.element}<b>{copy.element}</b></span>
          <span className="dc-btn">{DC.region}<b>{copy.region}</b></span>
        </span>
      </div>

      {/* 右下：视口与缩放，只在有画布可看时存在。 */}
      <div className="dc-float dc-port">
        <span className="dc-group">
          <span className="dc-btn on">{DC.desktop}<b>{copy.desktop}</b></span>
          <span className="dc-btn">{DC.tablet}<b>{copy.tablet}</b></span>
          <span className="dc-btn">{DC.mobile}<b>{copy.mobile}</b></span>
        </span>
        <span className="dc-sep" />
        <span className="dc-btn">{DC.minus}</span>
        <span className="dc-sel w-zoom">
          <span>{copy.fit}</span>
          {DC.chevron}
        </span>
        <span className="dc-btn">{DC.plus}</span>
      </div>

      {/* 左下：锚点坞。收起是一颗胶囊，展开向上长成面板——横铺整条底边
          会把「画布铺满」这个前提当场作废，所以它只能向上生长。 */}
      <div className="dc-float dc-pins">
        <div className="dc-pins-head">
          <span className="dc-pin-mark">{DC.pin}</span>
          <h4>{copy.anchors}</h4>
          <span className="dc-tally">{copy.selectedCount.replace("{count}", "3")}</span>
          <span className="dc-collapse">{DC.chevron}</span>
        </div>
        <ol className="dc-pin-list">
          {PINS.map((pin) => (
            <li key={pin.n}>
              <span className="dc-badge">{pin.n}</span>
              <code>{pin.sel}</code>
              {pin.stale && <span className="dc-state">{copy.stale}</span>}
            </li>
          ))}
        </ol>
        <div className="dc-pin-actions">
          <span className="dc-budget">3 / 32</span>
          <span className="dc-quiet">{copy.clear}</span>
          <span className="dc-primary">{copy.addToChat}</span>
        </div>
      </div>
    </div>
  );
}
