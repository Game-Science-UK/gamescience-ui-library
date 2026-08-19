# GameScience UI — consumer agent guidance

Installed library version: **{{VERSION}}**

## Registry

- Namespace: `@gamescience`
- Preferred (pinned) registry URL:

```text
{{REGISTRY_URL}}
```

- Agent catalogue:

```text
{{CATALOGUE_URL}}
```

- Local installed metadata: `src/docs/gamescience-ui.json`

## Rules

1. Identify experience context: `participant` | `facilitator` | `shared-display`
2. Identify the single active theme: `gamescience` | `citadel` | `sentinel`
3. Search the agent catalogue / installed patterns before implementing UI
4. Prefer complete patterns over assembling primitives — create/join/lobby: `create-session`, `join-flow`, `lobby`, `shared-display-lobby`; game loop: `decision`, `timed-round`, `briefing`, `scripted-reveal`, `results`, `debrief`; session/display: `facilitator-console`, `shared-display-game`, `attention-takeover`
5. Do not recreate installed registry components
6. Set theme only through `GameScienceProvider`
7. Never pass theme props to individual components
8. Never create nested theme boundaries or mix themes
9. Never create `CitadelButton`, `TechButton`, `GlassCard`, or similar forks
10. Keep application logic, networking, scoring, and auth outside installed library components
11. Use Sonner only — never legacy toast/toaster/use-toast
12. Upstream-managed paths: `src/components/ui|game|display`, `src/providers`, `src/foundations`, `src/themes`, `src/patterns`, `src/templates`
13. Put application compositions outside those directories
14. Do not run `shadcn add --overwrite` unless explicitly updating upstream-managed files after reviewing `--diff`
15. Do not overwrite this project's root `AGENTS.md` with library files — reference this guidance instead

## CSS and fonts

- Import the framework-neutral entry: `src/foundations/index.css` (tokens, typography, motion, responsive, plain base styles).
- Import **exactly one** theme CSS file (`gamescience.css`, `citadel.css`, or `sentinel.css`).
- Fonts are application-owned. Prefer HTML `<link>` to Google Fonts, or optional `@fontsource-*` packages. See repository `docs/font-loading.md`.
- Do not add remote `@import url("https://...")` inside theme or foundation CSS when using Tailwind 4 / Lightning CSS.
- Tailwind 3 consumers: own a local entry with `@tailwind` directives, then import foundations + one theme.
- Tailwind 4 / Lovable consumers: use the approved bridge in repository `docs/tailwind-v4-integration.md` (no circular `--x: var(--x)` mappings).

## Updates

- Pin the versioned registry URL in `components.json`
- Use `npx shadcn@latest add @gamescience/<item> --diff` before updates
- `-y` does not overwrite existing files; `--overwrite` is explicit and destructive
