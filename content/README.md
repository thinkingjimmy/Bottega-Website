# content/

> L2 | Parent: [project README](../README.md)

## Members

- `changelog.en.md`: English build-time milestone snapshot synchronized from public Bottega docs.
- `changelog.zh-CN.md`: Simplified Chinese snapshot synchronized from public Bottega docs.
- `changelog.ja.md`: Japanese snapshot maintained by the website repository.
- `changelog.fr.md`: French snapshot maintained by the website repository.
- `changelog.es.md`: Spanish snapshot maintained by the website repository.

All snapshots preserve the English entry dates, order, and item counts. The i18n content test enforces this contract.
All five snapshots include every public milestone through v0.4.4 (development milestone date: 2026-11-12). Japanese, French and Spanish preserve historical entries and translate the five new items. Changelog dates describe development milestones; GitHub Release metadata owns the actual publication timestamp.

The 0.4.4 entry covers Dock Widget management, Weather forecasts by city, App side panels, Skills and Provider settings, and the Chat composer and sidebar wordmark.

The 0.4.3 entry covers the plugin catalog and details, shorter Dock setup, eligible App rebuilds from source, and progress while opening the Bottega folder. It records protocol 27 and separate acceptance checks for signed Dock replacement and recovery, display and full-screen combinations, and installed upgrades.

The 0.4.2 entry covers Workflow, standalone Agent configuration and Bottega Team retirement; quiet update recovery; the startup Download latest action; macOS 26/27 Dock admission; and clearer menus, settings and plugin notices. Protocol 27 requires coordinated desktop, Web and backend delivery. Targeted retirement cleanup handles verified retired-feature records only and is separate from product startup. Retained plugins keep their source and data. Ordinary and former Lead Chats, original Project folders, Base field content, sync passwords and account keys remain. Controlled-version Dock checks do not certify physical macOS 26 or signed replacement/recovery. These instructions do not certify a completed installed upgrade.

The historical 0.4.1 entry retains its original desktop startup recovery, migration and protocol-26 compatibility scope.

The 0.4.0 entry covers unified plugin packages and source Projects, managed dependencies, automatic validated local updates and version recovery, persistent Teams and reviewed isolated writes, explicit encrypted sharing and preinstalled Weather. It also covers committed Chat draft cleanup, local image previews, live Agent identity, readable Chat width, unified Updates, CLI recovery and replacement Dock restoration. Protocol 26 requires connected desktops to update and Bottega Web to reload after the coordinated service update. Existing content, sync passwords and account keys remain. Native location approval, full four-Provider Teams, physical two-computer delivery, physical input and assistive technology retain separate validation scope. Existing Artifact limits remain unchanged.

The v0.2.7 publication is an explicit exception to the frozen milestone snapshot: its published GitHub Release notes replace the planned archive item with the actual incomplete validation status in all five locales. Preserve this correction after a future `sync:changelog`; the shipped release has nine assets and no complete acceptance evidence archive.

Builds read committed content without synchronizing it; new upstream releases enter through the explicit synchronization and translation workflow below.

`sync:changelog` refreshes only the two synchronized snapshots. When it brings in a new entry, the three
maintained translations must gain the same entry in the same change — otherwise `pnpm check` fails on
the next run, which is exactly how the `v0.1.0` entry was found missing from all three.

Entries use `**bold**` and `` `code` `` only. A markdown link survives as its label and loses its
address (see `lib/changelog.ts`): the upstream links point into the docs repository, and those paths
do not exist on this site.

[PROTOCOL]: Update this header when making changes, then check README.md.
