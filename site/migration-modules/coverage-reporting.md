## Coverage reporting

Treat migration as a **closed coverage ledger**, not a sequence of successful
slices. Migration reports must distinguish **five** independently measured
dimensions. Never collapse them into a single “100% coverage” claim.

### A. Source coverage

Are the correct registry-owned files installed and byte-equal to the immutable
release (including transitive theme, foundation, provider and dependency files)?

### B. Call-site coverage

Are application surfaces actually using those items correctly — without raw
controls, semantic wrappers that disguise raw controls, identity `className`
overrides, inline theme styles, or obsolete local fallbacks?

### C. Render-path coverage

Do all meaningful states and branches for a surface use the intended
implementation? File- or route-level “migrated” claims are insufficient.
Join branches to a state-interaction matrix (default / hover / focus / active /
disabled / loading / error) for interactive controls.

Example:

```text
Game.tsx:
- loading: retained-approved
- discussion: migrated
- voting: migrated
- outcome: migrated
- disconnected: retained-approved
- unknown-phase fallback: removed
```

### D. Theme-contract coverage

Does the consumer build resolve the registry styling contract? Required CSS
variables and Tailwind utilities must exist in config/bridge **and** appear in
compiled CSS with non-empty declarations. Parse declarations (not string search
alone). Verify CSS import/cascade order so exactly one selected theme wins.
Computed styles for representative controls must match expected dimensions and
state tokens.

### E. Visual and behavioural coverage

Does the running application match **matching** Storybook reference states and
continue to work? Compare consumer output to
`https://game-science-uk.github.io/gamescience-ui-library/storybook/` with the
same theme, context, variant and state. Distinguish component-contract checks
(height, border, radius, intent, focus, state) from composition checks
(spacing, shell, viewport, visual loss). A consumer page must not be expected
to pixel-match a component story as a whole. A consumer-only screenshot is not
enough.

### Evidence references

A–E status must reference concrete proof (files, hashes, consumers, Storybook
story ids, screenshot paths, computed-style fixtures). Bare booleans are
insufficient for full-alignment completion. Prefer storing artefacts under
`docs/gamescience-ui/evidence/`.

### Obligation ledger

Every in-scope UI obligation must end in exactly one disposition:

| Disposition             | Meaning                                      |
| ----------------------- | -------------------------------------------- |
| `migrated`              | Registry target adopted; A–E evidence passes |
| `retained-approved`     | Explicitly kept as application-owned         |
| `upstream-gap`          | Needs a new or extended registry item        |
| `out-of-scope-approved` | Intentionally excluded from this engagement  |

No unclassified obligations may remain when declaring full alignment complete.

### Discovery reconciliation

Before full alignment, reconcile discovered in-scope UI with the ledger:

| Discovery category  | Discovered | Ledgered | Difference |
| ------------------- | ---------: | -------: | ---------: |
| Routes              |            |          |            |
| Render branches     |            |          |            |
| Local UI components |            |          |            |
| Raw controls        |            |          |            |
| Semantic wrappers   |            |          |            |
| Registry imports    |            |          |            |
| Identity overrides  |            |          |            |

Full alignment requires zero unexplained difference.

### Legacy surface language (still useful)

When summarising for humans, you may still group obligations as:

| Surface                     | Status              |
| --------------------------- | ------------------- |
| Participant join            | migrated            |
| Facilitator host lobby      | migrated            |
| Shared-display waiting room | migrated            |
| Participant non-host lobby  | open / not migrated |

But the ledger and A–E evidence are authoritative.

### Forbidden wording

Do **not** write:

- `Primitives: 100% registry-owned`
- `Full application migrated`
- `Complete registry coverage`

unless discovery reconciliation is clean, all in-scope obligations have final
dispositions, migrated obligations pass A–E with evidence references, and an
independent coverage audit agrees.
