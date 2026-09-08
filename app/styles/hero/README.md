# hero/

> L2 | Parent: [styles/](../README.md)

The first-screen presentation: one sticky runway, a theme-aware desktop scene, and a product-faithful chat window.

## Member list

- `shell.css`: Owns `.hero-pin`, `.stage`, `.scene`, both SiteHeader skins, the menu-bar system controls, product-window shell, sidebar, and third-panel geometry.
- `surface.css`: Owns the transcript, message turns, tool activity, Plan preview, and streaming status presentation.
- `composer.css`: Owns the positioned Composer, Agent/model menus, capability states, questions, and permission cards; feature hosts may re-anchor a disclosed menu without restyling it.
- `apps.css`: Owns the Apps page card grid, its lead-card press cue, and the App Studio window that stacks over the desktop.

## Structural contracts

- Shrinking changes stage padding and radius, never `transform: scale`; product text stays on the native pixel grid.
- `--bleed` is registered as a length and remains the shared source for stage, Header, and content alignment.
- `.stage` belongs only to the sticky hero runway; home-section illustrations use scoped class names.
- `.site-header--stage` sits above the scene and allows visible overflow so its Features panel can cross the desktop boundary. Its controls remain invisible and non-interactive until the top band is tall enough to contain them.
- `.scene` owns clipping and corner radius. Individual window panels clip their own moving faces instead of clipping the shared Header.
- The menu-bar input-source and theme controls share one shape rule; only the system-following theme owns the Auto dot.
- The product window may shrink vertically; its transcript and panel bodies own scrolling.
- The Agents feature embeds the same `.window` tree and Hero styles; it may change host dimensions and pin one Composer menu as inert evidence, never duplicate the Sidebar or Composer vocabulary.
- `.app-studio` is a sibling of `.window`, not a child: a second window must be able to cross the first one's edge. It is positioned from the scene body's centre, and `--studio-anchor` carries the one offset that separates that centre from the window's own.
- One knob, `--z`, produces the Studio window's width, its height, and the scale of the App page inside it. Below 900px the ratio is held and the window is cropped instead, because shrinking further would render the product's 15px text at 4px.
- The chip bar outranks both windows: it is the only way back to Chat, and the only way to replay this surface.

[PROTOCOL]: Update this file when members or responsibilities change, then verify the parent README.md.
