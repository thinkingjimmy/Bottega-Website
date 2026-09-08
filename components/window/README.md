# components/window/

> L2 | Parent: [components/README.md](../README.md)

## Members

- `product-window.tsx`: Owns the Sidebar, Chat/Apps surface, active Chat, pagination, and optional pinned Composer menu.
- `product-apps.tsx`: Draws the Apps page in the main column and the standalone App Studio window that opens over the desktop.
- `product-transcript.tsx`: Renders localized work traces, Plan preview, reply, and streaming state.
- `product-plan-panel.tsx`: Projects the selected Plan into the third-column document shell.
- `product-composer.tsx`: Renders localized Agent/model controls, permission copy, and question-card state.
- `product-model-menu.tsx`: Renders localized labels around real backend model capabilities.

Agent IDs, model names, effort capabilities, command paths, and numeric facts remain stable. Every sentence and accessible label comes from the current locale's DemoData.

The Studio window is a second window, not a panel: only a host with a desktop behind the machine (the Home Hero) passes `onOpenApp`, and only that host renders it. It reuses the App surfaces of `components/apps/` at their natural 1120px width and scales the whole page as one block, so the product's own type sizes survive.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
