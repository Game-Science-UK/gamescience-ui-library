## Mode instructions — safe incremental migration

```text
{{MODE_LABEL}}
```

Behaviour:

1. Audit all relevant surfaces and build an obligation ledger plus render-path inventory
   (component table + context audit table + mixed-context branch table)
2. Establish a rollback point
3. Choose **one** context-appropriate vertical slice from the ledger
4. Install foundations (`@gamescience/base`) and selected theme only
5. Establish **one** root `GameScienceProvider`
6. Resolve active context from route or project configuration
7. Validate token contract for the selected stack
8. Migrate one shell and one pattern composition for that slice
9. Validate privacy, interaction contract, call-site purity, render paths and
   reference-vs-consumer visuals for the migrated context
10. Reconcile `gamescience-ui-state.json` with the Markdown migration record and
    obligation evidence
11. Record visual-loss decisions when a complete pattern replaces local chrome
12. Stop before restructuring every route
13. Produce a next-step recommendation using coverage dimensions A–E and remaining
    open obligations

Do not interpret this mode as permission for a destructive rewrite or default
route renaming. Do not claim whole-application registry coverage or full
alignment complete from a single slice. Stop after the approved slice unless the
user asks to continue.
