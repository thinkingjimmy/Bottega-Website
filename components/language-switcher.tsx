"use client";

/**
 * [INPUT]: Uses current locale/copy, locale utilities, localStorage, navigator.languages, and Disclosure
 * [OUTPUT]: Exports the footer LanguageSwitcher with explicit and Auto preference navigation
 * [POS]: Sole UI authority for changing the persisted website language preference
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { useEffect, useState } from "react";
import type { SiteCatalog } from "@/lib/i18n";
import {
  LANGUAGE_OPTIONS,
  LANGUAGE_STORAGE_KEY,
  localizedPath,
  readLanguagePreference,
  resolveLocale,
  stripLocale,
  type LanguagePreference,
  type Locale,
} from "@/lib/i18n/locale";
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
  const [preference, setPreference] = useState<LanguagePreference>(locale);
  const effective = LANGUAGE_OPTIONS.find((option) => option.value === locale)!;

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
      // 存储不是导航的前置条件；隐私模式里这一次选择仍然有效。
    }
    const next = readLanguagePreference(saved);
    const expected = resolveLocale(next, navigator.languages);
    setPreference(expected === locale ? next : locale);
  }, [locale]);

  const choose = (next: LanguagePreference) => {
    try {
      if (next === "auto") localStorage.removeItem(LANGUAGE_STORAGE_KEY);
      else localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      // 同上：落盘失败不阻断当前导航。
    }

    const logical = stripLocale(location.pathname);
    const targetLocale = resolveLocale(next, navigator.languages);
    const target = `${localizedPath(targetLocale, logical)}${location.search}${location.hash}`;
    setPreference(next);
    location.assign(target);
  };

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
            const selected = preference === option.value;
            const href = option.value === "auto"
              ? logicalPath
              : localizedPath(option.value, logicalPath);
            return (
              <li key={option.value}>
                <a
                  href={href}
                  hrefLang={option.value === "auto" ? undefined : option.value}
                  aria-current={selected ? "true" : undefined}
                  onClick={(event) => {
                    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    choose(option.value);
                  }}
                >
                  <span className="language-flag" aria-hidden="true">{option.emoji}</span>
                  <span>{option.value === "auto" ? copy.autoDetect : option.label}</span>
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
