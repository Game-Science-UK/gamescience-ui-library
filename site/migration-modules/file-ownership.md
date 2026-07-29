## File ownership model

### Upstream-managed (do not edit casually)

- `src/foundations/**`
- `src/themes/**` (installed theme)
- `src/components/ui/**`, `src/components/game/**`, `src/components/display/**`
- `src/patterns/**`, `src/templates/**`
- `src/providers/**`
- `src/lib/cn.ts`, `src/lib/accessibility.ts`, `src/lib/version.ts`
- `src/docs/gamescience-ui.json`, `src/docs/gamescience-ui-guidance.md`

### Application-owned (preserve)

- Routes / pages / screens
- State management and game logic
- Networking, WebSockets, persistence, auth, scoring, analytics
- Content, fixtures, game-specific graphics and effects
- Root document setup and application-owned font `<link>`s
- Project `AGENTS.md` (reference installed guidance; do not overwrite wholesale)

### Migration candidates (classify before replacing)

Local Button/Input/Card/Panel forks, token files, theme CSS, join/lobby screens, status components, duplicate shadcn primitives, wrapper components that only restyle upstream APIs.
