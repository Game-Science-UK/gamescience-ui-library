## Phase 1: Audit

Inspect before changing code:

- package manager, framework, router, Tailwind version
- `components.json`, aliases, UI inventory
- custom components, global CSS, fonts, theme architecture
- provider structure, Sonner/toast usage, portals
- participant / facilitator / shared-display surfaces
- route structure and business logic coupled to UI
- duplicate design systems and client/game-specific visuals

### Required audit table

| Existing implementation     | Registry target        | Classification      | Proposed action       | Risk   |
| --------------------------- | ---------------------- | ------------------- | --------------------- | ------ |
| example: TechButton         | @gamescience/button    | migration candidate | replace               | low    |
| example: custom join screen | @gamescience/join-flow | mixed UI + logic    | incremental migration | medium |
| example: WebSocket hook     | none                   | application-owned   | preserve              | high   |
| example: radar visual       | none                   | game-specific       | retain                | low    |

Fill the table with project-specific rows. Do not skip classification.
