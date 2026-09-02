# hero/

> L2 | Parent: [styles/](../README.md)

The first-screen presentation: one sticky runway, a theme-aware desktop scene, and a product-faithful chat window.

## Member list

- `shell.css`: Owns `.hero-pin`, `.stage`, `.scene`, both SiteHeader skins, product-window shell, sidebar, and third-panel geometry.
- `surface.css`: Owns the transcript, message turns, tool activity, Plan preview, and streaming status presentation.
- `composer.css`: Owns the positioned Composer, Agent/model menus, capability states, questions, and permission cards; feature hosts may re-anchor a disclosed menu without restyling it.

## Structural contracts

- Shrinking changes stage padding and radius, never `transform: scale`; product text stays on the native pixel grid.
- `--bleed` is registered as a length and remains the shared source for stage, Header, and content alignment.
- `.stage` belongs only to the sticky hero runway; home-section illustrations use scoped class names.
- `.site-header--stage` sits above the scene and allows visible overflow so its Features panel can cross the desktop boundary. Its controls remain invisible and non-interactive until the top band is tall enough to contain them.
- `.scene` owns clipping and corner radius. Individual window panels clip their own moving faces instead of clipping the shared Header.
- The product window may shrink vertically; its transcript and panel bodies own scrolling.
- The Agents feature embeds the same `.window` tree and Hero styles; it may change host dimensions and pin one Composer menu as inert evidence, never duplicate the Sidebar or Composer vocabulary.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
