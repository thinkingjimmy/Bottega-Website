# styles/reels/

> L2 | Parent: [styles/](../README.md)

Styles for the three animated demonstrations in the home narrative. Their React structure lives in [`components/reels/`](../../../components/reels/README.md).

## Cascade

`shared.css` must load before the three feature-specific stylesheets. It owns the outer frame, skeleton primitive, screen-reader utility, and replay control that the others extend.

## Member list

- `shared.css`: Defines the shared 580x360 frame, consumes `--home-demo-radius` for its outer silhouette, and provides `.sk`, `.sr-only`, and the replay control. It paints no ground: whether the frame is a viewfinder or the machine's own edge is a per-reel answer, so each reel that needs a desktop declares it.
- `agents.css`: Drives the one-shot sidebar camera pan and renders the Agents product shell. Its `--cam-*` values derive the crop from the shared frame and the 720x420 machine, and it fills the frame with `--ground-2` because the 26/20 margins are the only evidence that this is a crop of a machine rather than the machine itself.
- `app-menu.css`: Animates the editable App window from its upper-left identity through the menu action and into the completed source-chat change. Its camera leaves the machine on both the opening and the closing station, so it fills the frame with the same `--ground-2` desktop as `agents.css`; page paper behind those margins would read as a screenshot mounted on a page instead of a machine sitting on a desk.
- `base-views.css`: Renders four projections of the same Base data with a stationary camera and short opacity crossfades. The frame stretches to the copy in the two-column layout and restores the shared 580x360 ratio when the columns stack.

The reels share one outer radius because they are sibling arguments in the same home narrative. Product windows inside the frames retain their native radii.

## Motion invariant

One-shot animations must omit the loop-only return segment. With `animation-fill-mode: forwards`, retaining that segment would pin the final frame back at the beginning and erase the demonstrated conclusion.

[PROTOCOL]: Update this header when changing this file, then check README.md
