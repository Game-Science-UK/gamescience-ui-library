# Theming

## One theme per application

Every GameScience game application has exactly one active visual theme, selected once at the root:

```tsx
<GameScienceProvider theme="citadel" context="participant">
  <ParticipantApp />
</GameScienceProvider>
```

Do not:

- pass theme props to individual UI components
- create nested theme boundaries
- mix themes within one screen
- create theme-named component forks (`CitadelButton`, `TechInput`, `GlassCard`)

## Theme vs context

| Concept | Controls                  | Examples                                       |
| ------- | ------------------------- | ---------------------------------------------- |
| Theme   | Visual identity           | `gamescience`, `citadel`                       |
| Context | Behaviour, scale, density | `participant`, `facilitator`, `shared-display` |

A theme must work across all three contexts.

## Token contract

Both themes implement the same semantic tokens for colour, shape, typography, sizing, depth, and motion. See `src/themes/theme-contract.ts`.

Validate with:

```bash
npm run theme:check
```

## What belongs in theme CSS

- semantic token values
- surface treatments that map to elevations
- typography family / tracking / label transform
- shell background gradients via CSS variables
- theme assets referenced by shells/templates

## What does not belong in theme CSS

- component structure
- game logic
- networking
- context-specific branching that belongs in `responsive.css`
- client-specific component names
- remote font `@import` statements (fonts are application-owned — see [font-loading.md](./font-loading.md))

## Application CSS entry

- Import framework-neutral `src/foundations/index.css` (no `@tailwind` directives)
- Import exactly one theme CSS file
- Own Tailwind 3 `@tailwind` directives or the Tailwind 4 bridge in application CSS ([tailwind-v4-integration.md](./tailwind-v4-integration.md))
- Load fonts via HTML `<link>` or approved packages

## Why components do not accept theme props

Visual treatment is inherited from the root provider through CSS variables. This keeps APIs semantic, prevents theme mixing, and allows one component implementation to serve every theme.

## Document and portal scoping

`GameScienceProvider` applies `data-theme` and `data-context` in two places:

1. The provider root element (layout / composition boundary)
2. `document.documentElement` (so CSS variables inherit to `body`, Sonner toasts, and Radix portals)

This is required because portals mount under `document.body` by default and would otherwise sit outside a themed wrapping `<div>`.

Behaviour:

- Attributes sync on mount and when `theme` / `context` change
- Previous `documentElement` attribute values are restored on unmount
- Access to `document` is guarded for non-DOM environments
- Optional `syncDocumentAttributes={false}` exists for specialised test hosts
- Nested or mixed game themes remain unsupported — one provider, one theme

Consumer applications should:

- Import framework-neutral foundations CSS and exactly one theme CSS at the app entry
- Own Tailwind directives / TW4 bridge in application CSS (see [tailwind-v4-integration.md](./tailwind-v4-integration.md))
- Load fonts via HTML `<link>` (see [font-loading.md](./font-loading.md))
- Wrap the app once with `GameScienceProvider`
- Rely on semantic tokens for Sonner / overlay surfaces (no per-portal theme props)

## Theme assets

Place decorative assets under:

```text
src/themes/assets/gamescience/
src/themes/assets/citadel/
```

Do not place client-named background components in `components/ui`.

## Accessibility

Themes must preserve readable contrast, visible focus (`--shadow-focus` / `--focus-ring`), and reduced-motion behaviour from foundations.
