---
name: audit-gamescience-ui
description: Use when performing a read-only audit of a Lovable or React project against the GameScience UI registry. Inspects stack, theme, routes, contexts, render branches and local UI inventory; inspects registry payloads rather than relying only on documentation; maps local primitives to registry items; produces context audit, render-path inventory, migration obligation ledger, registry coverage backlog, separate authorisation findings and a recommended first migration slice. Corresponds to Audit only in the Migrate composer. Never modifies files. This is the only GameScience UI skill permitted to claim "No files changed" as a formal outcome.
---

# Audit GameScience UI

Perform a read-only analysis of the current project against the GameScience UI
registry.

Corresponds to **Audit only** in the Migrate composer.

This skill must **never** modify files.

It is valuable independently of migration and should be rerun after registry
releases.

Detect theme, Tailwind stack, and experience contexts from the project unless
the user explicitly overrides them.

For adoption of a new project use `adopt-gamescience-ui`. For implementing
migration slices use `migrate-gamescience-ui`. For upgrading an existing pin
use `sync-gamescience-ui`. For compliance checks without a full audit use
`validate-gamescience-ui`.

## Example triggers

- Audit this project against GameScience UI
- What would a registry migration involve?
- Find missing registry coverage
- Classify the UI in this Lovable game

## Formal outcome privilege

This is the only GameScience UI skill permitted to claim:

```text
No files changed
```

as a formal outcome.

If any file would need to change to continue, stop and recommend another skill.
Do not “helpfully” install, format, rewrite docs, or tidy imports during an
audit.

## Registry source

Use the GameScience UI immutable registry:

```text
https://game-science-uk.github.io/gamescience-ui-library/versions/{version}/r/{name}.json
```

Also inspect:

- `https://game-science-uk.github.io/gamescience-ui-library/version.json`
- versioned `agent-catalogue.json`
- published public docs under `/docs/`
- installed item JSON payloads for declared files and dependencies

Do not infer registry stack support solely from the names of published guides.
Inspect the installed or candidate item payload, foundation CSS and declared
dependencies.

## Core principles

- inspect, classify, map, propose
- do **not** modify code
- do **not** install registry items
- do **not** change routes or providers
- mark insufficient evidence as `unclassified`
- do not force a nearest experience context
- distinguish primitives, compositions, patterns and application-owned UI
- report authorisation / RLS findings separately from UI migration findings
- classify stack support from implementation contract evidence
- recommend a first migration slice without implementing it

Do not:

- default every gap to “Registry target: none / Action: keep”
- invent a fourth experience context
- treat role names as experience contexts
- treat missing documentation as a blocking stack mismatch
- claim files were unchanged if any write occurred

## Detection defaults

Unless explicitly overridden, detect:

| Input    | Default behaviour                                    |
| -------- | ---------------------------------------------------- |
| Theme    | Infer from provider, theme CSS, branding             |
| Stack    | Detect Tailwind 3 vs 4 from the project              |
| Contexts | Infer from routes and surfaces; use unclassified     |
| Version  | Project pin if present; else latest immutable release|

Router / framework detection is separate from Tailwind detection.

## 1. Establish audit scope

Record:

- project path
- whether `@gamescience` is already configured
- current pinned registry version if any
- latest stable immutable registry version
- explicit user overrides for theme, stack or contexts
- prior audit artefacts if present

Look for existing records such as:

- `src/docs/gamescience-ui-migration.md`
- `src/docs/gamescience-ui-contexts.md`
- `src/docs/gamescience-ui-update-history.md`
- prior audit reports in project docs

When prior audits exist, classify candidate maturity against that evidence
rather than treating every gap as new.

## 2. Inspect project configuration

Inspect before proposing any migration:

- package manager, framework, router
- Tailwind version and CSS entry (separately from router)
- `components.json`, aliases, UI inventory
- custom components, global CSS, fonts, theme architecture
- provider structure
- Sonner / toast usage
- portals and overlay hosts
- participant / facilitator / shared-display surfaces
- route structure and business logic coupled to UI
- duplicate design systems and client/game-specific visuals
- local shadcn primitives that may have `@gamescience/*` equivalents
- authorisation / RLS findings (collect, do not expand into a security rewrite)

Do not modify anything found during inspection.

## 3. Inspect registry payloads

For candidate registry targets, inspect the actual item payload when available:

- installed local copies under the consumer tree
- remote immutable item JSON for the target version
- `files`, dependencies and CSS assets declared by the item
- foundation / theme contract expectations

Do not rely only on documentation titles or composer module names.

### Stack support classification

Classify Tailwind / consumer-stack support as exactly one of:

- **Supported**
- **Supported with stack-specific integration**
- **Unsupported**
- **Uncertain — payload inspection required**

Use “blocking mismatch” only for a **verified** incompatibility with the
implementation contract.

Tailwind version does not determine router integration — report router findings
separately.

## 4. Detect theme and contexts

### Theme

Identify the likely target theme:

- preserve / detected project identity
- `gamescience`
- `citadel`

Note whether multiple theme systems currently coexist. Do not migrate them in
this skill.

### Experience contexts

For every major route, screen or layout, identify:

- experience context (`participant` | `facilitator` | `shared-display` |
  `unclassified`)
- authenticated role if known
- required authority
- interactivity
- privacy expectations
- intended viewport
- current shell / pattern if any

Keep experience context separate from role, route and game state.

Do not require all three contexts. Absent contexts may be legitimate.

## 5. Inventory local UI

Build a complete inventory of local UI-relevant implementations, including:

- buttons, inputs, cards, dialogs, panels and other primitives
- theme-named forks (`Tech*`, `Citadel*`, glass/neon wrappers)
- join / lobby / display compositions
- shells and layout frames
- toast systems
- token / theme CSS files
- game-specific visuals and scanners
- hooks or modules that only exist to restyle upstream APIs

Search the published catalogue before declaring a registry gap.

## 6. Map local implementations to registry items

For each inventory row, choose exactly one classification:

- **Existing registry target**
- **Application-specific**
- **Registry coverage candidate**
- **Requires further evidence**
- **Obsolete or unused**

### Required component audit table

| Existing implementation | Registry target | Classification | Proposed action | Risk |
| ----------------------- | --------------- | -------------- | --------------- | ---- |

Examples of intended judgement:

| Existing implementation | Registry target        | Classification              | Proposed action        | Risk   |
| ----------------------- | ---------------------- | --------------------------- | ---------------------- | ------ |
| TechButton              | @gamescience/button    | Existing registry target    | replace                | low    |
| Dialog                  | @gamescience/dialog    | Existing registry target    | replace local shadcn   | low    |
| custom join screen      | @gamescience/join-flow | Existing registry target    | incremental migration  | medium |
| WebSocket hook          | none                   | Application-specific        | preserve               | high   |
| Stat tile               | none                   | Registry coverage candidate | backlog                | medium |
| radar visual            | none                   | Application-specific        | retain                 | low    |

For every missing registry target, assess:

1. Is it visual, behavioural, or both?
2. Is it tied to business or game logic?
3. Can existing registry primitives compose it?
4. Is it reusable across games?
5. Is it a primitive, component, pattern, or template?
6. Which contexts use it?
7. Does it appear in more than one project or prior audit?
8. Should it remain application-owned?

### Composition maturity

Distinguish:

| Kind                         | Meaning                                               |
| ---------------------------- | ----------------------------------------------------- |
| Primitive                    | Low-level reusable control                            |
| Primitive composition        | Local assembly that may not need a new registry item  |
| Higher-level candidate       | Stable cross-game pattern / template candidate        |
| Application-owned exception  | Game-specific or client-specific surface              |

Do not recommend a new registry primitive when an approved composition of
existing items would suffice.

### Candidate maturity across prior audits

Where prior audits or migration records exist, classify candidates as:

- New in this audit
- Recurring across audits
- Previously deferred with reason
- Previously rejected as application-owned
- Now covered by a newer registry release

## 7. Produce the context audit

### Required context audit table

Complete one row per route, screen or major layout:

| Route/surface | Experience context | Authenticated role | Required authority | Interactivity | Privacy | Intended viewport | Current shell | Registry shell target | Current pattern | Registry target | Split required | Risk | Notes |
| ------------- | ------------------ | ------------------ | ------------------ | ------------- | ------- | ----------------- | ------------- | --------------------- | --------------- | --------------- | -------------- | ---- | ----- |

Use `unclassified` when evidence is insufficient.

### Context architecture recommendation

Every audit must finish with:

- Contexts currently present
- Contexts inferred but not declared
- Contexts absent and legitimately unnecessary
- Unclassified surfaces requiring clarification
- Surfaces that should remain application-owned
- Route-to-context mapping
- Recommended provider placement
- Recommended shell mapping
- Recommended pattern mapping
- Composition splits required
- Composition splits not justified
- Shared-display privacy findings
- Authorisation findings tracked separately
- First context vertical slice
- Context-related registry gaps

## 8. Produce the render-path inventory and obligation ledger

File- and route-level inventories are not enough. For every major route or
stateful screen, list meaningful branches and states:

- conditional / switch branches
- loading, empty, error, disconnected
- mobile / desktop compositions
- participant / facilitator / display variants
- pre-game, active-phase, voting, outcome, completion
- legacy compatibility fallbacks

Then produce a **migration obligation ledger**. Each row is one UI
responsibility on one render branch:

| ID | Surface | Branch/state | Responsibility | Current | Target | Status |
| -- | ------- | ------------ | -------------- | ------- | ------ | ------ |

Also inventory raw HTML controls and styling overrides that would block
call-site purity after install (`style={{}}`, arbitrary colours, identity
`className`s on registry components).

## 9. Produce the registry coverage backlog

| Existing implementation | Proposed registry layer | Evidence | Contexts | Reuse likelihood | Recommendation |
| ----------------------- | ----------------------- | -------- | -------- | ---------------- | -------------- |

Proposed registry layer must be one of:

- primitive
- reusable component
- pattern
- template
- application-specific
- insufficient evidence

Classify backlog rows as:

- Primitive gap (should be rare after 0.3.0)
- Reusable component candidate
- Pattern candidate
- Template candidate
- Application-specific
- Insufficient evidence

For recurring compositions without an adequate registry target, draft a
structured upstream-gap proposal (layer, API, variants, consumers, blocked
obligation IDs) rather than only listing a backlog row.

## 10. Separate authorisation findings

Report security / authority findings in their own section.

Examples:

- route guards missing
- facilitator UI reachable without authority checks
- shared-display token scope unclear
- RLS or role storage questions

Do not block a UI migration recommendation solely because authority work remains,
unless the surface cannot be classified safely without it.

Do not implement auth changes in this skill.

## 11. Recommend the first migration slice

Recommend exactly one first vertical slice.

Prefer a slice that:

- has a clear registry pattern target
- belongs to one experience context
- has manageable risk
- proves provider, theme and stack integration early
- does not require a destructive rewrite

Output:

### First slice

- Context:
- Route / surface:
- Registry targets:
- Local replacements:
- Risks:
- Manual confirmation points:
- Suggested follow-on skill: `migrate-gamescience-ui`

Do not implement the slice here.

## 12. Final output

Report:

### Result

One of:

- Audit complete
- Audit complete with unclassified surfaces
- Audit blocked by insufficient repository access

And always include the formal outcome line when no writes occurred:

```text
No files changed
```

### Detected configuration

- Current registry pin:
- Latest immutable registry version considered:
- Theme evidence:
- Tailwind integration:
- Router / framework:
- Contexts present:
- Contexts unclassified:

### Stack support

- Classification:
- Evidence:
- Router notes:

### Component audit

Include the full table.

### Context audit

Include the full table and architecture recommendation.

### Render-path inventory

Summarise branch/state coverage per major surface.

### Obligation ledger

Include the ledger table and counts by provisional status.

### Registry coverage backlog

Include the backlog table and any structured upstream-gap proposals.

### Authorisation findings

Separate list only.

### First migration slice

As specified above.

### Follow-up

List recommended next skill and any questions the user must answer before
migration.
