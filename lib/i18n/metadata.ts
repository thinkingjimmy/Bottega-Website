/**
 * [INPUT]: Uses Next Metadata, locale paths, and localized catalog metadata
 * [OUTPUT]: Exports locale-aware canonical/hreflang/Open Graph metadata builders
 * [POS]: Single SEO authority for the five canonical language trees and x-default fallback routes
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { Metadata } from "next";

import type { SiteCatalog } from "./index";
import { LOCALES, localizedPath, type Locale } from "./locale";

export const SITE_URL = "https://bottega.app";

const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  "zh-CN": "zh_CN",
  ja: "ja_JP",
  fr: "fr_FR",
  es: "es_ES",
};

export function languageAlternates(logicalPath: string) {
  return {
    "x-default": logicalPath,
    ...Object.fromEntries(LOCALES.map((locale) => [locale, localizedPath(locale, logicalPath)])),
  };
}

export function buildMetadata({
  locale,
  logicalPath,
  title,
  description,
  catalog,
  auto = false,
  image,
}: {
  locale: Locale;
  logicalPath: string;
  title?: string;
  description?: string;
  catalog: SiteCatalog;
  auto?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const pageTitle = title ? `${title} · Bottega` : catalog.meta.siteTitle;
  const pageDescription = description ?? catalog.meta.siteDescription;
  const canonical = localizedPath(auto ? "en" : locale, logicalPath);
  const openGraphTitle = title ? `${title} · Bottega` : catalog.meta.siteTitle;

  return {
    metadataBase: new URL(SITE_URL),
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical,
      languages: languageAlternates(logicalPath),
    },
    openGraph: {
      title: openGraphTitle,
      description: pageDescription,
      url: auto ? logicalPath : localizedPath(locale, logicalPath),
      siteName: "Bottega",
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((entry) => entry !== locale).map(
        (entry) => OG_LOCALES[entry]
      ),
      type: "website",
      ...(image ? { images: [image] } : {}),
    },
    icons: { icon: "/mark.png" },
  };
}
