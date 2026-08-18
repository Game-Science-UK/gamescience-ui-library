---
name: extract-theme
description: Use when comprehensively extracting the active visual theme from an existing Lovable or React application so the result can be copied directly to the GameScience registry build agent to implement a new registry theme. Produces a read-only, evidence-graded theme implementation brief covering semantic tokens, typography, geometry, controls, surfaces, component treatments, shells, contexts, states, motion, accessibility, cascade and source ownership. Expresses treatments as declarative selector/property rows rather than prose, declares its observation base, never derives unevidenced values, checks every token against the component utilities that would override it, and states negative constraints the theme must not violate. Defaults the extraction reference to gamescience when no theme is present. Not for modifying the application, migrating components, or implementing the theme in the registry.
skillUpdated: 2026-08-18
libraryVersion: 1.3.0
distribution: lovable-workspace
---

# Extract Theme

`skillUpdated: 2026-08-18` · `libraryVersion: 1.3.0`. Report both values in the final output so the running copy can be identified.

Perform a comprehensive, read-only extraction of the visual theme currently expressed by the live application.

The final output must be suitable for direct copy and handoff to the GameScience registry build agent as an implementation brief for a new registry theme.

Do not modify files.

Do not implement the theme.

Do not migrate the application.

Do not redesign or “improve” the source theme unless reporting a defect separately.

Do not infer a complete theme from a logo, a few colours, or one screen.

## Purpose

Extract the source application's visual grammar and translate it into a registry-theme specification that can be implemented against the existing GameScience UI component catalogue.

The extraction must cover:

- active theme detection
- semantic colour roles
- surfaces and elevation
- borders, geometry and radii
- typography roles
- control dimensions and spacing
- shadows, glows and focus treatment
- motion and reduced-motion behaviour
- primitive styling
- domain-component styling
- pattern and shell styling
- participant, facilitator and shared-display context differences
- overlay and portal styling
- responsive and density differences
- visual defects and legacy drift
- application-owned graphics and effects that must not become theme contract
- missing registry hooks or tokens required to express the theme
- a complete implementation coverage matrix for the registry build agent

The output must explain both:

1. **What the theme looks like.**
2. **How that visual identity is distributed across tokens, selectors, components, contexts and states.**

## Theme detection rule

Detect the active theme from project evidence, including:

- `GameScienceProvider`
- `data-theme`
- root classes or attributes
- theme CSS imports
- CSS variable scopes
- route or user theme selection
- component-level theme branches
- global token files
- active runtime DOM

Possible outcomes:

- `gamescience`
- `citadel`
- another explicit named theme
- multiple active themes
- no theme detected
- ambiguous theme

If no explicit theme is present, record:

```text
Detected theme: none
Extraction reference theme: gamescience
Reason: no explicit application theme contract was found
```

In that case, extract the application's actual visual styles, but use Gamescience as the baseline registry contract for semantic naming and comparison.

Do not pretend the application already uses the Gamescience theme.

If the theme is ambiguous, report the conflicting evidence. Do not silently choose whichever token file is easiest to inspect.

## Cross-theme implementation rule

The final handoff must state:

> The registry build agent must implement this as a new theme applied to the existing shared GameScience UI component source. It must not create theme-specific React component forks. Existing components must continue to work across every supported theme, including Gamescience, Citadel and the new theme.

The new theme may add theme-scoped CSS, semantic token values, extension tokens and minimal stable `gs-*` hooks where necessary. It must not add `{ThemeName}Button`, `{ThemeName}Panel`, theme props, or conditional theme branches in shared React components.

### Do not template from an existing theme

The final handoff must also state:

> Author this stylesheet from the specification in this brief. Do not copy an
> existing theme stylesheet and substitute values. Read an existing theme only
> to learn the token contract and the available `gs-*` hooks — never to inherit
> its rule structure, selector taxonomy, or treatment decisions.

An existing theme's stylesheet encodes _that theme's_ design decisions. Cloning
its rule shape and swapping token values produces a theme that carries the
source theme's visual grammar under new colours, which reads as the wrong theme
even when every token value is correct.

Where the brief specifies a treatment that differs from how another theme
handles the same component, the brief wins. Where the brief says nothing, the
correct output is no rule — not the other theme's rule.

## Evidence model

Use only evidence from:

- live rendered routes and branches
- active CSS imports and selectors
- computed styles in the browser
- CSS variables actually consumed by rendered UI
- component call sites
- interactive states
- responsive states
- tests and stories that document behaviour
- runtime screenshots where available

Separate:

- live and visible
- live but conditional
- defined but unused
- legacy/dead
- application-owned visual effect
- likely theme contract
- uncertain

Do not treat unused token declarations as part of the theme merely because they exist in a CSS file.

Do not treat local implementation bugs as intended theme behaviour without flagging them.

### Evidence grades

Every value in the output carries exactly one grade:

| Grade         | Meaning                                                                |
| ------------- | ---------------------------------------------------------------------- |
| `observed`    | Read from computed style on a rendered element. Cite route + selector. |
| `declared`    | Read from source CSS that is provably applied, but not seen rendered.  |
| `unevidenced` | Not seen. **No value may be supplied.** Inherits contract tokens.      |
| `app-owned`   | Application visual, not theme contract. Do not transfer.               |
| `defect`      | Source bug. Do not reproduce.                                          |

There is no grade for inferred, derived, or extrapolated values, because no such value may appear in the output.

An ungraded value is a defect in the extraction.

## Registry coverage reference

The extraction must be broad enough for a registry theme comparable in coverage to a mature theme such as Citadel. At minimum inspect the theme surface for:

### Foundations and contract

- page and foreground
- subtle, standard, raised and overlay surfaces
- border and strong-border roles
- focus ring
- primary / hover / active / foreground
- secondary / hover / active / foreground
- accent / foreground
- muted / muted foreground
- success / warning / danger / information and foreground pairs
- control, card, panel, overlay and pill radii
- border widths
- typography families, weights, tracking and transforms
- control heights and padding
- panel padding and section spacing
- content max width
- control, card, panel, overlay and focus shadows
- durations, easings, press and hover motion
- shell background treatment

### Primitive and shared component coverage

- Button
- Input
- Textarea
- Label
- Checkbox
- Radio
- Switch
- Select
- Slider
- Tabs
- Accordion
- Panel
- Card
- Separator
- Empty
- Table
- Badge
- Alert
- Dialog
- AlertDialog
- Sheet
- Tooltip
- Popover
- Dropdown/menu surfaces
- Sonner/toasts
- Progress
- Skeleton
- Spinner
- display typography
- mono/data typography
- connection markers/status

### Domain component coverage

Where present in the registry or source application, inspect:

- Countdown
- PhaseProgress
- ConnectionBanner
- PhaseHeader
- PhaseDirective
- RolePanel
- VoteStatus
- OutcomeSummary
- StickyActionBar
- ParticipantIdentity
- ParticipantStatus
- ConnectionStatus
- WaitingState
- RoomCodeDisplay
- GameCodeInput
- DisplayHeading
- ParticipantCountDisplay

### Shell and context coverage

- participant shell
- facilitator shell
- shared-display shell
- shell header, main and footer
- safe-area behaviour
- content widths
- background layers
- grids, dots, vignettes and scanlines
- sticky action regions
- shared-display density and distance legibility
- non-interactive display treatment
- portal inheritance under every context

This list is a coverage checklist, not an instruction to invent styling for components the source theme never demonstrates.

### Never derive a treatment

When a component is not evidenced, do **not** infer, derive, or extrapolate a treatment for it.

Record it as:

```text
UNEVIDENCED — inherits contract tokens. Do not style. Verify against the source before theming.
```

Deriving a plausible treatment from "established theme grammar" produces styling the source application does not have, and it is indistinguishable from observed fact once it reaches the build agent. An unevidenced component is a **visible gap to be closed later**, not a blank to be filled now.

Coverage is measured by how much was observed, never by how much was specified. An extraction that observes 12 components and marks 40 unevidenced is more useful than one that specifies all 52 with half of them invented.

## 1. Detect project and theme configuration

Report:

```text
Project:
Framework:
Router:
React:
Tailwind:
UI base:
Registry version:
Detected theme:
Theme source files:
Root theme application:
Contexts present:
Font loading:
CSS entry points:
Storybook:
Runtime inspected:
Files modified: none
```

Identify whether the source theme is:

- already a GameScience registry theme
- a local semantic theme
- a collection of global CSS variables
- utility-class based
- heavily inline-styled
- mixed with legacy styles
- split across multiple route-level visual systems

## 2. Build a live theme-consumer inventory

Inventory every meaningful route, branch and context that demonstrates the theme.

Required table:

| Surface | Route/branch | Context | Viewport | Theme evidence | States inspected | Live |
| ------- | ------------ | ------- | -------- | -------------- | ---------------- | ---- |

Include:

- participant entry and active-game surfaces
- facilitator forms and control surfaces
- shared-display waiting and active states
- loading, empty, error and disconnected states
- dialogs, sheets, menus and toasts
- results and status states
- mobile and desktop variants

A theme extraction based only on the home page is incomplete.

### Declare the observation base

The build agent cannot tell a thin extraction from a thorough one unless you say
so. Report, explicitly:

```text
Routes inspected:            {n}  — list them
Components observed rendering: {n} — list them by name
Components in the coverage checklist: {n}
Observation rate:            {observed}/{checklist} ({percentage})
States observed:             default / hover / focus / active / disabled / error / loading
Contexts observed:           participant / facilitator / shared-display
Registers observed:          {list}
```

List every checklist component you did **not** see render, by name, under
`Components not observed`. That list is a required output, not an omission.

Do not describe coverage as "high confidence" or "comprehensive" when the
observation rate is low. State the rate and let the reader judge. If a component
family was never rendered in any inspected route, say so plainly — a reader who
knows the gap can close it, a reader given a derived value cannot.

If the observation rate is below 50%, open the executive summary with an
explicit warning that the brief is partial and should not be treated as a
complete theme specification.

## 3. Extract the active token surface

Identify tokens actually consumed by live UI.

### Required token table

| Semantic role | Source token/class | Resolved value | Consumers | Existing registry equivalent | Proposed new-theme mapping | Evidence level |
| ------------- | ------------------ | -------------- | --------- | ---------------------------- | -------------------------- | -------------- |

Evidence levels:

- observed live
- observed conditional
- inferred from repeated live rule
- defined but unused
- uncertain

Group the output under:

### Page and surfaces

- background/field
- foreground
- surface subtle
- surface
- surface raised
- surface overlay

### Interactive colours

- primary
- primary hover
- primary active
- primary foreground
- secondary
- secondary hover
- secondary active
- secondary foreground
- accent
- accent foreground

### Status and communication

- information
- success
- warning
- danger/critical
- foreground pairs
- disconnected/reconnecting/degraded where separately represented

### Borders and focus

- default border
- strong border
- input border
- focus ring
- invalid focus
- disabled borders

### Muted and disabled

- muted surface
- muted foreground
- disabled foreground
- placeholder

### Geometry

- control radius
- card radius
- panel radius
- overlay radius
- pill radius
- border widths

### Dimensions and spacing

- control heights
- control horizontal padding
- panel padding
- section gaps
- content width
- context-specific widths
- safe area

### Shadows and depth

- control shadow
- card shadow
- panel depth
- overlay depth
- focus shadow
- glows

### Motion

- durations
- easing
- hover translation
- press scale
- pulses
- loading motion
- reduced-motion fallback

Do not copy source token names into the registry when an existing semantic contract role already exists.

List dead or unused token groups separately.

## 4. Extract typography comprehensively

Document every live semantic type role.

Required table:

| Role | Source class/token | Font family | Size | Line height | Weight | Tracking | Transform | Live consumers | Registry role |
| ---- | ------------------ | ----------- | ---: | ----------: | -----: | -------: | --------- | -------------- | ------------- |

Include:

- display hero
- page title
- section title
- compact headline
- body
- small body
- label/caps
- data/numeric
- mono/code
- microcopy
- button text
- input text
- table header
- tooltip text

Identify:

- font files or external font loading
- fallbacks
- context-specific scale differences
- tabular numeral usage
- uppercase conventions
- whether font names are semantic or incorrectly overloaded

The build-agent brief must instruct:

- map the theme onto existing `gs-*` typography roles
- add a shared role only when the existing contract genuinely cannot represent a live semantic role
- do not copy local utility names such as `p-*`, `d-*`, or project-specific typography classes into registry component source
- keep font loading application-owned unless the registry already has an approved font package strategy

## 5. Extract surface, elevation and decorative grammar

Document the visual rules for:

- panels
- cards
- controls
- overlays
- nested surfaces
- strong/emphasised surfaces
- borders
- corner treatments
- background blur
- gradients
- shadows
- glows
- dividers
- chips and pills

Required table:

| Treatment | Structure | Fill | Border | Radius | Shadow/glow | Decoration | Existing registry primitive/variant | Theme-only or app-owned |
| --------- | --------- | ---- | ------ | ------ | ----------- | ---------- | ----------------------------------- | ----------------------- |

Distinguish:

- semantic theme treatment
- application-specific ornamental component
- legacy fork
- rendering bug

For recurring decorations, determine whether they can be expressed through theme CSS and pseudo-elements on stable `gs-*` hooks. Do not automatically propose a new React component.

## 6. Extract primitive treatments

For every live primitive family, document:

- DOM/component source
- default state
- hover
- focus-visible
- active/pressed
- disabled
- invalid/error
- selected/checked/open
- loading
- size variants
- treatment/intent variants
- typography
- dimensions
- icons
- motion
- responsive differences

Required table:

| Primitive | Live | Source implementation | States observed | Theme styling | Local overrides | Registry hook available | Gap |
| --------- | ---- | --------------------- | --------------- | ------------- | --------------- | ----------------------- | --- |

### Declarative treatment specification

Prose descriptions of component treatment are lossy and get partially applied.
A bullet such as "square, panel surface, strong border, no shadow" invites an
implementer to apply three of the four properties, or to apply them to some
intents and not others.

Express **every** treatment as declarative rows instead. This is the form the
build agent implements from:

| Selector     | Intent / state | Property        | Value                         | Grade       |
| ------------ | -------------- | --------------- | ----------------------------- | ----------- |
| `.gs-button` | all            | `border-radius` | `var(--radius-control)`       | observed    |
| `.gs-button` | `primary`      | `background`    | `oklch(var(--surface))`       | observed    |
| `.gs-button` | `primary`      | `border-color`  | `oklch(var(--border-strong))` | observed    |
| `.gs-button` | `secondary`    | `background`    | —                             | unevidenced |

Rules:

- One row per property. Never bundle properties into a sentence.
- Enumerate **every intent and state** the component exposes, including those
  you did not observe. A missing row is ambiguous; an `unevidenced` row is not.
- Never leave an intent implicit. "Primary looks like the others" must be
  written as its own rows.

### Token/treatment conflict check

Shared components apply utility classes derived from tokens — `bg-primary`,
`text-primary-foreground`, `border`, and similar. **Declaring a token is not the
same as specifying a treatment**, and where the two disagree the component's
utility wins unless the theme explicitly overrides it.

This is the single most common source of theme infidelity: a theme declares
`--primary` because the palette contains that colour, the design never uses it
as a solid fill, and every primary button renders in it anyway.

For every colour token in the token table, add a row:

| Token       | Applied by any component as a utility? | Which                                 | Does the source design show that treatment? | Required override                                                          |
| ----------- | -------------------------------------- | ------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| `--primary` | yes                                    | `Button[intent=primary]` `bg-primary` | **no — buttons are panel-surfaced**         | `.gs-button[data-intent="primary"] { background: oklch(var(--surface)); }` |

Any row answering "no" **must** carry an explicit override in the declarative
specification above. State it as a required override, not as a note.

Cover at least the live subset of:

- Button
- Input/Textarea
- Label
- Checkbox/Radio/Switch
- Select/Slider
- Tabs/Accordion
- Badge/Alert
- Dialog/Sheet/Popover/Tooltip/Menu
- Progress/Skeleton/Spinner
- Panel/Card/Separator/Table/Empty
- Toasts

For each primitive, state whether the new theme can be implemented by:

1. existing contract tokens only
2. existing `gs-*` selector plus theme CSS
3. one minimal theme-neutral hook
4. shared component API change
5. unsupported by current registry architecture

Do not recommend a new hook when an existing selector or data attribute is sufficient.

## 7. Extract domain-component treatments

Inspect every live reusable domain component and repeated semantic composition.

Required table:

| Component | Purpose | Structure | States | Theme treatment | Existing primitives composed | App-owned content/logic | Registry implementation implication |
| --------- | ------- | --------- | ------ | --------------- | ---------------------------- | ----------------------- | ----------------------------------- |

Pay particular attention to:

- status intent mapping
- strong/emphasised panels
- sticky actions
- phase/progress surfaces
- participant identity and readiness
- outcome and result presentation
- connection states
- waiting/loading states
- room codes and data displays

Do not convert game-specific data models into theme tokens.

## 8. Extract shell and context treatments

Treat participant, facilitator and shared-display as experience contexts, not roles or permissions.

For each context, document:

### Participant

- field/background
- content width
- mobile density
- header/footer behaviour
- sticky action treatment
- safe area
- decorative layers
- control scale

### Facilitator

- information density
- content width
- grid treatment
- control hierarchy
- overlays
- tables/forms
- background restraint

### Shared display

- landscape composition
- distance-legible type scale
- non-interactive treatment
- public-room-safe contrast and privacy
- background layers
- scanlines/grid/dots/vignette
- display-specific glow or emphasis
- reduced-motion behaviour

Required table:

| Context | Root selectors | Token overrides | Background layers | Density changes | Component overrides | Privacy/interaction notes |
| ------- | -------------- | --------------- | ----------------- | --------------- | ------------------- | ------------------------- |

The build-agent brief must require one shared theme applied through:

```text
[data-theme="{new-theme}"]
[data-theme="{new-theme}"][data-context="participant"]
[data-theme="{new-theme}"][data-context="facilitator"]
[data-theme="{new-theme}"][data-context="shared-display"]
```

Do not propose separate theme files for each role unless the registry architecture already requires split files.

## 9. Extract overlays and portals

Inspect:

- dialog overlay and content
- alert dialog
- sheet
- select content
- dropdown/menu content
- popover
- tooltip
- toaster

Document:

- scrim
- surface
- border
- radius
- shadow
- blur
- typography
- z-index
- portal theme inheritance
- focus states

Confirm whether portalled content inherits root `data-theme` and `data-context`.

Flag any source implementation that relies on a local `.dark` class, body class, or route wrapper that portalled elements do not inherit.

## 10. Extract motion and reduced-motion behaviour

Required table:

| Motion | Consumer | Trigger | Duration | Easing | Property | Essential? | Reduced-motion behaviour | Theme or app-owned |
| ------ | -------- | ------- | -------: | ------ | -------- | ---------- | ------------------------ | ------------------ |

Classify motion as:

- theme feedback
- component interaction
- application choreography
- decorative ambience

The registry theme may own:

- hover/press feedback
- focus transitions
- loading indicators
- skeleton shimmer
- restrained status pulse
- context background motion when broadly appropriate

The registry theme must not absorb application-owned:

- cinematic reveals
- radar sweeps
- scoring animation
- brand-specific sequences
- narrative takeovers

Use CSS and existing motion tokens. Do not require Framer Motion solely for a theme.

## 11. Extract accessibility and contrast requirements

Document:

- text contrast by semantic role
- status colour contrast
- focus visibility
- disabled legibility
- placeholder contrast
- shared-display distance legibility
- non-colour indicators
- reduced motion
- high-density facilitator readability
- overlay focus treatment

Flag observed accessibility defects separately from intended theme design.

Do not silently “fix” source values in the extraction. State:

```text
Observed source value:
Risk:
Recommended registry-safe interpretation:
```

## 12. Audit the cascade and source ownership

Identify:

- foundation import order
- selected theme import
- Tailwind layers
- application overrides
- local `:root` token aliases
- `.dark` or other inactive scopes
- component-level inline styles
- arbitrary Tailwind colours
- duplicate token definitions
- legacy theme CSS

Required table:

| Source | Scope | Loaded order | Live effect | Theme contract | App-owned | Conflict |
| ------ | ----- | -----------: | ----------- | -------------- | --------- | -------- |

The final brief must tell the registry agent which values belong in:

- shared theme contract
- new theme CSS
- theme extension tokens
- existing component CSS
- minimal shared hook changes
- application layer

## 13. Separate intended theme from defects and application visuals

Produce three explicit lists.

### Intended theme grammar

Only repeated, coherent, live visual rules.

### Source defects or drift

Examples:

- inactive theme class causing wrong surface colours
- malformed box shadow
- competing toast systems
- duplicate panel implementations
- inconsistent semantic colour mapping
- missing focus state

### Application-owned visuals

Examples:

- branded illustration
- decorative binary stream
- radar
- charts
- maps
- vendor colours tied to game semantics
- bespoke reveal choreography

The registry build agent must not reproduce defects or absorb application-owned visuals merely because they are visible.

### Negative constraints

Produce a fourth list: treatments the theme must **not** apply.

Absence of evidence does not communicate prohibition. If the source design never
uses a solid primary fill, never rounds a corner, or never casts a shadow, the
brief must say so explicitly — otherwise the build agent will supply the
component default and believe it is faithful.

Required table:

| Constraint                 | Applies to                | Why                                            | What would violate it                   |
| -------------------------- | ------------------------- | ---------------------------------------------- | --------------------------------------- |
| No solid fills on controls | all buttons, all intents  | every control is panel-surfaced with a border  | `bg-primary` reaching a rendered button |
| No border radius           | all surfaces and controls | geometry is uniformly square                   | any non-zero `--radius-*`               |
| No drop shadows            | panels, cards, controls   | depth comes from border and surface value only | any `box-shadow` other than focus       |

Derive these from what you observed the design consistently _not_ doing across
every inspected route. State each as a hard prohibition with the specific
mechanism that would breach it, so the build agent can check its own output
against the list.

## 14. Determine registry theme implementation needs

Produce this matrix:

| Requirement | Existing registry contract/token | Existing hook/data attribute | Theme CSS sufficient | Shared change needed | Proposed action | Evidence |
| ----------- | -------------------------------- | ---------------------------- | -------------------- | -------------------- | --------------- | -------- |

Classify each shared change as:

- no change
- token value only
- theme extension token
- minimal stable `gs-*` hook
- shared contract addition
- shared component/API change
- defer for insufficient evidence

Apply this decision order:

1. Existing semantic token
2. Existing variant/treatment
3. Existing `gs-*` hook or data attribute
4. Theme-scoped CSS
5. Theme extension token
6. Minimal theme-neutral hook
7. Shared contract/API change
8. Defer

Do not add new shared contract tokens merely to preserve source token names.

## 15. Build the comprehensive theme coverage matrix

The final extraction must include a complete coverage matrix for the registry build agent.

| Registry area | Item | Source evidence | Required new-theme treatment | Existing styles reused | New token/hook | Evidence status | Verification state |
| ------------- | ---- | --------------- | ---------------------------- | ---------------------- | -------------- | --------------- | ------------------ |

Areas:

- foundations
- typography
- primitives
- overlays
- feedback
- domain components
- participant shell
- facilitator shell
- shared-display shell
- patterns/reference screens
- motion
- reduced motion
- accessibility

Use the evidence grades defined in the evidence model:

- `observed` — read from computed style on a rendered element
- `declared` — from provably applied source CSS, not seen rendered
- `unevidenced` — not seen; no value supplied; inherits contract tokens
- `app-owned` — application visual; do not theme
- `defect` — source bug; do not reproduce

There is deliberately no "derived" status. A treatment is either evidenced or it
is `unevidenced` with no value.

## 16. Screenshot and computed-style evidence

Where runtime access is available, capture or report representative computed values for:

- Button default/hover/active/disabled/strong
- Input default/hover/focus/invalid/disabled
- Panel default/raised/strong/overlay
- Badge and Alert intents
- Dialog/Sheet/Tooltip
- Progress/Skeleton/Spinner
- participant shell
- facilitator shell
- shared-display shell
- one domain component using information intent
- one using warning or danger
- one outcome/status surface

Required evidence table:

| Reference surface | Route/state | Viewport | Selector | Key computed styles | Screenshot/inspection | Confidence |
| ----------------- | ----------- | -------- | -------- | ------------------- | --------------------- | ---------- |

Do not claim pixel values when they were not measured.

## 17. Final output format

Use this exact top-level structure.

# Theme extraction: `{theme name}`

## Executive summary

- Detected theme:
- Extraction reference theme:
- Theme confidence:
- Observation rate: {observed}/{checklist} ({percentage})
- Partial-brief warning (required below 50%):
- Source architecture:
- Contexts covered:
- Files modified: none
- Registry recommendation:

## Source evidence

- Theme files:
- Token files:
- CSS entry points:
- Root provider/application:
- Live routes inspected:
- Storybook/tests inspected:

## Observation base

- Routes inspected:
- Components observed rendering:
- Components not observed:
- States observed:
- Contexts observed:
- Registers observed:

## Live theme-consumer inventory

[table]

## Active semantic token contract

[all token tables]

## Typography contract

[table]

## Surface and geometry grammar

[table]

## Primitive treatments

[table plus state details]

## Declarative treatment specification

[selector / intent-state / property / value / grade rows — one row per property,
every intent and state enumerated, unevidenced rows included with no value]

## Token/treatment conflict check

[token / applied-as-utility / which component / does the design show it /
required override — every "no" carries an explicit override above]

## Domain-component treatments

[table]

## Shell and context treatments

[table]

## Overlay and portal treatments

[details]

## Motion and reduced motion

[table]

## Accessibility and contrast

[findings]

## Cascade and ownership

[table]

## Intended theme grammar

[list]

## Source defects not to reproduce

[list]

## Application-owned visuals not to absorb

[list]

## Negative constraints

[constraint / applies-to / why / what would violate it — hard prohibitions the
build agent can check its own output against]

## Registry implementation needs

[matrix]

## Comprehensive theme coverage matrix

[matrix]

## Open questions and uncertainty

Only unresolved evidence gaps.

## Copy-ready registry build agent brief

Provide a self-contained prompt inside one fenced text block.

## 18. Requirements for the copy-ready registry build agent brief

The final prompt must include all information needed for implementation without requiring access to this extraction conversation.

It must include:

### Objective

Implement a new GameScience UI registry theme named `{theme-slug}` based on the extracted live theme.

### Architecture

- one shared React component source
- new theme applied through `data-theme="{theme-slug}"`
- no theme-specific React forks
- no theme props
- no conditional component branches by theme
- all current themes remain supported
- component markup changes only for minimal stable theme-neutral hooks

### Source evidence summary

- active source theme
- routes and contexts inspected
- confidence and limitations
- defects excluded
- application visuals excluded

### Observation base

- routes inspected, listed
- components observed rendering, listed by name
- components **not** observed, listed by name
- observation rate as `{observed}/{checklist} ({percentage})`
- states, contexts and registers observed

The build agent must be able to see the limits of the evidence without asking.

### Token implementation table

Every proposed semantic token and resolved source value, clearly classified as:

- existing contract value
- theme extension token
- new shared contract request
- compatibility alias
- deferred

### Typography implementation

- font roles and fallbacks
- scale mappings
- label/data behaviour
- app-owned font loading
- no local typography utility leakage

### Component coverage

Expressed as declarative rows — `selector | intent/state | property | value | grade` —
never as prose bullets. One row per property, every intent and state enumerated,
`unevidenced` rows carried through with no value.

For each primitive and domain component also state:

- existing style source to reuse
- new hook/token only where necessary

### Token/treatment conflict check

Every colour token, whether any component applies it as a utility class, whether
the source design actually shows that treatment, and the explicit override
required wherever it does not.

### Negative constraints

The treatments the theme must never apply, each with the mechanism that would
violate it, so the build agent can verify its own output before reporting.

### Context coverage

- participant
- facilitator
- shared-display
- shells and background layers
- density and privacy considerations

### Motion and accessibility

- theme-owned motion
- app-owned motion to exclude
- reduced-motion rules
- contrast/focus requirements

### Non-goals

Must explicitly exclude:

- source defects
- app-specific visuals
- game logic
- auth/networking
- charts and narrative choreography
- theme-specific React forks
- unrelated component redesign

### Storybook implementation and verification

Require stories or reference-screen verification across:

- new theme
- every live primitive family
- every registry domain component
- participant shell
- facilitator shell
- shared-display shell
- default/hover/focus/active/disabled/error/loading states where applicable

Use the public registry Storybook as the implementation environment and publish the new theme there.

### Stack coverage

Require:

- Tailwind 3 consumer smoke
- Tailwind 4 consumer smoke
- React 18 and React 19 where supported
- portal inheritance
- compiled utility/token checks
- no remote font dependency in builds

### Release strategy

The build agent must inspect the current registry version and choose the correct next minor release unless the repository's release policy dictates otherwise.

It must:

- preserve immutable prior releases
- add the new theme item
- update base/foundations only when the shared contract changes
- update changed registry payloads accurately
- create release manifest and migration notes
- promote unversioned latest only after validation

### Mechanical registration checklist

Registration is scaffolded. The brief must require the build agent to run the scaffold rather than editing registration sites by hand. Adding a theme is additive, so it is a minor release, not an in-place re-cut of the current lock.

1. Scaffold every registration site in one command:

   ```bash
   npm run theme:new -- {theme-slug} --title "{Theme Name}" [--registers "default,alternate"]
   ```

   This creates `src/themes/{theme-slug}.css` with all required tokens stubbed
   and grouped, adds the `@import` to `src/themes/index.css`, extends
   `SUPPORTED_THEMES`, adds the Storybook theme toolbar entry, and adds the
   `registry:theme` item to `scripts/registry-manifest.ts`.

   Theme-agnostic registry items need **no** edits — they resolve their theme
   list from `SUPPORTED_THEMES` at build time.

2. Convert the brief's hex values to the bare OKLCH channels the tokens use:

   ```bash
   npm run theme:oklch -- --token --background '#02050A' --primary '#B983FF'
   ```

   Emits paste-ready declarations with the source hex retained as a comment, so
   the stylesheet stays traceable back to this brief.

3. Author the token values and any theme-scoped `gs-*` treatment rules, working
   through the declarative treatment specification row by row. Apply every
   required override from the token/treatment conflict check.

4. Verify the token contract with `npm run theme:check`. It iterates
   `SUPPORTED_THEMES` and fails on tokens that are missing **or declared with no
   value**, so a scaffolded theme fails until values are authored.

5. Check the built theme against the negative constraints table before
   reporting completion.

6. Regenerate registry artifacts with `npm run registry:build` (writes
   `registry/**`, `public/registry/**`, and `consumer/**`).

7. Publish as a new immutable release via the `release-registry` workflow (minor bump): version bump, migration note, new `releases/{version}.lock.json` + snapshot, push. Do not re-cut an old lock or use `update-registry` for a new item.

See `docs/adding-a-theme.md` in the library repository for the canonical procedure.

### Validation

Require the repository's complete validation suite, including:

- typecheck
- lint
- format
- tests
- architecture check
- theme check
- build
- Storybook build
- registry build/validate
- versioned pages build/validate
- latest pages build/validate
- Tailwind 3 and 4 smoke
- theme-specific smoke/reference checks
- immutable release verification

### Final report

Require:

- release version
- added and changed items
- token table
- hooks or contract additions
- component coverage matrix
- context coverage
- Storybook coverage
- tests and smoke checks
- prior-release immutability
- deferred/unsupported areas

## 19. Final handoff guardrails

The copy-ready prompt must repeatedly enforce:

> Implement the extracted visual grammar through the registry's existing theme, token, variant and component architecture first.

> Do not invent new component styles where existing registry styles and semantic treatments already express the requirement.

> Do not copy application-specific class names, token names or React components into the registry unless they represent a proven shared semantic contract.

> The source application demonstrates one theme. The registry implementation must cover the entire current component catalogue under the new theme and preserve every existing theme.

> Author the stylesheet from this brief. Do not copy an existing theme stylesheet and substitute values. Read existing themes only for the token contract and available `gs-*` hooks, never for rule structure or treatment decisions.

> Implement every row of the declarative treatment specification. Where a row is graded `unevidenced`, supply no styling — leave the component on contract tokens and list it as an open gap in the final report.

> Apply every required override in the token/treatment conflict check. Declaring a token does not override a component's utility class; the override must be written explicitly.

> Before reporting completion, check the built theme against the negative constraints table and confirm each prohibition holds in the rendered output.

## 20. Completion criteria

The extraction is complete only when:

1. Active theme detection is evidence-backed.
2. Live routes across all present contexts were inspected.
3. Active and dead tokens are separated.
4. Typography is mapped semantically.
5. Primitive states are covered.
6. Domain components are covered where present.
7. Shell and context treatments are covered.
8. Overlay/portal behaviour is covered.
9. Motion and reduced motion are separated from app choreography.
10. Intended theme, defects and app-owned visuals are separated.
11. Registry reuse versus new-token/hook needs are explicit.
12. The complete registry coverage matrix is present.
13. The final copy-ready build-agent prompt is self-contained.
14. No files were modified.
15. The observation base is declared, including components not observed.
16. Every value carries an evidence grade, and no value is inferred or derived.
17. Component treatments are expressed as declarative rows, not prose.
18. The token/treatment conflict check covers every colour token, with an explicit override for each mismatch.
19. The negative constraints table is present and states what would violate each prohibition.
