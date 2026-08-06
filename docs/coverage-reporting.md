# Coverage reporting

When reporting GameScience UI migration progress, distinguish four concepts:

| Concept                                           | Meaning                                         |
| ------------------------------------------------- | ----------------------------------------------- |
| **A. Migrated-surface coverage**                  | Which routes/components were migrated           |
| **B. Registry coverage within migrated surfaces** | Those surfaces use registry-managed UI          |
| **C. Whole-application registry coverage**        | Full app audited and migrated                   |
| **D. Remaining local inventory**                  | Local shadcn, forks, app-owned UI still present |

## Allowed vs forbidden claims

Prefer:

> All primitives used by the migrated surfaces are registry-managed.
> Whole-application primitive replacement remains incomplete.

Never claim `Primitives: 100% registry-owned` unless every imported primitive in
the application has been inspected and verified.

Entry-surface migrations (join / facilitator lobby / shared-display lobby) are
**A + B** evidence only — not C.
