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

export const LANGUAGE_OPTIONS: ReadonlyArray<{
  value: LanguagePreference;
  emoji: string;
  label: string;
}> = [
  { value: "auto", emoji: "🌐", label: "Auto detect" },
  { value: "zh-CN", emoji: "🇨🇳", label: "简体中文" },
  { value: "en", emoji: "🇺🇸", label: "English" },
  { value: "ja", emoji: "🇯🇵", label: "日本語" },
  { value: "fr", emoji: "🇫🇷", label: "Français" },
  { value: "es", emoji: "🇪🇸", label: "Español" },
];

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
  const [path, suffix = ""] = pathname.split(/(?=[?#])/u, 2);
  const segments = path.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(decodeURIComponent(segments[0]))) {
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
  const decoded = decodeURIComponent(segment);
  return isLocale(decoded) ? decoded : null;
}

/** Runs before body parsing on unprefixed routes, so Auto never paints the wrong language. */
export const AUTO_LOCALE_BOOT = `(function(){var d=${JSON.stringify(
  LANGUAGE_STORAGE_KEY
)},p="auto";try{var s=localStorage.getItem(d);if(${JSON.stringify(
  LOCALES
)}.indexOf(s)>-1)p=s}catch(e){}var ls=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language],r=${resolveLocale.toString()},l=r(p,ls),u=new URL(location.href);u.pathname=("/"+l+u.pathname).replace(/\\/{2,}/g,"/");location.replace(u.href)})();`;
