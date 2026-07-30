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
