## Phase 1: Audit

Inspect before changing code:

- package manager, framework, router, Tailwind version (separately)
- `components.json`, aliases, UI inventory
- custom components, global CSS, fonts, theme architecture
- provider structure, Sonner/toast usage, portals
- participant / facilitator / shared-display surfaces (classify independently of role)
- route structure and business logic coupled to UI
- duplicate design systems and client/game-specific visuals
- local shadcn primitives that now have `@gamescience/*` equivalents (0.3.0+)
- authorisation / RLS findings (report separately; do not block UI migration by default)

### Required component audit table

Classification must be one of:

- **Existing registry target**
- **Application-specific**
- **Registry coverage candidate**
- **Requires further evidence**
- **Obsolete or unused**

Do **not** default to “Registry target: none / Action: keep”.

| Existing implementation     | Registry target        | Classification              | Proposed action       | Risk   |
| --------------------------- | ---------------------- | --------------------------- | --------------------- | ------ |
| example: TechButton         | @gamescience/button    | Existing registry target    | replace               | low    |
| example: Dialog             | @gamescience/dialog    | Existing registry target    | replace local shadcn  | low    |
| example: custom join screen | @gamescience/join-flow | Existing registry target    | incremental migration | medium |
| example: WebSocket hook     | none                   | Application-specific        | preserve              | high   |
| example: Stat tile          | none                   | Registry coverage candidate | backlog               | medium |
| example: radar visual       | none                   | Application-specific        | retain                | low    |

For every missing registry target, assess:

1. Is it visual, behavioural, or both?
2. Is it tied to business or game logic?
3. Can existing registry primitives compose it?
4. Is it reusable across games?
5. Is it a primitive, component, pattern, or template?
6. Which contexts use it?
7. Does it appear in more than one project?
8. Should it remain application-owned?

### Required context audit table

Complete one row per route, screen, or major layout (see Experience context
model). Selected contexts are migration targets, not inferred roles. Other
contexts may be absent legitimately. Do not force all three contexts.

| Route/surface | Experience context | Authenticated role | Required authority | Interactivity | Privacy | Intended viewport | Current shell | Registry shell target | Current pattern | Registry target | Split required | Risk | Notes |
| ------------- | ------------------ | ------------------ | ------------------ | ------------- | ------- | ----------------- | ------------- | --------------------- | --------------- | --------------- | -------------- | ---- | ----- |
|               |                    |                    |                    |               |         |                   |               |                       |                 |                 |                |      |       |

Use `unclassified` when evidence is insufficient.

### Required mixed-context branch table

When a route renders different shells or patterns by role or loaded session
state, complete one row per branch (see Mixed-context routes).

| Route | Branch condition | Branch context | Root provider context | Match | Recommendation |
| ----- | ---------------- | -------------- | --------------------- | ----- | -------------- |
|       |                  |                |                       |       |                |

Do not report shell adoption as architecturally complete until provider context
matches every migrated branch.

### Stack support classification

Do **not** infer registry stack support solely from the names of published
guides. Inspect the installed item payload, foundation CSS, and declared
dependencies.

Classify Tailwind / consumer-stack support as exactly one of:

- **Supported**
- **Supported with stack-specific integration**
- **Unsupported**
- **Uncertain — payload inspection required**

Use “blocking mismatch” only for a **verified** incompatibility with the
implementation contract. Tailwind version does not determine router
integration — report router findings separately.

## Registry coverage backlog

Produce:

| Existing implementation | Proposed registry layer                                                                            | Evidence | Contexts | Reuse likelihood    | Recommendation |
| ----------------------- | -------------------------------------------------------------------------------------------------- | -------- | -------- | ------------------- | -------------- |
|                         | primitive / reusable component / pattern / template / application-specific / insufficient evidence |          |          | low / medium / high |                |

Classify backlog rows as:

- Primitive gap (should be rare after 0.3.0)
- Reusable component candidate
- Pattern candidate
- Template candidate
- Application-specific
- Insufficient evidence
