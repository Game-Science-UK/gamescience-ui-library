# Font loading

GameScience themes declare **font-family stacks** only. The registry does **not**
ship font binaries and must not rely on remote CSS `@import` inside theme or
foundation files (Tailwind 4 / Lightning CSS resolves `@import` from the
filesystem and remote URLs break consumer builds).

## Approved families

### Gamescience

- Display / body: Space Grotesk, Source Sans 3 (with system fallbacks)
- Mono: IBM Plex Mono (with `ui-monospace` fallbacks)

### Citadel

- Display: Hanken Grotesk
- Body: Plus Jakarta Sans
- Mono: Geist Mono, then IBM Plex Mono, then system mono

Stacks already include robust system fallbacks so the UI remains usable if
remote fonts never load.

## Recommended: HTML `<link>`

Load fonts once in the application document head (Lovable / TanStack Start
`head.links`, Vite `index.html`, etc.):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Sans:wght@400;500&family=Source+Sans+3:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Hanken+Grotesk:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
/>
```

Trim the query to the active theme’s families if you install only one theme.

## Optional: `@fontsource`

If your licence review and bundler allow it, install approved packages such as
`@fontsource/hanken-grotesk` / `@fontsource/plus-jakarta-sans` and import them
from application entry. Do not add font packages through `@gamescience/base`.

## Tailwind 3 consumers

1. Own a local CSS entry with `@tailwind base/components/utilities`.
2. Import `@/foundations/index.css` (framework-neutral).
3. Import exactly one theme CSS file.
4. Load fonts via `<link>` or `@fontsource` — not via theme CSS `@import`.

## Tailwind 4 / Lovable consumers

1. Do **not** expect `foundations/index.css` to contain `@tailwind` directives.
2. Import `@/foundations/index.css` plus one theme.
3. Map tokens with the approved bridge in `docs/tailwind-v4-integration.md`.
4. Load fonts via `<link>` (preferred in Lovable) or `@fontsource`.

## Fallbacks and offline builds

- Registry smoke tests and CI builds must succeed without contacting a font CDN.
- If remote fonts fail, theme stacks fall back to system UI / mono fonts.
- Never redistribute font files through the registry without confirmed licensing.
