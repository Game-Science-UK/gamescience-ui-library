## Mode instructions — safe incremental migration

```text
{{MODE_LABEL}}
```

Behaviour:

1. Audit first and produce the plan
2. Establish a rollback point
3. Install foundations (`@gamescience/base`) and selected theme only
4. Migrate **one** vertical slice
5. Validate
6. Stop before broad project-wide replacement
7. Produce a next-step recommendation

Do not interpret this mode as permission for a destructive rewrite.
