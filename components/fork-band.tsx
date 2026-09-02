/**
 * [INPUT]: Uses Stroke, Glyph, and D from ./icons
 * [OUTPUT]: Exports the ForkBand closing section
 * [POS]: Closes Bottega-Website with the source pitch, download actions, and build terminal
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import { D, Glyph, Stroke } from "./icons";
import { Reveal } from "./reveal";

const REPO = "https://github.com/thinkingjimmy/Bottega";

const STEPS = [
  "gh repo fork thinkingjimmy/Bottega",
  "pnpm install",
  "pnpm --filter desktop build",
];

function BuildTerminal() {
  return (
    <div className="terminal" role="region" aria-label="Terminal commands to build Bottega">
      <div className="terminal-titlebar">
        <span className="terminal-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="terminal-title">Bottega — zsh</span>
        <span aria-hidden="true" />
      </div>
      <div className="terminal-body mono">
        {STEPS.map((line) => (
          <div className="terminal-line" key={line}>
            <span className="terminal-prompt" aria-hidden="true">$</span>
            <code>{line}</code>
          </div>
        ))}
        <div className="terminal-line terminal-output">
          <span aria-hidden="true">→</span>
          <code>out/Bottega.app</code>
        </div>
      </div>
    </div>
  );
}

export function ForkBand() {
  return (
    <section className="section" id="source">
      <Reveal>
        <div className="wrap">
          <div className="band">
            <div className="split split-narrow fork-layout">
              <div>
                <h2 className="fork-title">
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

              <BuildTerminal />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
