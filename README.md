# Bottega Website — the marketing site for [Bottega](https://github.com/thinkingjimmy/Bottega)

Next.js 16 App Router + React 19 + TypeScript + plain CSS + static export

<directory>
app/ - Thirty static pages plus crawler and social-image endpoints: six unprefixed English pages and twenty-four prefixed translations
app/styles/ - Presentation split by tokens, base, the download control, shared/Agents features, the Base figures, hero, Apps, reels, the Subscription roster, the handoff graph, bands, and motion
components/ - Shared site chrome, the download control, home sections, feature navigation, chart shapes, and product-faithful visuals
components/apps/ - Four first-party App surfaces, their shared switcher, and the id-to-surface lookup
components/features/ - Feature catalog, navigation, document article, and code-drawn Agents and Base figures
components/reels/ - Focused animated demonstrations for Agents, App editing, and Base views
components/window/ - Hero product shell, transcript, composer, model menu, Plan panel, Apps page, and App Studio window
content/ - Five locale-specific build-time Changelog snapshots
lib/ - Typed i18n, shared SEO identity and structured data, the release snapshot, localized demos, body-map paths, and Changelog parsing
public/ - Brand assets, theme-aware hero backgrounds, and privacy-clean product screenshots
scripts/ - Explicit Changelog and release-snapshot synchronization, plus static i18n and SEO audits
.github/workflows/ - One scheduled job that repoints the downloads at the newest published release
</directory>

<config>
design-qa.md - Latest source-to-implementation visual verification for the Agents feature visuals
next.config.ts - Thirty-page static export with no request-time data
package.json - Development, i18n tests, typecheck, both syncs, and production builds with mandatory i18n/SEO audits
postcss.config.mjs - Empty PostCSS pipeline; the site uses plain CSS
tsconfig.json - Strict TypeScript with the `@/*` path alias
</config>

## Architecture

The website is a static marketing surface, not a second product implementation. Interactive
demonstrations reproduce the shipped product's visible contracts, while product behavior remains
owned by the Bottega desktop repository.

Each concept has one source of truth:

- `lib/release.ts` names the public repository and the build every download link points at.
- `lib/seo/site.ts` owns the production origin and default social image dimensions for metadata, crawler routes, and audits.
- `lib/i18n/catalogs/en.ts` defines the complete content shape; four translated catalogs must match it.
- `lib/agents.ts` combines stable Agent/App facts with the current locale's demonstration copy.
- `components/features/catalog.ts` combines stable feature identity with the current locale's content.
- `--bleed` and `--edge` own horizontal alignment across the shrinking hero, shared header, and
  page content.
- `SiteHeader` and `SiteFooter` are the only site chrome implementations.
- `DownloadButton` is the only download control; every other surface links to the release archive instead.

The App Router serves six canonical English pages without a prefix and the same six logical pages
under `/zh-CN`, `/ja`, `/fr`, and `/es`. English and `x-default` share the unprefixed URLs; every
other language has a self-canonical URL. No route infers language from the browser, redirects by
language, or requires server data or client-side content fetching.

## Search and sharing

The production origin is `https://www.getbottega.app`, matching the destination of the apex domain's
redirect. Canonical URLs, hreflang, Open Graph, JSON-LD, and the sitemap all use that origin and retain
the existing trailing-slash route policy. The previous `bottega.app` origin is not the product website.

All thirty pages have localized search titles and descriptions. Feature metadata has its own catalog
fields, so descriptive search snippets do not change the visible headlines or short navigation labels.
Each page includes a large Open Graph/Twitter preview: existing feature screenshots where available,
otherwise a 1200 x 630 branded PNG generated locally at `/og.png` during the build.

`/robots.txt` permits crawling and points to `/sitemap.xml`. Normal pages permit indexing and large
image previews; the generated 404 remains `noindex`. Static JSON-LD describes the website and each
localized page, the downloadable application on home pages, and breadcrumbs on feature and Changelog
pages. Application facts reuse the release snapshot and the MIT source repository; no ratings are invented.

`pnpm build` runs catalog tests, Next.js compilation/typechecking, and audits against the fresh export.
The audits verify all thirty URLs, reciprocal HTML/XML alternates, unique metadata per locale,
social image files and dimensions, JSON-LD parity, internal link targets, and the 404 policy.
To inspect an existing export, run `pnpm audit:i18n` and `pnpm audit:seo`.

After deploying, submit `https://www.getbottega.app/sitemap.xml` in the site's Google Search Console
property and inspect representative English and translated URLs. Local export checks do not measure
index coverage or field Core Web Vitals. SoftwareApplication markup describes the product; eligibility
for app rich results also requires a genuine published rating or review under
[Google's software app guidelines](https://developers.google.com/search/docs/appearance/structured-data/software-app).

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

The Features, download, and language controls use native `details/summary`. Their entries remain in
the initial DOM, so the menu works with pointer, keyboard, and assistive technology without a client
state machine. `open` is the single switch: the download menu's hover opening writes it rather than
running beside it, because a parallel `:hover` opener makes clicking the trigger closed impossible
while the pointer is still on it. Hover is claimed only where a real pointer exists. Both language selectors use explicit alternate links, preserve the current logical
page, query, and hash, and derive their selected state only from the current route.

## Hero and home narrative

The first screen shows a working product demonstration rather than a poster. During scroll, the
desktop moves from full-bleed to an inset card; padding and border radius change instead of scaling
the whole UI, keeping text sharp.

The light and dark wallpapers follow the active theme. Auto mode resolves system preference before
first paint and continues to follow operating-system changes. Manual choices remain local to the
browser.

The desktop shows one of two surfaces. Chat is the default. The Apps surface opens on the product's
own Apps page — one card per first-party App — and then plays a single beat: the leading card takes a
press, and that App opens in its own window stacked over the desktop, crossing the first window's
right edge because a second window must read as a second window. The window runs the same surface the
Apps home section uses, drawn at its natural width and scaled as one block. Any card opens its own
App, the red traffic light closes it, and the Apps chip replays the sequence. Reduced motion skips the
beat and the movement, never the result.

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

Apps, Customizable, and Base share one prose article whose opening screenshot and per-section figures
are both optional. Apps and Customizable open on a screenshot; Base opens on its first section and
carries three figures instead. The first draws a receipt sent into a Chat and the row Base records
from it in the column beside the conversation. The second is the only animated surface outside the
home narrative: one Base panel whose six view tabs cycle on their own and stop when clicked, each tab
drawing the same eighteen rows as a table, list, Kanban board, a map of central Washington, a
three-card chart dashboard, and a gallery. The third borrows the Agents cross-Agent sketch — three
staggered frames, elbow ink, handwritten notes — to show one Chat filing that receipt, the Project
Base the row lands in, and a second Chat reading the month's total back out of it; like the Agents
sketch it stays unframed on the page's own paper, so the white cards are the anchors. Every column type, view type, tool name, and owner-key prefix in them is copied from the
desktop repository rather than approximated, down to the list and Kanban row titles, which come from
the ledger's first column because that is what the product's own projections do. The Apps and
Customizable screenshots
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

## Downloads

The download button hands over an installer rather than a repository page. Release assets carry their version
in the filename, so GitHub's `releases/latest/download/<name>` shortcut does not apply; the site keeps its own
snapshot in `lib/release.ts` and builds the asset URLs from it. No request-time or build-time network call is
involved — a link is either correct or it was already red when the snapshot was written.

`scripts/sync-release.mjs` is that file's only writer. It reads the public Releases API, claims exactly one
installer per platform by extension, and rewrites the snapshot only after each one answers a `HEAD` request.
Zero or two matches for a platform fail the run: a missing installer and a changed naming rule both have to be
loud rather than silently resolved into whichever file looks closest.

```bash
pnpm sync:release
```

`.github/workflows/sync-release.yml` runs the same script daily and on demand, and commits the result. Nothing is
asked of the Bottega repository's release workflow, and no secret beyond this repository's own `GITHUB_TOKEN` is
involved. Publish a release; the site follows within a day, or immediately from the workflow's manual trigger.

The control is one split button. Its primary half is the visitor's own platform, resolved before first paint by
`PLATFORM_BOOT` — all three links are in the DOM and CSS claims one, the way the light and dark wordmarks work, so
the button is still usable with scripting off. The caret opens a menu carrying all three platforms and nothing
else. macOS is Apple silicon only; the builds have no Intel target and the menu does not offer one.

A direct download bypasses the release notes, and with them the one-time setup each unsigned build needs on its
platform. Those steps stay on the release archive, which the footer's Download link and the public repository's
README both reach; the menu does not repeat them.

## Changelog

English and Simplified Chinese are synchronized from Bottega's public Changelog documentation.
Japanese, French, and Spanish are maintained by this repository. Five snapshots under `content/`
let the site clone and build independently; tests enforce matching dates, order, and item counts.

When developing as the Bottega-Dev submodule, run `pnpm sync:changelog` to refresh the English and
Chinese snapshots, then update the three maintained translations before building. Builds always
read the committed snapshots without modifying them, so nested and independent checkouts publish
the same content. Catalog parity is a mandatory build gate.

## Development

```bash
pnpm install --ignore-workspace
pnpm dev
pnpm check   # catalog tests + fresh build/typecheck + i18n and SEO audits
pnpm build
```

`pnpm sync:release` is a release-time step rather than a build step: it needs the network, and `pnpm build` must
stay offline.

`pnpm check` runs the complete production validation pipeline through `pnpm build`, so it cannot pass
against stale or missing exported HTML. `pnpm typecheck` remains available for a quick source check.
There is no `lint` script: Next.js 16
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
