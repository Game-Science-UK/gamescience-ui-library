## Mode instructions — safe incremental migration

```text
{{MODE_LABEL}}
```

Behaviour:

1. Audit all relevant surfaces; build an obligation ledger, discovery
   reconciliation and render-path inventory (component + context + mixed-context
   tables)
2. Establish a rollback point
3. Choose **one** context-appropriate vertical slice from the ledger
4. Install foundations (`@gamescience/base`) and selected theme only
5. Establish **one** root `GameScienceProvider`
6. Resolve active context from route or project configuration
7. Validate token contract for the selected stack; run post-install dependency
   sanity after foundation install
8. Migrate one shell and one pattern composition for that slice — do not stall at
   Panel-only swaps when the ledger requires pattern/shell coverage
9. Validate privacy, interaction contract, call-site purity (including semantic
   wrappers), render paths / state matrix and Storybook reference-vs-consumer
   visuals for the migrated context
10. Reconcile `gamescience-ui-state.json` with the Markdown migration record and
    A–E evidence references
11. Record visual-loss decisions when a complete pattern replaces local chrome
12. Stop before restructuring every route
13. Produce a next-step recommendation using coverage dimensions A–E and remaining
    open obligations

Do not interpret this mode as permission for a destructive rewrite or default
route renaming. Do not claim whole-application registry coverage or full
alignment complete from a single slice. Stop after the approved slice unless the
user asks to continue. When the user asks to “fully align”, “complete
migration”, or “make the app registry-driven”, prefer full visual alignment.
