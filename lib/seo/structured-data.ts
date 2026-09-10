/**
 * [INPUT]: Uses resolved localized metadata, locale paths, and public release facts
 * [OUTPUT]: Exports the page JSON-LD graph builder
 * [POS]: Server-side semantic description of existing pages and the shipped desktop application
 * [PROTOCOL]: Update this header when making changes, then check README.md.
 */

import { LOCALES, localizedPath } from "../i18n/locale";
import { resolvePageMetadata, type PageMetadataInput } from "../i18n/metadata";
import { RELEASE, RELEASES_URL, REPO } from "../release";
import { absoluteUrl } from "./site";

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
        operatingSystem: ["macOS", "Windows", "Linux"],
        softwareVersion: RELEASE.version,
        downloadUrl: RELEASES_URL,
        license: `${REPO}/blob/main/LICENSE`,
        sameAs: REPO,
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: 0,
          priceCurrency: "USD",
          url: RELEASES_URL,
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
