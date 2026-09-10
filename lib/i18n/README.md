# lib/i18n/

> L2 | Parent: [lib/README.md](../README.md)

## Members

- `catalog-shape.ts`: Converts the English literal catalog into the structural contract enforced by every translation.
- `catalogs/`: Contains the five complete compile-time catalogs.
- `catalogs.test.mjs`: Verifies runtime shape, non-empty values, placeholders, and Changelog parity.
- `index.ts`: Selects one complete catalog and exports public locale types.
- `locale.test.mjs`: Verifies the default/prefixed locale split and path semantics.
- `locale.ts`: Defines supported locales, the unprefixed English default, menu-bar marks, and localized paths.
- `language-navigation.ts`: Preserves query and hash during explicit language-link navigation.
- `metadata.ts`: Resolves localized page titles, descriptions, and social images for HTML and JSON-LD; builds canonical, hreflang, crawler, Open Graph, and Twitter metadata from the shared production origin.

English defines the shape. A translation with a missing key, extra key, empty value, or changed placeholder fails typecheck or tests.

[PROTOCOL]: Update this header when making changes, then check README.md.
