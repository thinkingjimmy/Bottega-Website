"use client";

/**
 * [INPUT]: Uses React state/effects, localStorage, navigator.languages, and the locale helpers
 * [OUTPUT]: Exports useLanguagePreference — the stored preference plus a navigating link handler
 * [POS]: Sole language-preference behavior; every language control renders it, none re-implements it
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import { useEffect, useState, type MouseEvent } from "react";
import {
  LANGUAGE_STORAGE_KEY,
  localizedPath,
  readLanguagePreference,
  resolveLocale,
  stripLocale,
  type LanguagePreference,
  type Locale,
} from "./locale";

/**
 * 服务端渲染出的那份 HTML 已经带着 locale，所以初值是 locale 而不是 "auto"：
 * 首帧就说对当前语言，再由 effect 补上「这一份是 Auto 挑中的还是选定的」。
 */
export function useLanguagePreference(locale: Locale) {
  const [preference, setPreference] = useState<LanguagePreference>(locale);

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

  /* 修饰键与中键仍归浏览器：想在新标签页里打开另一种语言的人，不该顺手
     把全站偏好也改掉。守卫写在这里一次，两处菜单就不会各写一份、各漏一个键。 */
  const chooseOnClick =
    (next: LanguagePreference) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      choose(next);
    };

  return { preference, chooseOnClick };
}
