/**
 * [INPUT]: 依赖 @/lib/agents 的 AGENTS/LEDGER/LEDGER_SUM，依赖 ./icons 的 Stroke/Glyph/D
 * [OUTPUT]: 对外提供 ProductWindow 组件
 * [POS]: Bottega-Website 首屏里那台机器。几何逐项抄自
 *        apps/desktop/src/components/sidebar 与 components/bases/views/table，
 *        不是眼量的近似——差 2px 就不像同一个产品
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { AGENTS, LEDGER, LEDGER_SUM } from "@/lib/agents";
import { D, Glyph, Stroke } from "./icons";

const PROJECTS = ["Bottega Site", "Household ledger"];
const APPS = [
  { name: "Expense Tracker", icon: D.table },
  { name: "Dev Kanban", icon: D.columns },
];

export function ProductWindow({
  chatIndex,
  surface,
  onPickChat,
}: {
  chatIndex: number;
  surface: "chat" | "app";
  onPickChat: (index: number) => void;
}) {
  const active = AGENTS[chatIndex] ?? AGENTS[0];
  const isApp = surface === "app";

  return (
    <div className="window rise">
      <aside className="win-sidebar">
        <div className="traffic">
          <i style={{ background: "#FF5F57" }} />
          <i style={{ background: "#FEBC2E" }} />
          <i style={{ background: "#28C840" }} />
        </div>

        <div className="row" style={{ margin: "0 6px 6px", width: "auto" }}>
          <span className="mark">
            <Stroke d={D.plus} size={14} />
          </span>
          <span style={{ color: "var(--app-muted-fg)" }}>New chat</span>
          <span className="mono" style={{ marginLeft: "auto", fontSize: 11, color: "var(--app-muted-fg)" }}>
            ⌘N
          </span>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflow: "hidden", padding: "0 6px 6px" }}>
          <p className="group-label">Projects</p>
          {PROJECTS.map((name) => (
            <div className="row" key={name}>
              <span className="mark">
                <Stroke d={D.folder} size={14} width={1.9} />
              </span>
              <span className="title">{name}</span>
            </div>
          ))}

          <p className="group-label">Apps</p>
          {APPS.map((app) => (
            <div className={`row${isApp && app.name === "Expense Tracker" ? " on" : ""}`} key={app.name}>
              <span className="mark">
                <Stroke d={app.icon} size={14} width={1.9} />
              </span>
              <span className="title">{app.name}</span>
            </div>
          ))}

          {/* 行首那枚痕迹就是 agent 的 logo——「谁在干这活」在产品里
              从来不用问，看一眼行首就知道。这块屏最要紧的就是这件事。 */}
          <p className="group-label">Chats</p>
          {AGENTS.map((chat, i) => {
            const on = i === chatIndex && !isApp;
            return (
              <button
                type="button"
                key={chat.title}
                className={`row${on ? " on" : ""}`}
                onClick={() => onPickChat(i)}
                aria-pressed={on}
              >
                <span className="mark">
                  <Glyph d={chat.iconPath} />
                </span>
                <span className="title">{chat.title}</span>
                {on ? <span className="dot" /> : null}
              </button>
            );
          })}
        </div>

        <div
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 44,
            padding: "0 14px",
            borderTop: "1px solid var(--app-border)",
            fontSize: 13,
            color: "var(--app-muted-fg)",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 22,
              height: 22,
              borderRadius: 9999,
              background: "var(--app-accent)",
              fontSize: 10.5,
              color: "var(--app-fg)",
            }}
          >
            JW
          </span>
          <span>Settings</span>
        </div>
      </aside>

      <div className="win-main">
        <div className="win-head">
          <span
            style={{
              fontSize: 13.5,
              fontWeight: 500,
              minWidth: 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {isApp ? "Expense Tracker" : active.title}
          </span>
          <span className="pill" style={{ marginLeft: "auto" }}>
            <Glyph d={active.iconPath} size={13} />
            <span>{active.agent}</span>
          </span>
          <span className="pill mono" style={{ fontSize: 11.5 }}>
            {isApp ? `Base · ${LEDGER.length} records` : active.model}
          </span>
        </div>

        {isApp ? <AppSurface /> : <ChatSurface index={chatIndex} />}
      </div>
    </div>
  );
}

function ChatSurface({ index }: { index: number }) {
  const active = AGENTS[index] ?? AGENTS[0];
  return (
    <>
      <div className="chat">
        <div className="bubble">{active.ask}</div>
        {active.trace.map((t) => (
          <div className="trace" key={t.label}>
            <span className="mark" style={{ marginTop: 1 }}>
              <Stroke d={t.icon} size={13} />
            </span>
            <span>{t.label}</span>
          </div>
        ))}
        <p style={{ fontSize: 13.5, lineHeight: 1.62 }}>{active.reply}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "var(--app-muted-fg)" }}>
          <span className="dot pulse" />
          <span>
            {active.running}
            <span className="caret" />
          </span>
        </div>
      </div>

      <div className="composer">
        <span className="mark" style={{ width: 30, height: 30 }}>
          <Stroke d={D.plus} />
        </span>
        <span className="field">Ask {active.agent} for anything…</span>
        {/* Plan 这颗按钮的有无就是「诚实降级」那条规矩本身：
            OpenCode 没有 plan 通道，所以这里不是置灰，是压根不画。 */}
        {active.hasPlan ? (
          <span className="ghost">
            <Stroke d={D.bulb} size={14} />
            <span>Plan</span>
          </span>
        ) : null}
        <span className="send">
          <Stroke d={D.arrowUp} size={15} width={2.2} />
        </span>
      </div>
    </>
  );
}

function AppSurface() {
  return (
    <>
      <div className="tabs">
        <span className="on">Ledger</span>
        <span>Analysis</span>
        <span>By month</span>
      </div>
      <div className="grid-row head">
        <span className="c-date">Date</span>
        <span className="c-amount">Amount</span>
        <span className="c-cat">Category</span>
        <span className="c-note">Note</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        {LEDGER.map((r) => (
          <div className="grid-row" key={r.date}>
            <span className="c-date mono">{r.date}</span>
            <span className="c-amount mono">{r.amount}</span>
            <span className="c-cat">
              <span className="tag">{r.category}</span>
            </span>
            <span className="c-note">{r.note}</span>
          </div>
        ))}
      </div>
      <div className="grid-row foot">
        <span className="c-date">{LEDGER.length} records</span>
        <span className="c-amount mono">
          <span style={{ color: "var(--app-muted-fg)", fontSize: 11 }}>SUM</span>
          {LEDGER_SUM}
        </span>
        <span className="c-note" />
      </div>
    </>
  );
}
