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
- Tailwind integration: Detect from project
- Version: current stable only

Generated briefs include **exactly one** Tailwind branch (`tailwind3`,
`tailwind4`, or `detect`). Tailwind 4 guidance is not universal.

## Output requirements

Generated briefs include architecture rules, the experience context model,
mixed-context route detection, file ownership, audit tables (component +
context + mixed-context branches), coverage reporting (dimensions A–E, evidence
references, discovery reconciliation and the obligation ledger), project state
record guidance, slice reconciliation, visual-loss review, overwrite policy,
theme/stack/context guidance, validation (payload integrity, call-site purity
including semantic wrappers, compiled-selector token contract, CSS cascade
order and Storybook reference-vs-consumer visuals), cleanup, a migration record
at `src/docs/gamescience-ui-migration.md`, a project context record at
`src/docs/gamescience-ui-contexts.md`, and a machine-readable state file at
`src/docs/gamescience-ui-state.json`.

Migrate audits finish with a **Context architecture recommendation** and a
Map local discussion / vote / results chrome to domain targets when contracts
match: `countdown`, `phase-progress`, `connection-banner`, `phase-header`,
`phase-directive`, `role-panel`, `vote-status`, `outcome-summary`,
`sticky-action-bar`. Preserve timing, voting, role resolution, outcome taxonomy,
charts, radar, and choreography as application-owned.

**Registry coverage backlog** (primitive gap / reusable component / pattern /
template / application-specific / insufficient evidence).

See also: [coverage-reporting.md](./coverage-reporting.md),
[project-state-record.md](./project-state-record.md),
[pattern-composition.md](./pattern-composition.md),
[context-model.md](./context-model.md).
