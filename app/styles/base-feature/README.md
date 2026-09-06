# styles/base-feature/

> L2 | Parent: [styles/](../README.md)

Four stylesheets for the three figures on the Base detail page. Their React structure lives in
[`components/features/`](../../../components/features/README.md).

## Cascade

`frame.css` must load before the other three: it owns the figure frame, the reset that strips
`.feature-prose` typography off everything inside a figure, and the two surfaces more than one
figure draws (the ledger table and the view bar).

Every selector in this folder is prefixed with `.bfd-figure`. That is not decoration: the figures
live inside a `.feature-prose section`, whose `p`/`li`/`ul` rules would otherwise win on
specificity. The prefix keeps component rules at `0,2,0` and above, the reset at `0,1,1`, and the
article's prose below both — so no rule here needs `!important`.

## Member list

- `frame.css`: Figure frame and caption, the prose reset, the view tab bar, the ledger table, the receipt attachment, the Chat sidebar row, and the ten column-type marks.
- `receipt.css`: The first figure — a real Chat column (header, attachment, bubble, tool trace, reply, Composer) beside the Base column it writes into.
- `views.css`: The second figure — the auto-cycling view bar and the six panes: table, list, Kanban, the Washington basemap, the three-card chart dashboard, and the gallery.
- `sharing.css`: The third figure — three staggered frames, two elbow handoffs, two pointer strokes, and four handwritten notes, in the same sketch vocabulary as `agents-feature.css`.

## Rules

- Keep each stylesheet below 800 lines and scoped to one figure.
- Absolute scene coordinates (`sharing.css`) must match the `INK` path data in
  `base-feature-visuals.tsx`; a stroke endpoint and a frame centre are the same number written twice.
- `frame.css` strips `.feature-prose`'s `p`/`li`/`ul`/`section` rules off everything inside a figure.
  The `section` line is not defensive tidiness: that rule's 42px padding once silently squeezed the
  Base frame's table while the frame itself still measured correctly.
- Only the six-view figure is interactive. The other two carry `role="img"` and `inert`, and their
  surface disables pointer events.
- Two surfaces, deliberately: `.bfd-visual` frames the first two figures because they draw the
  product's own machine, and `.bfd-sketch` leaves the third unframed on the page's warm paper
  because it draws a page of notes. White cards on a white frame read as a mounted screenshot, and
  handwriting on white stops reading as handwriting. Agents splits its three the same way.

[PROTOCOL]: Update this header when members or responsibilities change, then verify the parent README.md.
