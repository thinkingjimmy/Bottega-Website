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
`demo.agentsVisual.relayFrom` and `queueItem` are templates, not sentences: the Chat name and Section id are substituted at render time, so the two handoffs cannot name different Chats than the sidebar shows.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
