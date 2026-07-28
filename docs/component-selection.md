# Component selection

Use this hierarchy whenever implementing UI for a GameScience game.

1. **Existing game pattern** — e.g. join-flow, lobby
2. **Existing domain component** — e.g. GameCodeInput, ConnectionStatus
3. **Existing core UI component** — e.g. Button, Panel, Alert
4. **New composition from approved components**
5. **New core primitive** only when demonstrably reusable across games
6. **Bespoke game-specific component** as a documented application-owned exception

## Catalogue is the source of truth

Lovable may install many default shadcn files. Presence in `src/components/ui` does **not** mean a component is approved.

Consult:

- `public/registry/agent-catalogue.json`
- Storybook
- this library’s registry items

## Prefer patterns

If a join or lobby experience is needed, install `@gamescience/join-flow` or `@gamescience/lobby` rather than assembling primitives ad hoc.

## Avoid forks

| Legacy local fork          | Canonical approach                       |
| -------------------------- | ---------------------------------------- |
| TechButton / CitadelButton | `Button` + theme tokens                  |
| TechInput                  | `Input` + theme tokens                   |
| TechPanel / GlassCard      | `Panel` with `elevation`                 |
| BackgroundKpmg             | theme assets / shell decoration          |
| PlayerAvatarScanner        | application-owned or optional later item |
