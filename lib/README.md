# lib/

> L2 | Parent: [project README](../README.md)

## Members

- `agents.ts`: Combines locale-neutral product facts with localized demo and App-switch copy.
- `body-map.json`: Stores immutable Fitness Log anatomical paths.
- `changelog.ts`: Parses one locale-specific build-time Changelog snapshot; renders bold, inline code, and link labels.
- `i18n/`: Owns locale contracts, catalogs, path resolution, metadata, and content tests.

Client modules may import `i18n/locale.ts`; complete catalogs remain on the server side of route composition.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the project README.md.
