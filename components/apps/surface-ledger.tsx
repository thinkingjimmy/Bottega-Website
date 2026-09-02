/**
 * [INPUT]: 依赖 @/lib/agents 的 LEDGER_LONG/LEDGER_LONG_SUM/CATEGORY_SHARE/DAILY_SPEND，
 *          依赖 ../icons 的 Stroke/D，依赖 ./surface-chrome 的 BaseChrome/Sk
 * [OUTPUT]: 对外提供 LedgerSurface
 * [POS]: Expense Tracker 那一台。表格几何逐项取自 bases/views/table：
 *        表头 36（h-9）粘顶、行 36、逐格 border-r、汇总条钉在底边；
 *        select 单元格在产品里是一颗无边框的 Select——文字靠左、雪佛龙靠右，
 *        不是一枚实心药丸（见 editors/cells/base-cell-editor.tsx）。
 *        右下那块是分析视图叠上来的第二块表面，全站唯一一处两屏同框，
 *        理由见 README
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { CATEGORY_SHARE, DAILY_SPEND, LEDGER_LONG, LEDGER_LONG_SUM } from "@/lib/agents";
import { D, Stroke } from "../icons";
import { BaseChrome, Sk } from "./surface-chrome";

/* 备注那一列的骨架宽度。是「这一行本来会有多长」的示意，不是随机数——
   十八条写死在这里而不是随手算，是因为随机数每次构建都会换一张脸。 */
const NOTE_W = [
  "62%", "38%", "48%", "30%", "56%", "44%", "34%", "52%", "40%",
  "58%", "36%", "46%", "42%", "50%", "33%", "60%", "45%", "39%",
];

/* ── 分类占比 ────────────────────────────────────────────────────
 * 角度按 CATEGORY_SHARE 真实求和算出来。画一个跟表里对不上的饼，
 * 这张图就成了装饰。
 * ────────────────────────────────────────────────────────── */
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

export function LedgerSurface() {
  return (
    <div className="ba">
      <BaseChrome
        tabs={[
          { icon: "table", name: "Ledger" },
          { icon: "chartColumn", name: "Analysis" },
        ]}
        active={0}
      />
      <div className="ba-body">
        <div className="tb">
          <div className="tb-head">
            <span className="tb-num" />
            <span className="tb-date">Date</span>
            <span className="tb-amount">Amount</span>
            <span className="tb-cat">Category</span>
            <span className="tb-note">Note</span>
            <span className="tb-plus">
              <Stroke d={D.plus} size={14} width={1.6} />
            </span>
          </div>
          <div className="tb-rows">
            {LEDGER_LONG.map((row, at) => (
              <div className="tb-row" key={row.date}>
                <span className="tb-num">{at + 1}</span>
                <span className="tb-date">{row.date}</span>
                <span className="tb-amount">{row.amount}</span>
                <span className="tb-cat">
                  {row.category}
                  <Stroke d={D.chevronDown} size={12} width={1.6} />
                </span>
                <span className="tb-note">
                  <Sk w={NOTE_W[at]} />
                </span>
                <span className="tb-plus" />
              </div>
            ))}
          </div>
          {/* columnAggregations: { amount: "sum" }——汇总条钉在底边，只有金额那一列有数。 */}
          <div className="tb-foot">
            <span className="tb-num" />
            <span className="tb-date" />
            <span className="tb-amount">
              <span className="lbl">Sum</span>
              <span className="mono">{LEDGER_LONG_SUM}</span>
            </span>
            <span className="tb-cat" />
            <span className="tb-note" />
          </div>
        </div>
      </div>

      <div className="tb-charts">
        <div className="ch-card">
          <div className="ch-head">Category share</div>
          <div className="ch-body">
            <Pie />
            <div className="ch-legend">
              {CATEGORY_SHARE.map((slice) => (
                <span key={slice.label}>
                  <i style={{ background: slice.tone }} />
                  {slice.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="ch-card">
          <div className="ch-head">Daily spend</div>
          <div className="ch-body">
            <div className="ch-bars">
              {DAILY_SPEND.map((height, at) => (
                <i key={at} style={{ height: `${Math.round(height * 100)}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
