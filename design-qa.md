# Agents collaboration visual design QA

- Source visual truth: `/var/folders/rk/_1dby6rx6yn5w9_nxbvg42kr0000gn/T/codex-clipboard-2066927c-e498-4b79-8ef1-7e0f7983e5e2.png`
- Implementation screenshot: `/Users/jimmywong/.codex/visualizations/2026/09/02/01a0609e-d8af-73b0-9694-1efa57321635/bottega-agents-collaboration-unframed-desktop.png`
- Focused implementation screenshot: `/Users/jimmywong/.codex/visualizations/2026/09/02/01a0609e-d8af-73b0-9694-1efa57321635/bottega-agents-collaboration-unframed-focused.png`
- Mobile implementation screenshot: `/Users/jimmywong/.codex/visualizations/2026/09/02/01a0609e-d8af-73b0-9694-1efa57321635/bottega-agents-collaboration-unframed-mobile.png`
- Desktop viewport: 1440 × 1000 CSS px; source: 1296 × 736 px; implementation full view: 1425 × 990 px; focused capture: 430 × 245 px from an 860 × 490 CSS px visual at 2× display density.
- Mobile viewport: 390 × 844 CSS px; capture: 375 × 812 px.
- State: Agents route, third story, standalone Plan → implement → review flow.

## Full-view comparison evidence

The collaboration flow now sits directly in the article. No product sidebar, product title bar,
window frame, caption, or generic illustration wrapper remains. Desktop retains three cards and two
handoff bridges in one row. Mobile stacks all three 330 px cards and rotates the bridge direction
without horizontal overflow.

## Focused comparison evidence

The source and implementation were reviewed together. Both preserve the persistent-Chats eyebrow,
workflow title, Visible handoff badge, Claude → Codex → Claude sequence, phase labels, Agent marks,
two named handoff tools, card contents, semantic completion states, and restrained shadows. The
implementation intentionally inherits the warm documentation background after the product shell is
removed; the white cards remain the visual anchors.

## Required fidelity surfaces

- Fonts and typography: Existing Bottega UI and mono styles preserve the reference hierarchy,
  weights, capitalization, and compact tool labels without truncation.
- Spacing and layout rhythm: The 490 px standalone canvas retains the reference's large pause
  between its heading and three-card flow. Cards and bridges remain vertically aligned on desktop.
- Colors and visual tokens: Existing `--app-*` and `--green` tokens retain the neutral cards and
  semantic completion treatments. The surrounding marketing ground replaces product-window white.
- Image quality and asset fidelity: Claude and Codex marks come from the existing shared Agent
  assets; no replacement artwork or raster placeholder was introduced.
- Copy and content: The three phases, implementation facts, review result, and handoff tool names
  match the selected reference.

## Findings

No actionable P0, P1, or P2 differences remain. The background change is the direct consequence of
the requested unframed treatment and keeps the visual consistent with the standalone matrix above.

## Comparison history

1. The initial collaboration demo lived inside the same product-window shell used by other Agent
   visuals. The user requested the same standalone treatment as the capability matrix.
2. The product sidebar, title bar, outer visual wrapper, and caption were removed while the complete
   workflow content was preserved.
3. Post-fix browser evidence confirms zero product shells or captions in the story, three cards, two
   handoff bridges, no desktop or mobile overflow, and no console errors.

## Interaction check

The flow is intentionally inert. No primary interaction applies; it retains an accessible visual
label, disables pointer interaction and text selection, and renders entirely in the static page DOM.

final result: passed
