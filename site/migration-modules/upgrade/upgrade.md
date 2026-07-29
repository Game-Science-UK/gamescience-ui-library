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
