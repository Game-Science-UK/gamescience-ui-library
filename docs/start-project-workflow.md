# Start project workflow

The start composer at `/start/` generates a clean-install brief for new Lovable
projects that have not yet built significant UI.

## Behaviour

- Pins the **current stable** immutable registry URL only
- Installs `@gamescience/base` and one selected theme
- Installs high-level patterns for selected contexts
- Establishes one root `GameScienceProvider`
- Uses local fixture state only (no networking/scoring)

Older historical versions are intentionally not offered for Start briefs.
