# Migration notes

Guidance for teams moving existing Lovable GameScience projects onto this library.

## Notifications

- **Sonner replaces legacy toast**
- Remove `toast.tsx`, `toaster.tsx`, and `use-toast.ts`
- Use the approved `Toaster` + `toast` exports from this library

## Theme-specific primitive forks

Remove or stop extending:

- `TechButton`, `TechInput`, `TechPanel`
- `CitadelButton` and similar theme-named forks
- `GlassCard` as a default core primitive

Replace with:

- `Button`, `Input`, `Panel`
- root theme selection via `GameScienceProvider`

Glass-like surfaces in Citadel are handled through theme tokens and `Panel elevation="raised"`.

## Background components

`BackgroundDisplay`, `BackgroundPlayer`, and client-named backgrounds such as `BackgroundKpmg` should become:

- theme assets, or
- shell decoration, or
- application-specific backgrounds

Do not place them in core `ui`.

## Identity and scanner features

- `ConnectionStatus` has a canonical shared implementation
- `IdentityBadge` should only become shared if a stable cross-game contract exists
- `PlayerAvatarScanner` remains bespoke / application-owned for now

## Bento layouts

Do not preserve `BentoCard` automatically. Introduce grid primitives only when a real reference screen requires them.

## components/ui hygiene

- Custom files should not be placed in `components/ui` unless they are approved core components
- Bespoke game components remain application-owned outside the approved catalogue
- Do not copy an entire project’s shadcn catalogue into this library

## 0.2.0 → 0.2.1 (compatibility / packaging)

Bug-fix packaging patch. No new UI APIs.

1. **Pin** the registry to `versions/0.2.1` (or reinstall from the updated unversioned latest after publish).
2. **Diff then reinstall** affected items (`base`, themes, patterns you use) with `--diff` / `--overwrite` per [registry-update-policy.md](./registry-update-policy.md).
3. **Remove** any local Citadel patch that stripped Google Fonts `@import` — remote font imports are gone upstream.
4. **Load fonts** at the application layer (`<link>` or `@fontsource`). See [font-loading.md](./font-loading.md).
5. **Foundations** `index.css` is framework-neutral (no `@tailwind`). Own Tailwind 3 directives or the Tailwind 4 bridge in app CSS.
6. **Tailwind 4**: replace any circular `--x: var(--x)` `@theme` bridge with the approved mapping in [tailwind-v4-integration.md](./tailwind-v4-integration.md) / `consumer/tailwind-v4-bridge.css`.
7. Confirm installed `src/docs/gamescience-ui-guidance.md` and `src/lib/version.ts` both report `0.2.1`.
8. Smoke participant / facilitator / shared-display for Gamescience and Citadel as applicable.

## 0.2.1 → 0.3.0 (primitive layer)

0.3.0 expands the registry with the complete standard shadcn primitive layer
(forms, overlays, menus, disclosure, data display, layout helpers, feedback).

1. **Pin** the registry to `versions/0.3.0`.
2. **Diff** before overwrite. Create a rollback point.
3. Existing projects do **not** need to install every primitive.
4. Map local shadcn primitives (Dialog, Select, Card, Table, etc.) to canonical
   `@gamescience/*` items when you touch those screens.
5. Install new primitives only when needed; keep dependency installs explicit.
6. High-level game patterns remain a separate discovery process — see
   [registry-coverage-backlog.md](./registry-coverage-backlog.md).
7. Application-specific visuals and mechanics remain local.
8. Use `--diff` / `--overwrite` only for reviewed upstream-managed files
   (including dependency files that may be rewritten).
9. Confirm `src/lib/version.ts` and guidance report `0.3.0`.
10. See [primitive-layer.md](./primitive-layer.md).

## 0.5.4 → 1.0.0 (OKLCH colour contract)

See the dedicated note: [migrations/0.5.4-to-1.0.0.md](./migrations/0.5.4-to-1.0.0.md).

Major: colour tokens are OKLCH channels; replace `hsl(var(--token))` with
`oklch(var(--token))`, reinstall `base` + themes (+ `button`). GameScience
background is white; secondary Button has no drop shadow.

## 1.0.0 → 1.1.0 (Game-agnostic pattern suite)

See the dedicated note: [migrations/1.0.0-to-1.1.0.md](./migrations/1.0.0-to-1.1.0.md).

Minor: nine game-agnostic patterns (`decision`, `timed-round`, `briefing`,
`scripted-reveal`, `results`, `debrief`, `facilitator-console`,
`shared-display-game`, `attention-takeover`) and four domain components
(`option-selector`, `intensity-selector`, `stat`, `rating`). Additive only.

## 1.1.0 → 1.1.1 (Consumer guidance enumerates all patterns)

See the dedicated note: [migrations/1.1.0-to-1.1.1.md](./migrations/1.1.0-to-1.1.1.md).

Patch: `base` guidance now names the full pattern suite. Reinstall `base` only.

## 1.1.1 → 1.2.0 (Create-session pattern)

See the dedicated note: [migrations/1.1.1-to-1.2.0.md](./migrations/1.1.1-to-1.2.0.md).

Minor: adds the `create-session` facilitator pattern. Additive only.

## 1.2.0 → 1.2.1 (Create-session / join-flow layout correction)

See the dedicated note: [migrations/1.2.0-to-1.2.1.md](./migrations/1.2.0-to-1.2.1.md).

Patch: `create-session` and `join-flow` panels now use a `max-w-md` wrapper; the
`create-session` `data-state` moved to the wrapper. No API or token changes.
Reinstall those two patterns only.

## 1.2.1 → 1.2.2 (Gamescience switch off-track)

See the dedicated note: [migrations/1.2.1-to-1.2.2.md](./migrations/1.2.1-to-1.2.2.md).

Patch: the `switch` off-track in the `gamescience` theme now resolves to a
visible surface instead of no fill. Reinstall `theme-gamescience` only.

## 1.2.2 → 1.3.0 (Sentinel theme)

See the dedicated note: [migrations/1.2.2-to-1.3.0.md](./migrations/1.2.2-to-1.3.0.md).

Minor: adds `theme-sentinel` with cinematic and restrained registers. Reinstall
`base` and install `theme-sentinel` to adopt. Gamescience and Citadel unchanged.

## 0.5.3 → 0.5.4 (Migrate ledger evidence + Pages deploy)

See the dedicated note: [migrations/0.5.3-to-0.5.4.md](./migrations/0.5.3-to-0.5.4.md).

Patch: concrete A–E evidence references, discovery reconciliation, Storybook
reference phase, and Pages deploy-from-`main` only. No component API or theme
contract changes. Optional pin; reinstall `base` only for version metadata.

## 0.5.2 → 0.5.3 (Hosted Storybook + migration coverage)

See the dedicated note: [migrations/0.5.2-to-0.5.3.md](./migrations/0.5.2-to-0.5.3.md).

Patch: GitHub Pages–hosted Storybook (`/storybook/`) and deeper migration
coverage-ledger guidance. No component API or theme contract changes. Optional
pin; reinstall `base` only for version metadata.

## 0.5.1 → 0.5.2 (Storybook coverage)

See the dedicated note: [migrations/0.5.1-to-0.5.2.md](./migrations/0.5.1-to-0.5.2.md).

Patch: Storybook depth + `storybook:coverage` gate. No component API or theme
contract changes. Optional pin; reinstall `base` only for version metadata.

## 0.5.0 → 0.5.1 (Citadel Panel chrome)

See the dedicated note: [migrations/0.5.0-to-0.5.1.md](./migrations/0.5.0-to-0.5.1.md).

Patch: Citadel Panel strong-emphasis corners, 1px borders, and border colour
alignment. Reinstall `base` + `theme-citadel` when on Citadel.

## 0.4.1 → 0.5.0 (Game domain components)

See the dedicated note: [migrations/0.4.1-to-0.5.0.md](./migrations/0.4.1-to-0.5.0.md).

Adds Countdown, PhaseProgress, ConnectionBanner, PhaseHeader, PhaseDirective,
RolePanel, VoteStatus, OutcomeSummary, StickyActionBar. Install on demand.
Higher-level discussion/vote/results patterns remain deferred.

## 0.4.0 → 0.4.1 (Button asChild + migration governance)

See the dedicated note: [migrations/0.4.0-to-0.4.1.md](./migrations/0.4.0-to-0.4.1.md).

Summary: Button `asChild` + `loading` no longer crashes; migration briefs require
canonical project state, coverage language A–D, mixed-context and visual-loss
reporting. `SharedDisplayLobby` API unchanged. Pin `versions/0.4.1` and reinstall
`button` (and `base` for guidance/version metadata).

## 0.3.0 → 0.4.0 (Citadel theme + Storybook coverage)

0.4.0 refines Citadel theme identity against the live HUD audit and expands
Storybook to per-component coverage plus family galleries. No new registry item
names; consumers reinstall `theme-citadel` (and `base` if foundations changed)
to pick up CSS and `gs-*` hook updates.

1. **Pin** the registry to `versions/0.4.0`.
2. **Diff then reinstall** `base` and the active theme (`theme-citadel` or
   `theme-gamescience`) with `--diff` / `--overwrite` per
   [registry-update-policy.md](./registry-update-policy.md).
3. Reinstall any installed UI primitives you care about if you need the new
   theme hooks (`gs-card`, `gs-dialog-*`, form controls, etc.) — GameScience
   visual identity is unchanged; Citadel gains HUD treatments.
4. Reinstall `waiting-state` (or patterns that pull it: `join-flow`,
   `shared-display-lobby`) so the new `spinner` registry dependency installs.
5. Confirm `src/lib/version.ts` and guidance report `0.4.0`.
6. Smoke participant / facilitator / shared-display under Citadel for panel,
   button `emphasis="strong"`, input, badge outlined information, dialog, and
   shell backgrounds.
7. Application-owned GlassCard / BackgroundKpmg / binary-stream chrome remain
   out of the library — keep them local or replace with Panel + shells.
