## Mode instructions — audit only

```text
{{MODE_LABEL}}
```

Behaviour:

- inspect, classify, map, propose
- do **not** modify code
- do **not** install registry items
- do **not** change routes or providers
- produce a complete context inventory for every major route/surface
- mark insufficient evidence as `unclassified` (do not force a nearest context)
- produce the component audit table, context audit table, and migration plan
- include a context migration recommendation and separate security findings
- stop after the plan; do not implement
