/**
 * [INPUT]: Uses localized copy/path props, next/link, and LanguageSwitcher
 * [OUTPUT]: Exports SiteFooter with localized navigation and language preference control
 * [POS]: Shared colophon and the language-switching entry present on every website page
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import Link from "next/link";
import type { SiteCatalog } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n/locale";
import { LanguageSwitcher } from "./language-switcher";

const REPO = "https://github.com/thinkingjimmy/Bottega";
const COPYRIGHT = "Bottega © 2026. All rights reserved.";

export function SiteFooter({
  locale,
  catalog,
  logicalPath,
}: {
  locale: Locale;
  catalog: SiteCatalog;
  logicalPath: string;
}) {
  const links = [
    { label: catalog.footer.links.changelog, href: localizedPath(locale, "/changelog/") },
    { label: catalog.footer.links.docs, href: `${REPO}/tree/main/docs` },
    { label: catalog.footer.links.github, href: REPO },
    { label: catalog.footer.links.issues, href: `${REPO}/issues` },
    { label: catalog.footer.links.download, href: `${REPO}/releases` },
  ];
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <p className="footer-note">{COPYRIGHT}</p>
        <div className="footer-actions">
          <nav aria-label={catalog.footer.navigation}>
            <ul className="footer-links">
            {links.map((link) => (
              <li key={link.label}>
                {link.href.startsWith("/") ? (
                  <Link href={link.href}>{link.label}</Link>
                ) : (
                  <a
                    href={link.href}
                    rel={link.href === REPO ? "noreferrer" : undefined}
                    target={link.href === REPO ? "_blank" : undefined}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
            </ul>
          </nav>
          <span className="footer-language-rule" aria-hidden="true" />
          <LanguageSwitcher locale={locale} copy={catalog.language} logicalPath={logicalPath} />
        </div>
      </div>
    </footer>
  );
}
