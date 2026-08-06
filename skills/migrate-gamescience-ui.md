---
name: migrate-gamescience-ui
description: Use when adopting GameScience UI in an established Lovable or React project that already has substantial local UI. Detects theme, Tailwind stack and experience contexts unless overridden; runs inspect → inventory render branches → build obligation ledger → confirm identity → rollback → validate token contract → install foundations → migrate slices with A–E coverage gates → auto-continue in full alignment → escalate upstream gaps → clean up → independent coverage audit → record. Supports safe incremental and full visual alignment modes. Corresponds to the Migrate composer. Not for greenfield Start adoption, read-only audits, or syncing an already-pinned registry.
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

## Evidence model (non-negotiable)

Treat migration as a **closed coverage ledger**, not a sequence of successful
slices.

Build success, typecheck, tests and a screenshot of the consumer app prove that
a slice did not break. They do **not** prove that the application has been
comprehensively reconciled against the registry.

A slice or full alignment is complete only when obligations are dispositioned
and backed by independent evidence across five coverage dimensions (A–E below).

## Example triggers

- Migrate this Lovable game to GameScience UI
- Use migrate-gamescience-ui in safe incremental mode and preserve the Citadel theme
- Align this project with the Citadel design system incrementally
- Replace our local Tech* components with the registry
- Complete full visual alignment against the registry

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
→ inventory routes, states and render branches
→ inspect registry catalogue and payload contracts
→ create migration obligation ledger
→ confirm target identity and scope
→ establish rollback
→ validate registry stack and token contract
→ install foundations/provider
→ migrate slice
→ validate source, call sites, render paths, theme contract and visuals
→ reconcile obligation ledger
→ continue planned slices (mode-dependent)
→ identify and escalate upstream gaps
→ clean up legacy implementations
→ run independent whole-application coverage audit
→ reconcile repository, runtime and records
→ declare complete or explicitly incomplete
```

## Core principles

- audit and ledger before rewriting
- migrate one vertical slice at a time
- preserve application-owned logic and game-specific visuals
- prefer patterns before primitives
- use diffs before overwrites
- keep experience context separate from role and authority
- enforce shared-display privacy where that context exists
- use Sonner only — never legacy toast/toaster/use-toast
- validate all five coverage dimensions after every slice
- leave a durable, evidence-backed migration record
- never trust release manifests as proof of payload equality
- never treat file installation as call-site migration

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
- report completion while validation or ledger reconciliation fails
- ask for bare “continue?” after routine green slices in full visual alignment

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
18. File installation is not evidence of call-site migration
19. Route migration is not evidence that all render branches are migrated
20. Build success is not evidence that registry utilities or tokens resolve
21. Release manifests are not evidence of payload equality; verify actual files
22. Every in-scope UI obligation must have a final disposition
23. No full-alignment completion with unclassified obligations
24. No migrated surface may retain unsanctioned theme-identity overrides
25. Full alignment requires an independent post-migration coverage audit
26. Full alignment proceeds through the approved plan without routine continuation prompts
27. Screenshot validation must compare consumer output with registry reference states

## Five coverage dimensions

Measure these independently. A slice passes only when all applicable dimensions
pass for its obligations.

### A. Source coverage

Are the correct registry-owned files installed?

- required registry items are present
- installed payload matches the immutable release (byte/hash compare)
- no undocumented local edits exist in upstream-managed files
- dependency files are compared, not only the named component

### B. Call-site coverage

Are application surfaces actually using those items correctly?

- local equivalents and raw controls are identified
- installed primitives have known consumers
- no call site recreates registry styling through `className`, inline styles or wrappers
- no obsolete imports or fallback components remain
- component props and variants match registry-supported APIs

### C. Render-path coverage

Do all meaningful states and branches use the intended implementation?

- every branch in the render-path inventory has a disposition
- hidden, error and transitional states are included
- responsive and context-specific branches are included

### D. Theme-contract coverage

Does the target build resolve the registry’s styling contract?

- required CSS variables exist
- required Tailwind semantic mappings exist
- required utilities appear in compiled CSS with non-empty declarations
- computed dimensions and visual states match expectations
- hover, active, disabled and focus classes resolve
- fonts, radii, shadows and elevations are loaded

### E. Visual and behavioural coverage

Does the running application match the registry reference and continue to work?

- reference-to-consumer comparison (not consumer-only screenshots)
- expected dimensions and spacing
- keyboard and focus behaviour
- portals and overlays
- privacy rules
- interaction contracts
- no visual degradation in alternate states

## Obligation dispositions

Every obligation must end in exactly one of:

| Disposition             | Meaning                                              |
| ----------------------- | ---------------------------------------------------- |
| `migrated`              | Registry target adopted; A–E evidence passes         |
| `retained-approved`     | Explicitly kept as application-owned                 |
| `upstream-gap`          | Needs a new or extended registry item                |
| `out-of-scope-approved` | Intentionally excluded from this engagement          |

No `unknown`, `candidate`, or unclassified rows may remain at full-alignment
completion. Safe incremental may leave open obligations, but must not claim
application-wide completion.

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

## 2. Inventory render paths

File-level and route-level coverage is inadequate. A single file such as
`Game.tsx` may contain multiple distinct UI states, only some of which use the
registry.

For every major route or stateful screen, produce a **render-path inventory**:

- conditional branches and switch cases
- loading, empty, error and disconnected states
- mobile and desktop compositions
- participant, facilitator and display variants
- pre-game, active-phase, voting, outcome and completion states
- fallbacks and legacy compatibility branches

Completion language must look like:

```text
Game.tsx:
- loading: retained-approved
- discussion: migrated
- voting: migrated
- outcome: migrated
- disconnected: retained-approved
- unknown-phase fallback: removed
```

Not:

```text
Game.tsx: migrated
```

Do not mark a file or route migrated because its primary branch uses registry
components.

## 3. Audit and create the obligation ledger

Perform the audit required by `audit-gamescience-ui` before changing code, or
reuse a fresh existing audit when the user supplies one that still matches the
repository.

Then replace informal backlog language with a canonical **migration obligation
ledger**. Create it before changing application files.

Each obligation represents:

```text
surface
→ render branch/state
→ UI responsibility
→ current implementation
→ target registry item or retained disposition
```

### Required ledger columns

| ID | Surface | Branch/state | Responsibility | Current | Target | Status |
| -- | ------- | ------------ | -------------- | ------- | ------ | ------ |

Example rows:

| ID                         | Surface             | Branch/state | Responsibility | Current                               | Target                             | Status            |
| -------------------------- | ------------------- | ------------ | -------------- | ------------------------------------- | ---------------------------------- | ----------------- |
| `create-session.host-name` | `CreateSession.tsx` | default      | text input     | registry `Input` with local overrides | registry `Input` without overrides | open              |
| `game.vote-header`         | `Game.tsx`          | vote         | phase header   | local composition                     | `PlayerVoteHeader`                 | migrated          |
| `game.outcome-summary`     | `Game.tsx`          | outcome      | result summary | local fallback                        | `OutcomeSummary`                   | upstream-gap      |
| `connection.reconnecting`  | global              | reconnecting | status surface | local banner                          | retained app-owned                 | retained-approved |

Build the ledger from:

- routes and screens
- conditional render branches
- local component inventories
- imported UI primitives
- raw HTML controls (`button`, `input`, `select`, `textarea`, etc.)
- styling overrides (`style={{}}`, arbitrary colours, identity `className`s)
- registry catalogue availability
- theme and token usage
- responsive and context variants

Also produce the existing audit artefacts:

- component audit table
- context audit table
- context architecture recommendation
- separate authorisation findings
- recommended first vertical slice
- stack support classification
- ordered slice plan derived from the ledger

If the audit cannot classify critical surfaces, stop and ask. Do not guess a
nearest context.

## 4. Confirm target identity

Before installing, confirm with evidence or explicit user override:

### Target configuration

- Registry version:
- Theme: preserve detected | gamescience | citadel
- Mode: safe incremental | full visual alignment
- Tailwind integration: detect | Tailwind 3 | Tailwind 4
- Contexts in scope:
- Contexts intentionally out of scope:
- First slice:
- Obligation ledger summary (open / migrated / retained / gap counts):

If theme evidence conflicts (for example Citadel branding with GameScience
tokens partially applied), ask before proceeding.

## 5. Establish a rollback point

Before changing files:

- confirm the working tree state
- identify unrelated uncommitted work
- create or recommend a rollback point consistent with the project workflow
- do not include unrelated changes in the migration

If unrelated uncommitted changes make safe attribution impossible, do not
overwrite files.

Report which files are already modified before migration begins.

## 6. Validate registry stack and token contract

Before or immediately after installing foundations, prove that the consumer
build can resolve the registry styling contract.

### Generate a token contract from the installed registry payload

Example shape:

```json
{
  "utilities": [
    "h-control-md",
    "bg-primary",
    "hover:bg-primary-hover",
    "active:bg-primary-active",
    "ring-focus-ring"
  ],
  "variables": [
    "--primary",
    "--primary-hover",
    "--primary-active",
    "--focus-ring",
    "--control-md"
  ]
}
```

### Required checks

1. Every required utility is supported by the selected Tailwind branch
2. Every semantic key is present in `tailwind.config.ts` or the Tailwind 4 bridge
3. A production build emits selectors or declarations for every required class
4. Each generated rule has a non-empty, valid declaration
5. Representative components have expected computed values in the browser

Example computed-style assertions:

```text
Input default:
- expected height: 44px
- computed height: 44px

Button lg:
- expected height: 64px
- computed height: 64px

Button hover:
- expected token: primary-hover
- resolved background: non-empty
```

A class that compiles to nothing must fail validation even when typecheck and
build succeed.

Re-run this gate after foundation install, after Tailwind config merges, and
after any sync that changes theme or foundation CSS.

## 7. Install foundations and provider

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
7. Run payload integrity and token-contract gates on installed foundations

Do not install unselected themes or unused context shells at this stage.

Use `--diff` before `--overwrite` for any file that already exists.

## 8. Mode behaviour

### Safe incremental

1. Build the obligation ledger and render-path inventory
2. Establish a rollback point
3. Choose **one** context-appropriate vertical slice from the ledger
4. Install foundations and selected theme only
5. Establish one root `GameScienceProvider`
6. Resolve active context from route or project configuration
7. Migrate one shell and one pattern composition for that slice
8. Validate all applicable A–E dimensions for the slice
9. Stop before restructuring every route
10. Produce a next-step recommendation with remaining open obligations

Do not claim application-wide completion from a single slice.

Do not interpret this mode as permission for a destructive rewrite or default
route renaming.

### Full visual alignment

After target identity, scope and rollback are confirmed:

1. Build the complete obligation ledger and ordered slice plan
2. Validate stack and token contract
3. Migrate foundations and prove **one** vertical slice before broader work
4. Proceed through low- and medium-risk slices without asking for bare continuation
5. Stop only for:
   - ambiguous product decisions
   - destructive actions
   - unresolved upstream gaps that block obligations
   - security or authorisation changes
   - failed validation that cannot be corrected safely
   - genuinely high-risk visual trade-offs
6. Split only materially divergent compositions
7. Preserve application-owned routes where they remain clear
8. Avoid broad route renaming without functional need
9. Classify blocked work as `upstream-gap` with structured proposals
10. Remove redundant forks after validation
11. Run the independent whole-application coverage audit
12. Declare **Full alignment complete** or **Full alignment incomplete**

A passing slice must lead automatically into the next planned slice.
“Continue?” must not be required after routine green slices.

Full mode is **not** permission for a destructive rewrite.

## 9. Migrate one vertical slice

For the chosen slice:

1. Select the obligations the slice will close
2. Install the matching shell and pattern (and only required dependencies)
3. Diff before overwrite
4. Verify payload integrity for installed items and their transitive files
5. Replace local primitives that the slice actually uses
6. Migrate call sites — not only files — removing identity overrides
7. Cover every render branch listed for the slice surfaces
8. Wire application state and callbacks outside registry-managed files
9. Update route composition only as needed for the slice
10. Preserve game-specific visuals that remain application-owned
11. Enforce shared-display privacy when migrating that context
12. Stop for manual confirmation only on high-risk slices or ambiguous decisions

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

### Selection hierarchy within a slice

Prefer, in order:

1. Existing game pattern
2. Existing domain component (`components/game` or `components/display`)
3. Existing core UI component (`components/ui`)
4. New composition from approved components
5. Upstream-gap proposal when no adequate target exists
6. Retained application-owned exception with explicit approval

Do not converge on primitive-only swaps when patterns or shells exist for the
surface. Safe-incremental caution must not permanently stall at Panel-level
substitutions when the ledger requires pattern/shell coverage.

## 10. Validate the slice

Run the project's existing checks after each slice.

At minimum where available:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

These are necessary but not sufficient. Also validate dimensions A–E.

### A. Source / payload integrity gate

Never trust the release manifest alone as proof of installed payload equality.

For each installed registry item:

1. Fetch or inspect the immutable registry payload
2. Expand all files and dependencies declared by the item
3. Hash or byte-diff each expected destination
4. Classify every mismatch:
   - expected installation change
   - sanctioned local deviation
   - undocumented upstream-managed drift
   - stale file
5. Fail validation on unexplained mismatches

Include transitive files such as:

- theme CSS
- foundation CSS
- shared utility files
- provider files
- primitive dependencies
- token configuration

`panel.tsx` being unchanged must not pass when effective styling changed through
theme or foundation CSS.

### B. Call-site purity scan

For every migrated surface, detect and classify:

- `style={{ ... }}`
- raw colour values and arbitrary Tailwind values such as `bg-[#...]`
- local shadow, border, radius and typography utilities that replace registry identity
- registry component `className` values that override identity
- raw `<button>`, `<input>`, `<select>`, `<textarea>` and similar elements
- theme-specific wrapper classes
- duplicate local variants of registry components
- typography classes superseded by registry semantics

Classification:

**Allowed**

- layout and positioning
- responsive placement
- application-owned sizing where the registry API intentionally permits it
- game-specific graphics
- documented sanctioned exceptions

**Disallowed**

- colour identity
- component height intended to come from the registry
- borders, radii, shadows and focus treatment
- typography identity
- state colours
- hover/active/disabled treatment
- visual overrides compensating for a missing token mapping

Every disallowed result must be removed or recorded as a named approved
deviation. Installing a registry primitive does not count if call sites still
override its identity or keep raw controls.

### C. Render-path gate

Reconcile the slice against the render-path inventory. Hidden, error,
loading, disconnected, outcome and fallback branches count. Primary-path-only
migration is incomplete.

### D. Theme-contract gate

Re-run the token-contract checks for utilities and variables exercised by the
slice. Fail if required classes are absent from compiled CSS or compute to
empty/incorrect values.

### E. Visual / behavioural gate

Compare registry reference states to consumer implementation states. A
screenshot of the migrated application alone is not sufficient.

At minimum where applicable:

- default, hover, focus, active, disabled
- error states
- relevant viewport
- relevant theme
- relevant experience context

Comparison methods:

- automated screenshot diff where practical
- computed-style contract checks
- structured manual visual inspection for complex scenes

Record results such as:

| Component | Reference                     | Consumer    | Result |
| --------- | ----------------------------- | ----------- | ------ |
| Input     | 44px height                   | 24px height | fail   |
| Button lg | 64px height                   | 21px height | fail   |
| Panel     | expected border/shadow tokens | matched     | pass   |

Also validate:

- keyboard interaction and focus
- overlay portals
- shared-display privacy when applicable
- no legacy toast usage on migrated call sites
- no duplicate React or Radix dependencies introduced
- Vite/tooling caches cleared after major syncs when blank screens or duplicate
  React symptoms appear

Do not continue to the next slice while required checks fail.

## 11. Reconcile the obligation ledger

After each slice:

1. Update obligation statuses with evidence flags for A–E
2. Record sanctioned exceptions by name
3. Record upstream gaps with structured proposals
4. Update `gamescience-ui-state.json` and Markdown records from evidence
5. Do not narrate completion that the ledger cannot support

Open obligations remain visible. Do not hide them behind “slice green”.

## 12. Continue slice by slice

After a slice passes:

1. Record what changed against the ledger
2. Identify the next planned slice
3. In **safe incremental** mode, stop unless the user asks to continue; report
   remaining obligations
4. In **full visual alignment** mode, proceed automatically into the next
   planned low/medium-risk slice; stop only for the exceptions listed in Mode
   behaviour

Never expand into unrelated redesign, game-mechanics changes, or auth rewrites.

## 13. Upstream-gap escalation protocol

When a local surface lacks an adequate registry target, do not quietly retain
the composition as if migrated, and do not invent a theme-named fork.

Produce a structured gap proposal:

```text
Gap: outcome summary
Evidence:
- 4 local implementations
- used by 3 render branches
- repeated result/title/metric/action composition

Recommended registry layer:
- domain component

Proposed API:
- status
- title
- summary
- metrics
- primaryAction
- secondaryAction

Variants:
- success
- partial
- failure

Consumers:
- Game.tsx outcome
- FacilitatorResults.tsx
- DisplayOutcome.tsx

Migration impact:
- blocks obligations GS-042, GS-043, GS-061
```

Classify blocked obligations as `upstream-gap`. Continue with unblocked slices
when safe. Full alignment cannot claim those obligations as migrated.

## 14. Clean up

After successful migration of approved slices:

- remove replaced local primitive forks
- remove duplicate token definitions and unused local theme CSS
- remove legacy toast system when no callers remain
- quarantine unused default Lovable UI inventory when safe
- update `AGENTS.md` to reference installed GameScience guidance and version
- retain game-specific visuals and application-owned code
- record deviations and sanctioned exceptions

Do **not** delete files solely because they are not from the registry.

## 15. Independent whole-application coverage audit

For full visual alignment, this step is **mandatory**. Do not treat
`validate-gamescience-ui` as optional “when useful”.

After all planned slices are complete, run a fresh audit from repository state
without trusting:

- the slice notes
- the migration record
- the list of installed components
- previous “done” classifications

Independently rediscover:

- application surfaces
- render branches
- local components
- raw controls
- legacy styling
- token contract
- registry payload drift
- unused installed items
- unresolved registry gaps

Then reconcile:

```text
planned ledger
vs
actual repository
vs
runtime result
```

Hand off to `validate-gamescience-ui` in **coverage-reconstruction mode**:
rebuild coverage evidence from the repository and runtime, then compare it to
the obligation ledger. Architecture compliance alone is not enough.

Full visual alignment cannot be declared until these agree.

Safe incremental should still run a scoped independent audit of the migrated
slice obligations before stopping.

## 16. Record

Before completing a slice or declaring alignment, reconcile the canonical
inventories. Do not append only a narrative slice note.

Create or update `src/docs/gamescience-ui-state.json` with evidence-backed
fields. Prefer this shape (schemaVersion 2):

```json
{
  "schemaVersion": 2,
  "registry": {
    "version": "0.5.0",
    "url": "...",
    "theme": "citadel",
    "stack": "tailwind-3"
  },
  "payloadIntegrity": {
    "verifiedAt": "...",
    "items": [],
    "unexplainedMismatches": []
  },
  "tokenContract": {
    "requiredUtilities": [],
    "requiredVariables": [],
    "missingUtilities": [],
    "missingVariables": []
  },
  "obligations": [
    {
      "id": "create-session.host-name",
      "surface": "src/pages/CreateSession.tsx",
      "renderPath": "default",
      "responsibility": "input",
      "target": "@gamescience/input",
      "disposition": "migrated",
      "evidence": {
        "source": true,
        "callSite": true,
        "renderPath": true,
        "themeContract": true,
        "visual": true
      }
    }
  ],
  "coverage": {
    "total": 112,
    "migrated": 94,
    "retainedApproved": 12,
    "upstreamGap": 6,
    "outOfScopeApproved": 0,
    "unclassified": 0
  },
  "installedItems": [],
  "migratedSurfaces": [],
  "localForks": [],
  "sanctionedExceptions": [],
  "retainedDeviations": [],
  "knownIssues": []
}
```

The record must be generated from evidence, not manually narrated after the
work. Markdown reports must reconcile against this JSON.

Also create or update:

- `src/docs/gamescience-ui-migration.md`
- `src/docs/gamescience-ui-contexts.md`
- `AGENTS.md` references

Migration Markdown must include:

- Registry version / URL / theme / contexts / mode / date
- Tailwind integration branch
- Migrated registry items (**same list as the JSON record**)
- Coverage summary using dimensions A–E and obligation counts
- Render-path inventory summary
- Payload integrity and token-contract results
- Mixed-context branch findings
- Visual-loss decisions when patterns replaced local chrome
- Reference-vs-consumer visual comparison results
- Replaced local components
- Retained application components and game-specific visuals
- Sanctioned exceptions and upstream gap proposals
- Remaining open obligations and next recommended slice
- Authorisation findings still outstanding (separate)

Do not include secrets, tokens, host keys or credentials.

Never claim whole-application “100% primitives” from a few migrated surfaces.

## 17. Final output

Report:

### Result

Exactly one of:

- First slice migrated successfully
- Migration progressed — ledger updated with remaining obligations
- Safe incremental stop — awaiting confirmation
- Full alignment in progress
- Full alignment complete
- Full alignment incomplete
- Blocked by unresolved ownership, stack, token-contract or validation issues

### Full alignment complete

Allowed only when:

- all in-scope obligations have final dispositions
- zero unclassified obligations remain
- all `migrated` obligations pass A–E coverage
- all retained deviations are explicitly approved
- all upstream gaps are listed and do not masquerade as migrated
- payload integrity passes
- token contract passes
- final independent audit reconciles with the ledger
- typecheck, lint, tests and build pass
- required runtime and visual checks pass
- records match repository reality

### Full alignment incomplete

Required when any of the above is unresolved, even if the build is green.

### Configuration

- Registry version:
- Registry URL:
- Theme:
- Mode:
- Tailwind integration:
- Router / framework:
- Contexts in scope:

### Obligation ledger summary

| Disposition             | Count |
| ----------------------- | ----- |
| migrated                |       |
| retained-approved       |       |
| upstream-gap            |       |
| out-of-scope-approved   |       |
| open / unclassified     |       |

### Slices completed

| Slice | Obligations closed | A | B | C | D | E | Notes |
| ----- | ------------------ | - | - | - | - | - | ----- |

### Deferred / retained / upstream gaps

List application-owned surfaces, sanctioned exceptions, structured upstream gap
proposals and remaining open obligations.

### Authorisation findings

Separate list only.

### Validation

List every check and result for the latest slice, including payload integrity,
call-site purity, render-path reconciliation, token contract and
reference-vs-consumer visuals.

### Follow-up

Next recommended slice, upstream registry work, or hand-off to
`validate-gamescience-ui` / `sync-gamescience-ui` as appropriate.
