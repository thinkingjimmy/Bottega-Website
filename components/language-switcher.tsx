"use client";

/**
 * [INPUT]: Uses current locale/copy, shared language navigation, locale paths, and Disclosure
 * [OUTPUT]: Exports the footer LanguageSwitcher with explicit locale navigation
 * [POS]: Footer skin over the shared URL language behavior; the hero menu bar wears the other one
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { SiteCatalog } from "@/lib/i18n";
import { LANGUAGE_OPTIONS, localizedPath, type Locale } from "@/lib/i18n/locale";
import { languageLinkClick } from "@/lib/i18n/language-navigation";
import { Disclosure } from "./disclosure";
import { D, Stroke } from "./icons";

export function LanguageSwitcher({
  locale,
  copy,
  logicalPath,
}: {
  locale: Locale;
  copy: SiteCatalog["language"];
  logicalPath: string;
}) {
  const effective = LANGUAGE_OPTIONS.find((option) => option.value === locale)!;

  return (
    <Disclosure className="language-menu">
      <summary className="language-trigger" aria-label={copy.label}>
        <span aria-hidden="true">{effective.emoji}</span>
        <span>{effective.label}</span>
        <Stroke d={D.chevronDown} size={15} width={1.8} />
      </summary>
      <div className="language-panel">
        <ul>
          {LANGUAGE_OPTIONS.map((option) => {
            const selected = locale === option.value;
            const href = localizedPath(option.value, logicalPath);
            return (
              <li key={option.value}>
                <a
                  href={href}
                  hrefLang={option.value}
                  aria-current={selected ? "true" : undefined}
                  onClick={languageLinkClick(logicalPath, option.value)}
                >
                  <span className="language-flag" aria-hidden="true">{option.emoji}</span>
                  <span>{option.label}</span>
                  <span className="language-check" aria-hidden="true">
                    {selected ? <Stroke d={D.check} size={17} width={2} /> : null}
                  </span>
                  {selected ? <span className="sr-only">{copy.selected}</span> : null}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Disclosure>
  );
}
