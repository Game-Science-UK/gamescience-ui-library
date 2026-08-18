# GameScience UI Library

Production-ready, agent-consumable React design library and shadcn registry for [GameScience.ai](https://gamescience.ai) multiplayer learning games.

This is not a general-purpose component showcase. It is a practical system for participant, facilitator, and shared-display interfaces.

## Purpose

- Reusable theme-neutral UI primitives
- Game-domain components and lobby/join patterns
- Interface shells for participant, facilitator, and shared display
- Two themes: `gamescience` and `citadel`
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

| Command                            | Description                                    |
| ---------------------------------- | ---------------------------------------------- |
| `npm run dev`                      | Vite preview app                               |
| `npm run storybook`                | Storybook on :6006                             |
| `npm run typecheck`                | Strict TypeScript                              |
| `npm run lint`                     | ESLint                                         |
| `npm run format`                   | Prettier write                                 |
| `npm run format:check`             | Prettier check                                 |
| `npm test`                         | Vitest                                         |
| `npm run build`                    | Library/app build                              |
| `npm run build-storybook`          | Static Storybook                               |
| `npm run theme:check`              | Theme token contract                           |
| `npm run theme:new`                | Scaffold a new theme (all registration steps)  |
| `npm run theme:oklch`              | Convert hex colours to OKLCH token channels    |
| `npm run docs:check`               | Published docs pin the current version         |
| `npm run skills:check`             | Skill frontmatter, vocabulary, and mirrors     |
| `npm run architecture:check`       | Architecture contract rules                    |
| `npm run storybook:coverage`       | Storybook coverage for public exports          |
| `npm run registry:build`           | Build static registry                          |
| `npm run registry:validate`        | Validate registry + catalogue                  |
| `npm run registry:serve`           | Serve registry on :4343                        |
| `npm run pages:build`              | Build GitHub Pages `pages-dist`                |
| `npm run pages:validate`           | Validate Pages output                          |
| `npm run pages:serve`              | Serve `pages-dist` on :4177                    |
| `npm run smoke:registry`           | Install selected items into fixtures and build |
| `npm run smoke:registry-overwrite` | Observe shadcn reinstall/overwrite behaviour   |
| `npm run smoke:pages`              | Install from locally served Pages output       |
| `npm run validate`                 | Full validation suite                          |

## Storybook

```bash
npm run storybook
```

Hosted static Storybook is published with GitHub Pages at
`/gamescience-ui-library/storybook/` (main nav → Storybook). Build it before a
local Pages latest stage: `npm run build-storybook`.

Global toolbar controls:

- **Theme:** gamescience | citadel
- **Context:** participant | facilitator | shared-display
- **Register:** cinematic | restrained (themes that declare one; others ignore it)

Reference viewports:

- Participant: 375 × 812
- Facilitator: 1440 × 900
- Shared display: 1920 × 1080

## Public registry (GitHub Pages)

Expected production URL:

```text
https://game-science-uk.github.io/gamescience-ui-library/
```

Prefer the **versioned** consumer config:

```json
{
  "registries": {
    "@gamescience": "https://game-science-uk.github.io/gamescience-ui-library/versions/1.4.0/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @gamescience/base
npx shadcn@latest add @gamescience/theme-gamescience
npx shadcn@latest add @gamescience/join-flow
```

See:

- [docs/github-pages-setup.md](docs/github-pages-setup.md)
- [docs/lovable-test-project.md](docs/lovable-test-project.md)
- [docs/registry-usage.md](docs/registry-usage.md)

## Local registry

```bash
npm run registry:build
npm run registry:serve
```

```bash
npm run pages:build
npm run pages:serve
```

## Agent skills

`skills/` is the source of truth for the agent skills that drive adoption,
migration and extraction. Each carries a `skillUpdated` / `libraryVersion`
stamp in its frontmatter and repeats it in the body, and every skill reports
both values in its final output — that is how you identify which copy actually
ran when diagnosing a consumer project.

| Skill                        | Distribution      |
| ---------------------------- | ----------------- |
| `adopt-gamescience-ui`       | Lovable workspace |
| `audit-gamescience-ui`       | Lovable workspace |
| `migrate-gamescience-ui`     | Lovable workspace |
| `sync-gamescience-ui`        | Lovable workspace |
| `validate-gamescience-ui`    | Lovable workspace |
| `extract-theme`              | Lovable workspace |
| `extract-selected-component` | Lovable workspace |
| `extract-all-components`     | Lovable workspace |
| `release-registry`           | Repo maintainer   |
| `update-registry`            | Repo maintainer   |

**Publishing a skill change is a manual step.** After editing any
`distribution: lovable-workspace` skill:

1. Bump `skillUpdated` to today's date.
2. Run `npm run skills:check`.
3. Re-upload the changed file(s) to the GameScience Lovable workspace
   (Workspace skills → the matching skill → replace contents).

Maintainer skills are mirrored to `.cursor/skills/<name>/SKILL.md`; copy the
source file across after editing and `skills:check` will confirm they match.

## Adding library pieces

- Component: see [docs/contribution.md](docs/contribution.md)
- Pattern: compose approved components, declare registry dependencies
- Theme: run `npm run theme:new`, then see [docs/adding-a-theme.md](docs/adding-a-theme.md)

## Versioning

Current version: **1.4.0** (`GAMESCIENCE_UI_VERSION`). Includes the complete standard primitive layer and the game-agnostic pattern suite.

Installed registry components are project-local source. Updates do not automatically propagate across Lovable projects. Record the installed version in each consuming app. Prefer tagged/versioned registry URLs over unversioned `main` in production.

## Licence

See [LICENSE](LICENSE). Temporary position: Copyright GameScience.ai. All rights reserved. Requires owner review before selecting a permanent licence.

## Security

See [SECURITY.md](SECURITY.md).
