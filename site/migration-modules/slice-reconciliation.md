## Slice reconciliation

Before completing a migration slice, reconcile the canonical inventories. Do
**not** append only a narrative slice note.

### Must update together

1. `src/docs/gamescience-ui-state.json` — installed items, obligations, coverage
   counts, payload integrity, token contract, migrated surfaces, local forks,
   sanctioned exceptions, retained deviations, known issues
2. `src/docs/gamescience-ui-migration.md` — human-readable summary whose
   installed-item table and obligation summary match the JSON
3. `src/docs/gamescience-ui-contexts.md` — route → context map
4. Render-path inventory dispositions for the slice
5. Visual-loss, mixed-context and reference-vs-consumer findings for the slice

### Reconciliation checks

Where practical, verify:

| Check             | Rule                                                                  |
| ----------------- | --------------------------------------------------------------------- |
| Installed items   | Every `installedItems` entry exists in the pinned release             |
| Obligations       | Every slice obligation has disposition + A–E evidence flags           |
| Surfaces          | Every migrated surface has a context and registry item list           |
| Render paths      | No file/route marked migrated while branches remain open/unclassified |
| Payload integrity | No unexplained mismatches in upstream-managed files                   |
| Token contract    | No missing required utilities/variables for installed items           |
| Uniqueness        | No duplicate installed items                                          |
| Version           | `registry.url` version segment matches `registry.version`             |
| Theme             | Theme item matches the selected theme (`theme-{{THEME}}`)             |
| Secrets           | State file contains no tokens, keys or credentials                    |
| Coverage language | Markdown and JSON do not claim contradictory coverage                 |

If a Markdown slice note says shells and patterns were installed, the top-level
installed-items table and `gamescience-ui-state.json` must list them in the
same commit/slice.

“Slice green” from typecheck/tests/build does not close obligations that lack
call-site, render-path, token-contract or visual evidence.
