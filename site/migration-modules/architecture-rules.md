## Non-negotiable architecture rules

1. Exactly one active root theme via `GameScienceProvider`
2. Never pass theme props to individual components
3. Never create nested theme boundaries or mix Gamescience and Citadel
4. Never create `CitadelButton`, `GamesciencePanel`, `GlassCard`, `TechInput`, or equivalent forks
5. Prefer installed patterns before assembling primitives
6. Keep application logic, networking, scoring, auth, and persistence outside upstream components
7. Use Sonner only — never legacy toast/toaster/use-toast
8. Use the versioned registry URL only
9. No unreviewed overwrite (`--diff` before `--overwrite`)
10. No broad delete-and-rebuild migration
11. No raw theme styling in migrated screens — derive identity from the installed theme CSS
12. No automatic redesign of game-specific visuals
