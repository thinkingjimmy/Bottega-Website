# components/

> L2 | Parent: [project README](../README.md)

## Page and chrome members

- `hero.tsx`: Runs the localized full-viewport product stage and shrink geometry, and stacks the phone that mirrors the open Chat.
- `site-header.tsx`: Renders language-preserving navigation, feature discovery, and the download control in three skins — the shrinking stage band, the sticky framed bar of subpages, and the floating bar.
- `floating-header.tsx`: Slides the floating skin in once the stage band has scrolled off the top of the home page, and back out when it returns, so one navigation is on screen at a time.
- `download.tsx`: Renders the site's only download control — a split button whose primary half is the visitor's own platform.
- `boot.ts`: Owns the two pre-paint scripts and the theme storage contract they share with the client runtime.
- `site-footer.tsx`: Renders the shared copyright notice, localized links, and the footer language selector.
- `site-document.tsx`: Supplies shared HTML roots with build-time `lang`, the pre-paint boot scripts, the site's only self-hosted webfont, and the single Vercel Speed Insights mount.
- `disclosure.tsx`: Owns persistent-DOM outside-click, Escape, and opt-in hover dismissal behavior.
- `language-switcher.tsx`: Wears the footer skin over explicit locale links.
- `scene-language.tsx`: Wears the hero menu-bar input-source skin over those same locale links.
- `theme.tsx`: Resolves and follows the local theme preference.
- `icons.tsx`: Owns dependency-free SVG and product identity primitives.
- `base-charts.tsx`: Owns the two Base chart shapes — a donut and a filled line — neither of which carries its own size, so both fit a second layout.
- `reveal.tsx`: Adds one-shot entrance without hiding server content by default.

## Child modules

- `apps/`: Four localized product-faithful App surfaces.
- `home/`: The four home sections after the hero (Agents, Trust, Apps, FAQ), their shared story/figure/case-list vocabulary, the client stories that hold carousel state, and the figures.
- `features/`: Stable feature identity and localized navigation/article assembly.
- `pages/`: Locale-neutral page compositions reused by English and prefixed route trees.
- `reels/`: The Base views reel and the shared playback hooks.
- `window/`: Canonical localized product window, transcript, Composer, Plan panel, Apps page, App Studio window, and the phone mirror.

Complete catalogs enter at `pages/` and are narrowed to current-locale props before crossing client boundaries.

`boot.ts` carries no `"use client"` directive on purpose: the server reads a value out of a client module as a
throwing stub, so a pre-paint script defined there is inlined into `<head>` as invalid JavaScript.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the project README.md.
