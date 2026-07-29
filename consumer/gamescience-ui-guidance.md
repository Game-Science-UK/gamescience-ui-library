# GameScience UI — consumer agent guidance

Installed library version: **0.1.0**

## Registry

- Namespace: `@gamescience`
- Preferred (pinned) registry URL:

```text
https://game-science-uk.github.io/gamescience-ui-library/versions/0.1.0/r/{name}.json
```

- Agent catalogue:

```text
https://game-science-uk.github.io/gamescience-ui-library/versions/0.1.0/agent-catalogue.json
```

- Local installed metadata: `src/docs/gamescience-ui.json`

## Rules

1. Identify experience context: `participant` | `facilitator` | `shared-display`
2. Identify the single active theme: `gamescience` | `citadel`
3. Search the agent catalogue / installed patterns before implementing UI
4. Prefer complete patterns (`join-flow`, `lobby`, `shared-display-lobby`) over assembling primitives
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

## Updates

- Pin the versioned registry URL in `components.json`
- Use `npx shadcn@latest add @gamescience/<item> --diff` before updates
- `-y` does not overwrite existing files; `--overwrite` is explicit and destructive
