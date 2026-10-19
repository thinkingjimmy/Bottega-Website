# content/

> L2 | Parent: [project README](../README.md)

## Members

- `changelog.en.md`: English build-time milestone snapshot synchronized from public Bottega docs.
- `changelog.zh-CN.md`: Simplified Chinese snapshot synchronized from public Bottega docs.
- `changelog.ja.md`: Japanese snapshot maintained by the website repository.
- `changelog.fr.md`: French snapshot maintained by the website repository.
- `changelog.es.md`: Spanish snapshot maintained by the website repository.

All snapshots preserve the English entry dates, order, and item counts. The i18n content test enforces this contract.
All five snapshots include every public milestone through v0.2.8 (development milestone date: 2026-10-19). Japanese, French and Spanish retain the historical entries and translate the new seven-item milestone. Changelog dates describe development milestones; GitHub Release metadata owns the actual publication timestamp.

The current entry has seven items covering explicit restart for updates, independent Chat service controls, the Bottega Dock entry and normal App quit, Dock visibility and groups, native Downloads previews, simpler Chat details, and App refresh continuity with revoked-access recovery. The release is stable for macOS Apple silicon only. Protocol 19, existing content, sync passwords and account keys remain. Dock stays Alpha with macOS 27.x and Apple silicon requirements; physical-device validation remains separate. Versions 0.2.6 and 0.2.7 use the stable update channel. The shipped 0.2.5 personal build requires a manual installation of 0.2.8. No automatic-upgrade or complete device qualification is claimed by this content update.

The v0.2.7 publication is an explicit exception to the frozen milestone snapshot: its published GitHub Release notes replace the planned archive item with the actual incomplete validation status in all five locales. Preserve this correction after a future `sync:changelog`; the shipped release has nine assets and no complete acceptance evidence archive.

Builds read committed content without synchronizing it; new upstream releases enter through the explicit synchronization and translation workflow below.

`sync:changelog` refreshes only the two synchronized snapshots. When it brings in a new entry, the three
maintained translations must gain the same entry in the same change — otherwise `pnpm check` fails on
the next run, which is exactly how the `v0.1.0` entry was found missing from all three.

Entries use `**bold**` and `` `code` `` only. A markdown link survives as its label and loses its
address (see `lib/changelog.ts`): the upstream links point into the docs repository, and those paths
do not exist on this site.

[PROTOCOL]: Update this header when making changes, then check README.md.
