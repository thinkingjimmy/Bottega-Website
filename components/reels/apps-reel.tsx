/**
 * [INPUT]: 依赖 @/lib/agents 的 APPS/LEDGER
 * [OUTPUT]: 对外提供 AppsReel 组件
 * [POS]: Apps 一节左侧那台会动的图。同一台窗口里轮播四只 App 的表面——
 *        画布、看板、账本、热力图。这一节要讲的是「App 是为这件事长出来的
 *        一张面孔」，四张长得都不一样，正是这句话唯一的证据；写四行文案
 *        说「它们各不相同」，不如把四张摆出来
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { APPS, LEDGER } from "@/lib/agents";

const VIEWPORTS = ["Desktop", "Tablet", "Mobile"];
const COLUMNS = [
  { label: "To do", cards: 2 },
  { label: "In review", cards: 3 },
  { label: "Done", cards: 2 },
];
/* 热力图那一格的深浅。数是编的，形状不是：Fitness Log 的图就是按周
   铺开的肌群格子，越练得多烧得越深。 */
const HEAT = [
  [0.15, 0.55, 0.2, 0.85, 0.35, 0.1],
  [0.7, 0.25, 0.95, 0.4, 0.6, 0.3],
  [0.2, 0.8, 0.45, 0.15, 0.9, 0.5],
  [0.5, 0.35, 0.65, 0.75, 0.2, 0.4],
];

export function AppsReel() {
  return (
    <div className="apps-reel" aria-hidden="true">
      <div className="apps-win">
        <div className="apps-bar">
          <i style={{ background: "#FF5F57" }} />
          <i style={{ background: "#FEBC2E" }} />
          <i style={{ background: "#28C840" }} />
        </div>
        <div className="apps-stage">
          <Slide app={0}>
            {/* Design Canvas：Agent 写的 HTML 摆成两幅画板，左边那幅正被看着 */}
            <div className="cv-tools">
              {VIEWPORTS.map((name, at) => (
                <span className={at === 0 ? "on" : ""} key={name}>
                  {name}
                </span>
              ))}
            </div>
            <div className="cv-boards">
              {[0, 1].map((board) => (
                <div className={`cv-board${board === 0 ? " on" : ""}`} key={board}>
                  <div className="cv-board-bar" />
                  <div className="cv-board-body">
                    <span className="sk sk-bar" style={{ width: "62%" }} />
                    <span className="sk sk-bar" style={{ width: "90%" }} />
                    <span className="sk sk-bar" style={{ width: "78%" }} />
                    <span className="sk sk-block" />
                  </div>
                </div>
              ))}
            </div>
          </Slide>

          <Slide app={1}>
            {/* Development Kanban：实现工作与评审发现，两类结构化记录 */}
            <div className="kb">
              {COLUMNS.map((column) => (
                <div className="kb-col" key={column.label}>
                  <p className="kb-label">{column.label}</p>
                  {Array.from({ length: column.cards }, (_, card) => (
                    <div className="kb-card" key={card}>
                      <span className="sk sk-bar" style={{ width: card % 2 ? "70%" : "88%" }} />
                      <span className="sk sk-bar" style={{ width: "46%" }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Slide>

          <Slide app={2}>
            {/* Expense Tracker：一句话进来，一行规整的记录出去 */}
            <div className="lg">
              {LEDGER.slice(0, 6).map((record) => (
                <div className="lg-row" key={record.date}>
                  <span className="mono lg-date">{record.date}</span>
                  <span className="mono lg-amount">{record.amount}</span>
                  <span className="lg-cat">{record.category}</span>
                </div>
              ))}
            </div>
          </Slide>

          <Slide app={3}>
            {/* Fitness Log：练了什么写下来，然后告诉你哪块一直在被跳过 */}
            <div className="ht">
              {HEAT.map((row, at) => (
                <div className="ht-row" key={at}>
                  {row.map((cell, index) => (
                    <i key={index} style={{ opacity: cell }} />
                  ))}
                </div>
              ))}
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
}

/* 四张幻灯共用同一条 keyframes，靠负 delay 各自错开一格——
   写四条各自的 keyframes，改一次节奏就要改四处。 */
function Slide({ app, children }: { app: number; children: React.ReactNode }) {
  const { icon, name } = APPS[app];
  return (
    <div className="apps-slide" style={{ animationDelay: `${-20 + app * 5}s` }}>
      <div className="apps-head">
        <span className="apps-icon">{icon}</span>
        <span>{name}</span>
      </div>
      <div className="apps-body">{children}</div>
    </div>
  );
}
