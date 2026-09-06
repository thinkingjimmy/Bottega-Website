# components/features/

> L2 | Parent: [components/README.md](../README.md)

## Members

- `catalog.ts`: Combines four stable feature slugs/icons/screenshots with one locale's copy.
- `feature-link.tsx`: Preserves locale in every home-to-feature action.
- `feature-sidebar.tsx`: Renders localized current-page-aware feature navigation.
- `feature-icon.tsx`: Draws the framed identity mark used by sidebar links.
- `document-feature-article.tsx`: Renders the Apps, Customizable, and Base documents — an optional opening screenshot plus an optional figure per prose section.
- `agents-feature-article.tsx`: Renders three localized evidence-led Agents stories.
- `agents-feature-visuals.tsx`: Draws the localized Agent picker, capability matrix, and the annotated cross-Agent handoff sketch — three staggered Chat cards, two elbow handoffs, four handwritten notes.
- `base-feature-visuals.tsx`: Draws the first and third Base figures — a receipt sent into a Chat becoming one row in the Base column beside it, and a three-frame sketch where one Chat files that receipt and another reads the month's total back out — and exports the section order of all three.
- `base-views-figure.tsx`: Draws the second Base figure — one Base panel whose six view tabs cycle on their own and stop when clicked, including the central-Washington basemap and the three-card chart dashboard.
- `base-receipt.tsx`: Draws the receipt that travels through the figures: a Chat attachment in the first and third, a Gallery cover in the second.

Behavioral disclosure logic lives in `components/disclosure.tsx`; feature copy lives only in `lib/i18n/catalogs/`.
Column types, view types, tool names, and owner-key prefixes are copied verbatim from the desktop repository; a near-miss icon or an invented label would cost the figures the evidence they exist for.
The Base figures also inherit its projections: the list and Kanban row titles come from the ledger's first column, because that is what `projectListColumns` and `kanbanFaceSpec` do.
The third figure borrows the Agents cross-Agent sketch wholesale — staggered frames, elbow ink, handwritten notes — because both pages are drawing the same machine, and two sketch vocabularies would read as two products.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
