# components/pages/

> L2 | Parent: [components/README.md](../README.md)

## Members

- `home-page.tsx`: Assembles one localized home page from a catalog and its DemoData.
- `changelog-page.tsx`: Renders one locale-specific milestone snapshot with shared site chrome.
- `feature-page.tsx`: Resolves localized feature content and selects the Agents or document presentation.
- `structured-data.tsx`: Serializes the shared page JSON-LD graph into initial HTML with script-safe escaping.

Route files own URL and metadata policy; this module owns page composition and includes structured data using the same localized metadata fields. No page component infers locale from the browser.

[PROTOCOL]: Update this header when making changes, then check README.md.
