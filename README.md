# Bottega Website — the marketing site for [Bottega](https://github.com/thinkingjimmy/Bottega)

Next.js 16 App Router + React 19 + TypeScript + plain CSS + static export

<directory>
app/ - Thirty static routes: six unprefixed English pages plus twenty-four prefixed translations
app/styles/ - Presentation split by tokens, base, shared/Agents features, hero, Apps, reels, bands, and motion
components/ - Shared site chrome, home sections, feature navigation, and product-faithful visuals
components/apps/ - Four first-party App surfaces and their shared switcher
components/features/ - Feature catalog, navigation, document article, and code-drawn Agents story
components/reels/ - Focused animated demonstrations for Agents, App editing, and Base views
components/window/ - Hero product shell, transcript, composer, model menu, and Plan panel
content/ - Five locale-specific build-time Changelog snapshots
lib/ - Typed i18n, localized demo assembly, body-map paths, and Changelog parsing
public/ - Brand assets, theme-aware hero backgrounds, and privacy-clean product screenshots
scripts/ - Build-time Changelog synchronization and static i18n audit
</directory>

<config>
design-qa.md - Latest source-to-implementation visual verification for the Agents feature visuals
next.config.ts - Thirty-page static export with no request-time data
package.json - Development, i18n tests/audit, typecheck, sync, and production-build commands
postcss.config.mjs - Empty PostCSS pipeline; the site uses plain CSS
tsconfig.json - Strict TypeScript with the `@/*` path alias
</config>

## Architecture

The website is a static marketing surface, not a second product implementation. Interactive
demonstrations reproduce the shipped product's visible contracts, while product behavior remains
owned by the Bottega desktop repository.

Each concept has one source of truth:

- `lib/i18n/catalogs/en.ts` defines the complete content shape; four translated catalogs must match it.
- `lib/agents.ts` combines stable Agent/App facts with the current locale's demonstration copy.
- `components/features/catalog.ts` combines stable feature identity with the current locale's content.
- `--bleed` and `--edge` own horizontal alignment across the shrinking hero, shared header, and
  page content.
- `SiteHeader` and `SiteFooter` are the only site chrome implementations.

The App Router serves six canonical English pages without a prefix and the same six logical pages
under `/zh-CN`, `/ja`, `/fr`, and `/es`. English and `x-default` share the unprefixed URLs; every
other language has a self-canonical URL. No route infers language from the browser, redirects by
language, or requires server data or client-side content fetching.

## Styling

The site uses plain CSS because its visual system is already expressed as custom properties.
Styles are imported in a deliberate cascade from `app/globals.css`; module ownership is documented
in `app/styles/README.md`.

Two token families stay separate:

- `--ground`, `--ink`, and `--line` describe the warm paper-like marketing surface.
- `--app-*` describes the neutral desktop UI shown inside product demonstrations.

The separation prevents marketing treatments from leaking into product-faithful UI. Motion uses
transform or opacity, starts only when its argument enters the viewport, and has a complete
`prefers-reduced-motion` fallback.

## Shared chrome

`SiteHeader` renders the same DOM in two presentations: the home hero reveals the `stage` variant
as the desktop shrinks, while content pages use the fixed-height `framed` variant. The controls use
a shared 32px height and preserve brand, Features, and Download on narrow screens.

The Features and language controls use native `details/summary`. Their entries remain in the
initial DOM, so the menu works with pointer, keyboard, and assistive technology without a client
state machine. Both language selectors use explicit alternate links, preserve the current logical
page, query, and hash, and derive their selected state only from the current route.

## Hero and home narrative

The first screen shows a working product demonstration rather than a poster. During scroll, the
desktop moves from full-bleed to an inset card; padding and border radius change instead of scaling
the whole UI, keeping text sharp.

The light and dark wallpapers follow the active theme. Auto mode resolves system preference before
first paint and continues to follow operating-system changes. Manual choices remain local to the
browser.

The home narrative contains four feature sections immediately after the hero:

1. Agents demonstrates Codex, Claude, Kimi, and OpenCode with provider-specific capabilities.
2. Apps rotates through the four first-party App surfaces.
3. Customizable demonstrates the source-chat editing workflow.
4. Base demonstrates the structured-data surface and view changes.

Each section ends with the same `FeatureLink` action and maps to one feature documentation route.
Decorative demonstrations are hidden from the accessibility tree; the surrounding copy carries the
argument in reading order.

## Feature documentation

`app/(english)/features/[slug]/page.tsx` and `app/[locale]/features/[slug]/page.tsx` generate Agents,
Apps, Customizable, and Base from one localized catalog and one wiki-style shell with a
current-page-aware icon sidebar. Agents has a dedicated article:
three static, code-built visuals explain official CLI support, capability-aware conversation
adaptation, and persistent cross-Agent Chat handoffs. The Agent picker embeds the
canonical Home Hero `ProductWindow` itself with its menu pinned open; the illustration is inert,
outside clicks cannot dismiss its evidence, and the interactive Home Hero keeps its normal
dismissal behavior. The capability matrix stands alone without product-window chrome. No real user
data is exposed. The cross-Agent handoff flow uses the same unframed treatment.

Apps, Customizable, and Base share one screenshot-and-prose article. Their product screenshots
under `public/features/` were captured from the local Bottega development build with private sidebar
content collapsed. All claims were cross-checked against current GTM notes, public feature
documentation, production source contracts, and the corresponding running product surface. Copy
must describe shipped behavior; roadmap language does not belong on these pages.

## Product fidelity

The hero and feature reels use the same dimensions, typography hierarchy, logos, and interaction
states as their desktop counterparts where those details carry meaning. Intentional deviations must
remain visible in code comments and serve framing or legibility, never invent capability.

Interactive controls only receive hover or pressed states when they perform the advertised action.
Screenshot dimensions are declared to prevent layout shift. The specialized runtime dependency is
`thinking-orbs@0.1.1`, shared with the product's streaming status treatment; icons and model marks
otherwise come from local primitives.

## Changelog

English and Simplified Chinese are synchronized from Bottega's public Changelog documentation.
Japanese, French, and Spanish are maintained by this repository. Five snapshots under `content/`
let the site clone and build independently; tests enforce matching dates, order, and item counts.

When developing as the Bottega-Dev submodule, run `pnpm sync:changelog` to refresh the snapshot.
`pnpm build` attempts the same sync with `--if-present` and keeps the committed snapshot when the
source repository is unavailable.

## Development

```bash
pnpm install --ignore-workspace
pnpm dev
pnpm check   # typecheck + test:i18n + audit:i18n
pnpm build
```

`pnpm check` chains the three gates that actually exist here. There is no `lint` script: Next.js 16
removed `next lint`, and this repository never carried an ESLint configuration of its own — a script
that cannot run is worse than no script, because it reads like a gate that is holding.

The site is an independent Git repository nested inside Bottega-Dev. The `--ignore-workspace` flag
keeps a direct install from binding its dependencies to the parent workspace. The development server
runs at `http://localhost:3000`; the static production output is written to `out/`.

The production command deliberately uses Webpack. Next.js 16's default Turbopack trace can stall
when this independent repository is checked out inside Bottega-Dev; selecting the stable builder
keeps the documented gate deterministic:

```bash
pnpm build
```

## Deployment

Vercel can build this repository directly with automatic Next.js framework detection. No Bottega
desktop runtime, local account, or sibling checkout is required.

## License

MIT
