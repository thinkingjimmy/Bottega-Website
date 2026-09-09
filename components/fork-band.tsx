/**
 * [INPUT]: Uses localized SiteCatalog copy, the shared DownloadButton, the repository URL, and Glyph/D icons
 * [OUTPUT]: Exports the localized ForkBand closing section
 * [POS]: Closes Bottega-Website with source ownership, download actions, and an immutable build command terminal
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { DownloadButton } from "./download";
import { D, Glyph } from "./icons";
import { Reveal } from "./reveal";
import type { SiteCatalog } from "@/lib/i18n";
import { REPO } from "@/lib/release";

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
                <p className="fork-body">{copy.body}</p>
                <div className="fork-actions">
                  <DownloadButton copy={catalog.download} variant="band" />
                  <a className="fork-source" href={REPO} rel="noreferrer" target="_blank">
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
