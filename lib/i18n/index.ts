/**
 * [INPUT]: Uses all five compile-time catalogs and locale validation
 * [OUTPUT]: Exports SiteCatalog/getCatalog plus the public locale contracts and helpers
 * [POS]: Server-side i18n assembly point; client modules import locale.ts directly to avoid bundling catalogs
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { CatalogShape } from "./catalog-shape";
import { en } from "./catalogs/en";
import { es } from "./catalogs/es";
import { fr } from "./catalogs/fr";
import { ja } from "./catalogs/ja";
import { zhCN } from "./catalogs/zh-cn";
import { isLocale, type Locale } from "./locale";

export type SiteCatalog = CatalogShape<typeof en>;

const CATALOGS: Record<Locale, SiteCatalog> = {
  en,
  "zh-CN": zhCN,
  ja,
  fr,
  es,
};

export function getCatalog(locale: Locale): SiteCatalog {
  return CATALOGS[locale];
}

export function parseLocale(value: string): Locale | null {
  return isLocale(value) ? value : null;
}

export * from "./locale";
