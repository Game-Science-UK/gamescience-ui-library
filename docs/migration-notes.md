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
