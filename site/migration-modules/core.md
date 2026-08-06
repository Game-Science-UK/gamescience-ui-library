## Objective

Migrate an existing non-registry Lovable project onto GameScience UI version **{{VERSION}}** while preserving game logic and application behaviour.

Pin only this immutable registry URL:

```text
{{REGISTRY_URL}}
```

Do not use the unversioned `/r/` latest path for production consumers.
Do not redesign the game. Do not invent shared components in the consumer project.

Treat migration as a **closed coverage ledger**, not a sequence of successful
slices. Build/test green proves a slice did not break; it does not prove the
application has been comprehensively reconciled against the registry.

Before rewriting UI, inventory render branches and create an obligation ledger.
Validate every slice across coverage dimensions A–E (source, call-site,
render-path, theme-contract, visual/behavioural). In full visual alignment,
proceed through the approved plan without routine continuation prompts, then run
an independent coverage-reconstruction audit before declaring complete.
