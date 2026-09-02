/**
 * [INPUT]: Uses localized DemoData plus shared product icons and Base chrome primitives
 * [OUTPUT]: Exports the localized LedgerSurface product demonstration
 * [POS]: Expense Tracker surface with ledger and analysis views backed by one data graph
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { DemoData } from "@/lib/agents";
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
function Pie({ slices }: { slices: DemoData["categoryShare"] }) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  let angle = -Math.PI / 2;
  return (
    <svg viewBox="0 0 80 80" style={{ height: "100%", flex: "none" }} aria-hidden="true">
      {slices.map((slice) => {
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

export function LedgerSurface({ demo }: { demo: DemoData }) {
  const { chrome } = demo.copy;
  return (
    <div className="ba">
      <BaseChrome
        tabs={[
          { icon: "table", name: chrome.ledger },
          { icon: "chartColumn", name: chrome.analysis },
        ]}
        active={0}
      />
      <div className="ba-body">
        <div className="tb">
          <div className="tb-head">
            <span className="tb-num" />
            <span className="tb-date">{chrome.date}</span>
            <span className="tb-amount">{chrome.amount}</span>
            <span className="tb-cat">{chrome.category}</span>
            <span className="tb-note">{chrome.note}</span>
            <span className="tb-plus">
              <Stroke d={D.plus} size={14} width={1.6} />
            </span>
          </div>
          <div className="tb-rows">
            {demo.ledgerLong.map((row, at) => (
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
              <span className="lbl">{chrome.sum}</span>
              <span className="mono">{demo.ledgerLongSum}</span>
            </span>
            <span className="tb-cat" />
            <span className="tb-note" />
          </div>
        </div>
      </div>

      <div className="tb-charts">
        <div className="ch-card">
          <div className="ch-head">{demo.copy.ledger.categoryShare}</div>
          <div className="ch-body">
            <Pie slices={demo.categoryShare} />
            <div className="ch-legend">
              {demo.categoryShare.map((slice) => (
                <span key={slice.label}>
                  <i style={{ background: slice.tone }} />
                  {slice.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="ch-card">
          <div className="ch-head">{demo.copy.ledger.dailySpend}</div>
          <div className="ch-body">
            <div className="ch-bars">
              {demo.dailySpend.map((height, at) => (
                <i key={at} style={{ height: `${Math.round(height * 100)}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
