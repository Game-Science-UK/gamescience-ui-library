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
14. No raw **component-identity** theme styling in migrated screens — derive
    chrome from the installed theme CSS. Allowed: charts, maps, canvas/SVG,
    game-state visualisation. Disallowed: local Panel/Button/Input identity.
15. No automatic redesign of game-specific visuals
16. Do not require all three contexts; use only surfaces the experience needs
17. Enforce the shared-display privacy contract wherever that context exists
18. File installation is not evidence of call-site migration
19. Route migration is not evidence that all render branches are migrated
20. Build success is not evidence that registry utilities or tokens resolve
21. Release manifests are not evidence of payload equality; verify actual files
22. Every in-scope UI obligation must have a final disposition
23. No full-alignment completion with unclassified obligations
24. No migrated surface may retain unsanctioned theme-identity overrides
25. Full alignment requires an independent post-migration coverage audit
26. Full alignment proceeds through the approved plan without routine continuation prompts
27. Screenshot validation must compare consumer output with matching Storybook
    reference states (theme, context, variant, state)
28. Full alignment requires zero unexplained discovery-to-ledger differences
29. A–E evidence for `migrated` obligations must include concrete references,
    not bare booleans

Storybook rendered reference:
`https://game-science-uk.github.io/gamescience-ui-library/storybook/`
Registry JSON remains authoritative for installed source payloads.
