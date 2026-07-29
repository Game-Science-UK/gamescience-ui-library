## Start a new Lovable project

Configure `components.json` with the immutable registry URL above.

Install:

```bash
npx shadcn@latest add @gamescience/base
npx shadcn@latest add @gamescience/theme-{{THEME}}
```

Then install high-level patterns appropriate to selected contexts ({{CONTEXTS}}), for example:

- participant: `@gamescience/join-flow`
- facilitator: `@gamescience/lobby`
- shared-display: `@gamescience/shared-display-lobby`

Establish one root `GameScienceProvider` with theme `{{THEME}}`.
Use local fixture state only — no networking, persistence, auth, or scoring.
Record installed version **{{VERSION}}** in project docs / `AGENTS.md`.
Load fonts at the application layer. Own the Tailwind entry in application CSS.
