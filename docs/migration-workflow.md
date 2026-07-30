# Migration workflow

The migration composer at `/migrate/` builds a self-contained Markdown brief for
a Lovable build agent.

## How composition works

1. Approved fragments live in `site/migration-modules/`
2. Pages build inlines them into `docs/migration-config.json`
3. Browser loads that single config asset
4. Pure `compose-markdown-core.js` concatenates modules and substitutes placeholders
5. User copies or downloads the Markdown

No model is called. The Lovable agent is the AI execution layer.

## Experience context model

Every Migrate brief includes the shared `context-model` module exactly once. It
explains that selected contexts are migration targets, not roles; that other
contexts may be absent legitimately; and that every route must be audited with
the required context audit table.

Canonical doctrine: [context-model.md](./context-model.md).

## Defaults

- Mode: safe incremental migration
- Stack: Lovable / Tailwind 4
- Version: current stable only

## Output requirements

Generated briefs include architecture rules, the experience context model, file
ownership, audit tables (component + context), overwrite policy,
theme/stack/context guidance, validation, cleanup, a migration record at
`src/docs/gamescience-ui-migration.md`, and a project context record at
`src/docs/gamescience-ui-contexts.md`.

Migrate audits finish with a **Context architecture recommendation**.
