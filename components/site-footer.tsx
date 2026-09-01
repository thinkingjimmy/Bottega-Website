/**
 * [INPUT]: 依赖 next/link，依赖 ./icons 的 Wordmark
 * [OUTPUT]: 对外提供 SiteFooter 组件
 * [POS]: Bottega-Website 的落款。名字的来历放在这里而不是叫卖区——
 *        它解释的是我们是谁，不是请你买什么
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

import Link from "next/link";

import { Wordmark } from "./icons";

const REPO = "https://github.com/thinkingjimmy/Bottega";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Download", href: `${REPO}/releases` },
      { label: "Changelog", href: "/changelog/" },
      { label: "Docs", href: `${REPO}/tree/main/docs` },
    ],
  },
  {
    title: "Source",
    links: [
      { label: "GitHub", href: REPO },
      { label: "Issues", href: `${REPO}/issues` },
      { label: "License (MIT)", href: `${REPO}/blob/main/LICENSE` },
    ],
  },
  {
    title: "Agents",
    links: [
      { label: "Codex", href: "https://developers.openai.com/codex/cli" },
      { label: "Claude Code", href: "https://claude.com/product/claude-code" },
      { label: "Kimi Code", href: "https://www.kimi.com" },
      { label: "OpenCode", href: "https://opencode.ai" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap" style={{ display: "flex", alignItems: "flex-start", gap: 40, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 340 }}>
          <div style={{ marginBottom: 14 }}>
            <Wordmark height={22} />
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-3)", marginBottom: 12 }}>
            A bottega was a Renaissance workshop: the master held the direction, the apprentices did the
            work, and what left the door was a finished piece. Same arrangement, new apprentices.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-3)" }}>
            Free and open source (MIT). Your credentials never leave the official CLIs.
          </p>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 72, flexWrap: "wrap" }}>
          {COLUMNS.map((col) => (
            <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <p
                className="mono"
                style={{
                  fontSize: 11.5,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  marginBottom: 3,
                }}
              >
                {col.title}
              </p>
              {col.links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href}>
                    {link.label}
                  </a>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
