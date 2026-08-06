---
name: update-registry
description: >-
  Re-cuts the current GameScience UI registry release lock after a small
  in-version change, validates the versioned Pages build, commits the lock and
  snapshot, and pushes to main so GitHub Pages republishes. Use when CI fails
  with "drifted from releases/{version}.lock.json", after theme/CSS/docs/registry
  payload fixes that should update the current published version in place, or
  when the user asks to update-registry / re-cut the lock / publish a small
  registry fix. Not for version bumps — use release-registry for that.
---

# Update registry (re-cut current lock)

Publish a **small fix** into the **already-released** version by intentionally
re-cutting `releases/{version}.lock.json` and syncing its snapshot, then pushing
to `main`.

Use this for visual/theme/docs/payload corrections that should land on the
current pin (for example Citadel panel border fixes on `0.5.0`).

Do **not** use this for new components, public API changes, token-contract
additions, or consumer-breaking work. Hand those to `release-registry`.

## When to use

- User asks to update/publish the registry after a small change
- CI fails with:

  ```text
  versions/{version}/r/….json drifted from releases/{version}.lock.json.
  Set UPDATE_RELEASE_LOCK=1 only when intentionally re-cutting the current lock.
  ```

- Source/registry content for the current `GAMESCIENCE_UI_VERSION` changed, but
  the version number should stay the same

## Preconditions

1. Confirm you are in this library repo (`gamescience-ui-library`), not a consumer.
2. Read `src/lib/version.ts` — that string is the current cut.
3. Confirm the change is intentionally an **in-place** update of that version.
4. Working tree should contain the intended source changes (or they are already
   committed). Include regenerated `public/registry/**` if already built.

If the change warrants a new immutable version, stop and use `release-registry`.

## Workflow

Copy and track:

```text
Update registry progress:
- [ ] 1. Confirm current version + in-place intent
- [ ] 2. Rebuild registry
- [ ] 3. Re-cut release lock + sync snapshot
- [ ] 4. Validate versioned pages
- [ ] 5. Review git status (lock + snapshot only expected extras)
- [ ] 6. Commit
- [ ] 7. Push to main
- [ ] 8. Confirm Actions / Pages deploy
```

### 1. Confirm current version

```bash
node -e "const {GAMESCIENCE_UI_VERSION}=require('./src/lib/version.ts')" 2>/dev/null || true
rg -n "GAMESCIENCE_UI_VERSION" src/lib/version.ts package.json
```

Treat `src/lib/version.ts` as the source of truth. Do not bump it in this skill.

### 2. Rebuild registry

```bash
npm run registry:build
```

### 3. Re-cut the current lock

This is the required step. Without it, CI `pages:build:versioned` fails on hash drift.

```bash
UPDATE_RELEASE_LOCK=1 npm run pages:build:versioned
```

Expected logs include:

- `wrote release lock releases/{version}.lock.json`
- `synced releases/snapshots/{version}`

Do **not** set `UPDATE_RELEASE_LOCK=1` casually on historical versions. Only re-cut
the **current** `GAMESCIENCE_UI_VERSION`.

### 4. Validate

```bash
npm run pages:validate:versioned
```

If validation fails, fix the underlying issue and repeat steps 2–4.

Optional when the change is broader than theme CSS:

```bash
npm run theme:check
npm run registry:validate
```

### 5. Review changed files

Typical intentional set after a theme/foundations fix:

- source files already changed (for example `src/themes/citadel.css`, `src/foundations/index.css`)
- regenerated registry payloads under `public/registry/` / `registry/` / `consumer/` if present
- `releases/{version}.lock.json`
- `releases/snapshots/{version}/**` (usually the drifted items such as `r/base.json`, `r/theme-citadel.json`)

Do not commit secrets, `.env`, or `pages-dist/` (gitignored build output).

### 6. Commit

Follow the repo commit rules. Stage the source + lock + snapshot (+ regenerated
registry artefacts) and commit with a short message focused on why.

Example:

```bash
git add releases/{version}.lock.json releases/snapshots/{version} public/registry registry src
git commit -m "$(cat <<'EOF'
Recut {version} registry lock after {short reason}.

EOF
)"
```

Replace `{version}` / reason with the real values. Include any still-uncommitted
source/registry files required for the cut to match.

### 7. Push

```bash
git push -u origin HEAD
```

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which rebuilds and
deploys Pages. Do **not** set `UPDATE_RELEASE_LOCK` in CI — the committed lock must
already match.

### 8. Confirm publish

- Watch the Actions run for Deploy GitHub Pages registry
- After green deploy, the versioned URL should serve the updated payloads:

```text
https://game-science-uk.github.io/gamescience-ui-library/versions/{version}/r/{name}.json
```

Unversioned `/r/{name}.json` also refreshes from the same cut on latest promotion.

## Failure modes

| Symptom | Cause | Fix |
| --- | --- | --- |
| CI: drifted from `releases/{version}.lock.json` | Lock not re-cut / not committed | Run this skill; commit lock + snapshot; push |
| Local pages build fails the same drift error | Forgot `UPDATE_RELEASE_LOCK=1` | Re-run step 3 |
| Lock updated but CI still fails validate | Snapshot/source mismatch or incomplete commit | Ensure lock + matching `releases/snapshots/{version}` are both committed |
| Change includes new public API / items | Wrong skill | Switch to `release-registry` |

## Hard rules

- Never rewrite a **prior** immutable lock (for example do not re-cut `0.4.1` while current is `0.5.0`)
- Never force-push `main`
- Never skip hooks unless the user explicitly asks
- Never bump `GAMESCIENCE_UI_VERSION` in this skill
- Always re-cut with `UPDATE_RELEASE_LOCK=1` when intentionally updating the current cut
- Always validate versioned pages before push

## Related

- `release-registry` — assess changes, bump version, create a new lock, push a release
- `docs/github-pages-setup.md` — Pages publish layout
- `docs/contribution.md` — contribution expectations
- `scripts/build-pages.ts` — lock write / drift guard
