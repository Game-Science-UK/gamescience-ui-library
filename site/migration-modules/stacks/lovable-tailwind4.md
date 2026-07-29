## Stack guidance — Lovable / Tailwind 4

- Import framework-neutral `src/foundations/index.css` (no `@tailwind` directives in foundations)
- Use the approved Tailwind 4 bridge (`docs/tailwind-v4-integration.md` / published bridge CSS)
- No circular `@theme` mappings such as `--x: var(--x)`
- No remote font `@import` in theme/foundation CSS
- Load fonts via application-owned HTML `<link>` elements
- Preserve Lovable router and application structure
- Do not rebuild the app as a generic Vite project
