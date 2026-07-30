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

Typical example: `0.2.0` → `0.2.1`.

See [context-model.md](./context-model.md).
