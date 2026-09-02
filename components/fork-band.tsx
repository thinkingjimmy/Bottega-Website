/**
 * [INPUT]: Uses localized SiteCatalog copy plus shared Stroke/Glyph/D icons
 * [OUTPUT]: Exports the localized ForkBand closing section
 * [POS]: Closes Bottega-Website with source ownership, download actions, and an immutable build command terminal
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { D, Glyph, Stroke } from "./icons";
import { Reveal } from "./reveal";
import type { SiteCatalog } from "@/lib/i18n";

const REPO = "https://github.com/thinkingjimmy/Bottega";

const STEPS = [
  "gh repo fork thinkingjimmy/Bottega",
  "pnpm install",
  "pnpm --filter desktop build",
];

function BuildTerminal({ label }: { label: string }) {
  return (
    <div className="terminal" role="region" aria-label={label}>
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

export function ForkBand({ catalog }: { catalog: SiteCatalog }) {
  const copy = catalog.home.fork;
  return (
    <section className="section" id="source">
      <Reveal>
        <div className="wrap">
          <div className="band">
            <div className="split split-narrow fork-layout">
              <div>
                <h2 className="fork-title">
                  {copy.title}
                </h2>
                <p style={{ fontSize: 18, lineHeight: 1.62, opacity: 0.74, maxWidth: "54ch", marginBottom: 34 }}>
                  {copy.body}
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
                    {copy.download}
                  </a>
                  <a
                    href={REPO}
                    rel="noreferrer"
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
                    target="_blank"
                  >
                    <Glyph d={D.github} size={18} />
                    {copy.source}
                  </a>
                </div>
              </div>

              <BuildTerminal label={copy.terminalLabel} />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
