# styles/

> L2 | Parent: [app/](../README.md)

The site stylesheet is split by responsibility. `globals.css` contains only the twenty-five imports whose order defines the cascade.

## Cascade order

- `tokens.css` must remain first because every other stylesheet consumes its variables.
- `motion.css` must remain last because its accessibility and narrow-screen rules intentionally override earlier concerns.
- `bands.css` must precede `motion.css` so the `1300px` layout rule yields to the `900px` mobile rule.

## Member list

- `tokens.css`: Reset, theme palettes, product-surface palettes, type stacks (sans/mono/serif plus the handwriting stack), shared page-edge geometry, and the home-demo frame radius.
- `base.css`: Global typography, wraps, header navigation geometry, and the mirrored home-section grids.
- `download.css`: The split download button, its platform panel, and both the header and Fork band skins.
- `features.css`: Header dropdown, home feature CTAs, wiki sidebar, detail article, screenshot frame, and responsive states.
- `agents-feature.css`: Dedicated story rhythm plus the standalone capability matrix and the annotated cross-Agent handoff sketch for the Agents detail page.
- `subscription.css`: The Subscription roster — the one home figure that is a list of CLIs rather than a product window.
- `collaboration.css`: The handoff graph for the Collaboration section — the one home figure drawn as a graph, plus the stacked layout it falls back to below 640.
- `bands.css`: Source band and its actions, terminal, localized footer/language disclosure, changelog entries, and wide-grid collapse.
- `motion.css`: One-shot entrance behavior, reduced-motion policy, and narrow-screen hero/layout overrides.
- `base-feature/`: The three Base detail-page figures; see its README.
- `hero/`: Hero runway and product-window styles; see its README.
- `apps/`: Product-faithful App surface styles; see its README.
- `reels/`: Shared and feature-specific home demonstrations; see its README.

## Rules

- Keep every stylesheet below 800 lines and scoped to one concern.
- Define shared variables only in `tokens.css`; other files consume them.
- Keep a media query beside the rules it overrides unless cascade order requires a later global gate.

[PROTOCOL]: Update this header when changing this file, then check README.md
