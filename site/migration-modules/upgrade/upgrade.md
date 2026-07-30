## Upgrade a registry project

Target immutable version **{{TO_VERSION}}** only:

```text
{{REGISTRY_URL}}
```

1. Verify live target URLs return JSON for `base`, the installed theme, and `version.json`
2. Update `components.json` pin from **{{FROM_VERSION}}** to **{{TO_VERSION}}**
3. Inspect diffs for affected upstream items before overwrite
4. Reinstall changed upstream-managed files only (typically `base` and theme when packaging changed)
5. Preserve application-owned code
6. Remove superseded local patches (for example temporary Citadel font `@import` patches)
7. Confirm metadata agreement: `src/lib/version.ts`, guidance, and diagnostics report **{{TO_VERSION}}**
8. Run project checks

Comparison harness: {{COMPARISON_HARNESS}}
Affected items hint: {{AFFECTED_ITEMS}}

Do not point the project at unversioned `/r/` latest.

## Context-model compatibility review

Project context-model status (composer selection): **{{CONTEXT_MODEL_STATUS}}**

Inspect and preserve the project's existing context mapping:

- existing `ExperienceContext` values (`participant` | `facilitator` | `shared-display`)
- root-provider placement
- how context is selected (route metadata, map, layout decision)
- route-to-context mapping
- shell usage and pattern usage
- shared-display privacy where that context exists
- any local context patches
- any nested providers
- any components branching heavily across context

Upgrade guidance:

- Avoid restructuring routes merely because a new registry version is installed.
- Preserve the existing valid context architecture.
- Adopt new context guidance only where the target release requires it.
- Record context-related diffs separately from ordinary upstream overwrites.
- Verify one active root context and one active theme.
- Verify no role is inferred from context.
- Verify shared display remains PII-safe / room-safe.
- Update `src/docs/gamescience-ui-contexts.md` when context architecture changes.

Depth by status:

| Status  | Review depth                                                                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| yes     | Compatibility check against the context model; no full migration audit                                                                                              |
| partial | Map declared vs undeclared surfaces; fix gaps without broad route rewrites                                                                                          |
| no      | Recommend establishing the context record and root-provider pattern; do not run a complete migration audit unless the project clearly predates the context contract |
| unknown | Lightweight discovery first; escalate only if evidence shows missing context contract                                                                               |

Do not force all three contexts. Do not equate facilitator context with
facilitator authority.
