# app/

> L2 | Parent: [project README](../README.md)

Next.js App Router roots for unprefixed canonical English and four prefixed language trees.

## Members

- `(english)/`: Owns `/`, `/changelog`, and four `/features/[slug]` routes shared by canonical English and `x-default`.
- `[locale]/`: Owns the twenty-four `/zh-CN`, `/ja`, `/fr`, and `/es` canonical pages.
- `globals.css`: Imports the ordered plain-CSS cascade.
- `sitemap.ts`: Emits thirty canonical URLs with complete English, translated, and `x-default` alternates.
- `styles/`: Splits presentation by visual concern; see its README.

Each route is statically generated. Root layouts choose `<html lang>` at build time; no component infers its content language from the browser.

[PROTOCOL]: Update this file when members or route ownership change, then verify the project README.md.
