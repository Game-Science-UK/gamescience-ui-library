# Registry usage

The GameScience registry is a publicly readable static shadcn registry that distributes **source code** into consuming projects.

## Namespace

- Namespace: `@gamescience`
- Local serve URL (default): `http://localhost:4343`
- Configurable via `GAMESCIENCE_REGISTRY_URL`
- Intended production path: a static host serving `public/registry`

## Build and serve locally

```bash
npm run registry:build
npm run registry:validate
npm run registry:serve
```

Built artefacts:

- `public/registry/registry.json`
- `public/registry/r/<item>.json`
- `public/registry/agent-catalogue.json`

## Install examples

```bash
# Base foundations + provider
npx shadcn@latest add http://localhost:4343/r/base.json

# Theme
npx shadcn@latest add http://localhost:4343/r/theme-citadel.json

# Pattern (pulls declared registry dependencies)
npx shadcn@latest add http://localhost:4343/r/join-flow.json
```

## Versioning

- Library version: `GAMESCIENCE_UI_VERSION` in `src/lib/version.ts`
- Registry item metadata includes the same version
- Installed components become project-local source
- Updates do **not** automatically propagate to Lovable projects
- Consuming apps should record the installed library version
- Do not consume unversioned `main` in production

## Overwrite behaviour

shadcn installs copy files into the project. Re-installing may overwrite local edits. Treat approved registry components as upstream source and keep bespoke changes in application-owned modules.

## Project-local ownership

After install:

- theme selection remains application-owned via `GameScienceProvider`
- game logic remains application-owned
- do not place unapproved custom files into `components/ui` and treat them as core library components
