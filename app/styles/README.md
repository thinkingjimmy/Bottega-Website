# styles/

> L2 | Parent: [app/](../README.md)

The site stylesheet is split by responsibility. `globals.css` contains only the seventeen imports whose order defines the cascade.

## Cascade order

- `tokens.css` must remain first because every other stylesheet consumes its variables.
- `motion.css` must remain last because its accessibility and narrow-screen rules intentionally override earlier concerns.
- `bands.css` must precede `motion.css` so the `1300px` layout rule yields to the `900px` mobile rule.

## Member list

- `tokens.css`: Reset, theme palettes, product-surface palettes, type stacks, shared page-edge geometry, and the home-demo frame radius.
- `base.css`: Global typography, buttons, wraps, and the mirrored home-section grids.
- `features.css`: Header dropdown, home feature CTAs, wiki sidebar, detail article, screenshot frame, and responsive states.
- `agents-feature.css`: Dedicated story rhythm plus standalone capability-matrix and cross-Agent handoff visuals for the Agents detail page.
- `bands.css`: Source band, terminal, footer, changelog entries, and the wide-grid collapse rule.
- `motion.css`: One-shot entrance behavior, reduced-motion policy, and narrow-screen hero/layout overrides.
- `hero/`: Hero runway and product-window styles; see its README.
- `apps/`: Product-faithful App surface styles; see its README.
- `reels/`: Shared and feature-specific home demonstrations; see its README.

## Rules

- Keep every stylesheet below 800 lines and scoped to one concern.
- Define shared variables only in `tokens.css`; other files consume them.
- Keep a media query beside the rules it overrides unless cascade order requires a later global gate.

[PROTOCOL]: Update this header when changing this file, then check README.md
