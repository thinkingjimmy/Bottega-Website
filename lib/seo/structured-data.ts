/**
 * [INPUT]: Uses resolved localized metadata, locale paths, nullable release assets, and the current release URL
 * [OUTPUT]: Exports the page JSON-LD graph builder
 * [POS]: Server-side semantic description of existing pages and the shipped desktop application
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */

import { LOCALES, localizedPath } from "../i18n/locale";
import { resolvePageMetadata, type PageMetadataInput } from "../i18n/metadata";
import { PLATFORMS, RELEASE, RELEASE_URL, REPO, type PlatformId } from "../release";
import { absoluteUrl } from "./site";

const OPERATING_SYSTEM: Record<PlatformId, string> = { mac: "macOS", windows: "Windows", linux: "Linux" };

export function buildStructuredData(input: PageMetadataInput) {
  const { locale, logicalPath, catalog } = input;
  const page = resolvePageMetadata(input);
  const websiteId = absoluteUrl("/#website");
  const softwareId = absoluteUrl("/#software");
  const isHome = logicalPath === "/";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl("/"),
        name: "Bottega",
        inLanguage: LOCALES,
      },
      {
        "@type": "WebPage",
        "@id": `${page.canonical}#webpage`,
        url: page.canonical,
        name: page.title,
        description: page.description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        about: { "@id": softwareId },
        ...(isHome
          ? { mainEntity: { "@id": softwareId } }
          : { breadcrumb: { "@id": `${page.canonical}#breadcrumb` } }),
      },
      ...(isHome ? [{
        "@type": "SoftwareApplication",
        "@id": softwareId,
        name: "Bottega",
        url: page.canonical,
        description: catalog.meta.siteDescription,
        image: absoluteUrl("/app-icon.png"),
        applicationCategory: "DeveloperApplication",
        operatingSystem: PLATFORMS.filter((platform) => RELEASE.assets[platform] !== null)
          .map((platform) => OPERATING_SYSTEM[platform]),
        softwareVersion: RELEASE.version,
        downloadUrl: RELEASE_URL,
        license: `${REPO}/blob/main/LICENSE`,
        sameAs: REPO,
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: 0,
          priceCurrency: "USD",
          url: RELEASE_URL,
        },
      }] : [{
        "@type": "BreadcrumbList",
        "@id": `${page.canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Bottega",
            item: absoluteUrl(localizedPath(locale, "/")),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: input.title,
            item: page.canonical,
          },
        ],
      }]),
    ],
  };
}
