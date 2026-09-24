# components/home/

> L2 | Parent: [components/README.md](../README.md)

The four home sections after the hero, and the vocabulary they share.

## Members

- `agents-section.tsx`: The CLI roster (one row, one sign-in command each), the Handoff story, and the Data space story.
- `data-story.tsx`: Client half of the Agents section — the four-view case list that drives the Base reel.
- `trust-section.tsx`: Four local-first claims in one row, each behind a coloured tile, then the encrypted sync story with the phone beside the desktop.
- `apps-section.tsx`: Apps, Bottega Dock and Widgets in three cells, then three stories: the build story (`apps-story.tsx`), the Dock story with its check list, and the Widgets story with a static case list and the privacy note. Dock and Widgets have no feature page, so their stories carry no exit link.
- `apps-story.tsx`: Client half of the Apps section — the live App stage beside the build story and the four-App case list (coloured App tiles) that switches it.
- `source-section.tsx`: The build in a terminal card beside the checklist of what a fork can do; carries the page's last download control.
- `story.tsx`: `Story` (numbered copy beside a figure), `FigureCard` (the wallpaper-backed frame every home figure sits in; it stretches to the copy column, and `fill` lets a reel or stage grow with it while static figures stay centred at 580×360), `Cases` (the case list that drives a figure and stops on the first click; the caller draws each icon), and `CaseList` (the same list when nothing drives). `Story` omits the exit link when no feature page exists.

## Child modules

- `figures/`: The static figures drawn from product strings — the mid-Chat Agent switch, the encrypted sync scene, Bottega Dock, and the AI Limits widget — plus the shared mark vocabulary (coloured tiles, Dock icons, limit rings).

Every figure card reuses the hero wallpaper (`--wall`) as its backdrop with its own `--wall-pos`; the product panels floating on it come from the same `--app-*` palette as the hero window. Sections take a complete `SiteCatalog` and narrow it to their own `home.*` branch; only `data-story.tsx` and `apps-story.tsx` are client components, because only they hold carousel state.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
