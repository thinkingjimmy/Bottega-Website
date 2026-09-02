# features/

> L2 | Parent: [components/](../README.md)

Feature navigation primitives, shared content catalog, and route-specific article presentations.

## Member list

- `agents-feature-article.tsx`: Composes the three evidence-led stories unique to the Agents route.
- `agents-feature-visuals.tsx`: Reuses the canonical Home Hero ProductWindow for the inert Agent picker, then renders standalone capability-matrix and persistent-Chat handoff visuals.
- `catalog.ts`: Defines the four feature identities, menu summaries, Agents headline, and screenshot-backed document content.
- `document-feature-article.tsx`: Renders the shared screenshot-and-prose article used by Apps, Customizable, and Base.
- `feature-icon.tsx`: Wraps a catalog icon in the framed tile used by the feature documentation sidebar.
- `feature-menu.tsx`: Client `<details>` shell for the header dropdown; owns click-outside and Escape dismissal while its content stays server-rendered.
- `feature-link.tsx`: Renders the canonical home-section `Read More` link.
- `feature-sidebar.tsx`: Renders the current-page-aware sidebar shared by all feature detail routes.

[PROTOCOL]: 变更时更新此头部，然后检查 README.md
