## Start a new Lovable project

Configure `components.json` with the immutable registry URL above.

Install:

```bash
npx shadcn@latest add @gamescience/base
npx shadcn@latest add @gamescience/theme-{{THEME}}
```

### Context planning

Selected contexts for this project: **{{CONTEXTS}}**.

Unselected contexts are **not** required. Do not install facilitator or
shared-display shells/patterns unless those contexts were selected. Do not
create routes for unused contexts merely for symmetry.

Install high-level patterns only for selected contexts, for example:

- participant: `@gamescience/participant-shell`, `@gamescience/join-flow`
- facilitator: `@gamescience/facilitator-shell`, `@gamescience/lobby`
- shared-display: `@gamescience/shared-display-shell`, `@gamescience/shared-display-lobby`

### Provider and routing

Establish one root `GameScienceProvider` with theme `{{THEME}}`.
Resolve `context` from the active surface (route metadata, route groups, or a
project route-to-context map). Prefer clear route naming or route metadata.
Avoid nested theme or context providers.

Do not assume facilitator authority from `context="facilitator"`. Keep
role/permission logic application-owned.

When `shared-display` is selected, enforce the shared-display privacy contract
from the experience context model section.

### Local fixtures and records

Use local fixture state only — no networking, persistence, auth, or scoring.
Record installed version **{{VERSION}}** in project docs / `AGENTS.md`.
Create `src/docs/gamescience-ui-contexts.md` with contexts in use, route mapping,
shells, patterns, and authority architecture (no secrets).
Load fonts at the application layer. Own the Tailwind entry in application CSS.
