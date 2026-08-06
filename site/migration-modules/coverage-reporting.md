## Coverage reporting

Treat migration as a **closed coverage ledger**, not a sequence of successful
slices. Migration reports must distinguish **five** independently measured
dimensions. Never collapse them into a single “100% coverage” claim.

### A. Source coverage

Are the correct registry-owned files installed and byte-equal to the immutable
release (including transitive theme, foundation, provider and dependency files)?

### B. Call-site coverage

Are application surfaces actually using those items correctly — without raw
controls, identity `className` overrides, inline theme styles, or obsolete
local fallbacks?

### C. Render-path coverage

Do all meaningful states and branches for a surface use the intended
implementation? File- or route-level “migrated” claims are insufficient.

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
compiled CSS with non-empty declarations. Computed styles for representative
controls must match expected dimensions and state tokens.

### E. Visual and behavioural coverage

Does the running application match registry reference states and continue to
work? Compare consumer output to registry references — a consumer-only
screenshot is not enough.

### Obligation ledger

Every in-scope UI obligation must end in exactly one disposition:

| Disposition             | Meaning                                      |
| ----------------------- | -------------------------------------------- |
| `migrated`              | Registry target adopted; A–E evidence passes |
| `retained-approved`     | Explicitly kept as application-owned         |
| `upstream-gap`          | Needs a new or extended registry item        |
| `out-of-scope-approved` | Intentionally excluded from this engagement  |

No unclassified obligations may remain when declaring full alignment complete.

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
- `Full alignment complete`

unless:

- the full obligation ledger has final dispositions
- zero unclassified obligations remain
- migrated obligations pass A–E
- payload integrity and token contract pass
- an independent coverage audit reconciles ledger, repository and runtime

When only entry surfaces (join / lobby / shared-display lobby) were migrated,
say so explicitly and keep whole-application coverage marked incomplete.

Build/test green is never sufficient evidence of coverage completeness.
