"use client";

/**
 * [INPUT]: Uses React mouse-event semantics plus one logical path and the locale path helper
 * [OUTPUT]: Exports languageLinkClick for query/hash-preserving explicit locale navigation
 * [POS]: Sole language-link behavior shared by both language controls
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { MouseEvent } from "react";
import { localizedPath, type Locale } from "./locale";

/* 修饰键与中键仍归浏览器；普通左键补上当前 query/hash。守卫写在这里一次，
   两处菜单就不会各写一份、各漏一个键。 */
export function languageLinkClick(logicalPath: string, locale: Locale) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    location.assign(`${localizedPath(locale, logicalPath)}${location.search}${location.hash}`);
  };
}
