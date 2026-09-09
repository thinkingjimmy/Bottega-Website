# lib/i18n/catalogs/

> L2 | Parent: [lib/i18n/README.md](../README.md)

## Members

- `en.ts`: Canonical English catalog and structural baseline.
- `zh-cn.ts`: Complete Simplified Chinese product translation.
- `ja.ts`: Complete Japanese product translation.
- `fr.ts`: Complete French product translation.
- `es.ts`: Complete Spanish product translation.

Commands, paths, model names, product identities, and code-level terminology remain unchanged when translation would alter their meaning.
`demo.apps.items` pairs each localized switcher title with its concrete user-facing description so the two cannot drift apart.
Locale-neutral legal boilerplate stays in the owning component instead of being duplicated across catalogs.
`home.subscription` carries only the section's prose and the two roster labels; the CLI names and their sign-in commands live in `lib/agents.ts`, because a terminal command reads the same in every locale.
`features.base` follows the same three-part story in every locale: ask an Agent to organize records, explore six views of the same data, and reuse that data across Chats and Apps. Keep storage and permission details in plain language, and describe only what the product screenshot actually shows.
`features.<slug>.screenshot` is present only for the pages that open on a product screenshot; Base has none, because three code-built figures carry that page instead.
`demo.baseVisual.columnTypes` and `viewNames` are the desktop product's own `bases.columnType.*` and `bases.viewType.*` strings; translate them by copying that catalog, never by inventing a synonym. Tool names and owner-key prefixes stay untranslated because they are identifiers.
`demo.agentsVisual.relayFrom` and `queueItem` are templates, not sentences: the Chat name and Section id are substituted at render time, so the two handoffs cannot name different Chats than the sidebar shows.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
