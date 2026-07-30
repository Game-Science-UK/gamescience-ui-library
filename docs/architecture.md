# Architecture

GameScience UI Library is a presentation system for multiplayer learning games. It provides reusable components, domain patterns, interface templates, themes, and a shadcn registry. Application logic remains outside the library.

## Layers

### Foundations

`src/foundations/` defines the semantic token contract, typography, motion, and experience-context density styles.

### Themes

`src/themes/` implements visual identity. Every game application selects exactly one theme at the root:

- `gamescience` — house theme
- `citadel` — expressive tactical theme

Themes implement a shared token contract validated by `npm run theme:check`.

### Experience context

Context is separate from theme:

- `participant` — mobile, touch-first
- `facilitator` — desktop, operational density
- `shared-display` — landscape, non-interactive, privacy-safe

Context adjusts scale, density, and interaction affordances without changing brand identity. Context is not a user role and does not grant authority. Public doctrine: [context-model.md](./context-model.md) (published on Pages).

### Provider

`GameScienceProvider` applies `data-theme` and `data-context`, establishes background/foreground defaults, exposes React context hooks, and synchronises the same attributes onto `document.documentElement` so portals (Radix, Sonner) inherit theme tokens. Nested or mixed themes are not supported.

### UI components

`src/components/ui/` — stable theme-neutral primitives (Button, Input, Panel, etc.).

### Game-domain components

`src/components/game/` — multiplayer learning concepts (GameCodeInput, ConnectionStatus, etc.).

### Display components

`src/components/display/` — shared-display presentation helpers (RoomCodeDisplay, etc.).

### Patterns

`src/patterns/` — composed join/lobby (and later voting, results, debrief) flows. Patterns accept typed state and callbacks only.

### Templates

`src/templates/` — ParticipantShell, FacilitatorShell, SharedDisplayShell. Layout and hierarchy only — no routing or orchestration.

### Registry

`registry/` + `public/registry/` distribute curated source into consuming projects. The registry catalogue — not whatever files happen to exist in a Lovable project — is the source of truth.

## Application ownership boundaries

| Concern                    | Owner                         |
| -------------------------- | ----------------------------- |
| Visual presentation        | This library                  |
| Theme selection            | Application root via provider |
| Multiplayer transport      | Application                   |
| Session persistence        | Application                   |
| Stage-transition authority | Application                   |
| Scoring                    | Application                   |
| Auth                       | Application                   |
| Game-specific content      | Application                   |
| Bespoke visualisations     | Application                   |
