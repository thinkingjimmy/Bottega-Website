"use client";

/**
 * [INPUT]: Uses current locale, browser languagechange events, localStorage, and locale path helpers
 * [OUTPUT]: Exports LanguageRuntime for following system-language changes while Auto is active
 * [POS]: Passive browser companion to the pre-paint Auto redirect and footer preference control
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { useEffect } from "react";
import {
  LANGUAGE_STORAGE_KEY,
  localizedPath,
  readLanguagePreference,
  resolveLocale,
  stripLocale,
  type Locale,
} from "@/lib/i18n/locale";

export function LanguageRuntime({ locale }: { locale: Locale }) {
  useEffect(() => {
    const followSystemLanguage = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      } catch {
        // 无存储等同 Auto；系统语言变化仍然可用于当前导航。
      }
      const preference = readLanguagePreference(saved);
      if (preference !== "auto") return;
      const next = resolveLocale(preference, navigator.languages);
      if (next === locale) return;
      location.assign(`${localizedPath(next, stripLocale(location.pathname))}${location.search}${location.hash}`);
    };

    window.addEventListener("languagechange", followSystemLanguage);
    return () => window.removeEventListener("languagechange", followSystemLanguage);
  }, [locale]);

  return null;
}
