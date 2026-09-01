/**
 * [INPUT]: 依赖 @/lib/agents 的 GANG，依赖 ./icons 的 Stroke/Glyph/D
 * [OUTPUT]: 对外提供 AgentsSection 组件
 * [POS]: Bottega-Website 唯一的功能介绍段。左图右文——图画的是边栏本身，
 *        因为「谁在干这活」这件事在产品里就是靠 chat 行首那枚 logo 回答的，
 *        把边栏画出来，这句话就不用讲
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { GANG } from "@/lib/agents";
import { D, Glyph, Stroke } from "./icons";

const POINTS = [
  "Connects to the official CLI you already have installed — nothing is reimplemented.",
  "Your existing history comes with you: point Bottega at a CLI and its past sessions land in the same sidebar.",
  "Different agents on different projects — or on the same one, in their own threads.",
];

export function AgentsSection() {
  return (
    <section className="section" id="agents">
      <div className="wrap split">
        <div className="sidebar-card">
          <div className="traffic">
            <i style={{ background: "#FF5F57" }} />
            <i style={{ background: "#FEBC2E" }} />
            <i style={{ background: "#28C840" }} />
          </div>
          <div style={{ padding: "0 8px 14px" }}>
            <p className="group-label" style={{ padding: "6px 10px 2px", fontSize: 12 }}>
              Chats
            </p>
            {GANG.map((g, i) => (
              <div
                className={`row${i === 0 ? " on" : ""}`}
                key={g.title}
                style={{ height: 36, padding: "0 10px", gap: 10, fontSize: 14 }}
              >
                <span className="mark">
                  <Glyph d={g.iconPath} />
                </span>
                <span className="title">{g.title}</span>
                <span style={{ flex: "none", marginLeft: "auto", fontSize: 11.5, color: "var(--app-muted-fg)" }}>
                  {g.agent}
                </span>
              </div>
            ))}
            <div
              className="row"
              style={{
                height: 36,
                marginTop: 4,
                padding: "0 10px",
                gap: 10,
                border: "1px dashed var(--app-border)",
                fontSize: 13,
                color: "var(--app-muted-fg)",
              }}
            >
              <span className="mark">
                <Stroke d={D.importDown} size={14} />
              </span>
              <span className="title">Imported 34 sessions from ~/.codex</span>
            </div>
          </div>
        </div>

        <div>
          <p className="mono eyebrow">Agents</p>
          <h1 style={{ fontSize: 56, lineHeight: 1.03, maxWidth: "16ch", marginBottom: 22 }}>
            Every agent you pay for, in one sidebar.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--ink-2)", marginBottom: 18 }}>
            Codex, Claude Code, Kimi Code and OpenCode all live in Bottega. Give a job to whichever one fits
            it — every chat carries the mark of the agent running it, so you never have to ask who did the
            work.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--ink-2)", marginBottom: 26 }}>
            Each runs on your own subscription: the plan you already pay for, billed by the provider, not by
            us. No API key to top up, no tokens resold.
          </p>
          <ul className="checks" style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {POINTS.map((p) => (
              <li key={p}>
                <Stroke d={D.check} size={17} width={2.2} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
