/**
 * [INPUT]: Uses only URL path semantics
 * [OUTPUT]: Exports Locale contracts, validation, language-menu data, and locale-aware path helpers
 * [POS]: Framework-independent URL language authority shared by static routes, navigation, metadata, and tests
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

export const LOCALES = ["en", "zh-CN", "ja", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const PREFIXED_LOCALES = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

/* 菜单栏上那一格只放得下一个记号。用各语言自己书写系统里的写法——
   与 macOS 输入法菜单同一套语汇，不必先认识一面国旗才知道自己在哪。 */
const LOCALE_MARKS: Record<Locale, string> = {
  en: "EN",
  "zh-CN": "拼",
  ja: "あ",
  fr: "FR",
  es: "ES",
};

export const LANGUAGE_OPTIONS: ReadonlyArray<{
  value: Locale;
  emoji: string;
  label: string;
}> = [
  { value: "zh-CN", emoji: "🇨🇳", label: "简体中文" },
  { value: "en", emoji: "🇺🇸", label: "English" },
  { value: "ja", emoji: "🇯🇵", label: "日本語" },
  { value: "fr", emoji: "🇫🇷", label: "Français" },
  { value: "es", emoji: "🇪🇸", label: "Español" },
];

export function languageMark(value: Locale): string {
  return LOCALE_MARKS[value];
}

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function stripLocale(pathname: string): string {
  const suffixAt = pathname.search(/[?#]/u);
  const path = suffixAt < 0 ? pathname : pathname.slice(0, suffixAt);
  const suffix = suffixAt < 0 ? "" : pathname.slice(suffixAt);
  const segments = path.split("/").filter(Boolean);
  let first = segments[0] ?? "";
  try {
    first = decodeURIComponent(first);
  } catch {
    // 非法转义不是 locale；保留原路径并交给路由层处理。
  }
  if (segments.length > 0 && isLocale(first)) {
    segments.shift();
  }
  const logical = `/${segments.join("/")}${path.endsWith("/") || segments.length === 0 ? "/" : ""}`;
  return `${logical.replace(/\/+/gu, "/")}${suffix}`;
}

export function localizedPath(locale: Locale, pathname: string): string {
  const logical = stripLocale(pathname);
  if (locale === DEFAULT_LOCALE) return logical;
  return `/${locale}${logical}`.replace(/\/+/gu, "/");
}
