---
name: migrate-gamescience-ui
description: Use when adopting GameScience UI in an established Lovable or React project that already has substantial local UI. Detects theme, Tailwind stack and experience contexts unless overridden; runs inspect → inventory render branches → build obligation ledger → confirm identity → rollback → validate token contract → install foundations → migrate slices with A–E coverage gates → auto-continue in full alignment → escalate upstream gaps → clean up → independent coverage audit → record. Supports safe incremental and full visual alignment modes. Corresponds to the Migrate composer. Not for greenfield Start adoption, read-only audits, or syncing an already-pinned registry.
skillUpdated: 2026-08-18
libraryVersion: 1.3.0
distribution: lovable-workspace
---

# Migrate GameScience UI

`skillUpdated: 2026-08-18` · `libraryVersion: 1.3.0`. Report both values in the final output so the running copy can be identified.

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

### Evidence references (not bare booleans)

A–E status must reference concrete proof. A boolean without an artefact,
command result, source location, computed-style result or visual reference is
insufficient for full-alignment completion — otherwise the final audit only
reconciles one assertion set against another.

Prefer structured evidence objects (fields may be omitted when not applicable,
but `status` alone is never enough for `migrated`):

```json
{
  "evidence": {
    "source": {
      "status": "pass",
      "items": ["input"],
      "payloadHash": "sha256:…",
      "files": ["src/components/ui/input.tsx"]
    },
    "callSite": {
      "status": "pass",
      "consumers": ["src/pages/CreateSession.tsx:84"],
      "purityScan": "pass"
    },
    "renderPath": {
      "status": "pass",
      "branches": ["default", "submitting", "error"]
    },
    "themeContract": {
      "status": "pass",
      "utilities": ["h-control-md", "ring-focus-ring"],
      "computedStyleFixture": "create-session"
    },
    "visual": {
      "status": "pass",
      "story": "components-ui-input--default",
      "theme": "citadel",
      "context": "facilitator",
      "variant": "default",
      "consumerRoute": "/create-session",
      "consumerState": "default",
      "screenshot": "docs/gamescience-ui/evidence/slice-01/create-session-input.png"
    }
  }
}
```

### Evidence storage

Store comparison artefacts under a project-local path, preferably outside `src`:

```text
docs/gamescience-ui/evidence/
├── slice-01/
│   ├── join-default.png
│   ├── join-error.png
│   └── comparison.json
└── final/
    ├── create-session-input.png
    └── coverage-audit.json
```

Record paths or external artefact identifiers consistently in the ledger and
`gamescience-ui-state.json`. Do not force-commit large screenshot sets when that
conflicts with project practice — still record the path or artefact id used.

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
- `sentinel`

### Mode

- safe incremental
- full visual alignment

### Stack

- detect
- Tailwind 3
- Tailwind 4

Default when unspecified:

| Input | Default                                   |
| ----- | ----------------------------------------- |
| Theme | preserve detected theme; ask if ambiguous |
| Mode  | interpret user intent (table below)       |
| Stack | detect from project                       |

### Mode from user intent

Do not silently collapse a broad alignment request into a one-slice exercise.

| User intent                                             | Mode                  |
| ------------------------------------------------------- | --------------------- |
| Try the registry on one screen                          | safe incremental      |
| Migrate incrementally / migrate one slice               | safe incremental      |
| Migrate this project (no breadth stated)                | safe incremental      |
| Complete migration / fully align / make registry-driven | full visual alignment |
| Full visual alignment                                   | full visual alignment |

If intent is ambiguous between “try one screen” and “complete alignment”, ask
once before proceeding.

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

## Valid vocabulary

Valid themes: `gamescience` | `citadel` | `sentinel`

Valid registers (only for themes that declare one — currently Sentinel):
`cinematic` (default) | `restrained`

Valid contexts: `participant` | `facilitator` | `shared-display`

Set `register` on the root `GameScienceProvider` alongside `theme`. Do not set a
register for a theme that does not declare one. Do not create register-specific
component forks.

## Storybook reference

Use the published Storybook as the canonical **rendered** reference:

```text
https://game-science-uk.github.io/gamescience-ui-library/storybook/
```

Use Storybook for:

- API confirmation
- variants, treatments and interactive states
- theme and experience-context previews
- expected component composition

**Authority split (non-negotiable):**

| Source          | Authority                                              |
| --------------- | ------------------------------------------------------ |
| Registry JSON   | Installed files, dependencies, payload equality        |
| Storybook       | Intended rendered behaviour and visual/state contracts |
| Docs / composer | Migration procedure                                    |

Do not compare unmatched themes, contexts, variants or states. A consumer
Citadel `Button` with `emphasis="strong"` must be compared to that Storybook
state — not a default Gamescience Button story.

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
- mix themes within one application
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
5. Never mix themes within one application
6. Never equate experience context with role, permission, or route authority
7. Never create `CitadelButton`, `GamesciencePanel`, `GlassCard`, `TechInput`, or equivalent forks
8. Prefer installed patterns before assembling primitives
9. Keep application logic, networking, scoring, auth, and persistence outside upstream components
10. Use Sonner only — never legacy toast/toaster/use-toast
11. Use the versioned registry URL only
12. No unreviewed overwrite (`--diff` before `--overwrite`)
13. No broad delete-and-rebuild migration
14. No raw **component-identity** theme styling in migrated screens — derive
    chrome from the installed theme CSS (see Allowed vs disallowed identity
    styling below)
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
27. Screenshot validation must compare consumer output with matching Storybook
    reference states (theme, context, variant, treatment, state)
28. Full alignment requires zero unexplained difference between discovered
    in-scope UI responsibilities and ledgered obligations
29. A–E evidence for `migrated` obligations must include concrete references,
    not bare booleans

### Allowed vs disallowed identity styling

**Allowed** (application data visualisation / game content — do not force into
tokens):

- dynamic chart colours
- map / sector colours
- canvas / SVG effects
- game-state visualisation
- option identity colour supplied as a documented semantic variable

**Disallowed** (component identity / chrome):

- local recreation of Panel surface
- local Button hover / active / disabled treatment
- local Input border, height or focus ring
- local typography system replacing registry text roles
- arbitrary colours on registry primitives to “make them look right”

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

| Disposition             | Meaning                                      |
| ----------------------- | -------------------------------------------- |
| `migrated`              | Registry target adopted; A–E evidence passes |
| `retained-approved`     | Explicitly kept as application-owned         |
| `upstream-gap`          | Needs a new or extended registry item        |
| `out-of-scope-approved` | Intentionally excluded from this engagement  |

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

### Audit freshness

An audit is **stale** (must not be reused) when any of the following changed
after it was produced:

- registry pin / version URL
- route tree
- UI component inventory
- theme or foundation CSS
- Tailwind config or Tailwind 4 bridge
- package lock
- files belonging to an in-scope migration slice

Prefer repository hashes or modified-file checks over a wall-clock duration
alone. When stale, re-run discovery before rewriting UI.

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

| ID  | Surface | Branch/state | Responsibility | Current | Target | Status |
| --- | ------- | ------------ | -------------- | ------- | ------ | ------ |

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
- semantic wrappers that disguise raw controls or fork registry variants
  (see Call-site purity scan)
- styling overrides (`style={{}}`, arbitrary colours, identity `className`s)
- registry catalogue availability
- theme and token usage
- responsive and context variants

### Discovery reconciliation

A closed ledger is only useful when discovery itself is complete. Before
declaring full alignment — and after building the initial ledger — reconcile
discovered in-scope UI with ledger rows:

| Discovery category  | Discovered | Ledgered | Difference |
| ------------------- | ---------: | -------: | ---------: |
| Routes              |            |          |            |
| Render branches     |            |          |            |
| Local UI components |            |          |            |
| Raw controls        |            |          |            |
| Semantic wrappers   |            |          |            |
| Registry imports    |            |          |            |
| Identity overrides  |            |          |            |

**Full alignment requires zero unexplained difference** between discovered
in-scope UI responsibilities and ledgered obligations. A missing component that
never entered the ledger is invisible to later A–E gates — treat unexplained
gaps as blockers.

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
- Theme: preserve detected | gamescience | citadel | sentinel
- Register (only when the theme declares one — Sentinel: cinematic | restrained)
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
  "variables": ["--primary", "--primary-hover", "--primary-active", "--focus-ring", "--control-md"]
}
```

### Required checks

1. Every required utility is supported by the selected Tailwind branch
2. Every semantic key is present in `tailwind.config.ts` or the Tailwind 4 bridge
3. A production build emits selectors or declarations for every required class
4. Each generated rule has a non-empty, valid declaration
5. Representative components have expected computed values in the browser

### Compiled-selector test strategy

Distinguish two failure classes — string search alone is insufficient:

| Failure                           | Example                                         |
| --------------------------------- | ----------------------------------------------- |
| Utility not generated             | `.h-control-md` missing from production CSS     |
| Utility generated empty / invalid | `.h-control-md { height: ; }` or unresolved var |

For each required utility:

1. Search final production CSS for the selector
2. Parse the declaration block
3. Verify the expected property exists
4. Verify referenced CSS variables exist upstream
5. In the browser, verify the computed value on a representative fixture

### CSS import / cascade order

Validate that the selected theme wins after foundations, Tailwind layers and
application CSS. Exact order is stack-dependent; detect at least:

1. foundation tokens load before theme
2. Tailwind layers do not wipe required semantics
3. exactly one selected theme is imported
4. application CSS does not reset registry tokens afterward
5. local `:root` tokens do not shadow the selected theme incorrectly
6. legacy `.dark` (or equivalent) scopes are never activated as a second theme

Fail when both themes are imported, when app CSS undoes registry chrome, or
when inactive dark scopes shadow the selected theme.

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
8. Run the **post-install dependency / cache sanity gate** (below)

Do not install unselected themes or unused context shells at this stage.

Use `--diff` before `--overwrite` for any file that already exists.

### Post-install dependency / cache sanity gate

After major registry installs or syncs that change the module graph — not after
every low-risk slice — run this mechanical check before visual validation:

1. `npm ls react react-dom` (and Radix packages where relevant)
2. Confirm a single React instance; investigate duplicates
3. Restart the dev server
4. Clear the Vite cache only when the module graph changed materially
5. Reload a minimal route and confirm it is not a blank screen before proceeding

Do not clear caches blindly every slice. Do treat blank screens / invalid hook
calls after dependency changes as a known mechanical failure mode, not as
visual-contract failure.

## 8. Mode behaviour

### Risk classification for automatic continuation

| Risk    | Examples                                                        | Behaviour                             |
| ------- | --------------------------------------------------------------- | ------------------------------------- |
| Low     | Direct primitive replacement with matching API                  | Continue automatically in full mode   |
| Medium  | Domain component adoption preserving application logic          | Continue after A–E pass in full mode  |
| High    | Route split, visual removal, privacy, destructive cleanup       | Stop for confirmation                 |
| Blocked | Unresolved upstream contract, security/auth change, token break | Stop; escalate or mark `upstream-gap` |

Do not classify a complex shared-display replacement as “medium” merely to
continue. When unsure, treat as high.

### Safe incremental

1. Build the obligation ledger, discovery reconciliation and render-path inventory
2. Establish a rollback point
3. Choose **one** context-appropriate vertical slice from the ledger
4. Install foundations and selected theme only
5. Establish one root `GameScienceProvider`
6. Resolve active context from route or project configuration
7. Migrate one shell and one pattern composition for that slice — do not stall
   at Panel-only swaps when the ledger requires pattern/shell coverage
8. Validate all applicable A–E dimensions for the slice
9. Stop before restructuring every route
10. Produce a next-step recommendation with remaining open obligations

Do not claim application-wide completion from a single slice.

Do not interpret this mode as permission for a destructive rewrite or default
route renaming.

### Full visual alignment

After target identity, scope and rollback are confirmed:

1. Build the complete obligation ledger, discovery reconciliation and slice plan
2. Validate stack and token contract (including CSS import/cascade order)
3. Migrate foundations and prove **one** vertical slice before broader work
4. Proceed through **low- and medium-risk** slices without asking for bare continuation
5. Stop for **high** / **blocked** risk, or for:
   - ambiguous product decisions
   - destructive actions
   - unresolved upstream gaps that block obligations
   - security or authorisation changes
   - failed validation that cannot be corrected safely
6. Split only materially divergent compositions
7. Preserve application-owned routes where they remain clear
8. Avoid broad route renaming without functional need
9. Classify blocked work as `upstream-gap` with structured proposals
10. Remove redundant forks after validation
11. Run the independent whole-application coverage audit (methodology below)
12. Declare **Full alignment complete** or **Full alignment incomplete**

A passing slice must lead automatically into the next planned low/medium-risk
slice. “Continue?” must not be required after routine green slices.

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

Also discover **semantic wrappers** that disguise raw controls or fork registry
identity:

- components that return a single raw control (`PrimaryAction` → `<button>`)
- thin wrappers around registry components that re-skin identity
  (`StatusButton` → `<Button className="…">`)
- local CVA / variant factories duplicating registry variants
- helper functions returning identity class strings (`statusBtn()`)
- inline styling functions that recreate hover/active/disabled treatment

Wrappers count as call-site obligations. Migrating the underlying registry file
without replacing the wrapper is incomplete.

Classification:

**Allowed**

- layout and positioning
- responsive placement
- application-owned sizing where the registry API intentionally permits it
- game-specific graphics and data visualisation (charts, maps, canvas/SVG)
- documented sanctioned exceptions
- option/game-state colour via documented semantic variables

**Disallowed**

- colour identity on chrome / primitives
- component height intended to come from the registry
- borders, radii, shadows and focus treatment
- typography identity
- state colours for controls
- hover/active/disabled treatment
- visual overrides compensating for a missing token mapping
- local recreation of Panel / Button / Input surfaces

Every disallowed result must be removed or recorded as a named approved
deviation. Installing a registry primitive does not count if call sites still
override its identity or keep raw controls / wrappers.

### C. Render-path gate

Reconcile the slice against the render-path inventory. Hidden, error,
loading, disconnected, outcome and fallback branches count. Primary-path-only
migration is incomplete.

#### State-interaction matrix

Join render-path branches with interactive component states. For each migrated
interactive control on the slice, complete:

| Surface | Component | Default | Hover | Focus | Active | Disabled | Loading | Error |
| ------- | --------- | ------- | ----- | ----- | ------ | -------- | ------- | ----- |

Particularly required for Button, Input, Select, Dialog, Checkbox, form
validation, join flow and facilitator controls. Checking only the default
appearance is incomplete.

### D. Theme-contract gate

Re-run the token-contract checks for utilities and variables exercised by the
slice, including the compiled-selector strategy and CSS import/cascade order.
Fail if required classes are absent from compiled CSS or compute to
empty/incorrect values.

### E. Visual / behavioural gate

Compare **matching** Storybook reference states to consumer implementation
states. A screenshot of the migrated application alone is not sufficient.

#### Storybook reference phase

For each migrated registry item:

1. Locate its Storybook story at
   `https://game-science-uk.github.io/gamescience-ui-library/storybook/`
2. Select matching theme
3. Select matching experience context
4. Select matching variant / treatment / state
5. Capture or inspect the reference
6. Compare it with the consumer state

Record for each comparison:

| Field          | Value |
| -------------- | ----- |
| Story          |       |
| Theme          |       |
| Context        |       |
| Variant        |       |
| Consumer route |       |
| Consumer state |       |

#### Two kinds of visual comparison

**Component contract comparison** (story vs consumer control):

- height, border, radius, type scale, intent, focus, state treatment

**Composition comparison** (page / shell vs expected layout):

- spacing, layout hierarchy, shell placement, viewport, visual loss

A consumer page must **not** be expected to pixel-match a component story as a
whole. Fail component-contract mismatches; treat composition mismatches as
layout/shell obligations.

Comparison methods:

- automated screenshot diff where practical
- computed-style contract checks
- structured manual visual inspection for complex scenes

Store artefacts under `docs/gamescience-ui/evidence/` (or recorded equivalent).

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
- post-install dependency/cache sanity already passed after dependency changes

### Retained-approved regression check

Registry work can still break retained application visuals through global CSS.
For every `retained-approved` visual on a touched route, verify:

- still renders
- expected position
- no token collision
- no overflow
- no opacity loss
- no z-index regression

Applies especially to radar, corner brackets, bespoke backgrounds, charts and
game choreography. “Retained” without a survival check is incomplete.

Do not continue to the next slice while required checks fail.

## 11. Reconcile the obligation ledger

After each slice:

1. Update obligation statuses with **evidence references** for A–E (not bare
   booleans)
2. Update discovery reconciliation counts if new responsibilities were found
3. Record sanctioned exceptions by name
4. Record upstream gaps with structured proposals
5. Record retained-approved regression results for touched routes
6. Update `gamescience-ui-state.json` and Markdown records from evidence
7. Do not narrate completion that the ledger cannot support

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

For full visual alignment, this step is **mandatory**.

After all planned slices are complete, run a fresh audit from repository state
without trusting:

- the slice notes
- the migration record
- the list of installed components
- previous “done” classifications
- prior A–E boolean flags without artefacts

Independently rediscover:

- application surfaces
- render branches
- local components
- raw controls and semantic wrappers
- identity overrides
- legacy styling
- token contract and CSS cascade order
- registry payload drift
- unused installed items
- unresolved registry gaps

Rebuild discovery reconciliation and require zero unexplained difference.

Then reconcile:

```text
planned ledger
vs
actual repository
vs
runtime result
vs
Storybook reference states for migrated items
```

Execute the shared validation doctrine used by `validate-gamescience-ui` in
**coverage-reconstruction mode** (rebuild coverage evidence from repository and
runtime, then compare to the obligation ledger). Invoke that skill where the
host supports cross-skill hand-off; otherwise run the same methodology in-place.
Architecture compliance alone is not enough — the independent methodology
matters more than formally switching skills.

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
        "source": {
          "status": "pass",
          "items": ["input"],
          "payloadHash": "sha256:…",
          "files": ["src/components/ui/input.tsx"]
        },
        "callSite": {
          "status": "pass",
          "consumers": ["src/pages/CreateSession.tsx:84"],
          "purityScan": "pass"
        },
        "renderPath": {
          "status": "pass",
          "branches": ["default", "submitting", "error"]
        },
        "themeContract": {
          "status": "pass",
          "utilities": ["h-control-md", "ring-focus-ring"],
          "computedStyleFixture": "create-session"
        },
        "visual": {
          "status": "pass",
          "story": "components-ui-input--default",
          "theme": "citadel",
          "context": "facilitator",
          "variant": "default",
          "consumerRoute": "/create-session",
          "consumerState": "default",
          "screenshot": "docs/gamescience-ui/evidence/slice-01/create-session-input.png"
        }
      }
    }
  ],
  "discoveryReconciliation": {
    "routes": { "discovered": 0, "ledgered": 0, "difference": 0 },
    "renderBranches": { "discovered": 0, "ledgered": 0, "difference": 0 },
    "localUiComponents": { "discovered": 0, "ledgered": 0, "difference": 0 },
    "rawControls": { "discovered": 0, "ledgered": 0, "difference": 0 },
    "semanticWrappers": { "discovered": 0, "ledgered": 0, "difference": 0 },
    "registryImports": { "discovered": 0, "ledgered": 0, "difference": 0 },
    "identityOverrides": { "discovered": 0, "ledgered": 0, "difference": 0 }
  },
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
  "knownIssues": [],
  "evidenceRoot": "docs/gamescience-ui/evidence"
}
```

Booleans for A–E are not sufficient in schemaVersion 2 records for
`migrated` dispositions. The record must be generated from evidence, not
manually narrated after the work. Markdown reports must reconcile against this
JSON.

Also create or update:

- `src/docs/gamescience-ui-migration.md`
- `src/docs/gamescience-ui-contexts.md`
- `AGENTS.md` references

Migration Markdown must include:

- Registry version / URL / theme / contexts / mode / date
- Tailwind integration branch
- Migrated registry items (**same list as the JSON record**)
- Coverage summary using dimensions A–E and obligation counts
- Discovery reconciliation table
- Render-path inventory and state-interaction matrix summary
- Payload integrity and token-contract results (including CSS order)
- Mixed-context branch findings
- Visual-loss decisions when patterns replaced local chrome
- Storybook reference-vs-consumer comparison results (story/theme/context/state)
- Evidence artefact locations
- Replaced local components and semantic wrappers
- Retained application components, game-specific visuals and regression checks
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
- discovery reconciliation shows zero unexplained differences
- all `migrated` obligations pass A–E coverage with concrete evidence references
- Storybook comparisons used matching theme / context / variant / state
- all retained deviations are explicitly approved and regression-checked on
  touched routes
- all upstream gaps are listed and do not masquerade as migrated
- payload integrity passes
- token contract passes (compiled selectors + CSS cascade order)
- final independent audit reconciles with the ledger
- typecheck, lint, tests and build pass
- required runtime and visual checks pass
- records match repository reality

### Full alignment incomplete

Required when any of the above is unresolved, even if the build is green.

### Configuration

- Skill revision: `skillUpdated` / `libraryVersion` from this skill's header
- Registry version:
- Registry URL:
- Theme:
- Register (when the theme declares one):
- Mode:
- Tailwind integration:
- Router / framework:
- Contexts in scope:

### Obligation ledger summary

| Disposition           | Count |
| --------------------- | ----- |
| migrated              |       |
| retained-approved     |       |
| upstream-gap          |       |
| out-of-scope-approved |       |
| open / unclassified   |       |

### Slices completed

| Slice | Obligations closed | A   | B   | C   | D   | E   | Notes |
| ----- | ------------------ | --- | --- | --- | --- | --- | ----- |

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

Next recommended slice, upstream registry work, or apply the shared validation
doctrine / invoke `validate-gamescience-ui` or `sync-gamescience-ui` where
supported.

---

## Module note (maintainers)

This skill is the canonical authored orchestrator for Lovable / agent hosts.
Shared doctrine also lives in `site/migration-modules/*` for the Pages Migrate
composer. Prefer evolving doctrine in those modules and keeping this skill as
the lifecycle, stop conditions and output contract — generate thinner deployed
skills from modules when the host benefits from shorter prompts.
