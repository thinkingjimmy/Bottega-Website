# content/

> L2 | Parent: [project README](../README.md)

## Members

- `changelog.en.md`: English build-time milestone snapshot synchronized from public Bottega docs.
- `changelog.zh-CN.md`: Simplified Chinese snapshot synchronized from public Bottega docs.
- `changelog.ja.md`: Japanese snapshot maintained by the website repository.
- `changelog.fr.md`: French snapshot maintained by the website repository.
- `changelog.es.md`: Spanish snapshot maintained by the website repository.

All snapshots preserve the English entry dates, order, and item counts. The i18n content test enforces this contract.
All five snapshots include every public milestone through v0.2.9 (development milestone date: 2026-10-23). Japanese, French and Spanish retain every historical entry and translate the new eight-item milestone. Changelog dates describe development milestones; GitHub Release metadata owns the actual publication timestamp.

The current entry has eight items covering narrow Chat/Artifact space, Canvas controls and view stability, comments retained in the original Chat draft with focus after saving and stale-preview protection, reply/Artifact recovery with Agent Stop and background-result recovery, Dock presentation, coordinated protocol 21 updates, and the declared Canvas/Dock validation limits. The release is stable for macOS Apple silicon only. Existing content, sync passwords and account keys remain. Update the Agent-running desktops and reload Bottega Web; desktop, Web and Cloud must use the matching protocol. Dock stays Alpha with macOS 27.x and Apple silicon requirements; physical-device validation remains separate. Versions 0.2.6, 0.2.7 and 0.2.8 use the stable update channel. The shipped 0.2.5 personal build requires a manual installation of 0.2.9. No automatic-upgrade or complete device qualification is claimed by this content update.

The v0.2.7 publication is an explicit exception to the frozen milestone snapshot: its published GitHub Release notes replace the planned archive item with the actual incomplete validation status in all five locales. Preserve this correction after a future `sync:changelog`; the shipped release has nine assets and no complete acceptance evidence archive.

Builds read committed content without synchronizing it; new upstream releases enter through the explicit synchronization and translation workflow below.

`sync:changelog` refreshes only the two synchronized snapshots. When it brings in a new entry, the three
maintained translations must gain the same entry in the same change — otherwise `pnpm check` fails on
the next run, which is exactly how the `v0.1.0` entry was found missing from all three.

Entries use `**bold**` and `` `code` `` only. A markdown link survives as its label and loses its
address (see `lib/changelog.ts`): the upstream links point into the docs repository, and those paths
do not exist on this site.

[PROTOCOL]: Update this header when making changes, then check README.md.
