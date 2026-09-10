/**
 * [INPUT]: Uses Next Metadata, locale paths, localized copy, and the shared production site identity
 * [OUTPUT]: Exports page metadata inputs/resolution and canonical, hreflang, crawler, Open Graph, and Twitter metadata
 * [POS]: Localized metadata authority shared by static routes and structured data
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */

import type { Metadata } from "next";

import type { SiteCatalog } from "./index";
import { LOCALES, localizedPath, type Locale } from "./locale";
import { SITE_URL, SOCIAL_IMAGE, absoluteUrl } from "../seo/site";

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

export type PageMetadataInput = {
  locale: Locale;
  logicalPath: string;
  title?: string;
  description?: string;
  catalog: SiteCatalog;
  image?: { url: string; width: number; height: number; alt: string };
};

export function resolvePageMetadata({
  locale,
  logicalPath,
  title,
  description,
  catalog,
  image,
}: PageMetadataInput) {
  const socialImage = image ?? { ...SOCIAL_IMAGE, alt: catalog.meta.socialImageAlt };
  return {
    title: title ? `${title} · Bottega` : catalog.meta.siteTitle,
    description: description ?? catalog.meta.siteDescription,
    canonical: absoluteUrl(localizedPath(locale, logicalPath)),
    image: { ...socialImage, url: absoluteUrl(socialImage.url) },
  };
}

export function buildMetadata(input: PageMetadataInput): Metadata {
  const { locale, logicalPath } = input;
  const page = resolvePageMetadata(input);

  return {
    metadataBase: new URL(SITE_URL),
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.canonical,
      languages: languageAlternates(logicalPath),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.canonical,
      siteName: "Bottega",
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((entry) => entry !== locale).map(
        (entry) => OG_LOCALES[entry]
      ),
      type: "website",
      images: [page.image],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.image],
    },
    icons: { icon: "/mark.png" },
  };
}
