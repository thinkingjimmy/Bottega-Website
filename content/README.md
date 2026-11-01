# content/

> L2 | Parent: [project README](../README.md)

## Members

- `changelog.en.md`: English build-time milestone snapshot synchronized from public Bottega docs.
- `changelog.zh-CN.md`: Simplified Chinese snapshot synchronized from public Bottega docs.
- `changelog.ja.md`: Japanese snapshot maintained by the website repository.
- `changelog.fr.md`: French snapshot maintained by the website repository.
- `changelog.es.md`: Spanish snapshot maintained by the website repository.

All snapshots preserve the English entry dates, order, and item counts. The i18n content test enforces this contract.
All five snapshots include every public milestone through v0.2.12 (development milestone date: 2026-11-01). Japanese, French and Spanish preserve historical entries and translate the new four-item milestone with compatibility, validation limits and component licenses. Changelog dates describe development milestones; GitHub Release metadata owns the actual publication timestamp.

The current entry covers native Canvas/Slides editing and comments, bounded AI candidates with explicit acceptance/Undo, consistent tab/tool controls, and original exports/presentation. AI review stays unavailable when the selected Agent cannot provide isolated editing. Protocol23 requires connected desktops to update and Bottega Web to reload after the coordinated service update. Existing content, sync passwords and account keys remain; no reset is required. Full 2.3 operation parity, physical devices, target-app reopening, clipboard/drop and continuous paid-model acceptance remain explicitly separate.

The v0.2.7 publication is an explicit exception to the frozen milestone snapshot: its published GitHub Release notes replace the planned archive item with the actual incomplete validation status in all five locales. Preserve this correction after a future `sync:changelog`; the shipped release has nine assets and no complete acceptance evidence archive.

Builds read committed content without synchronizing it; new upstream releases enter through the explicit synchronization and translation workflow below.

`sync:changelog` refreshes only the two synchronized snapshots. When it brings in a new entry, the three
maintained translations must gain the same entry in the same change — otherwise `pnpm check` fails on
the next run, which is exactly how the `v0.1.0` entry was found missing from all three.

Entries use `**bold**` and `` `code` `` only. A markdown link survives as its label and loses its
address (see `lib/changelog.ts`): the upstream links point into the docs repository, and those paths
do not exist on this site.

[PROTOCOL]: Update this header when making changes, then check README.md.
