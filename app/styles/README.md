# styles/

> L2 | Parent: [app/](../README.md)

The site stylesheet is split by responsibility. `globals.css` contains only the twenty-seven imports whose order defines the cascade.

## Cascade order

- `tokens.css` must remain first because every other stylesheet consumes its variables.
- `motion.css` must remain last because its accessibility and narrow-screen rules intentionally override earlier concerns.
- `bands.css` must precede `motion.css` so the `1300px` layout rule yields to the `900px` mobile rule.

## Member list

- `tokens.css`: Reset, the one neutral palette shared by site and product surfaces (light and dark, `--wall`, `--card`, `--accent`, `--app-shadow`), App paper tokens, type stacks (sans/mono/serif plus the handwriting stack), shared page-edge geometry, and the one figure frame every home section reads (`--figure-w/h`, the taller `--figure-h-tall`, `--figure-inset-*`, `--home-demo-radius`).
- `base.css`: Global typography, wraps, header navigation geometry, the content root, and the two-column split used by feature visuals.
- `download.css`: The split download button, its platform panel, and its header skin.
- `features.css`: Header dropdown, wiki sidebar, detail article, screenshot frame, and responsive states.
- `agents-feature.css`: Dedicated story rhythm plus the standalone capability matrix and the annotated cross-Agent handoff sketch for the Agents detail page.
- `bands.css`: Localized footer/language disclosure, changelog entries, and wide-grid collapse.
- `motion.css`: One-shot entrance behavior, reduced-motion policy, and narrow-screen hero/layout overrides.
- `base-feature/`: The three Base detail-page figures; see its README.
- `hero/`: Hero runway, product-window and phone styles; see its README.
- `home/`: The four home sections — section skeleton, cell grids and case lists, story rows and the wallpaper figure card (standard and tall), the figures (Handoff, Sync, Bottega Dock at product metrics, the centred widget cards, the coloured tiles), the Open source terminal and buttons, and the FAQ; see its README.
- `apps/`: Product-faithful App surface styles; see its README.
- `reels/`: The Base views reel and its shared primitives; see its README.

## Rules

- Keep every stylesheet below 800 lines and scoped to one concern.
- Define shared variables only in `tokens.css`; other files consume them.
- Every home figure is `--figure-w` x `--figure-h` and sits in `home/stories.css`'s figure card. Each figure derives that size its own way (a ratio, a camera scale), but none of them may write the numbers down again.
- Comment headers must not contain `*/` mid-line (a `--ink*/--line*` shorthand closes the comment and breaks the CSS parse); spell scales out in words.
- Keep a media query beside the rules it overrides unless cascade order requires a later global gate.

[PROTOCOL]: Update this header when changing this file, then check README.md
