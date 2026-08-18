---
name: extract-selected-component
description: Use when extracting one explicitly selected component, pattern, shell, template, or recurring UI composition from an existing Lovable or React application so the result can be copied directly to the GameScience registry build agent. Produces a read-only, evidence-backed implementation brief covering structure, layout context, styles, states, variants, behaviour, accessibility, ownership, reuse of existing registry styles, and cross-theme requirements. Not for modifying the application or implementing the registry item.
skillUpdated: 2026-08-18
libraryVersion: 1.3.0
distribution: lovable-workspace
---

# Extract Selected Component

`skillUpdated: 2026-08-18` · `libraryVersion: 1.3.0`. Report both values in the final output so the running copy can be identified.

Perform a comprehensive, read-only extraction of the user-selected UI component or composition.

The output must be suitable for direct handoff to the GameScience registry build agent.

Do not modify files.

Do not implement the component.

Do not redesign it.

Do not infer unsupported APIs or styles.

## Selection

Determine the selected target from the user's request.

The target may be:

- a named component
- a file
- a screen region
- a recurring visual treatment
- a pattern spanning several files
- a local fork
- an unnamed composition shown in a screenshot or route

If the target name is ambiguous, inspect the repository first and resolve likely candidates from imports, routes and visible usage. Ask only when multiple materially different live components share the same name.

## Theme rule

Detect the current active theme from project evidence.

Possible outcomes:

- `gamescience`
- `citadel`
- another explicit local theme
- no theme detected
- ambiguous theme

If no theme is present, record:

```text
Detected theme: none
Extraction reference theme: gamescience
```

The final handoff must state clearly:

> The registry build agent must implement the approved component across all supported registry themes, regardless of the source application's active theme.

Do not recommend a theme-specific React fork.

## Evidence rules

Use only evidence from:

- live imports and consumers
- rendered routes and branches
- component source
- active CSS and tokens
- tests and stories
- runtime states where available

Separate live behaviour from:

- defined but unused variants
- dead code
- speculative behaviour
- inferred cross-project reuse

When evidence is incomplete, say so.

## 1. Detect project and target configuration

Report:

```text
Project:
Selected target:
Target files:
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

## 2. Confirm live reachability

Identify:

- every live consumer
- route and render branch
- context
- viewport
- conditional states
- alternate implementations
- dead copies

Required table:

| Consumer | Route/branch | Context | Live | Notes |
| -------- | ------------ | ------- | ---- | ----- |

Do not extract only the definition file if call sites materially alter structure or styling.

## 3. Extract the component using this exact format

# Selected component extraction: `{name}`

## Evidence

- Definition file:
- Supporting files:
- Live consumers:
- Routes/branches:
- Contexts:
- Theme observed:
- Reachability:
- Alternate implementations:

## Purpose

Explain the job the component performs and why it exists.

## Classification

Choose one:

- primitive
- domain component
- pattern
- shell/template
- application-owned visual
- registry-equivalent local fork
- utility/wrapper
- recurring unnamed composition

## Structural composition

Provide an ordered tree.

Example:

```text
root surface
→ header
  → eyebrow
  → title
  → trailing status
→ content
  → primary block
  → secondary block
→ footer
  → status
  → action
```

For every child, identify:

- current component/file
- registry-owned or local
- semantic responsibility
- whether it should remain application-owned

## Layout context

Document comprehensively:

- parent shell/template
- width and max-width
- grid/flex structure
- alignment
- spacing ownership
- responsive rules
- sticky/fixed behaviour
- safe-area behaviour
- overflow
- z-index
- neighbouring surfaces
- portal context
- mobile/desktop differences
- participant/facilitator/shared-display differences

## Inputs and ownership

List current inputs under:

### Content

### Controlled state

### Internal state

### Derived state

### Callbacks

### Application-owned logic

Explicitly identify logic that must not enter the registry.

## States

Document all actual states.

Required table:

| State | Trigger/input | Structural change | Style change | Behaviour | Accessibility |
| ----- | ------------- | ----------------- | ------------ | --------- | ------------- |

Include where relevant:

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
- paused
- reconnecting
- expired
- expanded/collapsed
- before/after action
- mobile/desktop
- context variants

## Variants and treatments

List actual live variants.

Separate:

- live variants
- defined but unused variants
- duplicated variants in other files
- variants that should remain application-owned

## Style extraction

### Typography

| Element | Current class/token | Resolved role | Existing registry role | New role required? |
| ------- | ------------------- | ------------- | ---------------------- | ------------------ |

### Colour and intent

| Element/state | Current value/token | Semantic meaning | Existing registry token/intent | New token required? |
| ------------- | ------------------- | ---------------- | ------------------------------ | ------------------- |

### Surface and geometry

Document:

- background/surface
- border
- radius
- shadow/glow
- backdrop
- separator
- corner treatment
- width/height
- padding/gap
- icon dimensions
- focus ring
- disabled treatment

### Motion

Document:

- transitions
- keyframes
- durations
- easing
- reduced-motion behaviour

Separate component-semantic motion from application choreography.

## Existing registry style reuse

Produce this required table:

| Visual requirement | Existing registry source | Reuse method | New source required? | Justification |
| ------------------ | ------------------------ | ------------ | -------------------- | ------------- |

Possible existing sources include:

- Panel
- Button
- Badge
- Alert
- Progress
- Separator
- Dialog
- Shells
- semantic intents
- `gs-*` typography
- theme CSS hooks
- existing motion utilities
- existing safe-area/content-width tokens

The default answer should be `New source required? no` unless evidence proves the current registry cannot express the requirement.

Do not invent new styles merely to reproduce local code when the registry already has an equivalent semantic treatment.

## Call-site overrides

Inspect every live consumer for:

- inline styles
- arbitrary Tailwind values
- raw hex/rgb/hsl
- border/radius/shadow overrides
- typography overrides
- state overrides
- raw HTML controls
- wrapper components

Classify each:

- layout-only acceptable
- application-specific acceptable
- migration debt
- upstream registry gap
- uncertain

## Accessibility contract

Document:

- semantic root
- role
- accessible name
- description
- live region
- keyboard interaction
- focus management
- disabled/loading semantics
- colour-independent communication
- reduced motion
- privacy constraints

## Cross-theme implementation requirement

Always include:

> Source theme observed: `{theme}`. If no theme was detected, Gamescience was used as the extraction reference. The registry implementation must remain theme-neutral and render coherently under every supported registry theme. Shared React source must not contain source-theme-specific values, branches, props, or component names.

Then specify:

### Gamescience treatment

Describe only how existing Gamescience primitives/tokens should naturally render the component. Do not invent a parallel Gamescience design language.

### Citadel treatment

Describe only how existing Citadel primitives/tokens/hooks should naturally render the component. Do not add a Citadel React fork.

### Other themes

State that future themes must be able to map the same semantic contract without source changes.

## Application ownership boundary

List what remains local, such as:

- networking
- persistence
- auth
- scoring
- phase logic
- timer calculation
- result taxonomy
- charts
- game copy
- visual choreography
- branded graphics
- private-data rules

## Registry decision

Choose one:

- use existing registry item
- compose existing registry items locally
- extend an existing registry item
- add new primitive
- add new domain component
- add new pattern
- retain application-owned
- delete obsolete fork
- insufficient evidence

Explain why.

## Proposed registry API

Only provide when supported by evidence.

Requirements:

- theme-neutral
- semantic props
- slots for application-owned content
- controlled state where appropriate
- no business logic
- no colour props unless the registry already sanctions semantic CSS-variable overrides
- no source-app taxonomy
- no vendor-specific names

Include:

```ts
// Proposed interface
```

Then explain each prop.

## Proposed registry composition

Show how the implementation should compose existing registry items.

Example:

```tsx
<Panel>
  <Badge />
  <Progress />
  <ButtonGroup />
</Panel>
```

Do not provide full implementation code unless the user explicitly requests it.

## Storybook requirements

Specify stories for:

- both Gamescience and Citadel
- every live state
- long content
- small/mobile width
- relevant contexts
- reduced motion
- accessibility states
- consumer-like composition where useful

Use the public registry Storybook as a reference when available:

```text
https://game-science-uk.github.io/gamescience-ui-library/storybook/
```

Registry payloads remain authoritative for source; Storybook is the rendered reference.

## Tests

Specify:

- render
- props/variants
- controlled state
- accessibility
- keyboard
- reduced motion
- slots
- context/theme propagation
- Tailwind 3
- Tailwind 4
- React versions supported by the registry
- clean install dependency closure

## Risks and unresolved questions

List:

- conflicting implementations
- missing states
- insufficient cross-project evidence
- privacy questions
- destructive migration implications
- possible upstream API conflicts

## 4. Compare duplicate and adjacent implementations

Search for components or compositions performing the same responsibility.

Required table:

| Related implementation | Shared responsibility | Structural overlap | Style overlap | Difference | Consolidation recommendation |
| ---------------------- | --------------------- | ------------------ | ------------- | ---------- | ---------------------------- |

This step is mandatory even when the user selected one file.

## 5. Produce a copy-ready build-agent brief

End with a section titled exactly:

# Copy-ready registry build agent brief

It must be self-contained and directly copyable.

Include:

## Objective

## Source evidence

## Current theme and cross-theme rule

Include exactly:

> The source application currently uses `{detected theme}`. If no theme was detected, Gamescience was used as the extraction reference. Implement the approved registry item theme-neutrally and provide coherent styling under all supported registry themes. Do not create source-theme-specific React components or copy raw source-theme values into shared component code.

## Component purpose

## Classification

## Composition

## Existing primitives to compose

## Layout contract

## Public API

## State and variant matrix

## Style-source mapping

For every visual property, identify the existing registry source first.

## New tokens/hooks

List only genuinely required additions, with justification.

If none are required, state:

```text
New tokens required: none
New hooks required: none
```

## Accessibility

## Application ownership boundary

## Storybook

## Tests

## Tailwind and React compatibility

## Migration implications

## Deferred or excluded details

## Validation

Require:

- typecheck
- lint
- tests
- build
- Storybook build
- registry build and validation
- both themes
- Tailwind 3 and Tailwind 4
- supported React versions
- accessibility
- immutable release safety

## Final report format

Require:

- item added or changed
- public API
- primitives/tokens reused
- new tokens/hooks with rationale
- cross-theme result
- Storybook coverage
- tests
- release metadata
- deferred details
- historical release safety

## 6. Final extraction summary

Before the copy-ready brief, report:

### Selected target

### Live consumers

### Registry decision

### Existing registry styles reused

### New registry work required

### Application-owned details retained

### Evidence gaps

### Files modified

Always end with:

```text
Files modified: none
```
