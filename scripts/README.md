# scripts/

> L2 | Parent: [project README](../README.md)

## Members

- `sync-changelog.mjs`: Refreshes English and Simplified Chinese snapshots from the sibling public Bottega checkout when available.
- `sync-release.mjs`: Rewrites `lib/release.ts` from the public Releases API after every expected installer answers a request.
- `audit-static-i18n.mjs`: Audits all thirty canonical files, their alternates, and the canonical-only sitemap after static export.
- `audit-static-seo.mjs`: Audits the exported crawler policy, page metadata, social assets, JSON-LD, reciprocal sitemap alternates, internal links, and non-indexable 404; accepts an optional export directory for isolated verification.

Japanese, French, and Spanish snapshots are repository-owned and never overwritten by synchronization.
`pnpm build` validates catalog parity, creates a fresh export with Next.js typechecking, then runs both static audits. `pnpm check` runs that complete pipeline. Synchronization remains explicit so building never edits content snapshots or silently publishes only two updated languages.

[PROTOCOL]: Update this header when making changes, then check README.md.
