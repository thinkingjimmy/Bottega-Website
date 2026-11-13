# lib/i18n/catalogs/

> L2 | Parent: [lib/i18n/README.md](../README.md)

## Members

- `en.ts`: Canonical English catalog and structural baseline.
- `zh-cn.ts`: Complete Simplified Chinese product translation.
- `ja.ts`: Complete Japanese product translation.
- `fr.ts`: Complete French product translation.
- `es.ts`: Complete Spanish product translation.

Commands, paths, model names, product identities, and code-level terminology remain unchanged when translation would alter their meaning.
`meta` owns the homepage search title, description, and default social image alt text. Each `features.<slug>` also owns a `metaTitle` and `metaDescription` so search snippets can describe the feature without changing its navigation label or visible headline. Metadata and structured data consume these same fields in every language. Search and social copy describes product capabilities; first-party and bundled-component license terms remain explicit in Trust and the FAQ.
`demo.apps.items` pairs each localized switcher title with its concrete user-facing description so the two cannot drift apart.
Locale-neutral legal boilerplate stays in the owning component instead of being duplicated across catalogs.
`download` distinguishes direct installer actions from release-page fallbacks, including compact labels, installation notes and prerelease status. Platform FAQ copy describes the actual release scope; metadata does not promise unavailable installers.
The five platform FAQs describe the published 0.4.5 official stable ARM64 Mac release and protocol 27. They retain the 0.2.5 manual-installation path and the official stable channel from 0.2.6 onward. Workflow, standalone Agent configurations and Bottega Team are retired; ordinary and former Lead Chats, original Project folders, Base field content, sync passwords and account keys remain. Product startup does not perform retirement cleanup. The FAQs point to the 0.4.2 cleanup scope and the 0.4.3 Dock validation scope. First-party code remains MIT-licensed; bundled components retain their own terms, including the modified Canvas, Slides and Design System Community License. Product availability comes from the published GitHub Release and synchronized snapshot; website deployment and live-route acceptance are recorded separately. The copy does not certify physical-device or installed-upgrade acceptance.
The platform FAQ also owns the current upgrade path and separates the Dock requirements (macOS 26.x or 27.x and Apple silicon for the whole plugin) from the main app. `home.apps.dock` states the coexistence, replacement and physical macOS 26 validation limits. `features.agentsArticle` explains Codex native approval, separate CLI qualifications, workspace permission changes and Plan limits in all five locales; retired strict-role admission is no longer presented as a current capability.
`home.subscription` carries only the section's prose and the two roster labels; the CLI names and their sign-in commands live in `lib/agents.ts`, because a terminal command reads the same in every locale.
`features.base` follows the same three-part story in every locale: ask an Agent to organize records, explore six views of the same data, and reuse that data across Chats and Apps. Keep storage and permission details in plain language, and describe only what the product screenshot actually shows.
`features.<slug>.screenshot` is present only for the pages that open on a product screenshot; Base has none, because three code-built figures carry that page instead.
`demo.baseVisual.columnTypes` and `viewNames` are the desktop product's own `bases.columnType.*` and `bases.viewType.*` strings; translate them by copying that catalog, never by inventing a synonym. Tool names and owner-key prefixes stay untranslated because they are identifiers.
`demo.agentsVisual.relayFrom` and `queueItem` are templates, not sentences: the Chat name and Section id are substituted at render time, so the two handoffs cannot name different Chats than the sidebar shows.

The Base articles also explain closed-app folder backups, fixed setup locations and unsupported file-sync directories in all five locales.

[PROTOCOL]: Update this header when making changes, then check README.md.

Ordinary Codex Chat uses native protocol/capability admission. Native generated titles and isolated editing retain separate qualified-reference requirements; quota queries and optional updates are independent. The five current FAQs and permission introductions match that scope.
