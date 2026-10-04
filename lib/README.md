# lib/

> L2 | Parent: [project README](../README.md)

## Members

- `agents.ts`: Combines locale-neutral product facts with localized demo and App-switch copy.
- `body-map.json`: Stores immutable Fitness Log anatomical paths.
- `changelog.ts`: Parses one locale-specific build-time Changelog snapshot; renders bold, inline code, and link labels.
- `release.ts`: Exposes repository/release URLs and nullable platform download URLs from the verified snapshot.
- `release.json`: Records the published tag, version, prerelease channel, and available installer filenames; `scripts/sync-release.mjs` is its only writer.
- `i18n/`: Owns locale contracts, catalogs, path resolution, metadata, and content tests.
- `seo/`: Owns production site identity, social image dimensions, and localized structured data.

Client modules may import `i18n/locale.ts`; complete catalogs remain on the server side of route composition.

[PROTOCOL]: Update this header when making changes, then check README.md.
