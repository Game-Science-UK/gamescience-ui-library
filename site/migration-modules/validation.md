## Phase 5: Validation

Treat build/test green as necessary but not sufficient. A slice passes only when
applicable coverage dimensions A–E pass for its obligations.

Require:

- typecheck, lint, production build
- tests where configured
- responsive checks for selected contexts
- keyboard navigation and visible focus
- long content, disconnected/loading/error states
- no raw **component-identity** theme styles in migrated screens
- no local primitive forks or semantic wrappers for migrated surfaces
- no registry file modifications unless explicitly approved
- no application-owned file overwritten without plan
- root provider context verified for every migrated branch (mixed-context table)
- `gamescience-ui-state.json` reconciled with Markdown installed-item inventory
- obligation ledger updated with dispositions and A–E **evidence references**
- discovery reconciliation updated
- coverage language uses dimensions A–E (no false “100% primitives” claims)
- visual-loss decisions recorded when patterns replaced local compositions
- retained-approved visuals on touched routes regression-checked

### A. Payload integrity

Never trust the release manifest alone. Byte/hash-compare installed files and
transitive dependencies (theme CSS, foundations, providers, shared utils). Fail
on unexplained upstream-managed drift.

### B. Call-site purity

Scan migrated surfaces for disallowed identity overrides:

- `style={{ ... }}` theme identity
- raw / arbitrary colours on chrome
- raw `<button>`, `<input>`, `<select>`, `<textarea>`
- semantic wrappers that return a single raw control or re-skin registry
  primitives (`PrimaryAction`, `statusBtn()`, local CVA forks)
- registry `className` overrides for height, colour, border, radius, shadow,
  typography, hover/active/disabled/focus

Allowed: layout, positioning, responsive placement, documented sanctioned
exceptions, game-specific graphics, charts/maps/canvas visualisation.

### C. Render-path coverage

Reconcile every branch in the render-path inventory for the slice. Complete a
state-interaction matrix for interactive controls. Primary-path / default-only
migration is incomplete.

### D. Theme-contract coverage

Prove required utilities and CSS variables resolve:

1. present in Tailwind config or Tailwind 4 bridge
2. emitted in production CSS with non-empty declarations (parse the rule)
3. CSS variables referenced by those rules exist
4. CSS import/cascade order leaves exactly one selected theme winning
5. representative computed styles match expected control sizes and state tokens

### E. Reference-vs-consumer visuals

Use Storybook as the rendered reference:
`https://game-science-uk.github.io/gamescience-ui-library/storybook/`

For each migrated item: locate story → matching theme → context → variant →
state → compare to consumer. Record story / theme / context / variant /
consumer route / consumer state. Distinguish component-contract vs composition
comparison. Consumer-only screenshots are not sufficient.

Store artefacts under `docs/gamescience-ui/evidence/` when practical.

### Post-install dependency sanity

After major registry installs/syncs: inspect `npm ls react react-dom` (and Radix
where relevant), confirm one React instance, restart the dev server, clear Vite
cache only when the module graph changed materially, and reload a minimal route
before visual gates.

### Independent audit

For full visual alignment, execute the shared validation doctrine used by
`validate-gamescience-ui` in coverage-reconstruction mode (invoke that skill
where supported): rediscover surfaces, branches, raw controls/wrappers, token
contract, CSS order and payload drift from repository/runtime state, then
reconcile against the obligation ledger without trusting prior “done”
classifications or bare A–E booleans.
