# Upgrade workflow

The upgrade composer at `/upgrade/` generates a brief for moving an existing
GameScience registry consumer between immutable versions.

## Behaviour

- Select any published immutable source and target version
- Never recommend unversioned `/r/` latest for production
- Inspect with `--diff` before `--overwrite`
- Preserve application-owned files
- Confirm metadata agreement after install

Typical example: `0.2.0` → `0.2.1`.
