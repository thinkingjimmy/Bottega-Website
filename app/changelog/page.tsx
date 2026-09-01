import type { Metadata } from "next";
import Link from "next/link";

import { AppIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme";
import { readEntries, renderInline } from "@/lib/changelog";

/**
 * [INPUT]: 依赖 @/lib/changelog 的 readEntries/renderInline，依赖 @/components 的 AppIcon/ThemeToggle/SiteFooter
 * [OUTPUT]: 对外提供 /changelog 页面与其 metadata
 * [POS]: Bottega-Website 唯一的子页。内容来自 Bottega 仓库
 *        docs/changelog/README.md 的构建期快照，记录产品里程碑而非内部迭代
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

export const metadata: Metadata = {
  title: "Changelog",
  description: "Product milestones for Bottega — when each capability reached its first coherent form.",
};

const REPO = "https://github.com/thinkingjimmy/Bottega";

export default function ChangelogPage() {
  const entries = readEntries();

  return (
    <div className="content">
      {/* 子页没有那台钉住的桌面，所以 header 是常驻的普通导航，
          而不是首页那条随收缩浮出来的带子。 */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          height: 78,
          borderBottom: "1px solid var(--line)",
        }}
        className="wrap"
      >
        <Link href="/" aria-label="Bottega" style={{ display: "flex", alignItems: "center" }}>
          <AppIcon size={30} />
        </Link>
        <nav style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 20, fontSize: 14.5 }}>
          <a href={REPO} style={{ color: "var(--ink-2)" }}>
            GitHub
          </a>
          <ThemeToggle />
          <a
            className="btn-primary"
            href={`${REPO}/releases`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 36,
              padding: "0 17px",
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Download for macOS
          </a>
        </nav>
      </header>

      <section className="section" style={{ paddingTop: 96 }}>
        <div className="wrap">
          <p className="mono eyebrow">Changelog</p>
          <h1 style={{ fontSize: 56, lineHeight: 1.03, maxWidth: "18ch", marginBottom: 22 }}>
            What actually shipped.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--ink-2)", maxWidth: "62ch" }}>
            Product milestones, not internal iterations. Each date is when that capability first reached a
            coherent shape a person could use.
          </p>

          <div style={{ marginTop: 56 }}>
            {entries.map((entry) => (
              <article className="entry" key={entry.date}>
                <div>
                  <p className="mono" style={{ fontSize: 13, color: "var(--ink-3)" }}>
                    {entry.date}
                  </p>
                </div>
                <div>
                  <h2 style={{ fontSize: 22, lineHeight: 1.3, marginBottom: 16 }}>{entry.title}</h2>
                  <ul>
                    {entry.items.map((item, i) => (
                      <li key={i}>
                        {renderInline(item).map((part, j) =>
                          part.kind === "strong" ? (
                            <strong key={j}>{part.value}</strong>
                          ) : part.kind === "code" ? (
                            <code key={j} className="mono" style={{ fontSize: "0.92em" }}>
                              {part.value}
                            </code>
                          ) : (
                            <span key={j}>{part.value}</span>
                          )
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
