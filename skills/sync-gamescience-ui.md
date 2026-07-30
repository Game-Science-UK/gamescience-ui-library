---
name: sync-gamescience-ui
description: Use when checking, updating, or synchronising an existing Lovable project with the GameScience UI registry. Audits the current pin and local registry-managed files, discovers a newer immutable registry release, reviews diffs, applies safe updates, preserves application-owned changes, validates the project, and updates migration records. Not for initial registry adoption or redesigning application-specific game UI.
---

# Sync GameScience UI

Synchronise the current project with the GameScience UI registry through a
controlled, diff-first upgrade.

Never blindly overwrite project-local source.

## Registry source

Use the GameScience UI immutable registry:

```text
https://game-science-uk.github.io/gamescience-ui-library/versions/{version}/r/{name}.json
```

Use published registry metadata and migration notes to determine the latest
stable immutable release.

Do not use an unreleased branch, mutable build artefact, draft version, or
historical release modified in place.

## Core principles

Installed registry items are project-local source.

A registry release does not automatically modify the project.

Synchronisation must:

- identify the project's current registry version
- inspect local modifications against that version
- discover the latest stable immutable version
- read relevant migration notes
- update only installed or newly required registry items
- use diffs before overwrites
- preserve application-owned logic and deliberate deviations
- validate before reporting success
- leave a durable update record

Do not:

- install the full registry catalogue
- overwrite uncertain local changes
- replace application-specific game UI
- rewrite routes without a documented release requirement
- change authentication, authorisation, RLS or database logic
- change game mechanics
- change the active theme
- add unused contexts
- use an unversioned registry URL as the project pin
- modify an immutable registry release
- report completion while validation fails

## 1. Inspect project configuration

Locate:

- `components.json`
- package manifest and lockfile
- GameScience provider
- installed theme files
- registry-generated components
- registry version metadata
- migration and context records
- `AGENTS.md`
- local UI documentation

Check for records such as:

- `src/docs/gamescience-ui-migration.md`
- `src/docs/gamescience-ui-contexts.md`
- `src/docs/gamescience-ui-update-history.md`

Determine:

- current pinned registry version
- active theme
- contexts in use
- installed registry items
- locally modified registry-managed files
- application-owned components
- documented deviations
- Tailwind version
- React version
- current build and validation commands

Do not infer the current version only from comments in source files when
machine-readable metadata exists.

If the current version cannot be established confidently, stop before applying
changes and report the conflicting evidence.

## 2. Establish a rollback point

Before changing files:

- confirm the working tree state
- identify unrelated uncommitted work
- create or recommend a rollback point consistent with the project workflow
- do not include unrelated changes in the registry update

If unrelated uncommitted changes make safe attribution impossible, do not
overwrite files.

Report which files are already modified before the sync begins.

## 3. Audit against the current pinned release

Before checking for a newer release, compare the project's installed
registry-managed files against the project's currently pinned immutable release.

For each installed item, classify it as:

| Classification         | Meaning                                      |
| ---------------------- | -------------------------------------------- |
| Clean                  | Matches the currently pinned registry source |
| Intentional deviation  | Locally modified and documented              |
| Undocumented drift     | Locally modified without a record            |
| Obsolete               | Installed but no longer used                 |
| Missing                | Recorded as installed but absent             |
| Uncertain              | Ownership cannot be established safely       |

Use the registry CLI's diff mode where available.

For each item:

```bash
npx shadcn@latest add @gamescience/{item} --diff
```

Use the actual project registry configuration and command syntax.

Do not overwrite during this step.

Inspect dependency files as well as the primary item file.

A clean diff against the current release means the project is eligible for a
straightforward upgrade.

A local diff does not automatically mean the project is wrong.

## 4. Classify local changes

For every locally modified registry-managed file, determine whether the change
is:

### Application-owned integration

Examples:

- callback wiring
- project-specific content
- route integration
- analytics hooks
- application state bindings

Prefer moving such logic outside registry-managed files before upgrading.

### Deliberate visual deviation

Examples:

- documented project-specific layout
- approved client variation
- game-specific visual layer

Preserve unless the user explicitly requests standardisation.

Record the deviation.

### Obsolete fork

A local workaround that the newer registry release replaces.

Plan to remove it after reviewing the newer implementation.

### Accidental drift

A change that has no clear application requirement.

It may be restored to the registry implementation after review.

### Uncertain

Do not overwrite.

Report the conflict and the evidence required to decide.

## 5. Discover the latest stable release

Inspect the public GameScience registry release metadata.

Determine:

- current project version
- latest stable immutable version
- all intermediate versions
- release type for each step
- relevant migration notes
- changed registry items
- changed theme contracts
- changed dependency contracts
- changed provider or context contracts
- breaking changes
- required manual actions

Do not skip intermediate migration requirements merely because the project is
moving directly to the latest version.

If the project is already on the latest version, continue to the current-release
drift report and do not rewrite files unnecessarily.

## 6. Produce a pre-change sync plan

Before applying changes, output:

### Current state

- Current registry version:
- Latest registry version:
- Active theme:
- Contexts:
- Installed registry items:
- Clean items:
- Modified items:
- Missing items:
- Obsolete items:

### Release path

| From | To | Release type | Relevant changes | Required action |
| ---- | -- | ------------ | ---------------- | --------------- |

### Planned file actions

| File or item | Current ownership | Upstream change | Proposed action | Risk |
| ------------ | ----------------- | --------------- | --------------- | ---- |

### Deferred conflicts

List every uncertain or deliberately retained local difference.

Do not apply a high-risk or uncertain overwrite without explicit approval.

## 7. Update the registry pin

When an upgrade is available and safe to proceed, update the project's
GameScience registry reference to the target immutable version.

Example:

```json
{
  "registries": {
    "@gamescience": "https://game-science-uk.github.io/gamescience-ui-library/versions/0.3.1/r/{name}.json"
  }
}
```

Use the actual target release.

Update all machine-readable version metadata consistently.

Do not leave mixed version references unless migration notes explicitly require
a staged transition.

Do not use the unversioned latest URL as the committed project pin.

## 8. Determine the update set

Update only:

- currently installed registry items changed by the target release
- their changed registry dependencies
- newly required dependencies documented by migration notes
- the selected theme when it changed
- foundations or provider when their contracts changed
- generated guidance or version metadata when required

Do not install:

- unrelated primitives
- patterns the application does not use
- unselected themes
- unused context shells
- speculative replacements for application-owned components

When release metadata does not provide a changed-item list, diff the project's
installed item set against the target release.

## 9. Diff against the target release

For every affected item, run diff mode before overwrite.

Example:

```bash
npx shadcn@latest add @gamescience/theme-gamescience --diff
npx shadcn@latest add @gamescience/button --diff
```

Review:

- source changes
- CSS changes
- dependency changes
- imported utility changes
- provider changes
- generated documentation changes

Classify each target diff as:

- safe upstream replacement
- upstream replacement requiring integration repair
- local deviation to preserve
- manual merge required
- no effective change

Do not assume a theme update affects only one file. Inspect declared registry
dependencies.

## 10. Apply safe updates

Use overwrite only after reviewing the target diff.

Example:

```bash
npx shadcn@latest add @gamescience/theme-gamescience --overwrite
```

After overwrite:

- restore required application integration outside registry-managed files
- preserve documented deviations
- remove obsolete local workarounds
- update imports only where required
- do not redesign unaffected screens
- do not refactor unrelated code

Where a manual merge is required, make the smallest merge that preserves:

- the new registry contract
- application-owned behaviour
- accessibility
- theme and context behaviour
- existing public application APIs where practical

## 11. Theme update rule

When a release changes only semantic theme values:

- update the selected theme item
- update foundations only if the theme contract changed
- do not reinstall every component
- validate that existing components inherit the new token values

When a release adds or removes required semantic tokens:

- update foundations
- update the selected theme
- update only components that consume the changed contract
- follow the release migration notes

When component markup or APIs change:

- update those specific installed components
- do not assume the theme update covers their source changes

## 12. Preserve application ownership

Always preserve application-owned:

- game logic
- networking
- persistence
- authentication
- authorisation
- RLS
- analytics
- route orchestration
- scoring
- game-specific visuals
- project-specific content
- sector or scenario mechanics
- realtime subscriptions

Registry components may receive application state and callbacks.

They must not absorb application logic during synchronisation.

## 13. Verify context architecture

Confirm after the update:

- one active GameScience provider per rendered application root
- active theme is unchanged unless explicitly requested
- experience context remains separate from role and authority
- route-to-context mapping remains valid
- selected shells remain appropriate
- shared-display surfaces remain public-room-safe
- no unnecessary contexts were introduced
- portal components inherit root theme and context

Do not restructure valid context architecture solely because a new registry
release exists.

## 14. Remove obsolete local inventory carefully

After updated registry items validate:

- identify unused local shadcn primitives
- identify replaced registry forks
- identify obsolete workarounds
- identify duplicate token definitions

Remove or quarantine only after confirming there are no imports or dynamic uses.

Do not delete application-specific components because they lack a registry
equivalent.

## 15. Validate

Run the project's existing checks.

At minimum where available:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Also validate:

- relevant routes
- both mobile and desktop layouts
- active theme
- active contexts
- keyboard interaction
- focus states
- overlay portals
- responsive behaviour
- reduced motion where relevant
- shared-display privacy
- no console errors
- no missing CSS variables
- no duplicate React or Radix dependencies

Use the project's actual script names.

Do not report success while required checks fail.

## 16. Update project records

Create or update:

`src/docs/gamescience-ui-update-history.md`

Record:

```markdown
## GameScience UI update

- Previous version:
- New version:
- Date:
- Active theme:
- Contexts:
- Items reviewed:
- Items updated:
- Items unchanged:
- Items removed:
- Local deviations preserved:
- Local deviations removed:
- Manual merges:
- Migration notes followed:
- Validation completed:
- Remaining issues:
```

Also update where relevant:

- `src/docs/gamescience-ui-migration.md`
- `src/docs/gamescience-ui-contexts.md`
- `AGENTS.md`

Do not include secrets, tokens, host keys or credentials.

## 17. Final output

Report:

### Result

One of:

- No update required
- Updated successfully
- Updated with retained deviations
- Partial update requiring review
- Blocked by unresolved ownership or validation issues

### Version

- Previous:
- Target:
- Registry URL:

### Drift before update

| Item | Classification | Action |
| ---- | -------------- | ------ |

### Changes applied

| Item | Files | Upstream change | Local handling |
| ---- | ----- | --------------- | -------------- |

### Deviations retained

Explain why each retained deviation remains application-owned.

### Validation

List every check and result.

### Follow-up

List only unresolved conflicts, failed checks or genuinely required manual work.
