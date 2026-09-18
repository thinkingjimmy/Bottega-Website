# components/home/

> L2 | Parent: [components/README.md](../README.md)

The four home sections after the hero, and the vocabulary they share.

## Members

- `agents-section.tsx`: The CLI roster (one row, one sign-in command each), the Handoff story, and the Data space story.
- `data-story.tsx`: Client half of the Agents section — the four-view case list that drives the Base reel.
- `trust-section.tsx`: Four local-first claims in one row, then the encrypted sync story with the phone beside the desktop.
- `apps-section.tsx`: The App stage in a figure card beside the section copy and the four-App case list that switches it.
- `source-section.tsx`: The build in a terminal card beside the checklist of what a fork can do; carries the page's last download control.
- `story.tsx`: `Story` (numbered copy beside a figure), `FigureCard` (the wallpaper-backed frame every home figure sits in; it stretches to the copy column, and `fill` lets a reel or stage grow with it while static figures stay centred at 580×360), and `Cases` (the case list that drives a figure and stops on the first click).

## Child modules

- `figures/`: The two static figures drawn from product strings — the mid-Chat Agent switch and the encrypted sync scene.

Every figure card reuses the hero wallpaper (`--wall`) as its backdrop with its own `--wall-pos`; the product panels floating on it come from the same `--app-*` palette as the hero window. Sections take a complete `SiteCatalog` and narrow it to their own `home.*` branch; only `data-story.tsx` and `apps-section.tsx` are client components, because only they hold carousel state.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
