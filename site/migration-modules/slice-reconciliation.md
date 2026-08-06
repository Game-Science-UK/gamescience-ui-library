## Slice reconciliation

Before completing a migration slice, reconcile the canonical inventories. Do
**not** append only a narrative slice note.

### Must update together

1. `src/docs/gamescience-ui-state.json` — installed items, migrated surfaces,
   local forks, retained deviations, known issues
2. `src/docs/gamescience-ui-migration.md` — human-readable summary whose
   installed-item table matches the JSON
3. `src/docs/gamescience-ui-contexts.md` — route → context map
4. Visual-loss and mixed-context findings for the slice

### Reconciliation checks

Where practical, verify:

| Check             | Rule                                                        |
| ----------------- | ----------------------------------------------------------- |
| Installed items   | Every `installedItems` entry exists in the pinned release   |
| Surfaces          | Every migrated surface has a context and registry item list |
| Uniqueness        | No duplicate installed items                                |
| Version           | `registryUrl` version segment matches `registryVersion`     |
| Theme             | Theme item matches the selected theme (`theme-{{THEME}}`)   |
| Secrets           | State file contains no tokens, keys or credentials          |
| Coverage language | Markdown and JSON do not claim contradictory coverage       |

If a Markdown slice note says shells and patterns were installed, the top-level
installed-items table and `gamescience-ui-state.json` must list them in the
same commit/slice.
