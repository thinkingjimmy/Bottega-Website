/**
 * [INPUT]: Uses only standard Intl.Locale and URL path semantics
 * [OUTPUT]: Exports Locale/LanguagePreference contracts, detection, validation, and locale-aware path helpers
 * [POS]: Framework-independent language authority shared by static routes, browser boot code, and tests
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

export const LOCALES = ["en", "zh-CN", "ja", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const LANGUAGE_PREFERENCES = ["auto", ...LOCALES] as const;
export type LanguagePreference = (typeof LANGUAGE_PREFERENCES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LANGUAGE_STORAGE_KEY = "bottega-language";

/** Auto 指不向任何一种语言：地球是它在两处菜单里共用的同一颗记号。 */
const AUTO_MARK = "🌐";

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
  value: LanguagePreference;
  emoji: string;
  label: string;
}> = [
  { value: "auto", emoji: AUTO_MARK, label: "Auto detect" },
  { value: "zh-CN", emoji: "🇨🇳", label: "简体中文" },
  { value: "en", emoji: "🇺🇸", label: "English" },
  { value: "ja", emoji: "🇯🇵", label: "日本語" },
  { value: "fr", emoji: "🇫🇷", label: "Français" },
  { value: "es", emoji: "🇪🇸", label: "Español" },
];

export function languageMark(value: LanguagePreference): string {
  return value === "auto" ? AUTO_MARK : LOCALE_MARKS[value];
}

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function readLanguagePreference(value: unknown): LanguagePreference {
  return value === "auto" || isLocale(value) ? value : "auto";
}

function detectedLocale(value: string): Locale | null {
  let locale: Intl.Locale;
  try {
    locale = new Intl.Locale(value).maximize();
  } catch {
    return null;
  }

  if (locale.language === "zh") {
    return locale.script === "Hans" ? "zh-CN" : null;
  }
  if (locale.language === "en") return "en";
  if (locale.language === "ja") return "ja";
  if (locale.language === "fr") return "fr";
  if (locale.language === "es") return "es";
  return null;
}

export function resolveLocale(
  preference: LanguagePreference,
  preferredLanguages: readonly string[]
): Locale {
  if (preference !== "auto") return preference;
  for (const language of preferredLanguages) {
    const locale = detectedLocale(language);
    if (locale) return locale;
  }
  return DEFAULT_LOCALE;
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
  return `/${locale}${logical}`.replace(/\/+/gu, "/");
}

export function localeFromPath(pathname: string): Locale | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (!segment) return null;
  let decoded = segment;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    return null;
  }
  return isLocale(decoded) ? decoded : null;
}

/** Runs before body parsing on unprefixed routes, so Auto never paints the wrong language. */
export const AUTO_LOCALE_BOOT = `(function(){var k=${JSON.stringify(
  LANGUAGE_STORAGE_KEY
)},a=${JSON.stringify(LOCALES)},p="auto";try{var s=localStorage.getItem(k);if(a.indexOf(s)>-1)p=s}catch(e){}function d(v){try{var l=new Intl.Locale(v).maximize();if(l.language==="zh")return l.script==="Hans"?"zh-CN":null;if(a.indexOf(l.language)>-1)return l.language}catch(e){}return null}var x=p;if(p==="auto"){x="en";var n=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language];for(var i=0;i<n.length;i++){var m=d(n[i]);if(m){x=m;break}}}var u=new URL(location.href);u.pathname=("/"+x+u.pathname).replace(/\\/{2,}/g,"/");location.replace(u.href)})();`;
