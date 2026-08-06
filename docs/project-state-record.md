# Project state record

Canonical machine-readable migration/sync state for consumer projects:

```text
src/docs/gamescience-ui-state.json
```

This file is **not** a registry runtime dependency. Agents and humans use it to
keep installed-item inventories, migrated surfaces, local forks and known issues
current after every slice.

Schema and reconciliation rules are defined in the Migrate composer module
`project-state-record` (inlined into migration briefs) and summarised below.

## Required fields (schemaVersion 1)

| Field                             | Purpose                                            |
| --------------------------------- | -------------------------------------------------- |
| `registryVersion` / `registryUrl` | Pinned immutable release                           |
| `theme`                           | Single active theme                                |
| `stack`                           | Tailwind / React / router detection                |
| `contexts`                        | Experience contexts in use                         |
| `installedItems`                  | Canonical installed registry item names            |
| `migratedSurfaces`                | Routes/components migrated, with context and items |
| `localForks`                      | Local UI still pending review or replacement       |
| `retainedDeviations`              | Explicit app-owned keep decisions                  |
| `knownIssues`                     | Upstream or local defects                          |

## Rules

- No secrets, tokens, host keys or credentials.
- Update after every migration or sync slice.
- Markdown `gamescience-ui-migration.md` installed-item tables must match JSON.
- When JSON and `components.json` disagree, prefer the pin in `components.json`,
  then reconcile the state file.

See also: [migration-workflow.md](./migration-workflow.md),
[coverage reporting](./coverage-reporting.md).
