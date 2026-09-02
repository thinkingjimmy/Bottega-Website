# app/

> L2 | Parent: [project README](../README.md)

Next.js App Router roots for Auto fallback and five canonical language trees.

## Members

- `(auto)/`: Owns `/`, `/changelog`, and four `/features/[slug]` x-default routes with English no-JavaScript fallback.
- `[locale]/`: Owns the thirty `/en`, `/zh-CN`, `/ja`, `/fr`, and `/es` canonical pages.
- `globals.css`: Imports the ordered plain-CSS cascade.
- `sitemap.ts`: Emits thirty canonical URLs and six x-default entries with full language alternates.
- `styles/`: Splits presentation by visual concern; see its README.

Each route is statically generated. Root layouts choose `<html lang>` at build time; no component infers its content language from the browser.

[PROTOCOL]: Update this file when members or route ownership change, then verify the project README.md.
