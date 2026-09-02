import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { readEntries, renderInline } from "@/lib/changelog";

/**
 * [INPUT]: Uses readEntries/renderInline from @/lib/changelog plus the shared SiteHeader and SiteFooter
 * [OUTPUT]: Exports the /changelog page and its metadata
 * [POS]: Product milestone subpage built from the Bottega repository's docs/changelog/README.md snapshot
 * [PROTOCOL]: 变更时更新此头部，然后检查 README.md
 */

export const metadata: Metadata = {
  title: "Changelog",
  description: "Product milestones for Bottega — when each capability reached its first coherent form.",
};

export default function ChangelogPage() {
  const entries = readEntries();

  return (
    <div className="content">
      <SiteHeader variant="framed" />

      <section className="section" style={{ paddingTop: 96 }}>
        <div className="wrap">
          <p className="mono eyebrow">Changelog</p>
          <h1 style={{ fontSize: 56, lineHeight: 1.03, maxWidth: "18ch", marginBottom: 22 }}>
            What actually shipped.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--ink-2)" }}>
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
