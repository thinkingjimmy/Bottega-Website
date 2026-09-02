/**
 * [INPUT]: Uses one Locale, its SiteCatalog, locale-specific Changelog snapshot, and shared site chrome
 * [OUTPUT]: Exports ChangelogPageView for Auto fallback and five canonical locale routes
 * [POS]: Locale-neutral milestone page composition
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { getCatalog, type Locale } from "@/lib/i18n";
import { readEntries, renderInline } from "@/lib/changelog";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";
import { featuresFor } from "../features/catalog";

export function ChangelogPageView({ locale }: { locale: Locale }) {
  const catalog = getCatalog(locale);
  const entries = readEntries(locale);
  const features = featuresFor(catalog);

  return (
    <div className="content">
      <SiteHeader variant="framed" locale={locale} copy={catalog.nav} features={features} />
      <section className="section" style={{ paddingTop: 96 }}>
        <div className="wrap">
          <p className="mono eyebrow">{catalog.changelog.eyebrow}</p>
          <h1 style={{ fontSize: 56, lineHeight: 1.03, maxWidth: "18ch", marginBottom: 22 }}>
            {catalog.changelog.title}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.62, color: "var(--ink-2)" }}>
            {catalog.changelog.introduction}
          </p>
          <div style={{ marginTop: 56 }}>
            {entries.map((entry) => (
              <article className="entry" key={entry.date}>
                <div><p className="mono" style={{ fontSize: 13, color: "var(--ink-3)" }}>{entry.date}</p></div>
                <div>
                  <h2 style={{ fontSize: 22, lineHeight: 1.3, marginBottom: 16 }}>{entry.title}</h2>
                  <ul>
                    {entry.items.map((item) => (
                      <li key={item}>
                        {renderInline(item).map((part, index) =>
                          part.kind === "strong" ? <strong key={index}>{part.value}</strong>
                            : part.kind === "code" ? <code key={index} className="mono" style={{ fontSize: "0.92em" }}>{part.value}</code>
                              : <span key={index}>{part.value}</span>
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
      <SiteFooter locale={locale} catalog={catalog} logicalPath="/changelog/" />
    </div>
  );
}
