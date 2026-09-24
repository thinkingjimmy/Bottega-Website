# components/home/figures/

> L2 | Parent: [components/home/README.md](../README.md)

## Members

- `handoff-figure.tsx`: One Chat switching Agents mid-way — the product's transcript divider ("Replies from here are by {agent}", Undo) and its Agent menu with Claude at "Usage limit" — with three Chats by three Agents under one Project in the sidebar.
- `dock-marks.tsx`: The mark vocabulary — `Tile` (gradient squircle, white glyph; tones live in `dock.css`), `AppTile` (the four first-party App icons by id), `DockIcon` (Finder, Browser, Notes, Downloads, Trash), and `LimitRing` (the AI Limits gauge: arc = share left, orange below 20%, Agent mark over the number). Also used by the Apps cells/case lists and the Trust claim tiles.
- `dock-figure.tsx`: Bottega Dock on the wallpaper — system items, the four Apps, two limit rings, Downloads and Trash — with the Expense Tracker window above it and its hover label.
- `widgets-figure.tsx`: The AI Limits panel open above a Dock segment carrying three limit rings and today's token usage; Claude below 20% turns orange in both.
- `sync-figure.tsx`: The phone (`components/window/product-phone.tsx`) beside the desktop panel of the same Chat: a step handled on the phone, the executing computer's chip, and the ciphertext line.

All figures are inert and `aria-hidden` through their figure card; every sentence they print is a product string or demo copy from the current locale, never invented UI text. Geometry follows `app/styles/home/figures.css` (handoff, sync) and `app/styles/home/dock.css` (Dock, Widgets, marks). The Dock and Widgets figures fill their card and pin the bar to its bottom edge, the way a Dock belongs to the screen edge.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
