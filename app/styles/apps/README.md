# styles/apps/

> L2 | Parent: [styles/](../README.md)

Product-faithful surfaces for the four Apps shown in the home narrative. React structure lives in [`components/apps/`](../../../components/apps/README.md); demonstration data lives in `@/lib/agents` and `@/lib/body-map.json`.

## Member list

- `stage.css`: Owns the Apps stage — the canvas that fills the home figure card (580 wide, 360 or as tall as the copy column) — and the four scaled pane layers that fade in one at a time. The stage reads `--figure-w`/`--figure-h` like every other home figure; the case list that switches the panes is `home/sections.css`'s `.cases`, shared with the Base view switcher.
- `base.css`: Implements the shared Base App chrome and the Kanban, table, and analysis surfaces used by the bundled Base Apps.
- `canvas.css`: Implements Design Canvas chrome, overlays, whiteboard, anchors, and dock using the App's native paper tokens.
- `fitness.css`: Implements Fitness Log as a training-manual surface with its masthead, anatomy map, heat zones, and exercise index.

## Geometry invariants

- `.app-stage` owns `--z: 0.4`. It is solved, not tuned: the inset box is 528x312, 780 x 528/312 = 1320, so 312/780 lands a 1320x780 canvas exactly inside the box with its full height in frame.
- Each `.app-pane` is 1320 wide and at least 780 tall in natural coordinates; a taller figure card grows the pane by 1/`--z` so the surface fills the frame with more content rather than a larger scale. The width preserves the real wide-layout breakpoints (>900 and >860); 780 keeps the complete anatomy view and legend in frame — 775 is where the legend falls out.
- Dimensions belong on `.app-pane`, not the individual `.dc`, `.ba`, or `.fl` surfaces, whose own `width: 100%` rules would otherwise override the canvas.
- The stage sits in the shared figure card (wallpaper ground, home-demo radius); each pane floats on it with a hairline and an ambient shadow whose values are divided by `--z`, so they land on screen at their real size.

[PROTOCOL]: Update this header when changing this file, then check README.md
