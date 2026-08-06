## Canonical project state record

Maintain a machine-readable project record at:

```text
src/docs/gamescience-ui-state.json
```

This file is **project documentation and agent state**. It is not a registry
runtime dependency. Do not put secrets, host keys, tokens or credentials in it.

### Schema (version 1)

```json
{
  "schemaVersion": 1,
  "registryVersion": "{{VERSION}}",
  "registryUrl": "{{REGISTRY_URL}}",
  "theme": "{{THEME}}",
  "stack": {
    "tailwind": "3",
    "react": "18",
    "router": "react-router-dom"
  },
  "contexts": ["participant", "facilitator", "shared-display"],
  "installedItems": ["base", "theme-citadel", "panel", "sonner"],
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
  "localForks": [
    {
      "path": "src/components/ui/ConnectionStatus.tsx",
      "status": "pending-review",
      "registryTarget": "connection-status"
    }
  ],
  "retainedDeviations": [],
  "knownIssues": []
}
```

### Rules

- Update the record after **every** migration or sync slice.
- The canonical `installedItems` list must be current; remove obsolete entries.
- Every migrated surface must declare `context` and `registryItems`.
- Application-owned retained elements must be listed explicitly.
- Markdown migration reports must be reconcilable against this JSON.
- Prefer `components.json` / package pin when the JSON record and pin disagree;
  then reconcile the state file after review.
