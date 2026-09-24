# components/home/

> L2 | Parent: [components/README.md](../README.md)

The four home sections after the hero, and the vocabulary they share.

## Members

- `agents-section.tsx`: The CLI roster (one row, one sign-in command each), the Handoff story (01, in a tall figure card), and the Data space story (02).
- `trust-section.tsx`: Four local-first claims in one row, each behind a coloured tile, then the Open source story (03: the build terminal, Fork on GitHub and Browse source, the license line) and the encrypted sync story (04) with the phone beside the desktop.
- `apps-section.tsx`: Apps, Bottega Dock and Widgets in three cells, then three stories: the build story (05, `stories/apps-story.tsx`), the Dock story (06) with its check list, and the Widgets story (07, `stories/widgets-story.tsx`). Dock and Widgets have no feature page, so their stories carry no exit link.
- `faq-section.tsx`: The last section — a heading column (title, one line and the GitHub issues link) beside seven native `<details>` disclosures, the first one open. It replaced "Release your own version", whose argument moved into the Open source story.
- `story.tsx`: `Story` (numbered copy beside a figure), `FigureCard` (the wallpaper-backed frame every home figure sits in; it stretches to the copy column, `fill` lets a reel or stage grow with it, `tall` gives a static figure 580×480 instead of 580×360), and `Cases` (the case list that drives a figure and stops on the first click; the caller draws each icon). `Story` omits the exit link when no feature page exists.

## Child modules

- `stories/`: The client stories — the three that hold carousel state (Data space, Apps build, Widgets).
- `figures/`: The figures drawn from product strings and product metrics — the stacked Handoff Chats, the build terminal, the encrypted sync scene, Bottega Dock with the Expense Tracker open, and the four widgets — plus the shared mark vocabulary (coloured tiles, Dock icons, limit rings) and the Dock parts.

Every figure card reuses the hero wallpaper (`--wall`) as its backdrop with its own `--wall-pos`; the product panels floating on it come from the same `--app-*` palette as the hero window. Sections take a complete `SiteCatalog` and narrow it to their own `home.*` branch; only the files in `stories/` are client components, because only they hold carousel state.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
