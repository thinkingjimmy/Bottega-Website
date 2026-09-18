# components/apps/

> L2 | Parent: [components/README.md](../README.md)

## Members

- `surface-canvas.tsx`: Reconstructs translated Design Canvas controls around inert Agent-authored HTML.
- `surface-kanban.tsx`: Reconstructs translated Development Kanban lanes and records.
- `surface-ledger.tsx`: Reconstructs translated Expense Tracker detail and analysis views; the analysis sheet floats over the 34-row ledger and its donut comes from `components/base-charts.tsx`.
- `surface-fitness.tsx`: Reconstructs translated Fitness Log copy over stable body-map paths.
- `surface-chrome.tsx`: Provides shared Base toolbar, skeleton, and Design Canvas icon primitives.
- `surfaces.ts`: Maps an App id to its surface; the Apps section (`components/home/apps-section.tsx`) and the Hero's Studio window both read it.

Surface geometry is locale-neutral. All visitor-visible copy arrives through the current DemoData graph.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
