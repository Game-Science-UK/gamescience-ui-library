## Phase 5: Validation

Treat build/test green as necessary but not sufficient. A slice passes only when
applicable coverage dimensions A–E pass for its obligations.

Require:

- typecheck, lint, production build
- tests where configured
- responsive checks for selected contexts
- keyboard navigation and visible focus
- long content, disconnected/loading/error states
- no raw theme styles in migrated screens
- no local primitive forks for migrated surfaces
- no registry file modifications unless explicitly approved
- no application-owned file overwritten without plan
- root provider context verified for every migrated branch (mixed-context table)
- `gamescience-ui-state.json` reconciled with Markdown installed-item inventory
- obligation ledger updated with dispositions and A–E evidence
- coverage language uses dimensions A–E (no false “100% primitives” claims)
- visual-loss decisions recorded when patterns replaced local compositions

### A. Payload integrity

Never trust the release manifest alone. Byte/hash-compare installed files and
transitive dependencies (theme CSS, foundations, providers, shared utils). Fail
on unexplained upstream-managed drift.

### B. Call-site purity

Scan migrated surfaces for disallowed identity overrides:

- `style={{ ... }}` theme identity
- raw / arbitrary colours
- raw `<button>`, `<input>`, `<select>`, `<textarea>`
- registry `className` overrides for height, colour, border, radius, shadow,
  typography, hover/active/disabled/focus

Allowed: layout, positioning, responsive placement, documented sanctioned
exceptions, game-specific graphics.

### C. Render-path coverage

Reconcile every branch in the render-path inventory for the slice. Primary-path
migration alone is incomplete.

### D. Theme-contract coverage

Prove required utilities and CSS variables resolve:

1. present in Tailwind config or Tailwind 4 bridge
2. emitted in production CSS with non-empty declarations
3. representative computed styles match expected control sizes and state tokens

### E. Reference-vs-consumer visuals

Compare registry reference states to consumer implementation states. Consumer-only
screenshots are not sufficient. Fail on dimension mismatches (for example Input
44px vs 24px, Button lg 64px vs 21px).

### Independent audit

For full visual alignment, run `validate-gamescience-ui` in
coverage-reconstruction mode after planned slices: rediscover surfaces, branches,
raw controls, token contract and payload drift from repository/runtime state,
then reconcile against the obligation ledger without trusting prior “done”
classifications.
