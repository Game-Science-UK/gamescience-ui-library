---
name: sync-gamescience-ui
description: Use when checking, updating, or synchronising an existing Lovable project with the GameScience UI registry. Audits the current pin and local registry-managed files, discovers a newer immutable registry release, reviews diffs, applies safe updates, preserves application-owned changes, validates the project, and updates migration records. Supports check-only invocations such as "Check whether GameScience UI is current" that discover and diff without changing files. Distinguishes registry item currency from public or project guidance freshness. Not for initial registry adoption or redesigning application-specific game UI.
skillUpdated: 2026-08-18
libraryVersion: 1.3.0
distribution: lovable-workspace
---

# Sync GameScience UI

`skillUpdated: 2026-08-18` · `libraryVersion: 1.3.0`. Report both values in the final output so the running copy can be identified.

Synchronise the current project with the GameScience UI registry through a
controlled, diff-first upgrade.

Never blindly overwrite project-local source.

## Invocation modes

### Sync (default)

Discover, plan, apply safe updates, validate, and record.

### Check-only

When the user asks to check currency without updating — for example:

- Check whether GameScience UI is current
- Is our registry pin up to date?
- Diff our GameScience UI against latest without changing anything

Perform discovery, drift classification and diffing only. Make **no** file
changes. Do not update the pin, overwrite components, rewrite docs, or create
history records.

Check-only does not need a separate skill.

Final result for a clean check-only run must state that no files were modified,
but do not use the audit skill’s formal outcome claim as a substitute for the
sync result vocabulary below.

Detect theme, Tailwind stack, and experience contexts from the project unless
the user explicitly overrides them. Do not change the active theme or add
unused contexts during sync.

Related skills:

- `adopt-gamescience-ui` — greenfield / early-stage first adoption
- `audit-gamescience-ui` — read-only classification and backlog
- `migrate-gamescience-ui` — established-project adoption
- `validate-gamescience-ui` — compliance checks without upgrade

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
- distinguish registry item currency from guidance freshness
- read relevant migration notes and release manifests when available
- update only installed or newly required registry items
- use diffs before overwrites
- preserve application-owned logic and deliberate deviations
- validate before reporting success
- leave a durable update record after applied changes

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
- apply changes during check-only invocation

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

- `src/docs/gamescience-ui-state.json` (canonical machine-readable inventory when present)
- `src/docs/gamescience-ui-migration.md`
- `src/docs/gamescience-ui-contexts.md`
- `src/docs/gamescience-ui-update-history.md`

When `gamescience-ui-state.json` is present, use it to determine:

- current registry version
- installed registry items
- active theme
- contexts
- known local forks
- retained deviations
- known upstream issues
- migrated surfaces

If the JSON record and `components.json` disagree:

- report the disagreement
- prefer machine-readable package/registry configuration for the current pin
- do not overwrite uncertain files
- reconcile the state record after review

Do not require the state file to exist. Fall back to existing inspection when
absent.

Also determine:

- locally modified registry-managed files
- application-owned components
- Tailwind version
- React version
- current build and validation commands
- project-local generated guidance revision
- public migration guidance revision when available

Do not infer the current version only from comments in source files when
machine-readable metadata exists.

If the current version cannot be established confidently, stop before applying
changes and report the conflicting evidence.

## 1a. Distinguish registry metadata from documentation metadata

Check these layers separately:

| Layer                              | Examples                                                       | Currency question                                       |
| ---------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------- |
| Registry item version              | pinned `/versions/{version}/`, `src/lib/version.ts`, item JSON | Are installed components on the target release?         |
| Public migration guidance revision | published `/docs/*`, `migration-notes.md`, composers           | Has public guidance moved without a registry bump?      |
| Project-local generated guidance   | `src/docs/gamescience-ui-guidance.md`, local migration notes   | Is project documentation stale relative to public docs? |

Public docs can change without a registry version change.

That means a project can be:

- **Registry source current**
- **Guidance stale**

In that case the sync result may need to update project documentation without
reinstalling components.

Never treat a documentation-only refresh as proof that component source was
reinstalled. Never treat a registry version match as proof that local guidance
is current.

## 2. Establish a rollback point

Skip this section in check-only mode.

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

| Classification        | Meaning                                      |
| --------------------- | -------------------------------------------- |
| Clean                 | Matches the currently pinned registry source |
| Intentional deviation | Locally modified and documented              |
| Undocumented drift    | Locally modified without a record            |
| Obsolete              | Installed but no longer used                 |
| Missing               | Recorded as installed but absent             |
| Uncertain             | Ownership cannot be established safely       |

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
- changed registry items from release manifests when available
- changed theme contracts
- changed dependency contracts
- changed provider or context contracts
- breaking changes
- required manual actions
- public guidance revisions that changed without a registry bump

Do not skip intermediate migration requirements merely because the project is
moving directly to the latest version.

If the project is already on the latest version, continue to the current-release
drift report and guidance-freshness check. Do not rewrite component files
unnecessarily.

If registry source is current but project-local guidance is stale, plan a
documentation-only update unless check-only mode is active.

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

| From | To  | Release type | Relevant changes | Required action |
| ---- | --- | ------------ | ---------------- | --------------- |

### Planned file actions

| File or item | Current ownership | Upstream change | Proposed action | Risk |
| ------------ | ----------------- | --------------- | --------------- | ---- |

### Metadata freshness

- Registry source current: yes / no
- Public guidance newer than project-local guidance: yes / no
- Documentation-only update sufficient: yes / no

### Deferred conflicts

List every uncertain or deliberately retained local difference.

Do not apply a high-risk or uncertain overwrite without explicit approval.

In check-only mode, stop after this plan. Report the plan as the result and make
no changes.

## 7. Update the registry pin

Skip in check-only mode.

When an upgrade is available and safe to proceed, update the project's
GameScience registry reference to the target immutable version.

Example:

```json
{
  "registries": {
    "@gamescience": "https://game-science-uk.github.io/gamescience-ui-library/versions/{version}/r/{name}.json"
  }
}
```

Use the actual target release.

Update all machine-readable version metadata consistently.

Do not leave mixed version references unless migration notes explicitly require
a staged transition.

Do not use the unversioned latest URL as the committed project pin.

## 8. Determine the update set

Skip component updates in check-only mode. Still compute the candidate set for
the report.

### Prefer release manifests

When the registry publishes changed-item metadata for the release path, define
the initial diff set as:

```text
installed items ∩ changed items
```

Include transitive registry dependencies declared by those changed items when
the manifest or item payloads require it.

Fallback to a full installed-item diff against the target release only when
changed-item metadata is absent.

Update only:

- the initial diff set above
- newly required dependencies documented by migration notes
- the selected theme when it changed
- foundations or provider when their contracts changed
- generated guidance or version metadata when required
- project-local documentation when public guidance is newer and registry source
  is otherwise current

Do not install:

- unrelated primitives
- patterns the application does not use
- unselected themes
- unused context shells
- speculative replacements for application-owned components

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

Skip in check-only mode.

When only guidance is stale, update project documentation and local generated
guidance references without reinstalling unchanged components.

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

Skip broad validation in check-only mode unless the user explicitly asks to
validate as well; in that case hand the compliance pass to
`validate-gamescience-ui` or run the checks without modifying files.

After applied updates, run the project's existing checks.

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

Skip in check-only mode.

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
- Documentation-only updates:
- Local deviations preserved:
- Local deviations removed:
- Manual merges:
- Migration notes followed:
- Release manifest used:
- Validation completed:
- Remaining issues:
```

Also update where relevant:

- `src/docs/gamescience-ui-migration.md`
- `src/docs/gamescience-ui-contexts.md`
- `src/docs/gamescience-ui-guidance.md` when guidance refresh is required
- `AGENTS.md`

When the sync is documentation-only, record that registry item source was left
unchanged.

Do not include secrets, tokens, host keys or credentials.

## 17. Final output

Report:

### Skill revision

- `skillUpdated` / `libraryVersion` from this skill's header

### Result

One of:

- No update required
- Check-only — update available
- Check-only — registry current, guidance stale
- Check-only — current
- Updated successfully
- Documentation updated without component reinstall
- Updated with retained deviations
- Partial update requiring review
- Blocked by unresolved ownership or validation issues

### Version

- Previous:
- Target:
- Registry URL:

### Metadata freshness

- Registry source:
- Public guidance revision:
- Project-local guidance revision:
- Documentation-only action needed:

### Drift before update

| Item | Classification | Action |
| ---- | -------------- | ------ |

### Update set basis

State whether the diff set came from:

- `installed items ∩ changed items` via release manifest
- full installed-item diff fallback

### Changes applied

| Item | Files | Upstream change | Local handling |
| ---- | ----- | --------------- | -------------- |

In check-only mode, replace this table with **Changes that would be applied**.

### Deviations retained

Explain why each retained deviation remains application-owned.

### Validation

List every check and result. In check-only mode, state validation was not run
unless explicitly requested.

### Follow-up

List only unresolved conflicts, failed checks or genuinely required manual work.
