/**
 * [INPUT]: Uses next/link for internal footer navigation
 * [OUTPUT]: Exports the SiteFooter component
 * [POS]: The compact text-only colophon shared by home, changelog, and feature pages
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import Link from "next/link";

const REPO = "https://github.com/thinkingjimmy/Bottega";

const LINKS = [
  { label: "Changelog", href: "/changelog/" },
  { label: "Docs", href: `${REPO}/tree/main/docs` },
  { label: "GitHub", href: REPO },
  { label: "Issues", href: `${REPO}/issues` },
  { label: "Download", href: `${REPO}/releases` },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <p className="footer-note">
          Bottega is free and open source (<a href={`${REPO}/blob/main/LICENSE`}>MIT</a>).
        </p>
        <nav aria-label="Footer navigation">
          <ul className="footer-links">
            {LINKS.map((link) => (
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
      </div>
    </footer>
  );
}
