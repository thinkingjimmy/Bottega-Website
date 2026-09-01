/**
 * [INPUT]: 依赖 ./icons 的 Stroke/Glyph/D
 * [OUTPUT]: 对外提供 ForkBand 组件
 * [POS]: Bottega-Website 的收尾。Fork 与「去下载」原本是两条深色带，
 *        说的却是同一句话——它是你的，去拿。并成一条
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { D, Glyph, Stroke } from "./icons";

const REPO = "https://github.com/thinkingjimmy/Bottega";

const STEPS = [
  "gh repo fork thinkingjimmy/Bottega",
  "pnpm install",
  "pnpm --filter desktop build",
];

export function ForkBand() {
  return (
    <section className="section" id="source">
      <div className="wrap">
        <div className="band">
          <div className="split split-flip">
            <div>
              <p className="mono eyebrow" style={{ color: "inherit", opacity: 0.55 }}>
                Free · MIT · Local-first
              </p>
              <h2 style={{ fontSize: 52, lineHeight: 1.04, maxWidth: "15ch", marginBottom: 22 }}>
                Fork it. Ship your own build.
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.62, opacity: 0.74, maxWidth: "54ch", marginBottom: 34 }}>
                Bottega is MIT-licensed, end to end. Fork the repo, change the agents, the tools, the UI —
                then roll your own build out to your whole team. It still runs local-first on their machines,
                on the subscriptions they already pay for.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <a
                  href={`${REPO}/releases`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    height: 50,
                    padding: "0 26px",
                    borderRadius: 9999,
                    background: "var(--ground)",
                    color: "var(--ink)",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  <Stroke d={D.download} size={18} />
                  Download for macOS
                </a>
                <a
                  href={REPO}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    height: 50,
                    padding: "0 24px",
                    borderRadius: 9999,
                    border: "1px solid rgba(237, 233, 222, .28)",
                    color: "var(--ground)",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  <Glyph d={D.github} size={18} />
                  View the source
                </a>
              </div>
            </div>

            <div className="mono term">
              {STEPS.map((line) => (
                <p key={line}>
                  <span style={{ opacity: 0.5 }}>$</span> {line}
                </p>
              ))}
              <p style={{ opacity: 0.55 }}>→ out/Bottega.app</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
