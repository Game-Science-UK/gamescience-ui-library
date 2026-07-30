---
name: migrate-gamescience-ui
description: Use when adopting GameScience UI in an established Lovable or React project that already has substantial local UI. Detects theme, Tailwind stack and experience contexts unless overridden; runs inspect → audit → confirm identity → rollback → install foundations → migrate one vertical slice → validate → continue slice by slice → clean up → record. Supports safe incremental and full visual alignment modes. Corresponds to the Migrate composer. Not for greenfield Start adoption, read-only audits, or syncing an already-pinned registry.
---

# Migrate GameScience UI

Migrate an established project onto the GameScience UI registry.

Corresponds to **Safe incremental** and **Full visual alignment** in the
Migrate composer.

The normal invocation is:

```text
migrate-gamescience-ui
```

The skill then detects theme, stack and contexts from the project and chooses
the appropriate branch. Explicit user instructions may override detection.

Detect theme, Tailwind stack, and experience contexts from the project unless
the user explicitly overrides them.

Do not maintain separate theme- or stack-named skill variants
(for example do not invent `migrate-citadel-safe`).

For greenfield setup use `adopt-gamescience-ui`. For read-only analysis use
`audit-gamescience-ui`. For upgrading an existing registry pin use
`sync-gamescience-ui`. For compliance checks use `validate-gamescience-ui`.

## Example triggers

- Migrate this Lovable game to GameScience UI
- Use migrate-gamescience-ui in safe incremental mode and preserve the Citadel theme
- Align this project with the Citadel design system incrementally
- Replace our local Tech* components with the registry

## Inputs

### Theme

- preserve detected theme
- `gamescience`
- `citadel`

### Mode

- safe incremental
- full visual alignment

### Stack

- detect
- Tailwind 3
- Tailwind 4

Default when unspecified:

| Input | Default                                      |
| ----- | -------------------------------------------- |
| Theme | preserve detected theme; ask if ambiguous    |
| Mode  | safe incremental                             |
| Stack | detect from project                          |

Example override:

```text
Use migrate-gamescience-ui in safe incremental mode and preserve the Citadel theme.
```

## Registry source

Use the GameScience UI immutable registry:

```text
https://game-science-uk.github.io/gamescience-ui-library/versions/{version}/r/{name}.json
```

Discover the latest stable immutable release from published metadata.

Prefer the published Migrate brief / `migration-config.json` when composing a
project-specific plan. Generated guidance must include exactly one Tailwind
stack branch.

Do not pin the project to the unversioned latest URL.

## Core migration flow

```text
inspect
→ audit
→ confirm target identity
→ establish rollback
→ install foundations/provider
→ migrate one vertical slice
→ validate
→ continue slice by slice
→ clean up
→ record
```

Stop after each high-risk slice when manual confirmation is appropriate.

## Core principles

- audit before rewriting
- migrate one vertical slice at a time
- preserve application-owned logic and game-specific visuals
- prefer patterns before primitives
- use diffs before overwrites
- keep experience context separate from role and authority
- enforce shared-display privacy where that context exists
- use Sonner only — never legacy toast/toaster/use-toast
- validate after every slice
- leave a durable migration record

Do not:

- perform a broad delete-and-rebuild
- rename routes without functional need
- install the full catalogue
- mix Gamescience and Citadel themes
- create theme-named component forks
- equate context with authorisation
- treat Tailwind guidance as universal across majors
- change authentication, authorisation, RLS or database logic unless the user
  explicitly expands scope
- report completion while validation fails

## Non-negotiable architecture rules

1. Exactly one active root theme via `GameScienceProvider`
2. Exactly one active experience context at the rendered application root
3. Never pass theme props to individual components
4. Never create nested theme or context provider boundaries for ordinary routes
5. Never mix Gamescience and Citadel themes
6. Never equate experience context with role, permission, or route authority
7. Never create `CitadelButton`, `GamesciencePanel`, `GlassCard`, `TechInput`, or equivalent forks
8. Prefer installed patterns before assembling primitives
9. Keep application logic, networking, scoring, auth, and persistence outside upstream components
10. Use Sonner only — never legacy toast/toaster/use-toast
11. Use the versioned registry URL only
12. No unreviewed overwrite (`--diff` before `--overwrite`)
13. No broad delete-and-rebuild migration
14. No raw theme styling in migrated screens — derive identity from the installed theme CSS
15. No automatic redesign of game-specific visuals
16. Do not require all three contexts; use only surfaces the experience needs
17. Enforce the shared-display privacy contract wherever that context exists

## 1. Inspect

Locate:

- `components.json`
- package manifest and lockfile
- application CSS entry and Tailwind config
- router / framework setup
- provider roots
- theme CSS and token files
- local UI inventory
- routes and major surfaces
- toast / portal setup
- existing GameScience records if any

Determine:

- current design-system identity evidence
- Tailwind major version and integration style
- router / framework
- contexts present or implied
- whether `@gamescience` is already partially installed
- build and validation commands

### Stack branch

Follow exactly one Tailwind branch after detection or override:

**Tailwind 3**

- install base and selected theme normally
- import the stack-agnostic foundation CSS
- retain `tailwind.config.ts`
- merge required semantic token mappings
- retain existing `@tailwind` directives
- do not install or import `tailwind-v4-bridge.css`

**Tailwind 4**

- install base and selected theme normally
- import the stack-agnostic foundation CSS
- install/import the Tailwind 4 bridge
- use CSS-first scanning and token mapping
- do not introduce `tailwind.config.ts` merely for the registry

Router / framework detection is separate:

> Tailwind version does not determine router integration.

Do not infer registry stack support solely from published guide names. Inspect
payloads and classify as Supported / Supported with stack-specific integration /
Unsupported / Uncertain — payload inspection required. Use “blocking mismatch”
only for verified incompatibility.

## 2. Audit

Perform the audit required by `audit-gamescience-ui` before changing code, or
reuse a fresh existing audit when the user supplies one that still matches the
repository.

Required outputs before migration changes:

- component audit table
- context audit table
- context architecture recommendation
- registry coverage backlog
- separate authorisation findings
- recommended first vertical slice
- stack support classification

If the audit cannot classify critical surfaces, stop and ask. Do not guess a
nearest context.

## 3. Confirm target identity

Before installing, confirm with evidence or explicit user override:

### Target configuration

- Registry version:
- Theme: preserve detected | gamescience | citadel
- Mode: safe incremental | full visual alignment
- Tailwind integration: detect | Tailwind 3 | Tailwind 4
- Contexts in scope:
- Contexts intentionally out of scope:
- First slice:

If theme evidence conflicts (for example Citadel branding with GameScience
tokens partially applied), ask before proceeding.

## 4. Establish a rollback point

Before changing files:

- confirm the working tree state
- identify unrelated uncommitted work
- create or recommend a rollback point consistent with the project workflow
- do not include unrelated changes in the migration

If unrelated uncommitted changes make safe attribution impossible, do not
overwrite files.

Report which files are already modified before migration begins.

## 5. Install foundations and provider

Configure the immutable registry pin in `components.json`.

Install:

```bash
npx shadcn@latest add @gamescience/base
npx shadcn@latest add @gamescience/theme-{theme}
```

Then:

1. Import foundation CSS and exactly one theme CSS
2. Apply the selected Tailwind integration branch
3. Establish **one** root `GameScienceProvider`
4. Resolve active context from route or project configuration
5. Load fonts at the application layer
6. Mount Sonner through the approved toaster only

Do not install unselected themes or unused context shells at this stage.

Use `--diff` before `--overwrite` for any file that already exists.

## 6. Mode behaviour

### Safe incremental

1. Audit all relevant surfaces
2. Establish a rollback point
3. Choose **one** context-appropriate vertical slice
4. Install foundations and selected theme only
5. Establish one root `GameScienceProvider`
6. Resolve active context from route or project configuration
7. Migrate one shell and one pattern composition for that slice
8. Validate privacy and interaction contract for the migrated context
9. Stop before restructuring every route
10. Produce a next-step recommendation

Do not interpret this mode as permission for a destructive rewrite or default
route renaming.

### Full visual alignment

1. Audit first
2. Migrate foundations and prove **one** vertical slice before broader context work
3. Migrate context by context after the first slice passes
4. Split only materially divergent compositions
5. Preserve application-owned routes where they remain clear
6. Avoid broad route renaming without functional need
7. Retain application-specific surfaces that do not map cleanly
8. Report registry gaps rather than inventing a fourth context
9. Remove redundant forks after validation
10. Preserve application logic

Full mode is **not** permission for a destructive rewrite.

## 7. Migrate one vertical slice

For the chosen slice:

1. Install the matching shell and pattern (and only required dependencies)
2. Diff before overwrite
3. Replace local primitives that the slice actually uses
4. Wire application state and callbacks outside registry-managed files
5. Update route composition only as needed for the slice
6. Preserve game-specific visuals that remain application-owned
7. Enforce shared-display privacy when migrating that context
8. Stop for manual confirmation after high-risk slices

High-risk examples:

- shared-display privacy-sensitive surfaces
- facilitator controls coupled to authority checks
- large bespoke join/lobby rewrites
- uncertain ownership of local forks
- toast system replacement across many call sites

### File ownership

Upstream-managed (do not edit casually):

- `src/foundations/**`
- `src/themes/**`
- `src/components/ui/**`, `src/components/game/**`, `src/components/display/**`
- `src/patterns/**`, `src/templates/**`
- `src/providers/**`
- selected shared libs and generated guidance files

Application-owned (preserve):

- routes / pages / screens
- state, networking, auth, scoring, analytics
- content, fixtures, game-specific graphics
- root document setup and font loading
- project `AGENTS.md` (reference guidance; do not overwrite wholesale)

## 8. Validate the slice

Run the project's existing checks after each slice.

At minimum where available:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Also validate:

- migrated routes on relevant viewports
- active theme
- active context resolution
- keyboard interaction and focus
- overlay portals
- shared-display privacy when applicable
- no raw theme forks on migrated screens
- no legacy toast usage on migrated call sites
- no missing CSS variables
- no duplicate React or Radix dependencies introduced

Do not continue to the next slice while required checks fail.

Hand off to `validate-gamescience-ui` for a broader compliance pass when useful.

## 9. Continue slice by slice

After a slice passes:

1. Record what changed
2. Recommend the next slice
3. In safe incremental mode, stop unless the user asks to continue
4. In full visual alignment mode, proceed context by context after confirmation
   points for high-risk work

Never expand into unrelated redesign, game-mechanics changes, or auth rewrites.

## 10. Clean up

After successful migration of approved slices:

- remove replaced local primitive forks
- remove duplicate token definitions and unused local theme CSS
- remove legacy toast system when no callers remain
- quarantine unused default Lovable UI inventory when safe
- update `AGENTS.md` to reference installed GameScience guidance and version
- retain game-specific visuals and application-owned code
- record deviations

Do **not** delete files solely because they are not from the registry.

## 11. Record

Create or update `src/docs/gamescience-ui-migration.md` with:

- Registry version / URL / theme / contexts / mode / date
- Tailwind integration branch
- Migrated registry items
- Replaced local components
- Retained application components and game-specific visuals
- Local deviations and upstream issues
- Remaining migration candidates and next recommended slice
- Authorisation findings still outstanding (separate)

Also create or update:

- `src/docs/gamescience-ui-contexts.md`
- `AGENTS.md` references

Do not include secrets, tokens, host keys or credentials.

## 12. Final output

Report:

### Result

One of:

- First slice migrated successfully
- Migration progressed with retained deviations
- Safe incremental stop — awaiting confirmation
- Full alignment in progress
- Blocked by unresolved ownership, stack or validation issues

### Configuration

- Registry version:
- Registry URL:
- Theme:
- Mode:
- Tailwind integration:
- Router / framework:
- Contexts in scope:

### Slices completed

| Slice | Context | Items | Validation | Notes |
| ----- | ------- | ----- | ---------- | ----- |

### Deferred / retained

List application-owned surfaces, deviations and backlog candidates.

### Authorisation findings

Separate list only.

### Validation

List every check and result for the latest slice.

### Follow-up

Next recommended slice or hand-off to `validate-gamescience-ui` /
`sync-gamescience-ui` as appropriate.
