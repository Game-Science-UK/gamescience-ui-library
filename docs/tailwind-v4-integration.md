# Tailwind CSS v4 integration

GameScience foundations are framework-neutral. Tailwind 4 consumers must own
the Tailwind entry and map semantic tokens with a non-circular bridge.

For Tailwind 3 projects see [tailwind-v3-integration.md](./tailwind-v3-integration.md).
Do not install this bridge on Tailwind 3 projects. React/router choice is
independent of Tailwind support.

## Install

```bash
npx shadcn@latest add @gamescience/base
npx shadcn@latest add @gamescience/theme-gamescience   # or theme-citadel / theme-sentinel
npx shadcn@latest add @gamescience/join-flow
```

Import **exactly one** theme.

## Application CSS entry

Use the approved bridge from [`consumer/tailwind-v4-bridge.css`](../consumer/tailwind-v4-bridge.css)
(copied into the app, for example as `src/styles/gamescience-tw4-bridge.css`):

```css
@import "tailwindcss";
@import "./foundations/index.css";
@import "./themes/gamescience.css"; /* or citadel.css / sentinel.css */
@import "./gamescience-tw4-bridge.css";
```

## Rules

- Do **not** use circular mappings such as `--radius-control: var(--radius-control)`.
- Use `--radius-gs-*`, `--font-gs-*`, `--shadow-gs-*` in `@theme`, or explicit `@utility` blocks that read the theme tokens.
- Do not hard-code Citadel or Gamescience colour literals in the bridge.
- One root `GameScienceProvider` still selects the active theme at runtime.
- Fonts are application-owned — see [font-loading.md](./font-loading.md).

## Documented utilities the bridge must enable

Colour (examples): `bg-background`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `bg-muted`, `text-muted-foreground`, `bg-success`, `bg-warning`, `bg-danger`, `border-border`, `border-border-strong`

Radius: `rounded-control`, `rounded-card`, `rounded-panel`, `rounded-overlay`, `rounded-pill`

Font: `font-body`, `font-display`, `font-mono`, `font-label`

Shadow: `shadow-control`, `shadow-card`, `shadow-overlay`, `shadow-focus`

Control height: `h-control-sm`, `h-control-md`, `h-control-lg`

Panel padding: `p-panel-sm`, `p-panel-md`, `p-panel-lg`

Layout: `max-w-content`

Registry smoke (`npm run smoke:tailwind4`) proves each of these utilities emits an effective CSS declaration in the production build.
