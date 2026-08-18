# GameScience UI Library — Agent Guidance

This repository is the approved React design library and shadcn registry for GameScience.ai multiplayer learning games.

Agents building GameScience games (including in Lovable) must follow these rules.

## Before implementing UI

1. Identify the current **experience context**: `participant` | `facilitator` | `shared-display`
2. Identify the active **application theme**: `gamescience` | `citadel`
3. Identify the current **game stage** (join, lobby, briefing, vote, etc.)
4. Search `public/registry/agent-catalogue.json` and Storybook before writing new UI
5. Prefer a complete **pattern** over assembling primitives
6. Install approved registry items rather than recreating them

## Theme and context rules

- Set theme only through `GameScienceProvider` at the application root
- Never pass `theme` props to individual components
- Never create nested theme boundaries
- Never mix themes within one application screen
- Do not treat participant / facilitator / shared-display as themes
- Use semantic tokens (`bg-primary`, `text-muted-foreground`, etc.)
- Avoid raw game colours and hardcoded hex/rgb values inside components

## Component API rules

- Use semantic props: `intent`, `size`, `status`, `state`, `density`, `loading`, `disabled`
- Avoid visual props: `glass`, `neon`, `angular`, `orange`, `tech`, `citadel`, `hud`
- Keep game logic, networking, scoring, and stage authority outside library components
- Use Sonner (`toast` from the approved toaster) — never legacy toast/toaster/use-toast
- Use kebab-case filenames and PascalCase component exports

## Selection hierarchy

1. Existing game pattern
2. Existing domain component (`components/game` or `components/display`)
3. Existing core UI component (`components/ui`)
4. New composition from approved components
5. New core primitive only when demonstrably reusable
6. Bespoke game-specific component as a documented application-owned exception

## Explicit prohibitions

Do not create:

- `CitadelButton`, `TechButton`, `TechInput`, `TechPanel`
- `GlassCard` as a core primitive
- `BackgroundKpmg` or any client-named shared component
- Theme-specific forks of core primitives
- Raw hexadecimal colours inside shared components
- Arbitrary one-off spacing when existing tokens apply
- Business logic inside UI primitives
- Networking inside patterns
- Wholesale copies of an existing project’s `components/ui` directory

## Exception process

When no suitable component exists:

1. Confirm that no approved registry item covers the requirement
2. Determine whether it is a reusable domain need or a game-specific feature
3. Compose from approved primitives first
4. Add a reusable component only when the contract is stable
5. Keep bespoke components application-owned
6. Document any proposed new registry component

## Ownership boundaries

Library components and patterns:

- accept typed state and callbacks through props
- do not own WebSockets, persistence, scoring, auth, or stage transitions
- do not own game-specific content or bespoke illustration systems

## Validation after changes

Run:

```bash
npm run typecheck
npm run lint
npm test
npm run architecture:check
npm run storybook:coverage
npm run build
npm run build-storybook
npm run theme:check
npm run registry:build
npm run registry:validate
```

For distribution changes, also run:

```bash
npm run smoke:registry
```
