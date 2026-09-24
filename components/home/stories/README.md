# components/home/stories/

> L2 | Parent: [components/home/README.md](../README.md)

The client halves of three home stories. Each pairs `usePlayWhenSeen` (the carousel starts only once its figure is on screen) with `useCarousel` (five-second dwell, stops on the first click) and hands the active index to a figure; everything else about the story stays in the server sections.

## Members

- `data-story.tsx`: Data space (02) — the four-view case list that drives the Base reel.
- `apps-story.tsx`: Apps build (05) — the four-App case list (coloured App tiles) that switches the live App stage.
- `widgets-story.tsx`: Widgets (07) — four cases (AI Limits, AI Usage, monthly spend, workout streak) driving `figures/widgets-figure.tsx`.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
