## Phase 1: Audit

Inspect before changing code:

- package manager, framework, router, Tailwind version
- `components.json`, aliases, UI inventory
- custom components, global CSS, fonts, theme architecture
- provider structure, Sonner/toast usage, portals
- participant / facilitator / shared-display surfaces (classify independently of role)
- route structure and business logic coupled to UI
- duplicate design systems and client/game-specific visuals
- authorisation / RLS findings (report separately; do not block UI migration by default)

### Required component audit table

| Existing implementation     | Registry target        | Classification      | Proposed action       | Risk   |
| --------------------------- | ---------------------- | ------------------- | --------------------- | ------ |
| example: TechButton         | @gamescience/button    | migration candidate | replace               | low    |
| example: custom join screen | @gamescience/join-flow | mixed UI + logic    | incremental migration | medium |
| example: WebSocket hook     | none                   | application-owned   | preserve              | high   |
| example: radar visual       | none                   | game-specific       | retain                | low    |

Fill the table with project-specific rows. Do not skip classification.

### Required context audit table

Complete one row per route, screen, or major layout (see Experience context
model). Selected contexts are migration targets, not inferred roles. Other
contexts may be absent legitimately. Do not force all three contexts.

| Route/surface | Experience context | Authenticated role | Required authority | Interactivity | Privacy | Intended viewport | Current shell | Registry shell target | Current pattern | Registry target | Split required | Risk | Notes |
| ------------- | ------------------ | ------------------ | ------------------ | ------------- | ------- | ----------------- | ------------- | --------------------- | --------------- | --------------- | -------------- | ---- | ----- |
|               |                    |                    |                    |               |         |                   |               |                       |                 |                 |                |      |       |

Use `unclassified` when evidence is insufficient.
