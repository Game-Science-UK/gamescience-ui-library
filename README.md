# GameScience UI Library

Production-ready, agent-consumable React design library and shadcn registry for [GameScience.ai](https://gamescience.ai) multiplayer learning games.

This is not a general-purpose component showcase. It is a practical system for participant, facilitator, and shared-display interfaces.

## Purpose

- Reusable theme-neutral UI primitives
- Game-domain components and lobby/join patterns
- Interface shells for participant, facilitator, and shared display
- Two initial themes: `gamescience` and `citadel`
- Storybook reference screens
- Custom shadcn registry + machine-readable agent catalogue

## Architecture

```text
Foundations → Themes + Context → UI → Game/Display → Patterns → Templates → Registry
```

Read:

- [docs/architecture.md](docs/architecture.md)
- [docs/theming.md](docs/theming.md)
- [docs/component-selection.md](docs/component-selection.md)
- [docs/registry-usage.md](docs/registry-usage.md)
- [AGENTS.md](AGENTS.md)

## Requirements

- Node.js 20+
- npm 10+

## Local setup

```bash
npm install
```

## Development commands

| Command                     | Description                                     |
| --------------------------- | ----------------------------------------------- |
| `npm run dev`               | Vite preview app                                |
| `npm run storybook`         | Storybook on :6006                              |
| `npm run typecheck`         | Strict TypeScript                               |
| `npm run lint`              | ESLint                                          |
| `npm run format`            | Prettier write                                  |
| `npm run format:check`      | Prettier check                                  |
| `npm test`                  | Vitest                                          |
| `npm run build`             | Library/app build                               |
| `npm run build-storybook`   | Static Storybook                                |
| `npm run theme:check`       | Theme token contract                            |
| `npm run registry:build`    | Build static registry                           |
| `npm run registry:validate` | Validate registry + catalogue                   |
| `npm run registry:serve`    | Serve registry on :4343                         |
| `npm run smoke:registry`    | Install selected items into a fixture and build |
| `npm run validate`          | Full validation suite                           |

## Storybook

```bash
npm run storybook
```

Global toolbar controls:

- **Theme:** gamescience | citadel
- **Context:** participant | facilitator | shared-display

Reference viewports:

- Participant: 375 × 812
- Facilitator: 1440 × 900
- Shared display: 1920 × 1080

## Registry

```bash
npm run registry:build
npm run registry:serve
```

Example installs:

```bash
npx shadcn@latest add http://localhost:4343/r/base.json
npx shadcn@latest add http://localhost:4343/r/theme-citadel.json
npx shadcn@latest add http://localhost:4343/r/join-flow.json
```

Set `GAMESCIENCE_REGISTRY_URL` to point consumers at the deployed static registry URL.

Agent catalogue:

```text
public/registry/agent-catalogue.json
```

## Adding library pieces

- Component: see [docs/contribution.md](docs/contribution.md)
- Pattern: compose approved components, declare registry dependencies
- Theme: implement the full token contract, then run `theme:check`

## Versioning

Current version: **0.1.0** (`GAMESCIENCE_UI_VERSION`).

Installed registry components are project-local source. Updates do not automatically propagate across Lovable projects. Record the installed version in each consuming app. Prefer tagged/versioned registry URLs over unversioned `main` in production.

## License

Private GameScience design system. All rights reserved unless otherwise noted.
