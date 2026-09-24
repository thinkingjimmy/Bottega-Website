# styles/home/

> L2 | Parent: [styles/](../README.md)

Home-only presentation for the four sections after the hero (Agents, Trust, Apps, FAQ). Their React structure lives in [`components/home/`](../../../components/home/README.md).

## Cascade

`sections.css` loads first (skeleton, eyebrow, cell grids, case list, exit link), then `stories.css` (story rows and the figure card), then `figures.css` (the Handoff and Sync figures), then `dock.css` (tiles, rings, Bottega Dock and the Dock/Widgets figures), then `source.css` (the Open source terminal and buttons), then `faq.css`. All six load after `reels/` and `apps/` so the figure card can position the reel and the stage, and before `motion.css` so the narrow-screen overrides still win.

## Member list

- `sections.css`: `.home-section` (a full-width hairline, then `--edge` padding), `.home-title` / `.home-lede`, the `.eyebrow` (mono, with the amber `--num` variant for story numbers), the hairline `.cell-grid` (five-up roster, four-up claims, three-up Apps), the `.cases` list whose selected cell carries the carousel tick (its 5000ms matches `use-carousel.ts`), and the `.feature-more` exit link.
- `stories.css`: `.stories` / `.story` (copy beside a `--figure-w` figure, mirrored with `--figure-first`), `.story-copy`, and `.figure-card` — the one frame every home figure sits in, backed by the hero wallpaper (`--wall`, positioned per figure with `--wall-pos`). The card stretches to the copy column's height (never below `--figure-h`, or `--figure-h-tall` with `--tall`); `.figure-fill` lets the Base reel, the Apps stage and the Dock/Widgets figures grow with it, `.figure-stage` keeps the static figures centred. Collapses below 1300 and 640.
- `figures.css`: `.fig-panel` (a product panel floating on the wallpaper), the Handoff figure (`ho-*`: three stacked Chat windows, handwritten notes and flow arrows on one 580×480 grid) and the Sync figure (`sf-*`: the scaled phone and the desktop panel).
- `dock.css`: The coloured `.tile` squircle and its `data-tone` palette, the `.ring` limit gauge, Bottega Dock at product metrics (`pd-*`: strip, slots, running dots, open tint, separators, limit rings, value faces, scaled by `--dz`), the Dock figure (`dkf-*`: the App surface scaled by `--z`), the Widgets figure (`wgf-*` and the centred `wgc-*` cards that crossfade by `data-active`), the `.checks` list, and the narrow-screen scale step. Every colour has a `[data-theme="dark"]` counterpart taken from the product's own Dock tokens.
- `source.css`: The `.terminal` card drawn as a product window (centred in its figure card as `--figure`), the two `.source-button`s, and the license line.
- `faq.css`: The FAQ grid (heading column beside the list), hairline `<details>` rows whose plus turns into a close mark, stacked below 900.

## Rules

- The figure card owns the ground; reels and stages inside it are transparent and bring their own hairline and shadow.
- Story numbers are the only place `--accent` appears on the page.
- Copy stays literal in the catalogs; these files size and place it and never restyle product vocabulary.

[PROTOCOL]: Update this header when changing this file, then check README.md
