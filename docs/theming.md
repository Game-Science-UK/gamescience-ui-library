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

## Why components do not accept theme props

Visual treatment is inherited from the root provider through CSS variables. This keeps APIs semantic, prevents theme mixing, and allows one component implementation to serve every theme.

## Theme assets

Place decorative assets under:

```text
src/themes/assets/gamescience/
src/themes/assets/citadel/
```

Do not place client-named background components in `components/ui`.

## Accessibility

Themes must preserve readable contrast, visible focus (`--shadow-focus` / `--focus-ring`), and reduced-motion behaviour from foundations.
