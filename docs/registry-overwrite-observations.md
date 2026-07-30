# Registry overwrite observations

Date: 2026-07-30T06:08:18.176Z
CLI: `npx shadcn@latest` (resolved at runtime)
Registry namespace template: http://127.0.0.1:56416/r/{name}.json

Initial install method: direct registry JSON file copy (simulating first install of: base, theme-gamescience, button)
Installing consumer npm dependencies…
Initial consumer build: PASS
Local modification applied to src/components/ui/button.tsx with marker: GAMESCIENCE_LOCAL_BUTTON_MODIFICATION_MARKER
Also modified supporting file src/lib/cn.ts (from @gamescience/base) with a distinct marker.

## Reinstall without --overwrite (`-y` only, stdin closed)
Timed out: false
Exit code: 0
CLI output (ANSI stripped):
```
- Checking registry.
✔ Checking registry.
- Updating files.
? The file theme-contract.ts already exists. Would you like to overwrite? › (y/N)
```
Button local marker preserved: YES
Observed prompt behaviour: CLI prompted about existing files
Interpretation: `-y` skips the top-level confirmation, but does NOT itself overwrite existing files. When an existing-file prompt cannot be affirmed, local files remain.

## Reinstall with `--overwrite` / `-o` and `-y`
Timed out: false
Exit code: 0
CLI output (ANSI stripped):
```
- Checking registry.
✔ Checking registry.
- Updating files.
ℹ Updated 5 files:
  - src/themes/theme-contract.ts
  - src/lib/cn.ts
  - src/lib/accessibility.ts
  - src/lib/version.ts
  - src/components/ui/button.tsx
ℹ Skipped 15 files: (files might be identical, use --overwrite to overwrite)
  - src/foundations/tokens.css
  - src/foundations/typography.css
  - src/foundations/motion.css
  - src/foundations/responsive.css
  - src/foundations/index.css
  - src/themes/index.ts
  - src/providers/game-theme-context.ts
  - src/providers/experience-context.ts
  - src/providers/gamescience-provider.tsx
  - src/providers/index.ts
  - src/types/game.ts
  - src/components/ui/sonner.tsx
  - src/docs/gamescience-ui.json
  - src/docs/gamescience-ui-guidance.md
  - src/components/ui/button-group.tsx
```
Button local marker after --overwrite: REMOVED (overwritten from registry)

## Supporting file behaviour
cn.ts marker still present after button-focused reinstalls: NO (was overwritten — likely because button registryDependencies pulled base with --overwrite)

## Changed registry version simulation
Changed registry content without --overwrite:
```
- Checking registry.
✔ Checking registry.
- Updating files.
? The file button.tsx already exists. Would you like to overwrite? › (y/N)
```
Local marker preserved when registry content changed (no --overwrite): YES
VNext marker introduced without --overwrite: NO
Changed registry content with --overwrite:
```
- Checking registry.
✔ Checking registry.
- Updating files.
ℹ Updated 1 file:
  - src/components/ui/button.tsx
ℹ Skipped 19 files: (files might be identical, use --overwrite to overwrite)
  - src/foundations/tokens.css
  - src/foundations/typography.css
  - src/foundations/motion.css
  - src/foundations/responsive.css
  - src/foundations/index.css
  - src/themes/theme-contract.ts
  - src/themes/index.ts
  - src/lib/cn.ts
  - src/lib/accessibility.ts
  - src/lib/version.ts
  - src/providers/game-theme-context.ts
  - src/providers/experience-context.ts
  - src/providers/gamescience-provider.tsx
  - src/providers/index.ts
  - src/types/game.ts
  - src/components/ui/sonner.tsx
  - src/docs/gamescience-ui.json
  - src/docs/gamescience-ui-guidance.md
  - src/components/ui/button-group.tsx
```
Local marker after versioned overwrite: REMOVED
VNext marker after versioned overwrite: PRESENT

## Interactive prompt note
In a TTY, shadcn prompts `The file … already exists. Would you like to overwrite? (y/N)` for each conflicting file unless `--overwrite` is passed. `-y` alone does not affirm those per-file prompts. Automation must use `--overwrite` intentionally, or leave files untouched.

## Summary
- Without `--overwrite`: existing local Button source is preserved (skipped / prompt defaults to no).
- With `--overwrite -y`: local Button source is replaced by registry content.
- Registry dependency resolution may also touch dependency files when overwrite is enabled.
- Overwrites are never accidental when callers omit `--overwrite`.
- Consumer projects should configure `registries["@gamescience"]` in components.json.
