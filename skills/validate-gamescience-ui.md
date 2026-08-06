---
name: validate-gamescience-ui
description: Use when checking an existing GameScience UI implementation for compliance without upgrading or migrating it. Verifies immutable registry pin, provider placement, theme selection, route-to-context mapping, shared-display privacy, portal theme propagation, semantic tokens, Tailwind 3 or 4 integration, Sonner usage, dependencies, accessibility, build/test health and project records. Supports coverage-reconstruction mode for post-migration ledger reconciliation (rediscover surfaces, render branches, call-site purity, payload integrity and token contract from repository/runtime). Detects theme, stack and contexts unless overridden. Does not install, overwrite or upgrade unless explicitly handed off to another skill.
---

# Validate GameScience UI

Check an existing GameScience UI implementation without upgrading or migrating
it.

Corresponds to the validation portions of the Start, Migrate and Upgrade
composers, as a repeatable standalone workflow.

Detect theme, Tailwind stack, and experience contexts from the project unless
the user explicitly overrides them.

This skill should **not** install, overwrite or upgrade registry items unless
the user explicitly hands off to another skill.

For greenfield setup use `adopt-gamescience-ui`. For read-only classification
and backlog work use `audit-gamescience-ui`. For established-project adoption
use `migrate-gamescience-ui`. For registry upgrades use `sync-gamescience-ui`.

## Example triggers

- Validate our GameScience UI setup
- Check this project for registry compliance
- Why does the Citadel theme look wrong?
- Verify the shared-display implementation

Useful after:

- manual project work
- Lovable edits
- a migration slice
- a registry sync
- route changes
- theme changes

## Registry source

Use the project's pinned immutable registry URL when present:

```text
https://game-science-uk.github.io/gamescience-ui-library/versions/{version}/r/{name}.json
```

Compare against published:

- `version.json`
- versioned item payloads
- public docs under `/docs/` for the relevant Tailwind branch
- experience context model documentation

Do not change the project pin during validation.

## Core principles

- verify, diagnose, report
- prefer evidence from code, payloads and runtime behaviour
- detect theme / stack / contexts rather than assuming them
- keep experience context separate from role and authority
- classify stack support from implementation contracts
- recommend a hand-off skill when remediation requires installs or overwrites
- do not silently fix findings unless the user asks to remediate

Do not:

- install registry items
- overwrite local files
- upgrade the registry pin
- redesign screens
- claim “No files changed” unless this run truly made no writes; that formal
  outcome belongs to `audit-gamescience-ui`
- treat public docs alone as proof of stack support

## Detection defaults

Unless explicitly overridden, detect:

| Input    | Default behaviour                          |
| -------- | ------------------------------------------ |
| Theme    | From `GameScienceProvider` and theme CSS   |
| Stack    | From Tailwind packages, CSS entry, config  |
| Contexts | From provider usage and route mapping      |
| Version  | From `components.json` and local metadata  |

## 1. Establish validation scope

Record:

- project path
- pinned registry version and URL
- latest immutable registry version (for drift awareness only)
- requested focus area if any (theme, shared-display, Tailwind, etc.)
- validation mode: compliance (default) or coverage-reconstruction
- available scripts for typecheck / lint / test / build

If the project has no GameScience adoption evidence, stop and recommend
`adopt-gamescience-ui` or `audit-gamescience-ui`.

### Coverage-reconstruction mode

Use when handed off from `migrate-gamescience-ui` after planned slices, or when
the user asks to prove full-alignment coverage.

In this mode, do **not** trust slice notes, prior “done” classifications, or the
installed-item list as authoritative. Independently rediscover from repository
and runtime:

- application surfaces and render branches
- local components and raw HTML controls
- legacy / identity styling overrides
- registry payload drift (byte/hash compare, including transitive files)
- token contract (required utilities/variables present in config **and**
  compiled CSS)
- unused installed items
- unresolved registry gaps

Then reconcile:

```text
planned obligation ledger
vs
actual repository
vs
runtime result
```

Report obligation dispositions and coverage dimensions A–E. Architecture
compliance alone is not enough to certify full alignment.

## 2. Verify immutable registry pin

Check:

- `components.json` registries entry for `@gamescience`
- pin uses `/versions/{version}/r/{name}.json`
- local version metadata / guidance version strings
- mixed version references

Fail when:

- the committed pin is the unversioned latest URL
- multiple incompatible version pins are present without a documented staged
  transition
- machine-readable version metadata conflicts without explanation

Note when the pin is valid but behind latest — that is informational unless the
user asked for currency. Hand off upgrades to `sync-gamescience-ui`.

## 3. Verify provider placement

Check:

- exactly one active `GameScienceProvider` per rendered application root
- no nested theme or context provider boundaries for ordinary routes
- provider wraps the surfaces that need GameScience styles and context
- theme is selected only through the provider
- components do not receive `theme` props

## 4. Verify theme selection

Check:

- active theme is `gamescience` or `citadel`
- exactly one theme CSS is imported
- foundation CSS is imported
- no mixed Gamescience / Citadel styling on the same application screen
- no raw generic theme forks (`CitadelButton`, `TechButton`, `GlassCard`, etc.)
- semantic tokens are used rather than hardcoded game colours in shared UI

If the theme “looks wrong”, inspect in order:

1. provider theme value
2. imported theme CSS
3. Tailwind integration branch correctness
4. missing foundation tokens
5. local overrides fighting semantic tokens
6. portal hosts rendering outside the provider tree

## 5. Verify route-to-context mapping

Check:

- experience contexts in use are intentional
- route-to-context mapping exists and matches implementation
- context is not inferred solely from role names
- unselected contexts are not half-installed without reason
- project record `src/docs/gamescience-ui-contexts.md` matches reality when present

Keep separate:

- experience context
- authenticated role / authority
- route mount point
- game or workflow state

## 6. Verify shared-display privacy

When shared-display surfaces exist, check:

- no participant-private information is rendered
- content scale and density suit distance viewing where expected
- interactivity matches a public-room surface
- shell / pattern choices are shared-display appropriate
- authority tokens or host controls are not leaked into the display surface

## 7. Verify portal theme propagation

Check overlay/portals such as dialog, sheet, dropdown, popover, toast hosts:

- portal containers inherit root theme tokens
- portals are not mounting outside the styled application root in a way that
  drops CSS variables
- focus traps and keyboard interaction still work

## 8. Verify semantic token completeness

Inspect foundation / theme CSS and runtime usage for:

- required semantic colour tokens
- radius, typography, shadow, motion and control-size tokens as used by installed
  components
- missing CSS variables in the console or computed styles
- duplicate or conflicting local token definitions

Compare against the registry theme contract / installed theme payload rather
than a memorised partial list.

## 9. Verify toast system

Check:

- approved Sonner toaster is mounted
- application code imports the approved `toast` API
- legacy `toast.tsx` / `toaster.tsx` / `use-toast` are absent or unused

## 10. Verify dependencies

Check:

- installed registry items’ declared dependencies are present
- no missing imports for migrated surfaces
- no accidental duplicate React or Radix copies where the project can detect them
- alternate theme packages are not installed unless intentionally used

## 11. Verify Tailwind integration

Follow exactly one branch:

### Tailwind 3

- `tailwind.config.*` retained and authoritative
- semantic colours mapped through `oklch(var(--token))` (or the project’s
  equivalent contract mapping)
- `@tailwind base/components/utilities` retained
- `tailwind-v4-bridge.css` not installed or imported
- foundation + one theme imported from application CSS

### Tailwind 4

- foundation + one theme imported
- approved bridge installed/imported
- CSS-first scanning / token mapping in use
- no `tailwind.config.ts` introduced merely for the registry

Classify stack support as:

- Supported
- Supported with stack-specific integration
- Unsupported
- Uncertain — payload inspection required

Use “blocking mismatch” only for verified incompatibility.

Inspect payloads and foundation CSS; do not infer support only from guide names.

Router findings remain separate from Tailwind findings.

## 12. Verify accessibility and interaction

Where relevant to installed/migrated surfaces:

- keyboard navigation
- visible focus
- interactive targets on participant vs facilitator vs shared-display densities
- reduced motion expectations if the project defines them
- long content, loading, disconnected and error states for critical flows

## 13. Verify build and test health

Run the project's existing checks.

At minimum where available:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Use the project's actual script names.

Record every command and result. Do not report overall success while required
checks fail.

## 14. Verify project records match implementation

Compare implementation against:

- `src/docs/gamescience-ui-contexts.md`
- `src/docs/gamescience-ui-migration.md`
- `src/docs/gamescience-ui-update-history.md`
- `src/docs/gamescience-ui-guidance.md`
- `AGENTS.md` references
- local version metadata

Flag:

- missing records
- stale context maps
- guidance revision newer than project-local copies
- registry version current but public migration docs newer than local notes

Updating records requires explicit user request or hand-off; do not rewrite them
silently during validation.

## 15. Findings severity

Classify each finding as:

| Severity  | Meaning                                      |
| --------- | -------------------------------------------- |
| Blocking  | Breaks theme, context, privacy, or build     |
| Major     | Clear compliance failure needing remediation |
| Minor     | Drift or hygiene issue                       |
| Info      | Currency note or optional improvement        |

Recommended hand-offs:

| Finding type                         | Hand off to                 |
| ------------------------------------ | --------------------------- |
| Missing initial adoption             | `adopt-gamescience-ui`      |
| Large classification / backlog need  | `audit-gamescience-ui`      |
| Slice-by-slice replacement work      | `migrate-gamescience-ui`    |
| Registry pin / item upgrade needed   | `sync-gamescience-ui`       |

## 16. Final output

Report:

### Result

One of:

- Compliant
- Compliant with minor drift
- Non-compliant — remediation required
- Incomplete — insufficient evidence

### Detected configuration

- Registry pin:
- Latest immutable version observed:
- Theme:
- Tailwind integration:
- Router / framework:
- Contexts:

### Checks

| Area | Status | Evidence | Severity |
| ---- | ------ | -------- | -------- |

Cover at least:

- immutable registry pin
- provider placement
- theme selection
- route-to-context mapping
- role/context separation
- shared-display privacy
- portal theme propagation
- semantic token completeness
- no raw generic theme forks
- legacy toast absence
- installed dependencies
- Tailwind integration
- accessibility
- build and test health
- project records

In coverage-reconstruction mode, also cover:

- obligation ledger reconciliation
- render-path inventory completeness
- call-site purity
- payload integrity (including transitive theme/foundation files)
- token-contract compiled-CSS proof
- reference-vs-consumer visual/computed-style checks where practical

### Stack support

- Classification:
- Evidence:

### Recommended hand-off

Only if remediation needs another skill.

### Follow-up

List blocking and major findings first. Do not implement fixes unless asked.
