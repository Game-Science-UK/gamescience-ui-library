---
name: extract-all-components
description: Use when comprehensively extracting every meaningful visible component, pattern, shell, template, and recurring UI composition from an existing Lovable or React application so the result can be copied directly to the GameScience registry build agent. Produces a read-only, evidence-backed implementation brief covering structure, layout context, styles, states, variants, behaviour, accessibility, ownership, reuse candidates, and theme evidence. Not for modifying the application, migrating it, or implementing registry items.
skillUpdated: 2026-08-18
libraryVersion: 1.3.0
distribution: lovable-workspace
---

# Extract All Components

`skillUpdated: 2026-08-18` · `libraryVersion: 1.3.0`. Report both values in the final output so the running copy can be identified.

Perform a comprehensive, read-only extraction of all meaningful visible UI in the current project.

The output must be suitable for direct handoff to the GameScience registry build agent.

Do not modify files.

Do not implement components.

Do not redesign the application.

Do not infer styles or APIs that are not supported by the live code.

## Purpose

Identify and document:

- reusable primitives
- reusable domain components
- recurring patterns
- shells and templates
- screen-level compositions
- application-owned visuals
- obsolete forks and dead UI
- theme tokens and typography roles
- component states and variants
- context-specific behaviour
- candidate registry gaps

The result must explain not only what each component looks like, but what work it performs in the interface and how it is composed.

## Theme rule

Detect the current active theme from project evidence.

Possible outcomes:

- `gamescience`
- `citadel`
- `sentinel`
- another explicit local theme
- no theme detected
- ambiguous theme

If no theme is present, record:

```text
Detected theme: none
Extraction reference theme: gamescience
```

Use Gamescience as the default interpretation baseline only for describing the current project when no theme exists.

The final handoff must state clearly:

> The registry build agent must implement every approved component across all supported registry themes, regardless of the source application's active theme.

Do not recommend a theme-specific React fork.

## Evidence model

Use only evidence from:

- rendered routes and branches
- imported component trees
- live CSS and token usage
- component props and state logic
- Storybook stories inside the project, if present
- tests that document behaviour
- application runtime where available

Do not treat unused files as live components.

Separate:

- live and reachable
- conditionally reachable
- imported but unreachable
- dead/unreferenced
- unknown

When uncertain, say so.

## 1. Detect project configuration

Identify:

- framework and router
- React version
- Tailwind version
- shadcn or other UI foundation
- GameScience registry pin, if present
- active theme
- root provider
- contexts in use: participant, facilitator, shared-display
- font loading
- CSS entry points
- global token files
- Storybook availability
- build and validation commands

Report:

```text
Project:
Framework:
Router:
React:
Tailwind:
UI base:
Registry version:
Theme detected:
Extraction reference theme:
Contexts:
Storybook:
Files modified: none
```

## 2. Build a live render inventory

Inventory all meaningful rendered UI by:

- route
- branch/state
- context
- viewport mode
- role-dependent composition
- loading/error/disconnected/empty states
- modal/overlay states
- fallback paths

Do not classify an entire file as one surface if it contains multiple branches.

Example:

```text
Game.tsx
- loading
- discussion
- private vote
- final vote
- results
- disconnected
- facilitator fallback
```

## 3. Build the complete component inventory

Classify every live component into one of:

- primitive
- domain component
- pattern
- shell/template
- application-owned visual
- utility/wrapper
- registry-equivalent local fork
- dead/unreferenced
- uncertain

Required table:

| Component | File | Live consumers | Context | Classification | Registry equivalent | Ownership |
| --------- | ---- | -------------- | ------- | -------------- | ------------------- | --------- |

Ownership values:

- registry-owned
- application-owned
- likely reusable
- obsolete fork
- uncertain

## 4. Extract the shared visual contract

Before documenting individual components, extract the visual system actually used by live UI.

Document:

### Theme tokens

| Semantic role | Current token/class | Resolved value | Existing registry equivalent | Notes |
| ------------- | ------------------- | -------------- | ---------------------------- | ----- |

Include only live tokens.

Separate dead or unused token groups.

### Typography

Document:

- display roles
- title roles
- body roles
- label roles
- data/mono roles
- microcopy roles
- font families
- sizes
- weights
- line heights
- letter spacing
- transforms

Map each to existing `gs-*` roles where possible.

Do not recommend copying application-specific typography utility names into the registry.

### Surface and geometry

Document:

- page field
- panel/card surfaces
- borders
- radii
- shadows/glows
- separators
- corner treatments
- overlay scrims
- backdrop blur
- spacing rhythm
- content widths
- sticky/fixed regions
- safe-area handling

### Motion

Document live transitions and keyframes, including reduced-motion behaviour.

Separate:

- semantic component motion
- application choreography
- decorative visual motion

## 5. Extract every live component comprehensively

For each component, use the exact template below.

---

## Component: `{name}`

### Evidence

- File:
- Live consumers:
- Routes/branches:
- Contexts:
- Theme observed:
- Reachability:

### Purpose

Explain the job this component performs in the interface.

### Classification

One of:

- primitive
- domain component
- pattern
- shell/template
- application-owned visual
- registry-equivalent fork
- utility/wrapper

### Composition

Describe the structural tree in order.

Example:

```text
Panel
→ header
  → eyebrow
  → title
  → trailing status
→ body
  → instruction
  → options
→ footer
  → status
  → primary action
```

List constituent components and whether each is:

- registry-owned
- local reusable
- application-specific
- raw HTML

### Layout context

Document:

- parent shell or surface
- width constraints
- grid/flex structure
- alignment
- responsive behaviour
- sticky/fixed positioning
- safe-area handling
- spacing ownership
- neighbouring elements
- portal/overlay context

### Public inputs and state

Extract current props, derived values and state axes.

Separate:

- content props
- controlled state
- internal state
- application-owned logic
- callback outputs

### States

Document every meaningful state:

- default
- hover
- focus
- active
- selected
- disabled
- loading
- empty
- error
- warning
- success
- reconnecting
- expired
- expanded/collapsed
- mobile/desktop
- participant/facilitator/shared-display

Use a table where relevant:

| State | Structure change | Style change | Behaviour | Accessibility |
| ----- | ---------------- | ------------ | --------- | ------------- |

### Variants and treatments

Document actual live variants only.

Mark defined-but-unused variants separately.

### Style contract

Extract:

- typography classes/roles
- semantic colours
- surfaces
- border treatment
- radius
- shadow/glow
- icon size
- spacing
- dimensions
- focus treatment
- disabled treatment
- motion

Map each visual requirement to:

| Requirement | Current implementation | Existing registry source | New style required? |
| ----------- | ---------------------- | ------------------------ | ------------------- |

Do not propose a new style when an existing registry token, primitive, variant, or theme treatment can express it.

### Accessibility

Document:

- semantic element
- ARIA role
- live region behaviour
- accessible name
- keyboard interaction
- focus management
- colour-independent communication
- reduced motion
- privacy concerns

### Application ownership boundary

Explicitly list what must remain outside the registry:

- networking
- auth
- state machines
- scoring
- timers
- analytics
- route logic
- game copy
- private data rules
- visual choreography
- branded graphics

### Registry recommendation

Classify as one of:

- existing registry target
- existing registry composition
- new primitive candidate
- new domain component candidate
- new pattern candidate
- application-owned retain
- obsolete fork/delete candidate
- insufficient evidence

### Proposed registry API

Only provide an API when evidence supports one.

Use theme-neutral props and slots.

Do not include:

- theme props
- colour props
- game-specific outcome keys
- vendor-specific names
- business logic

### Cross-theme implementation note

Always include:

> Source theme observed: `{theme}`. The registry implementation must remain theme-neutral and receive coherent treatments under every supported registry theme. Do not copy source-theme values into shared React code.

### Risks and unresolved questions

List any uncertainty, conflicting implementations, or visual behaviour that requires another project for confirmation.

---

Repeat for every live component and pattern.

## 6. Extract recurring unnamed compositions

Identify repeated screen-level structures that are not yet components.

Examples:

- phase header
- role summary
- sticky CTA
- connection banner
- outcome hero
- vote status
- attention redirect
- selectable tile
- results summary

For each:

- list all occurrences
- compare structural similarity
- compare style similarity
- identify divergent application logic
- recommend component, pattern, or retain-local

Required table:

| Candidate | Occurrences | Shared structure | Divergence | Recommended layer | Confidence |
| --------- | ----------: | ---------------- | ---------- | ----------------- | ---------- |

## 7. Identify call-site styling overrides

For every registry component already in use, inspect call sites for:

- inline styles
- raw colour values
- arbitrary Tailwind values
- local typography identity
- local border/radius/shadow overrides
- hover/active/focus overrides
- wrapper components that recreate identity

Classify each override:

- layout-only and acceptable
- application visual and acceptable
- migration debt
- upstream registry gap
- uncertain

Do not assume a registry import means the component is visually aligned.

## 8. Identify dead and obsolete UI

List:

- unreferenced components
- unreachable variants
- duplicate implementations
- legacy forks
- obsolete CSS
- unused tokens
- abandoned toast systems
- unused default Lovable inventory

Do not recommend deletion without confirming static, dynamic, test, story and barrel references.

## 9. Produce the registry candidate backlog

Group findings by maturity.

### Ready to implement

Evidence supports a stable reusable contract.

### Ready for API design only

Likely reusable, but requires another project or local refactor before publication.

### Existing registry target

No upstream item required; migrate the application.

### Application-owned

Should remain local.

### Dead/obsolete

Safe cleanup candidate after reference verification.

Required table:

| Candidate | Layer | Evidence | Existing registry composition | New API needed | Source theme | Cross-theme requirement | Decision |
| --------- | ----- | -------- | ----------------------------- | -------------- | ------------ | ----------------------- | -------- |

## 10. Produce a registry-build-agent handoff

End with a self-contained section titled exactly:

# Copy-ready registry build agent brief

This section must be directly copyable.

It must contain:

## Objective

What coverage should be added and why.

## Source evidence

- source project
- current theme
- reference theme if none was detected
- contexts
- live consumers

## Non-negotiable cross-theme rule

Include exactly:

> The source application currently uses `{detected theme}`. If no theme was detected, Gamescience was used as the extraction reference. Implement every approved registry item theme-neutrally and provide coherent styling under all supported registry themes. Do not create source-theme-specific React components or copy raw source-theme values into shared component code.

## Approved items

For each approved item include:

- purpose
- classification
- composition
- constituent registry primitives
- layout context
- props/state axes
- states/variants
- style-source mapping
- accessibility
- ownership boundary
- Storybook requirements
- tests
- Tailwind 3 and Tailwind 4 requirements

## Existing styles to reuse

Explicitly list:

- primitives
- variants
- semantic tokens
- typography roles
- theme hooks
- motion utilities

## Styles not to duplicate

Explicitly list source-app styles that must not enter shared React code.

## Deferred items

List insufficiently evidenced or application-owned candidates.

## Validation

Require:

- typecheck
- lint
- tests
- build
- Storybook
- registry build/validate
- both themes
- Tailwind 3 and Tailwind 4
- React versions supported by the registry
- accessibility
- immutable release safety

## Final report format

Require the build agent to report:

- added items
- changed items
- reused primitives/tokens
- new tokens/hooks with justification
- cross-theme results
- Storybook coverage
- tests
- deferred candidates
- release safety

## 11. Final extraction report

Before the copy-ready brief, provide:

### Configuration

### Live inventory summary

### Shared visual contract

### Component extraction index

### Registry candidate summary

### Dead/obsolete inventory

### Unresolved evidence gaps

### Files modified

Always end with:

```text
Files modified: none
```
