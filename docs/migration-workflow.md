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

## Defaults

- Mode: safe incremental migration
- Stack: Lovable / Tailwind 4
- Version: current stable only

## Output requirements

Generated briefs include architecture rules, file ownership, audit table,
overwrite policy, theme/stack/context guidance, validation, cleanup, and a
migration record requirement at `src/docs/gamescience-ui-migration.md`.
