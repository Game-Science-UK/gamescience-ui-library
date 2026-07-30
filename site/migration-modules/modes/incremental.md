## Mode instructions — safe incremental migration

```text
{{MODE_LABEL}}
```

Behaviour:

1. Audit all relevant surfaces (component table + context audit table)
2. Establish a rollback point
3. Choose **one** context-appropriate vertical slice
4. Install foundations (`@gamescience/base`) and selected theme only
5. Establish **one** root `GameScienceProvider`
6. Resolve active context from route or project configuration
7. Migrate one shell and one pattern composition for that slice
8. Validate privacy and interaction contract for the migrated context
9. Stop before restructuring every route
10. Produce a next-step recommendation

Do not interpret this mode as permission for a destructive rewrite or default
route renaming.
