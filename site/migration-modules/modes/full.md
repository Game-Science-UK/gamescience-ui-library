## Mode instructions — full visual alignment

```text
{{MODE_LABEL}}
```

Behaviour:

1. Audit first (component table + context audit table)
2. Migrate foundations and prove **one** vertical slice before broader context work
3. Migrate context by context after the first slice passes
4. Split only materially divergent compositions
5. Preserve application-owned routes where they remain clear
6. Avoid broad route renaming without functional need
7. Retain application-specific surfaces that do not map cleanly
8. Report registry gaps rather than inventing a fourth context
9. Remove redundant forks after validation
10. Preserve application logic

Full mode is **not** permission for a destructive rewrite.
