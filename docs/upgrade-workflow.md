# Upgrade workflow

The upgrade composer at `/upgrade/` generates a brief for moving an existing
GameScience registry consumer between immutable versions.

## Behaviour

- Select any published immutable source and target version
- Never recommend unversioned `/r/` latest for production
- Inspect with `--diff` before `--overwrite`
- Preserve application-owned files
- Confirm metadata agreement after install
- Include a **Context-model compatibility review**
- Preserve existing valid context architecture
- Avoid restructuring routes merely because a new registry version is installed
- Optionally declare whether the project has an explicit context model:
  `yes` | `partial` | `no` | `unknown`

Typical examples: `0.2.0` → `0.2.1`, `0.2.1` → `0.3.0`, `0.3.0` → `0.4.0`,
`0.4.1` → `0.5.0`, `0.5.0` → `0.5.1`.

For 0.3.0+, install new primitives only as needed; do not replace all local
shadcn inventory automatically. See [migration-notes.md](./migration-notes.md)
and [primitive-layer.md](./primitive-layer.md).

See [context-model.md](./context-model.md).
