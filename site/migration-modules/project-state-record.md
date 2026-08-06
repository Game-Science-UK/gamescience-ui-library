## Canonical project state record

Maintain a machine-readable project record at:

```text
src/docs/gamescience-ui-state.json
```

This file is **project documentation and agent state**. It is not a registry
runtime dependency. Do not put secrets, host keys, tokens or credentials in it.

Prefer **schemaVersion 2**. SchemaVersion 1 records remain readable but must be
upgraded when continuing a migration engagement.

### Schema (version 2)

```json
{
  "schemaVersion": 2,
  "registry": {
    "version": "{{VERSION}}",
    "url": "{{REGISTRY_URL}}",
    "theme": "{{THEME}}",
    "stack": "tailwind-3"
  },
  "payloadIntegrity": {
    "verifiedAt": "",
    "items": [],
    "unexplainedMismatches": []
  },
  "tokenContract": {
    "requiredUtilities": [],
    "requiredVariables": [],
    "missingUtilities": [],
    "missingVariables": []
  },
  "obligations": [
    {
      "id": "participant-join.code-input",
      "surface": "src/pages/JoinGame.tsx",
      "renderPath": "default",
      "responsibility": "text input",
      "target": "@gamescience/input",
      "disposition": "migrated",
      "evidence": {
        "source": {
          "status": "pass",
          "items": ["input"],
          "payloadHash": "sha256:…",
          "files": ["src/components/ui/input.tsx"]
        },
        "callSite": {
          "status": "pass",
          "consumers": ["src/pages/JoinGame.tsx:42"],
          "purityScan": "pass"
        },
        "renderPath": {
          "status": "pass",
          "branches": ["default", "error"]
        },
        "themeContract": {
          "status": "pass",
          "utilities": ["h-control-md"],
          "computedStyleFixture": "join-input"
        },
        "visual": {
          "status": "pass",
          "story": "components-ui-input--default",
          "theme": "{{THEME}}",
          "context": "participant",
          "variant": "default",
          "consumerRoute": "/join",
          "consumerState": "default",
          "screenshot": "docs/gamescience-ui/evidence/slice-01/join-input.png"
        }
      }
    }
  ],
  "discoveryReconciliation": {
    "routes": { "discovered": 0, "ledgered": 0, "difference": 0 },
    "renderBranches": { "discovered": 0, "ledgered": 0, "difference": 0 },
    "localUiComponents": { "discovered": 0, "ledgered": 0, "difference": 0 },
    "rawControls": { "discovered": 0, "ledgered": 0, "difference": 0 },
    "semanticWrappers": { "discovered": 0, "ledgered": 0, "difference": 0 },
    "registryImports": { "discovered": 0, "ledgered": 0, "difference": 0 },
    "identityOverrides": { "discovered": 0, "ledgered": 0, "difference": 0 }
  },
  "coverage": {
    "total": 0,
    "migrated": 0,
    "retainedApproved": 0,
    "upstreamGap": 0,
    "outOfScopeApproved": 0,
    "unclassified": 0
  },
  "installedItems": ["base", "theme-{{THEME}}", "panel", "sonner"],
  "migratedSurfaces": [
    {
      "id": "participant-join",
      "path": "src/pages/JoinGame.tsx",
      "route": "/join",
      "context": "participant",
      "status": "migrated",
      "registryItems": ["participant-shell", "join-flow"],
      "applicationOwned": ["session lookup", "join networking", "analytics"]
    }
  ],
  "localForks": [],
  "sanctionedExceptions": [],
  "retainedDeviations": [],
  "knownIssues": [],
  "evidenceRoot": "docs/gamescience-ui/evidence"
}
```

### Obligation dispositions

Every obligation `disposition` must be one of:

- `migrated`
- `retained-approved`
- `upstream-gap`
- `out-of-scope-approved`
- `open` (temporary during safe incremental only)

`evidence` maps to coverage dimensions A–E. Prefer structured objects with
`status` plus concrete references (files, hashes, consumers, Storybook ids,
screenshot paths). Bare booleans are insufficient for full-alignment
`migrated` dispositions.

### Rules

- Update the record after **every** migration or sync slice.
- Generate the record from evidence; do not narrate completion the ledger cannot support.
- The canonical `installedItems` list must be current; remove obsolete entries.
- Every migrated surface must declare `context` and `registryItems`.
- Application-owned retained elements and sanctioned exceptions must be listed explicitly.
- Markdown migration reports must be reconcilable against this JSON.
- Prefer `components.json` / package pin when the JSON record and pin disagree;
  then reconcile the state file after review.
- Full alignment complete requires `coverage.unclassified === 0`, no open
  in-scope obligations, and discovery reconciliation with zero unexplained
  differences.
