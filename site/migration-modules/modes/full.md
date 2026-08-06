## Mode instructions — full visual alignment

```text
{{MODE_LABEL}}
```

Behaviour:

1. Audit first; build the complete obligation ledger, discovery reconciliation
   and render-path inventory
2. Confirm target identity, scope and rollback
3. Validate stack and token contract (compiled selectors + CSS cascade) before
   broad UI replacement
4. Migrate foundations, run post-install dependency/cache sanity, and prove
   **one** vertical slice before broader context work
5. Proceed through **low- and medium-risk** planned slices without asking for bare continuation.
   Risk guide:
   - Low: direct primitive replacement → continue
   - Medium: domain adoption preserving logic → continue after A–E
   - High: route split, visual removal, privacy, destructive cleanup → stop
   - Blocked: upstream/security/token break → stop
6. Stop for high/blocked risk, ambiguous product decisions, destructive actions,
   unresolved upstream gaps, security/auth changes, or unrecoverable validation
   failures
7. Split only materially divergent compositions
8. Preserve application-owned routes where they remain clear
9. Avoid broad route renaming without functional need
10. Classify blocked work as `upstream-gap` with structured proposals — do not quietly retain as migrated
11. Reconcile project state JSON and obligation **evidence references** after every slice
12. Record Storybook reference-vs-consumer comparisons (matching theme/context/variant/state)
13. Regression-check retained-approved visuals on touched routes
14. Remove redundant forks after validation
15. Preserve application logic
16. Run an independent whole-application coverage audit (coverage-reconstruction methodology)
17. Declare **Full alignment complete** only when discovery differences are zero
    unexplained and A–E evidence is concrete — else **Full alignment incomplete**

A passing slice must lead automatically into the next planned low/medium-risk slice.
“Continue?” must not be required after routine green slices.

Report coverage with dimensions A–E, discovery reconciliation and obligation
dispositions — never imply whole-app coverage from entry surfaces alone.

Full mode is **not** permission for a destructive rewrite.
