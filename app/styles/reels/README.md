# styles/reels/

> L2 | Parent: [styles/](../README.md)

Styles for the three animated demonstrations in the home narrative. Their React structure lives in [`components/reels/`](../../../components/reels/README.md).

## Cascade

`shared.css` must load before the three feature-specific stylesheets. It owns the outer frame, skeleton primitive, screen-reader utility, and replay control that the others extend.

## Member list

- `shared.css`: Sizes the three reels to `--figure-w`/`--figure-h` and provides `.sk`, `.sr-only`, and the replay control. The frame itself — shape, radius and ground — belongs to `base.css`, because "what is behind the picture" is one answer for all six home figures rather than a per-reel one.
- `agents.css`: Drives the one-shot sidebar camera pan and renders the Agents product shell. Its `--cam-*` values derive the crop from the shared frame and the 720x420 machine; the 26/20 margins are the only evidence that this is a crop of a machine rather than the machine itself, and what shows through them is the shared `--surface` frame.
- `app-menu.css`: Animates the editable App window from its upper-left identity through the menu action and into the completed source-chat change. Its camera leaves the machine on both the opening and the closing station, so the frame must have a ground behind those margins — it gets the shared one.
- `base-views.css`: Renders four projections of the same Base data with a stationary camera and short opacity crossfades. The machine sits inside the shared inset rather than stretching to the copy column's height, so this figure is the same size as the other five.

The reels share one outer radius because they are sibling arguments in the same home narrative. Product windows inside the frames retain their native radii.

## Motion invariant

One-shot animations must omit the loop-only return segment. With `animation-fill-mode: forwards`, retaining that segment would pin the final frame back at the beginning and erase the demonstrated conclusion.

[PROTOCOL]: Update this header when changing this file, then check README.md
