# Coverage reporting

When reporting GameScience UI migration progress, treat migration as a **closed
coverage ledger** and distinguish five independently measured dimensions:

| Concept                        | Meaning                                                              |
| ------------------------------ | -------------------------------------------------------------------- |
| **A. Source coverage**         | Correct registry files installed; payload matches immutable release  |
| **B. Call-site coverage**      | Surfaces use registry items correctly, without identity overrides    |
| **C. Render-path coverage**    | All meaningful branches/states use the intended implementation       |
| **D. Theme-contract coverage** | Required utilities/variables resolve in config and compiled CSS      |
| **E. Visual / behavioural**    | Consumer matches registry reference states and interaction contracts |

Every in-scope UI obligation must end in exactly one disposition:

`migrated` | `retained-approved` | `upstream-gap` | `out-of-scope-approved`

## Allowed vs forbidden claims

Prefer:

> All primitives used by the migrated surfaces are registry-managed.
> Whole-application primitive replacement remains incomplete.
> Obligation ledger: 94 migrated, 12 retained-approved, 6 upstream-gap, 0 unclassified.

Never claim `Primitives: 100% registry-owned` or `Full alignment complete` unless
the full obligation ledger has final dispositions, migrated obligations pass
A–E, payload integrity and token contract pass, and an independent coverage
audit reconciles ledger, repository and runtime.

Entry-surface migrations (join / facilitator lobby / shared-display lobby) are
partial ledger progress only — not whole-application completion.

Build/test green proves a slice did not break. It does not prove coverage
completeness.
