---
name: release-registry
description: >-
  Assesses pending GameScience UI library changes, chooses a semver bump, updates
  version metadata and migration docs, rebuilds the registry, creates a new
  release lock and snapshot, validates, commits, and pushes the release to main
  (optionally tagging v*). Use when the user asks to release-registry, cut a new
  registry version, bump the library version, or publish a patch/minor/major
  release. Not for in-place re-cuts of the current version — use update-registry
  for that.
---

# Release registry (version bump + new lock)

Cut a **new immutable registry version**: assess the change set, bump semver,
refresh release metadata and migration notes, build + lock the new cut, then
push so GitHub Pages publishes `versions/{new}` and refreshes unversioned latest.

Use this when the published pin should move forward. Prefer this over rewriting
an already-consumed lock when the change is consumer-visible beyond a tiny
same-version fix.

For small in-place fixes to the **current** cut, use `update-registry` instead.

## When to use

- User asks to release / bump / cut a new registry version
- New registry items, public API changes, token-contract changes, or migration-
  worthy behaviour
- A patch that should remain immutable as a new pin (for example `0.5.0` → `0.5.1`)
- Contribution guidance says to bump rather than rewrite a released lock

## Preconditions

1. Confirm you are in this library repo (`gamescience-ui-library`).
2. Working tree should contain the intended release changes (or they are already
   on the branch).
3. Read current version from `src/lib/version.ts` and `package.json` (must match).
4. Inspect `releases/*.lock.json` and `releases/snapshots/` so prior cuts stay
   untouched.
5. Confirm branch state vs `origin` before pushing.

## Assess the bump

Review:

```bash
git status
git log --oneline -20
git diff origin/main...HEAD
# or, if releasing from dirty/main work:
git diff
```

Also inspect:

- new/changed items under `src/`, `registry/`, `scripts/registry-manifest.ts`
- theme/token contract (`src/themes/theme-contract.ts`, theme CSS)
- consumer-facing docs and `scripts/pages-config.ts` release manifest fields

Choose **one**:

| Bump | Use when |
| --- | --- |
| **patch** `x.y.Z` | Bug fixes, visual corrections, docs/payload fixes that should be a new pin |
| **minor** `x.Y.0` | Backward-compatible additions (new components, optional APIs, additive tokens) |
| **major** `X.0.0` | Breaking token/API/behaviour changes that require forced consumer migration |

Announce the chosen bump and previous → next versions to the user before editing
if the choice is ambiguous. If the user already named the target version, honour it.

If the change is only a tiny same-version publish and the user wants no bump,
hand off to `update-registry`.

## Workflow

Copy and track:

```text
Release registry progress:
- [ ] 1. Assess changes + choose bump (prev → next)
- [ ] 2. Bump version sources
- [ ] 3. Update release manifest + migration docs
- [ ] 4. Update pinned version strings in public docs / consumer metadata as needed
- [ ] 5. Rebuild registry
- [ ] 6. Build versioned pages (creates NEW lock + snapshot)
- [ ] 7. Validate versioned pages (+ registry validate)
- [ ] 8. Commit release
- [ ] 9. Push to main
- [ ] 10. Tag v{next} (optional but preferred)
- [ ] 11. Confirm Actions / Pages deploy
```

### 1. Capture versions

```text
previousVersion = current GAMESCIENCE_UI_VERSION
nextVersion     = chosen bump
```

Example: `0.5.0` → `0.5.1` (patch).

### 2. Bump version sources

Update **both** (must stay identical):

- `src/lib/version.ts` — `GAMESCIENCE_UI_VERSION`
- `package.json` — `"version"`

`scripts/registry-manifest.ts` and `scripts/pages-config.ts` import the version
from `src/lib/version.ts`; do not hardcode a second source of truth there.

### 3. Update release manifest + migrations

Edit `scripts/pages-config.ts` → `buildReleaseManifest()`:

- `previousVersion`
- `releaseType`: `"patch" | "minor" | "major"`
- `addedItems` / `changedItems` / `removedItems` for **this** release only
- `migrationNotes` URL → `{siteUrl}/docs/migrations/{previous}-to-{next}.md`

Add:

- `docs/migrations/{previous}-to-{next}.md` (what changed + consumer actions)
- Register the doc in `PUBLIC_PAGES_DOCS` and `PUBLIC_PAGES_DOC_MARKERS` in
  `scripts/pages-config.ts`

Update summary pointers as needed:

- `docs/migration-notes.md` — short entry for the new path
- `docs/upgrade-workflow.md` — current upgrade path example
- other docs that hardcode the previous pin (search for `previousVersion`)

Keep prior migration docs and prior locks/snapshots immutable.

### 4. Refresh consumer-facing version strings

Search and update stale pins of `previousVersion` that should now describe the
new release (README/docs/examples as applicable). Registry item JSON versions
are produced by `registry:build` from `GAMESCIENCE_UI_VERSION` — do not hand-edit
every `public/registry/r/*.json` version field.

`consumer/gamescience-ui.json` and guidance are typically regenerated via the
`base` item / registry build — rebuild rather than inventing drift.

### 5. Rebuild registry

```bash
npm run registry:build
npm run registry:validate
```

### 6. Lock the new version

Because `releases/{nextVersion}.lock.json` should not exist yet, a normal
versioned Pages build creates the new lock and snapshot:

```bash
npm run pages:build:versioned
```

Expected:

- `wrote release lock releases/{nextVersion}.lock.json`
- `synced releases/snapshots/{nextVersion}`

Do **not** set `UPDATE_RELEASE_LOCK=1` unless you are deliberately rewriting the
lock you just created in the same release cut (unusual). Never pass
`UPDATE_RELEASE_LOCK=1` against an older version.

Prior `releases/snapshots/{previousVersion}/` and `releases/{previousVersion}.lock.json`
must remain unchanged.

### 7. Validate

Minimum:

```bash
npm run pages:validate:versioned
npm run theme:check
```

Preferred before push when feasible:

```bash
npm run validate
```

Or at least the distribution-sensitive subset from `AGENTS.md` / CI
(typecheck, lint, test, architecture, build, storybook, registry, pages, smokes).

Fix failures before committing the release.

### 8. Commit

Stage version bump, docs, registry artefacts, **new** lock, and **new** snapshot.
Do not modify older locks/snapshots.

```bash
git add src/lib/version.ts package.json scripts/pages-config.ts docs registry public/registry consumer releases
git status
git commit -m "$(cat <<'EOF'
Release {nextVersion}.

{One sentence on why / what shipped.}
EOF
)"
```

Follow repo commit rules (no secrets, no `--no-verify`, no amend of others'
pushed commits).

### 9. Push

```bash
git push -u origin HEAD
```

`main` pushes trigger `.github/workflows/deploy-pages.yml`.

### 10. Tag (preferred)

After the release commit is on the remote:

```bash
git tag v{nextVersion}
git push origin v{nextVersion}
```

Only create/push tags when releasing. Do not move an existing tag.

### 11. Confirm publish

- Actions: Deploy GitHub Pages registry is green
- Versioned registry:

```text
https://game-science-uk.github.io/gamescience-ui-library/versions/{nextVersion}/r/{name}.json
```

- Prior version still available and hash-locked
- Unversioned `/r/{name}.json` tracks the new latest after promotion

## Failure modes

| Symptom | Cause | Fix |
| --- | --- | --- |
| `package.json` / `version.ts` mismatch | Incomplete bump | Align both, rebuild, revalidate |
| Drift error on **new** version during CI | New lock/snapshot not committed | Commit `releases/{next}.lock.json` + snapshot; push |
| Drift error on **old** version | Accidental rewrite of prior snapshot | Restore prior lock/snapshot from git; never re-cut old versions |
| Missing migration page in validate | Doc not registered in `pages-config` | Add to `PUBLIC_PAGES_DOCS` + markers |
| Wrong skill used for tiny same-version fix | No bump intended | Use `update-registry` |

## Hard rules

- Never rewrite historical `releases/{old}.lock.json` or their snapshots
- Never force-push `main` or move published tags
- Never skip hooks unless the user explicitly asks
- Keep `package.json` version === `GAMESCIENCE_UI_VERSION`
- New version ⇒ new lock file (absence creates it); do not “update” an old lock to fake a release
- Migration notes required for minor/major; still recommended for patch when consumers must reinstall items
- Push only after versioned pages validate

## Related

- `update-registry` — re-cut the **current** lock without bumping
- `docs/contribution.md` — prefer bumping over rewriting released locks
- `docs/github-pages-setup.md` — versioned vs latest publish model
- `docs/migrations/` — consumer migration notes pattern
- `scripts/pages-config.ts` — release manifest + public docs list
- `scripts/build-pages.ts` — lock creation and snapshot sync
