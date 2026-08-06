# Project state record

Canonical machine-readable migration/sync state for consumer projects:

```text
src/docs/gamescience-ui-state.json
```

This file is **not** a registry runtime dependency. Agents and humans use it to
keep installed-item inventories, obligation ledgers, coverage evidence, migrated
surfaces, local forks and known issues current after every slice.

Schema and reconciliation rules are defined in the Migrate composer module
`project-state-record` (inlined into migration briefs) and summarised below.

## Required fields (schemaVersion 2)

| Field / group                       | Purpose                                                              |
| ----------------------------------- | -------------------------------------------------------------------- |
| `registry.version` / `registry.url` | Pinned immutable release                                             |
| `registry.theme` / `registry.stack` | Single active theme and Tailwind branch                              |
| `payloadIntegrity`                  | Byte/hash verification of installed upstream-managed files           |
| `tokenContract`                     | Required utilities/variables and any missing mappings                |
| `obligations`                       | Closed coverage ledger with dispositions and A–E evidence references |
| `discoveryReconciliation`           | Discovered vs ledgered counts (must reach zero unexplained diffs)    |
| `coverage`                          | Counts by disposition, including `unclassified`                      |
| `installedItems`                    | Canonical installed registry item names                              |
| `migratedSurfaces`                  | Routes/components migrated, with context and items                   |
| `localForks`                        | Local UI still pending review or replacement                         |
| `sanctionedExceptions`              | Named approved deviations from call-site purity                      |
| `retainedDeviations`                | Explicit app-owned keep decisions                                    |
| `knownIssues`                       | Upstream or local defects                                            |
| `evidenceRoot`                      | Artefact directory (prefer `docs/gamescience-ui/evidence`)           |

SchemaVersion 1 records remain readable but should be upgraded when continuing
a migration engagement. Bare A–E booleans are insufficient for full-alignment
`migrated` dispositions — prefer structured evidence objects.

## Rules

- No secrets, tokens, host keys or credentials.
- Update after every migration or sync slice.
- Generate from evidence; do not narrate completion the ledger cannot support.
- Markdown `gamescience-ui-migration.md` installed-item tables and obligation
  summaries must match JSON.
- Full alignment complete requires `coverage.unclassified === 0`, no open
  in-scope obligations, and discovery reconciliation with zero unexplained
  differences.
- When JSON and `components.json` disagree, prefer the pin in `components.json`,
  then reconcile the state file.

See also: [migration-workflow.md](./migration-workflow.md),
[coverage reporting](./coverage-reporting.md).
