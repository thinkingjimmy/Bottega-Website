# components/home/figures/

> L2 | Parent: [components/home/README.md](../README.md)

## Members

- `handoff-figure.tsx`: Three Chat windows stacked in time order — Claude's Plan, the Codex Chat it drops into (with the inbound relay header and a queued follow-up), and the result back in Claude's Chat with the review verdict — joined by two handwritten flow arrows, each with its note. The strings are the Agents feature page's own (`RELAY_ID`/`relayText` are imported from that sketch).
- `terminal-figure.tsx`: The fork, install and build commands with their outputs, in the terminal card drawn as a product window.
- `sync-figure.tsx`: The phone (`components/window/product-phone.tsx`) beside the desktop panel of the same Chat: a step handled on the phone, the executing computer's chip, and the ciphertext line.
- `product-dock.tsx`: Bottega Dock drawn to the product's own metrics (`shared/system-dock/metrics.ts`, `bar.css`, `faces.tsx`): `ProductDock` (the strip, scaled as one block by `--dz`), `DockSlot` (48 px, running dot, open tint), `DockSeparator`, `LimitsFace` (up to three rings, caution below 20%) and `ValueFace` (the activity-face layout custom widgets reuse).
- `dock-figure.tsx`: The Expense Tracker surface the Apps stage renders, open above Bottega Dock with the four Apps, AI Limits, AI Usage, Downloads and Trash.
- `widgets-figure.tsx`: Four widgets on one Dock — AI Limits, AI Usage, monthly spend and workout streak — the active one opened on the Dock and drawn large in a centred card (an illustration of what it says, not the product panel). Exports `WIDGET_CASES`, the order the case list follows.
- `dock-marks.tsx`: The mark vocabulary — `Tile` (gradient squircle, white glyph; tones live in `dock.css`), `AppTile` (the four first-party App icons by id), `DockIcon` (Finder, Browser, Notes, Downloads, Trash), and `LimitRing` (the small limit gauge used in cells and case lists). Also used by the Trust claim tiles.

All figures are inert and `aria-hidden` through their figure card; every sentence they print is a product string or demo copy from the current locale, never invented UI text. Geometry follows `app/styles/home/figures.css` (handoff, sync), `app/styles/home/source.css` (terminal) and `app/styles/home/dock.css` (Dock, widgets, marks). The Dock and Widgets figures fill their card and pin the bar to its bottom edge, the way a Dock belongs to the screen edge.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
