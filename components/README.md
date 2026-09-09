# components/

> L2 | Parent: [project README](../README.md)

## Page and chrome members

- `hero.tsx`: Runs the localized full-viewport product stage and shrink geometry.
- `agents-section.tsx`: Presents the four official Agents with localized copy and a focused reel.
- `subscription-section.tsx`: States who pays for the tokens, over a roster of the four CLIs, their sign-in commands, and the announced backends.
- `collaboration-section.tsx`: Draws work moving between Chats — plan, development with two parallel subagents, test.
- `apps-section.tsx`: Wraps the localized first-party App surface switcher.
- `customizable-section.tsx`: Presents source-bound App editing through Chat.
- `base-section.tsx`: Drives four localized views over one Base dataset.
- `fork-band.tsx`: Closes the home narrative with localized source copy and immutable commands.
- `site-header.tsx`: Renders language-preserving navigation, feature discovery, and the download control.
- `download.tsx`: Renders the site's only download control — a split button whose primary half is the visitor's own platform.
- `boot.ts`: Owns the two pre-paint scripts and the theme storage contract they share with the client runtime.
- `site-footer.tsx`: Renders the shared copyright notice, localized links, and the footer language selector.
- `site-document.tsx`: Supplies shared HTML roots with build-time `lang`, the pre-paint boot scripts, and the site's only self-hosted webfont.
- `disclosure.tsx`: Owns persistent-DOM outside-click, Escape, and opt-in hover dismissal behavior.
- `language-switcher.tsx`: Wears the footer skin over explicit locale links.
- `scene-language.tsx`: Wears the hero menu-bar input-source skin over those same locale links.
- `theme.tsx`: Resolves and follows the local theme preference.
- `icons.tsx`: Owns dependency-free SVG and product identity primitives.
- `base-charts.tsx`: Owns the two Base chart shapes — a donut and a filled line — neither of which carries its own size, so both fit a second layout.
- `reveal.tsx`: Adds one-shot entrance without hiding server content by default.

## Child modules

- `apps/`: Four localized product-faithful App surfaces.
- `features/`: Stable feature identity and localized navigation/article assembly.
- `pages/`: Locale-neutral page compositions reused by English and prefixed route trees.
- `reels/`: Focused localized demonstrations and shared playback behavior.
- `window/`: Canonical localized product window, transcript, Composer, Plan panel, Apps page, and App Studio window.

Complete catalogs enter at `pages/` and are narrowed to current-locale props before crossing client boundaries.

`boot.ts` carries no `"use client"` directive on purpose: the server reads a value out of a client module as a
throwing stub, so a pre-paint script defined there is inlined into `<head>` as invalid JavaScript.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the project README.md.
