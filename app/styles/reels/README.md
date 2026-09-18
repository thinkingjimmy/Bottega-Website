# styles/reels/

> L2 | Parent: [styles/](../README.md)

Styles for the animated Base demonstration in the home narrative. Its React structure lives in [`components/reels/`](../../../components/reels/README.md).

## Cascade

`shared.css` must load before `base-views.css`. It owns the reel size, the skeleton primitive and the screen-reader utility; the static home figures in `home/figures.css` reuse the skeleton.

## Member list

- `shared.css`: Sizes the reel to `--figure-w`/`--figure-h` and provides `.sk` and `.sr-only`. The frame itself — shape, radius and the wallpaper ground — belongs to `home/stories.css`, because "what is behind the picture" is one answer for every home figure rather than a per-reel one.
- `base-views.css`: Renders four projections of the same Base data with a stationary camera and short opacity crossfades. The camera derives the machine's natural height from the inset box, so when the figure card stretches with the copy column the machine shows more rows, a two-row chart grid, and another gallery row instead of scaling up.

The reel shares the figure card's outer radius; the product window inside it retains its native radius.

[PROTOCOL]: Update this header when changing this file, then check README.md
