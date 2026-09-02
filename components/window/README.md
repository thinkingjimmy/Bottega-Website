# window/

> L2 | Parent: [components/](../README.md)

The canonical Bottega product window used by the Home Hero and product-faithful documentation illustrations. Its geometry follows the desktop product rather than approximating it per marketing surface.

## Member list

- `product-window.tsx`: Owns the 256px Sidebar, 40px page header, Chat/App surface selection, active Chat identity, and optional pinned Composer menu; the Home Hero and Agents feature share this exact component.
- `product-transcript.tsx`: Renders the scrollable conversation, Worked row, tool traces, Plan preview, final reply, and streaming status from one Chat record.
- `product-plan-panel.tsx`: Projects the selected Plan into the product's third-column shell without duplicating document content.
- `product-composer.tsx`: Renders the canonical two-row Composer, Agent menu, model/effort controls, permission control, send affordance, and question-card replacement state.
- `product-model-menu.tsx`: Renders the capability-driven Codex full selector or the other backends' list-only selector.

## Interaction contract

The Home Hero keeps the real demonstration interactions: Chat selection, pagination, App switching, Agent/model selection, effort/Fast controls, Plan expansion, and Plan copy. The Agents feature places the same `ProductWindow` inside an inert illustration and pins the Agent menu open. Pinned disclosure installs no outside-click or Escape listener, while the unpinned Home Hero keeps both dismissal paths. Only host dimensions and disclosure policy differ; Sidebar, transcript, Composer, menu DOM, and all canonical Hero styles remain shared.

## State and data

Conversation ownership is explicit: Agent, model, effort, Fast state, and Plan-panel ownership live with the selected Chat. Demo data comes only from `@/lib/agents`. Presentation comes only from `app/styles/hero/`: `shell.css` owns the frame, `surface.css` owns Agent output, and `composer.css` owns user input.

[PROTOCOL]: 变更时更新此头部，然后检查 README.md
