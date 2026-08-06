# Lovable test project setup

Paste-ready guide for creating a clean GameScience Lovable project that consumes the public registry.

Pinned version: **0.4.1**

Registry base:

```text
https://game-science-uk.github.io/gamescience-ui-library/versions/0.4.1/r/{name}.json
```

---

## Step 1: Create the project

Create a new Lovable project in the GameScience team with this prompt:

```text
Create a minimal React application for testing the GameScience UI registry.

Do not create a custom design system.

Create only a basic application shell with routing or simple view switching for:

- participant
- facilitator
- shared display

Declare each surface with an experience context (`participant`, `facilitator`,
or `shared-display`). Do not treat context as a user role or permission.

Do not implement final interface designs yet.
```

## Step 2: Connect to GitHub

Connect the Lovable test project to its **own** GitHub repository.

Keep it separate from:

```text
Game-Science-UK/gamescience-ui-library
```

## Step 3: Configure `components.json`

Preserve existing aliases if Lovable already generated them. Add the GameScience registry namespace.

Complete sample compatible with this library:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "iconLibrary": "lucide",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/cn",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@gamescience": "https://game-science-uk.github.io/gamescience-ui-library/versions/0.4.1/r/{name}.json"
  }
}
```

GameScience components target Radix primitives. If the CLI prompts for a component library, choose **Radix UI** (not Base UI).

If the project already has a different CSS entry path, keep that project path and import GameScience foundations/theme from application entry after install.

## Step 4: Install registry items

```bash
npx shadcn@latest add @gamescience/base
npx shadcn@latest add @gamescience/theme-gamescience
npx shadcn@latest add @gamescience/button
npx shadcn@latest add @gamescience/join-flow
npx shadcn@latest add @gamescience/lobby
npx shadcn@latest add @gamescience/shared-display-lobby
```

Citadel alternative (use **one** theme per app):

```bash
npx shadcn@latest add @gamescience/theme-citadel
```

After install, wire CSS for Tailwind 4 / Lovable (see also [tailwind-v4-integration.md](./tailwind-v4-integration.md) and [font-loading.md](./font-loading.md)):

```css
/* src/styles.css */
@import "tailwindcss";
@import "./foundations/index.css";
@import "./themes/gamescience.css"; /* or citadel.css — one theme only */
@import "./gamescience-tw4-bridge.css"; /* copy from library consumer/tailwind-v4-bridge.css */
```

Load fonts via HTML `<link>` in the document head — do not add remote `@import` inside theme CSS.

```ts
import "@/styles.css";
```

`@gamescience/base` also installs:

- `src/docs/gamescience-ui.json` — machine-readable install metadata
- `src/docs/gamescience-ui-guidance.md` — reusable agent guidance

Do **not** let install overwrite the project’s full `AGENTS.md` automatically. Reference the guidance file from `AGENTS.md` instead.

## Step 5: Add project agent guidance

Add or update the consumer `AGENTS.md` with:

```md
# AGENTS — GameScience Lovable test app

## Installed design system

- GameScience UI version: `0.4.1`
- Active test theme: `gamescience` (switch only via GameScienceProvider; do not mix themes)
- Registry namespace: `@gamescience`
- Versioned registry URL: https://game-science-uk.github.io/gamescience-ui-library/versions/0.4.1/r/{name}.json
- Local installed source under `src/` is authoritative for implementation
- Catalogue: https://game-science-uk.github.io/gamescience-ui-library/versions/0.4.1/agent-catalogue.json
- Local guidance: `src/docs/gamescience-ui-guidance.md`
- Local metadata: `src/docs/gamescience-ui.json`

## Rules

1. Prefer installed patterns before primitives
2. Do not recreate installed registry components
3. Do not create theme-specific forks (`CitadelButton`, `TechButton`, `GlassCard`)
4. Do not pass theme props to components
5. Wrap the app once with `GameScienceProvider`
6. Keep application logic outside installed library components
7. Use Sonner only
8. Do not run `shadcn add --overwrite` unless explicitly updating upstream-managed files after `--diff`
```

## Step 6: Create the test app

Paste this into Lovable after installation:

```text
Build a GameScience registry test harness using ONLY the installed GameScience UI library.

Requirements:
- Use GameScienceProvider with theme="gamescience" and switchable context views
- Provide simple navigation or tabs for:
  - participant
  - facilitator
  - shared-display
- Use ParticipantShell + ParticipantJoinFlow
- Use FacilitatorShell + FacilitatorLobby
- Use SharedDisplayShell + SharedDisplayLobby
- Use realistic local fixture state only
- No networking, database, authentication, scoring, or custom design-system primitives
- No raw GameScience colours and no theme mixing
- Add a small internal state selector / test harness so we can inspect states without editing source

Participant states to support via local controls:
- enter code
- invalid code
- enter identity
- waiting
- reconnecting
- disconnected

Facilitator states:
- empty
- joining
- disconnected participant
- ready
- confirmation to start

Shared-display states:
- join
- waiting
- ready

Import foundations CSS and gamescience (or citadel) theme CSS once at the app root using the Tailwind 4 bridge. Load fonts via `<link>`.
```

## Step 7: Verify

Commands (adjust to the Lovable project scripts):

```bash
npm run typecheck || npx tsc --noEmit
npm run lint
npm test
npm run build
```

### Manual review checklist

- Participant viewport ~375 × 812
- Facilitator viewport ~1440 × 900
- Shared display 1920 × 1080
- Keyboard navigation and visible focus
- Long participant names and long session titles
- Loading / reconnecting / disconnected states
- Sonner toast styling under the active theme
- No horizontal overflow
- Only one theme active
- No private participant data on shared display
- Context declared explicitly (not inferred from role names)
- `src/docs/gamescience-ui-contexts.md` records route → context mapping

See [context-model.md](./context-model.md) for the canonical experience context doctrine.
