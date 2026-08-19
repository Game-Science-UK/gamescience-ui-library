## Theme validation lens — Sentinel

Selected theme: **sentinel**

Migrated screens must derive visual identity from `@gamescience/theme-sentinel` / `sentinel.css`.

Sentinel ships two registers, selected on the root provider:

- `cinematic` (default) — ice accent, top-lit panel wash, headline bloom
- `restrained` — projector fallback: indigo accent, flat surfaces, no glow

Validation lens (not permission to fork components):

- near-black void field
- ice (cinematic) or indigo (restrained) primary
- violet emphasis and critical state — never red
- amber warning
- uniformly square geometry, no rounded corners
- elevation by surface step, never drop shadow
- panel-surfaced controls with a coloured border, never a solid fill
- mono uppercase micro-labels with wide tracking
- Archivo display, Instrument Sans body, IBM Plex Mono data

Do **not** create `SentinelButton`, register-specific component forks, or a
light mode.
