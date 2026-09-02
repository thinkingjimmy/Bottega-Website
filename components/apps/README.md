# apps/

> L2 | Parent: [components/](../README.md)

The Apps home section pairs four product-faithful surfaces with one catalog that also acts as their switcher.

## Member list

- `apps-stage.tsx`: Drives the four surfaces, stops automatic rotation after user input, honors reduced motion, and links to the Apps detail page.
- `surface-canvas.tsx`: Reconstructs the Design Canvas chrome around an intentionally unreadable Agent-authored canvas.
- `surface-chrome.tsx`: Provides shared Base toolbar, skeleton, and Design Canvas icon primitives.
- `surface-fitness.tsx`: Reconstructs the Fitness Log training sheet and muscle heatmap.
- `surface-kanban.tsx`: Reconstructs the Development Kanban lanes and task cards.
- `surface-ledger.tsx`: Reconstructs the Expense Tracker ledger with a separate overlaid analysis surface.

## Geometry contracts

- `0.58` is the single scale factor for every App miniature.
- `994.29px` is the natural width that activates the same responsive states as the source Apps.
- `780px` is the natural height required to preserve the complete Fitness illustration.
- `.app-stage` must not be renamed to `.stage`; that name belongs to the sticky hero runway.

Data lives in `@/lib/agents` and `@/lib/body-map.json`; presentation lives in `app/styles/apps/`.

[PROTOCOL]: 变更时更新此头部，然后检查 README.md
