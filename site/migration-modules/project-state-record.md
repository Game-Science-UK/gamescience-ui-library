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
        "source": true,
        "callSite": true,
        "renderPath": true,
        "themeContract": true,
        "visual": true
      }
    }
  ],
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
  "knownIssues": []
}
```

### Obligation dispositions

Every obligation `disposition` must be one of:

- `migrated`
- `retained-approved`
- `upstream-gap`
- `out-of-scope-approved`
- `open` (temporary during safe incremental only)

`evidence` flags map to coverage dimensions A–E:

- `source` → A
- `callSite` → B
- `renderPath` → C
- `themeContract` → D
- `visual` → E

### Rules

- Update the record after **every** migration or sync slice.
- Generate the record from evidence; do not narrate completion the ledger cannot support.
- The canonical `installedItems` list must be current; remove obsolete entries.
- Every migrated surface must declare `context` and `registryItems`.
- Application-owned retained elements and sanctioned exceptions must be listed explicitly.
- Markdown migration reports must be reconcilable against this JSON.
- Prefer `components.json` / package pin when the JSON record and pin disagree;
  then reconcile the state file after review.
- Full alignment complete requires `coverage.unclassified === 0` and no open
  in-scope obligations.
