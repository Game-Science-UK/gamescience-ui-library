---
name: adopt-gamescience-ui
description: Use when setting up a new or early-stage Lovable application with the GameScience UI registry for the first time. Detects theme, Tailwind stack and experience contexts (or asks when unclear), installs base plus one theme and only required patterns, mounts GameScienceProvider, establishes route-to-context mapping, writes the project context record, and validates an initial vertical slice. Corresponds to the Start composer. Not for auditing large existing UI libraries, wholesale visual alignment, or synchronising an already-adopted registry pin.
skillUpdated: 2026-08-18
libraryVersion: 1.3.0
distribution: lovable-workspace
---

# Adopt GameScience UI

`skillUpdated: 2026-08-18` · `libraryVersion: 1.3.0`. Report both values in the final output so the running copy can be identified.

Adopt the GameScience UI registry in a new or early-stage project where
migration archaeology is unnecessary.

Corresponds to the **Start** composer on the public registry site.

Detect theme, Tailwind stack, and experience contexts from the project unless
the user explicitly overrides them.

Do not audit a large existing component library or attempt wholesale visual
alignment. For established projects use `audit-gamescience-ui` and
`migrate-gamescience-ui`. For projects that already use the registry use
`sync-gamescience-ui` or `validate-gamescience-ui`.

## Example triggers

- Set this project up with GameScience UI
- Start using the GameScience registry
- Add the Citadel design system
- Build this new game on GameScience UI

## Registry source

Use the GameScience UI immutable registry:

```text
https://game-science-uk.github.io/gamescience-ui-library/versions/{version}/r/{name}.json
```

Discover the latest stable immutable release from published
`version.json` / registry metadata.

Do not pin the project to the unversioned latest URL.

Do not use an unreleased branch, mutable build artefact, draft version, or
historical release modified in place.

Public docs and composers live at:

```text
https://game-science-uk.github.io/gamescience-ui-library/
```

Prefer the published Start brief / `migration-config.json` when composing a
project-specific plan. Registry payloads remain authoritative over guide names.

## Core principles

- Install only what the selected contexts need
- Prefer patterns over assembling primitives
- Mount exactly one root `GameScienceProvider`
- Keep experience context separate from role and authority
- Own the Tailwind entry in application CSS
- Load fonts at the application layer
- Keep game logic, networking, auth, scoring and persistence outside registry
  components
- Use Sonner only — never legacy toast/toaster/use-toast
- Validate before reporting success

Do not:

- install the full registry catalogue
- install unselected themes
- install facilitator or shared-display shells when those contexts were not
  selected
- create nested theme or context provider boundaries
- pass `theme` props to individual components
- create `CitadelButton`, `TechButton`, `GlassCard`, or equivalent forks
- equate `context="facilitator"` with facilitator permissions
- invent a fourth experience context
- report completion while validation fails

## Detection defaults

Unless explicitly overridden, detect:

| Input    | Default behaviour                                    |
| -------- | ---------------------------------------------------- |
| Theme    | Infer from branding / existing CSS; ask if ambiguous |
| Stack    | Detect Tailwind 3 vs 4 from the project              |
| Contexts | Infer from routes and surfaces; ask if unclear       |
| Version  | Latest stable immutable registry release             |

Valid themes: `gamescience` | `citadel` | `sentinel`

Valid registers (only for themes that declare one — currently Sentinel):
`cinematic` (default) | `restrained`

Valid contexts: `participant` | `facilitator` | `shared-display`

Valid stack branches (exactly one):

- Tailwind 3
- Tailwind 4

Router / framework detection is separate. Tailwind version does not determine
router integration.

## 1. Confirm adoption is appropriate

Proceed with this skill when the project is structurally new enough that
migration archaeology is unnecessary — for example:

- greenfield Lovable app
- early scaffold with little custom UI inventory
- starter that has not yet adopted `@gamescience`

Stop and hand off when:

- a large existing local UI library needs classification → `audit-gamescience-ui`
- an established app needs incremental or full alignment → `migrate-gamescience-ui`
- the registry is already installed and needs upgrading → `sync-gamescience-ui`

## 2. Inspect the stack

Locate:

- `components.json` (create if absent)
- package manifest and lockfile
- application CSS entry
- `tailwind.config.*` when present
- router / framework setup
- existing provider roots
- fonts and global styles
- routes or page entry points

Determine:

- package manager
- React version
- router / framework (Lovable, Vite, React Router, TanStack, etc.)
- Tailwind major version and integration style
- whether a design system is already partially present

### Tailwind stack branch

Inspect `package.json`, the CSS entry, and config authority.

**Tailwind 3**

- retain `tailwind.config.ts` (or `.js`)
- merge required semantic token mappings through `oklch(var(--token))`
- retain `@tailwind base/components/utilities`
- do **not** install or import `tailwind-v4-bridge.css`
- follow public `docs/tailwind-v3-integration.md`

**Tailwind 4**

- import stack-agnostic foundation CSS
- install/import the Tailwind 4 bridge
- use CSS-first scanning and token mapping
- do **not** introduce `tailwind.config.ts` merely for the registry
- follow public `docs/tailwind-v4-integration.md`

Do not infer registry stack support solely from the names of published guides.
Inspect payloads, foundation CSS and declared dependencies. Classify support as:

- Supported
- Supported with stack-specific integration
- Unsupported
- Uncertain — payload inspection required

Use “blocking mismatch” only for a verified incompatibility.

## 3. Determine theme

Choose exactly one application theme:

- `gamescience`
- `citadel`
- `sentinel`

### Visual register

A theme may expose an optional visual register. Sentinel supports:

- `cinematic` (default)
- `restrained`

Set the register on the root `GameScienceProvider` alongside `theme`. Do not
set a register for themes that do not declare one — `gamescience` and `citadel`
ignore it. Do not create register-specific component forks.

Detection order:

1. Explicit user override
2. Clear project branding / existing GameScience, Citadel or Sentinel identity
3. Ask the user when evidence is ambiguous

Do not mix themes. Do not create theme-specific component forks.

## 4. Identify required contexts

Select only the experience contexts the product needs:

- `participant`
- `facilitator`
- `shared-display`

Detection order:

1. Explicit user override
2. Routes, shells and surface intent already present
3. Ask when evidence is insufficient — do not force a nearest context

Unselected contexts are intentionally omitted. Do not install their shells or
patterns for symmetry.

Keep separate:

| Concept            | Not the same as                    |
| ------------------ | ---------------------------------- |
| Experience context | User role / authority              |
| Route              | Context (routes may imply context) |
| Game state         | Context                            |

When `shared-display` is selected, enforce the shared-display privacy contract
from the published experience context model.

## 5. Produce an adoption plan

Before installing, output:

### Detected configuration

- Registry version target:
- Theme:
- Register (when the theme declares one):
- Tailwind integration:
- Router / framework:
- Contexts selected:
- Contexts intentionally omitted:
- First vertical slice:

### Planned installs

| Item | Reason | Context |
| ---- | ------ | ------- |

### Deferred

List anything not required for the first slice.

Do not install speculative catalogue items.

## 6. Configure the immutable registry pin

Configure `components.json` with the versioned registry URL:

```json
{
  "registries": {
    "@gamescience": "https://game-science-uk.github.io/gamescience-ui-library/versions/{version}/r/{name}.json"
  }
}
```

Use the actual target release. Keep aliases and paths consistent with the
project.

Do not commit the unversioned latest URL as the project pin.

## 7. Install foundations and theme

Install:

```bash
npx shadcn@latest add @gamescience/base
npx shadcn@latest add @gamescience/theme-{theme}
```

Use the selected theme name (`gamescience`, `citadel`, or `sentinel`).

Then:

1. Import stack-agnostic foundation CSS
2. Import exactly one theme CSS
3. Apply the correct Tailwind 3 or Tailwind 4 integration branch
4. Load fonts at the application layer
5. Do not place `@tailwind` directives inside GameScience foundation files

## 8. Install only required patterns and components

Prefer high-level patterns for selected contexts, for example:

| Context        | Typical shell                       | Typical pattern                     |
| -------------- | ----------------------------------- | ----------------------------------- |
| participant    | `@gamescience/participant-shell`    | `@gamescience/join-flow`            |
| facilitator    | `@gamescience/facilitator-shell`    | `@gamescience/lobby`                |
| shared-display | `@gamescience/shared-display-shell` | `@gamescience/shared-display-lobby` |

Install individual primitives only when a pattern does not cover the need.

Do **not** install the entire primitive catalogue automatically.

Do **not** install the alternate theme.

Search `agent-catalogue.json` / published catalogue before inventing UI.

## 9. Mount the provider

Establish one root `GameScienceProvider` with:

- `theme` set to the selected application theme
- `register` set only when the selected theme declares one (Sentinel:
  `cinematic` default, or `restrained`)
- `context` resolved from the active surface

Prefer route metadata, route groups, or a project route-to-context map.

Avoid nested theme or context providers for ordinary routes.

Never pass `theme` to individual components.

Do not assume facilitator authority from `context="facilitator"`. Keep
role/permission logic application-owned.

## 10. Establish route-to-context mapping

Create a clear mapping for every mounted surface in the first slice.

Example shape:

| Route / surface | Experience context | Shell | Pattern | Notes |
| --------------- | ------------------ | ----- | ------- | ----- |

Use `unclassified` only temporarily when evidence is missing — resolve before
reporting success for that surface.

For shared-display routes, confirm no participant-private information is
rendered.

## 11. Write the project context record

Create:

`src/docs/gamescience-ui-contexts.md`

Record:

- registry version and immutable URL
- active theme
- contexts in use and intentionally omitted
- route-to-context mapping
- shells and patterns installed
- provider placement
- authority architecture notes (no secrets)
- Tailwind integration branch
- known deviations

Also update `AGENTS.md` to reference installed GameScience guidance and the
pinned version. Do not overwrite the whole project `AGENTS.md` with registry
guidance.

Reference installed:

- `src/docs/gamescience-ui-guidance.md`
- `src/docs/gamescience-ui.json` / version metadata when present

## 12. Validate the initial vertical slice

Run the project's existing checks.

At minimum where available:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Also validate:

- provider mounts once at the application root
- selected theme renders
- selected contexts resolve correctly from routes
- first slice routes on mobile and desktop as relevant
- keyboard interaction and focus states
- overlay portals inherit theme/context
- shared-display privacy when that context exists
- no missing CSS variables
- no legacy toast system introduced
- no unused-context patterns installed by default
- no console errors on the slice

Use the project's actual script names.

Do not report success while required checks fail.

If validation fails, fix adoption issues before expanding scope.

## 13. Final output

Report:

### Result

One of:

- Adopted successfully
- Adopted with deferred items
- Blocked by stack, theme or validation issues

### Configuration

- Skill revision: `skillUpdated` / `libraryVersion` from this skill's header
- Registry version:
- Registry URL:
- Theme:
- Register (when the theme declares one):
- Tailwind integration:
- Router / framework:
- Contexts selected:
- Contexts omitted:

### Installed items

| Item | Files | Context | Notes |
| ---- | ----- | ------- | ----- |

### Provider and routing

- Provider placement:
- Context resolution method:
- Route-to-context map summary:

### Records

- `src/docs/gamescience-ui-contexts.md`:
- `AGENTS.md` reference:

### Validation

List every check and result.

### Follow-up

List only genuinely deferred work (additional contexts, later patterns, or
hand-off to `validate-gamescience-ui` / `migrate-gamescience-ui` if scope grew).
