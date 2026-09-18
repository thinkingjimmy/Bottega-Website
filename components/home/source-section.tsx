/**
 * [INPUT]: Uses localized SiteCatalog copy, the shared DownloadButton, the repository URL, Reveal, and the Glyph/Stroke/D icon primitives
 * [OUTPUT]: Exports the localized SourceSection — the build in a terminal card beside the checklist of what a fork can do
 * [POS]: Closes the home narrative with source ownership; the checklist card carries the page's last download control
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { DownloadButton } from "../download";
import { D, Glyph, Stroke } from "../icons";
import { Reveal } from "../reveal";
import type { SiteCatalog } from "@/lib/i18n";
import { REPO } from "@/lib/release";

/* 命令是真的：fork、装依赖、构建桌面端，产物在 out/。三条不随语言变。 */
const STEPS = ["gh repo fork thinkingjimmy/Bottega --clone", "cd Bottega && pnpm install", "pnpm --filter desktop build"];

export function SourceSection({ catalog }: { catalog: SiteCatalog }) {
  const copy = catalog.home.source;
  const outputs = [copy.cloned, copy.installed, "out/Bottega.app"];
  const marks = ["✓", "✓", "→"];
  return (
    <section className="home-section" id="source">
      <Reveal>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="home-title">{copy.title}</h2>
        <p className="home-lede">{copy.lede}</p>

        <div className="source-grid">
          <div className="terminal" role="region" aria-label={copy.terminalLabel}>
            <div className="terminal-titlebar">
              <span className="terminal-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="terminal-title">~/code</span>
              <span aria-hidden="true" />
            </div>
            <div className="terminal-body mono">
              {STEPS.map((line, at) => (
                <div key={line} style={{ display: "contents" }}>
                  <div className="terminal-line">
                    <span className="terminal-prompt" aria-hidden="true">$</span>
                    <code>{line}</code>
                  </div>
                  <div className="terminal-line terminal-output">
                    <span aria-hidden="true">{marks[at]}</span>
                    <code>{outputs[at]}</code>
                  </div>
                </div>
              ))}
              <div className="terminal-line" aria-hidden="true">
                <span className="terminal-prompt">$</span>
                <code>
                  <span className="terminal-cursor" />
                </code>
              </div>
            </div>
          </div>

          <div className="checklist">
            <ul>
              {copy.items.map((item) => (
                <li key={item.title}>
                  <span className="checklist-check" aria-hidden="true">
                    <Stroke d={D.check} size={14} width={2.6} />
                  </span>
                  <span>
                    <b>{item.title}</b> <span>{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="checklist-license">
              {copy.license} · thinkingjimmy/Bottega
            </p>
            <div className="checklist-actions">
              <DownloadButton copy={catalog.download} variant="band" />
              <a className="checklist-fork" href={REPO} rel="noreferrer" target="_blank">
                <Glyph d={D.github} size={17} />
                {copy.fork}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
