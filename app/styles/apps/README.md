# styles/apps/

> L2 | Parent: [styles/](../README.md)

Product-faithful surfaces for the four Apps shown in the home narrative. React structure lives in [`components/apps/`](../../../components/apps/README.md); demonstration data lives in `@/lib/agents` and `@/lib/body-map.json`.

## Member list

- `stage.css`: Owns the Apps frame, the four scaled pane layers, and the localized title-and-description switcher. The outer frame consumes the same `--home-demo-radius` token as the three reels.
- `base.css`: Implements the shared Base App chrome and the Kanban, table, and analysis surfaces used by the bundled Base Apps.
- `canvas.css`: Implements Design Canvas chrome, overlays, whiteboard, anchors, and dock using the App's native paper tokens.
- `fitness.css`: Implements Fitness Log as a training-manual surface with its masthead, anatomy map, heat zones, and exercise index.

## Geometry invariants

- `.app-stage` owns `--z: 0.518`; its visible frame dimensions and every pane transform derive from that one scale.
- Each `.app-pane` remains 1120x780 in natural coordinates. The width preserves the real wide-layout breakpoints; the height keeps the complete anatomy view and legend in frame.
- Dimensions belong on `.app-pane`, not the individual `.dc`, `.ba`, or `.fl` surfaces, whose own `width: 100%` rules would otherwise override the canvas.
- The frame uses the shared home-demo radius, while controls and surfaces inside it retain their product-native corner radii.

[PROTOCOL]: Update this header when changing this file, then check README.md
