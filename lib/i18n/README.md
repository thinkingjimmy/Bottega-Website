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
- `metadata.ts`: Builds canonical, Open Graph, and hreflang metadata.

English defines the shape. A translation with a missing key, extra key, empty value, or changed placeholder fails typecheck or tests.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
