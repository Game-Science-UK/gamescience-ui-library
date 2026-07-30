## Non-negotiable architecture rules

1. Exactly one active root theme via `GameScienceProvider`
2. Exactly one active experience context at the rendered application root
3. Never pass theme props to individual components
4. Never create nested theme or context provider boundaries for ordinary routes
5. Never mix Gamescience and Citadel themes
6. Never equate experience context with role, permission, or route authority
7. Never create `CitadelButton`, `GamesciencePanel`, `GlassCard`, `TechInput`, or equivalent forks
8. Prefer installed patterns before assembling primitives
9. Keep application logic, networking, scoring, auth, and persistence outside upstream components
10. Use Sonner only — never legacy toast/toaster/use-toast
11. Use the versioned registry URL only
12. No unreviewed overwrite (`--diff` before `--overwrite`)
13. No broad delete-and-rebuild migration
14. No raw theme styling in migrated screens — derive identity from the installed theme CSS
15. No automatic redesign of game-specific visuals
16. Do not require all three contexts; use only surfaces the experience needs
17. Enforce the shared-display privacy contract wherever that context exists
