# Start project workflow

The start composer at `/start/` generates a clean-install brief for new Lovable
projects that have not yet built significant UI.

## Behaviour

- Pins the **current stable** immutable registry URL only
- Installs `@gamescience/base` and one selected theme
- Installs high-level patterns only for selected contexts
- Clarifies that unselected contexts are not required
- Establishes one root `GameScienceProvider`
- Resolves active context from the active surface
- Includes the shared experience context model module
- Requires `src/docs/gamescience-ui-contexts.md`
- Uses local fixture state only (no networking/scoring)

Older historical versions are intentionally not offered for Start briefs.

See [context-model.md](./context-model.md).
