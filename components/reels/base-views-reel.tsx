"use client";

/**
 * [INPUT]: 依赖 ../icons 的 Stroke/D/glyph，
 *          依赖 @/lib/agents 的 BASE_VIEWS/LEDGER_LONG/LEDGER_LONG_SUM/CATEGORY_SHARE/
 *          DAILY_SPEND/BASE_PINS
 * [OUTPUT]: 对外提供 BaseViewsReel 组件
 * [POS]: A Base under every chat 一节左侧那台会动的机器。同一份行，四种
 *        看法轮着上：明细、分类占比、票据相册、落点地图。这一节的卖点是
 *        统计汇总，而「同一份数据换个视图就换一种答案」这句话，只有把四种
 *        摆出来才说得清——写四行文案说「支持多种视图」，不如让它自己切四次。
 *        镜头一动不动：镜头一动，观众就去看镜头，不看那句话。
 *        哪一格露脸不归它自己管——由 base-section 那份换挡杆决定，它只画形状
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import {
  BASE_PINS,
  BASE_VIEWS,
  CATEGORY_SHARE,
  DAILY_SPEND,
  LEDGER_LONG,
  LEDGER_LONG_SUM,
} from "@/lib/agents";
import { D, Stroke, glyph } from "../icons";

/* 十四行。画框现在跟着文栏长高，行数得跟上——留一片空白比留一行残行
   更像「没加载完」。汇总条 margin-top: auto 钉在底边，多几行不会把它挤走。 */
const ROWS = LEDGER_LONG.slice(0, 16);
/* 三轮往返。宽度是「这一句本来会有多长」的示意，不是随机数——
   随机数每次构建都会换一张脸。 */
const CHAT = [
  { ask: "76%", askLines: ["100%", "54%"], reply: ["94%", "86%", "58%"] },
  { ask: "56%", askLines: ["100%"], reply: ["90%", "72%"] },
  { ask: "84%", askLines: ["100%", "68%"], reply: ["92%", "80%", "62%"] },
];

const NOTE_W = ["62%", "38%", "48%", "30%", "56%", "44%", "34%", "52%",
  "40%", "58%", "36%", "46%", "42%", "50%", "33%", "60%"];

/* 分类占比。角度按 CATEGORY_SHARE 真实求和算出来——画一个跟表里对不上的
   饼，这张图就成了装饰。 */
function Pie() {
  const total = CATEGORY_SHARE.reduce((sum, slice) => sum + slice.value, 0);
  let angle = -Math.PI / 2;
  return (
    <svg viewBox="0 0 80 80" style={{ height: "100%", flex: "none" }} aria-hidden="true">
      {CATEGORY_SHARE.map((slice) => {
        const sweep = (slice.value / total) * Math.PI * 2;
        const x1 = 40 + 38 * Math.cos(angle);
        const y1 = 40 + 38 * Math.sin(angle);
        angle += sweep;
        const x2 = 40 + 38 * Math.cos(angle);
        const y2 = 40 + 38 * Math.sin(angle);
        return (
          <path
            key={slice.label}
            d={`M40 40 L${x1.toFixed(1)} ${y1.toFixed(1)} A38 38 0 ${sweep > Math.PI ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`}
            fill={slice.tone}
          />
        );
      })}
      <circle cx="40" cy="40" r="19" fill="var(--app-bg)" />
    </svg>
  );
}

export function BaseViewsReel({
  active,
  frame,
}: {
  active: number;
  frame: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="reel" ref={frame} data-active={active} aria-hidden="true">
      <div className="vw-cam">
        <div className="vw">
        <div className="vw-chat">
          <div className="vw-chat-head">
            <i className="vw-sk" style={{ width: 14, height: 14, borderRadius: 4 }} />
            <i className="vw-sk" style={{ width: 96 }} />
          </div>
          <div className="vw-chat-body">
            {CHAT.map((turn) => (
              <div className="vw-turn" key={turn.ask}>
                <div className="vw-ask" style={{ width: turn.ask }}>
                  {turn.askLines.map((width) => (
                    <i className="vw-sk" key={width} style={{ width }} />
                  ))}
                </div>
                <div className="vw-reply">
                  {turn.reply.map((width) => (
                    <i className="vw-sk" key={width} style={{ width }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* 输入框画实：骨架能说「这里有过对话」，说不了「你还能接着说」。 */}
          <div className="vw-chat-foot">
            <div className="vw-composer">
              <i className="vw-sk" style={{ width: 104 }} />
              <span className="vw-send">
                <Stroke d={D.arrowRight} size={13} width={2.2} />
              </span>
            </div>
          </div>
        </div>

        <div className="vw-work">
          <div className="vw-bar">
            <div className="vw-tabs">
              {BASE_VIEWS.map((view) => (
                <span className="vw-tab" key={view.name}>
                  <i />
                  <Stroke d={glyph(view.icon)} size={12} width={1.8} />
                  {view.tab}
                </span>
              ))}
              <span className="vw-icon">
                <Stroke d={D.plus} size={14} width={1.8} />
              </span>
            </div>
            <div className="vw-act">
              {(["funnel", "columns3", "sortAsc", "moreHorizontal"] as const).map((name) => (
                <span className="vw-icon" key={name}>
                  <Stroke d={D[name]} size={14} width={1.8} />
                </span>
              ))}
            </div>
          </div>

          <div className="vw-stage">
            {/* 明细：汇总条钉在底边——一句话进来，一个总数出去。 */}
            <div className="vw-pane">
              <div className="vw-head">
                <span className="k-num" />
                <span className="k-date">Date</span>
                <span className="k-amt">Amount</span>
                <span className="k-cat">Category</span>
                <span className="k-note">Note</span>
                <span className="k-plus">
                  <Stroke d={D.plus} size={14} width={1.8} />
                </span>
              </div>
              {ROWS.map((row, at) => (
                <div className="vw-row" key={row.date}>
                  <span className="k-num">{at + 1}</span>
                  <span className="k-date">{row.date}</span>
                  <span className="k-amt">{row.amount}</span>
                  <span className="k-cat">
                    {row.category}
                    <Stroke d={D.chevronDown} size={12} width={1.8} />
                  </span>
                  <span className="k-note">
                    <i className="vw-sk" style={{ width: NOTE_W[at] }} />
                  </span>
                  <span className="k-plus" />
                </div>
              ))}
              <div className="vw-foot">
                <span className="k-num" />
                <span className="k-date" />
                <span className="k-amt">
                  <span className="lbl">Sum</span>
                  {LEDGER_LONG_SUM}
                </span>
              </div>
            </div>

            {/* 分类占比：栅格 auto-rows-180 gap-3 p-3，卡片 rounded-xl + border。 */}
            <div className="vw-pane">
              <div className="vw-charts">
                <div className="ch">
                  <div className="ch-h">Category share</div>
                  <div className="ch-b">
                    <Pie />
                    <div className="ch-lg">
                      {CATEGORY_SHARE.map((slice) => (
                        <span key={slice.label}>
                          <i style={{ background: slice.tone }} />
                          {slice.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="ch">
                  <div className="ch-h">Daily spend</div>
                  <div className="ch-b">
                    <div className="ch-bars">
                      {DAILY_SPEND.map((height, at) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <i key={at} style={{ height: `${Math.round(height * 100)}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 票据：附件列变成缩略图，金额即图注。 */}
            <div className="vw-pane">
              <div className="vw-gal">
                {ROWS.map((row) => (
                  <div className="gl" key={row.date}>
                    <div className="gl-t" />
                    <span className="gl-c">{row.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 落点：位置列变成图钉。底图画得克制——真机跑的是瓦片，
                仿一张假的街道图，就是替产品许一个它没许的诺。 */}
            <div className="vw-pane">
              <div className="vw-cfg">
                <span>
                  Location
                  <b>
                    Where
                    <Stroke d={D.chevronDown} size={11} width={1.8} />
                  </b>
                </span>
                <span>
                  Label
                  <b>
                    Category
                    <Stroke d={D.chevronDown} size={11} width={1.8} />
                  </b>
                </span>
              </div>
              <div className="vw-map">
                <svg className="plate" viewBox="0 0 725 374" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M0 250 C 150 214, 260 296, 420 258 S 640 200, 725 226 L725 374 L0 374 Z"
                    fill="color-mix(in srgb, #3b82f6 12%, transparent)"
                  />
                  <g stroke="color-mix(in srgb, var(--app-muted-fg) 24%, transparent)" strokeWidth="2" fill="none">
                    <path d="M90 0 V374 M300 0 V374 M520 0 V374 M0 120 H725 M0 196 H725" />
                  </g>
                  <g stroke="color-mix(in srgb, var(--app-muted-fg) 14%, transparent)" strokeWidth="1" fill="none">
                    <path d="M180 0 V374 M400 0 V374 M620 0 V374 M0 60 H725 M0 160 H725 M0 310 H725" />
                  </g>
                </svg>
                {BASE_PINS.map(([x, y]) => (
                  <span className="pin" key={`${x}-${y}`} style={{ left: `${x}%`, top: `${y}%` }}>
                    <Stroke d={D.mapPin} size={20} width={1.8} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
