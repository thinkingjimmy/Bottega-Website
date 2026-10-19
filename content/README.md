# content/

> L2 | Parent: [project README](../README.md)

## Members

- `changelog.en.md`: English build-time milestone snapshot synchronized from public Bottega docs.
- `changelog.zh-CN.md`: Simplified Chinese snapshot synchronized from public Bottega docs.
- `changelog.ja.md`: Japanese snapshot maintained by the website repository.
- `changelog.fr.md`: French snapshot maintained by the website repository.
- `changelog.es.md`: Spanish snapshot maintained by the website repository.

All snapshots preserve the English entry dates, order, and item counts. The i18n content test enforces this contract.
All five snapshots include every public milestone through v0.2.7 (development milestone date: 2026-10-18), including the preceding Dock Alpha source candidate. Japanese, French, and Spanish retain the historical entries and translate both additions. Changelog dates describe development milestones, not publication timestamps; GitHub Release metadata owns the actual publication time.

The current entry has eight items covering the official stable macOS Apple silicon release, native Codex permissions and its exact CLI pin, Chat continuity, title generation, connection checks, the actual validation status, and the Dock Alpha requirements. When Codex is selected for titles, the first message supplies the title and the selected Agent and model stay saved. A user can select another supported title Agent; Bottega does not switch Agents automatically. No Windows or Linux installer is distributed. Version 0.2.6 uses the stable update channel; the 0.2.5 personal build requires a manual installation of 0.2.7. Existing content, sync passwords and account keys remain. This describes the upgrade path without claiming an automatic-upgrade test passed.

The v0.2.7 publication is an explicit exception to the frozen milestone snapshot: its published GitHub Release notes replace the planned archive item with the actual incomplete validation status in all five locales. Preserve this correction after a future `sync:changelog`; the shipped release has nine assets and no complete acceptance evidence archive.

Builds read committed content without synchronizing it; new upstream releases enter through the explicit synchronization and translation workflow below.

`sync:changelog` refreshes only the two synchronized snapshots. When it brings in a new entry, the three
maintained translations must gain the same entry in the same change — otherwise `pnpm check` fails on
the next run, which is exactly how the `v0.1.0` entry was found missing from all three.

Entries use `**bold**` and `` `code` `` only. A markdown link survives as its label and loses its
address (see `lib/changelog.ts`): the upstream links point into the docs repository, and those paths
do not exist on this site.

[PROTOCOL]: Update this header when making changes, then check README.md.
