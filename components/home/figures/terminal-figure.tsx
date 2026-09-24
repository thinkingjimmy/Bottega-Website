/**
 * [INPUT]: Uses the localized open-source story copy (the two build outputs)
 * [OUTPUT]: Exports TerminalFigure — the three commands that fork, install and build Bottega, in a terminal card drawn as a product window
 * [POS]: Figure of the Open source story in the Trust section; the whole "release your own version" ceremony in one window
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { SiteCatalog } from "@/lib/i18n";

const STEPS = ["gh repo fork thinkingjimmy/Bottega --clone", "cd Bottega && pnpm install", "pnpm --filter desktop build"];

export function TerminalFigure({ copy }: { copy: SiteCatalog["home"]["trust"]["source"] }) {
  const outputs = [copy.cloned, copy.installed, "out/Bottega.app"];
  const marks = ["✓", "✓", "→"];
  return (
    <div className="terminal terminal--figure">
      <div className="terminal-titlebar">
        <span className="terminal-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="terminal-title">~/code</span>
        <span />
      </div>
      <div className="terminal-body mono">
        {STEPS.map((line, at) => (
          <div key={line} style={{ display: "contents" }}>
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <code>{line}</code>
            </div>
            <div className="terminal-line terminal-output" data-final={at === STEPS.length - 1 || undefined}>
              <span>{marks[at]}</span>
              <code>{outputs[at]}</code>
            </div>
          </div>
        ))}
        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <code>
            <span className="terminal-cursor" />
          </code>
        </div>
      </div>
    </div>
  );
}
