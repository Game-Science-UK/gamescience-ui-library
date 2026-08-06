# Registry usage

From 0.3.0 the registry includes the complete standard primitive layer in
addition to themes, game/display components, patterns, and shells. Install only
what you need. Prefer patterns first. See [primitive-layer.md](./primitive-layer.md).

The GameScience registry is a publicly readable static shadcn registry that distributes **source code** into consuming projects.

## Namespace

- Namespace: `@gamescience`
- Local serve URL (default): `http://localhost:4343`
- GitHub Pages latest: `https://game-science-uk.github.io/gamescience-ui-library/r/{name}.json`
- GitHub Pages versioned (recommended): `https://game-science-uk.github.io/gamescience-ui-library/versions/0.5.4/r/{name}.json`
- Configurable local override via `GAMESCIENCE_REGISTRY_URL`

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

After configuring the consumer `components.json` namespace:

```json
{
  "registries": {
    "@gamescience": "https://your-host.example/registry/r/{name}.json"
  }
}
```

Install with:

```bash
npx shadcn@latest add @gamescience/base -y
npx shadcn@latest add @gamescience/theme-citadel -y
npx shadcn@latest add @gamescience/join-flow -y
```

Or use direct item URLs while developing locally:

```bash
npx shadcn@latest add http://localhost:4343/r/base.json -y
```

After installing a theme, import foundations + **exactly one** theme. Own the Tailwind entry in the consumer:

**Tailwind 3**

See [tailwind-v3-integration.md](./tailwind-v3-integration.md). Retain
`tailwind.config.ts`, merge the contract token map, keep `@tailwind` directives,
and do not install the Tailwind 4 bridge.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "./foundations/index.css";
@import "./themes/citadel.css";
```

**Tailwind 4**

See [tailwind-v4-integration.md](./tailwind-v4-integration.md). Copy `consumer/tailwind-v4-bridge.css` into the app and avoid circular `--x: var(--x)` mappings.

Fonts are application-owned — see [font-loading.md](./font-loading.md).

## Installation smoke coverage

`npm run smoke:registry` builds clean Tailwind 3 consumer fixtures for:

1. `base` + `theme-gamescience` + `join-flow`
2. `base` + `theme-citadel` + `join-flow`
3. `base` + `theme-gamescience` + `lobby`
4. `base` + `theme-citadel` + `lobby`
5. `base` + `theme-gamescience` + `shared-display-lobby`
6. `base` + `theme-citadel` + `shared-display-lobby`

`npm run smoke:tailwind4` builds Tailwind 4 fixtures for Gamescience and Citadel join-flow and proves documented bridge utilities emit CSS.

Each scenario asserts that sibling pattern packages and the alternate theme are not pulled in accidentally.

Overwrite / update behaviour is exercised by `npm run smoke:registry-overwrite` and documented in [registry-update-policy.md](./registry-update-policy.md).

## Versioning

- Library version: `GAMESCIENCE_UI_VERSION` in `src/lib/version.ts`
- Registry item metadata includes the same version
- Installed components become project-local source
- Updates do **not** automatically propagate to Lovable projects
- Consuming apps should record the installed library version
- Do not consume unversioned `main` in production

## Overwrite behaviour

See the approved policy in [registry-update-policy.md](./registry-update-policy.md).

Summary of observed shadcn CLI behaviour:

- Without `--overwrite`, existing files are skipped and local edits are preserved
- With `--overwrite`, listed item files are replaced
- Supporting files not included in the reinstalled item remain untouched
- Prefer composition outside upstream-managed directories instead of editing installed primitives

## Project-local ownership

After install:

- theme selection remains application-owned via `GameScienceProvider`
- game logic remains application-owned
- do not place unapproved custom files into `components/ui` and treat them as core library components
