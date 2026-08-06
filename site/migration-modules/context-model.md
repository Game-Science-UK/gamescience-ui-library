## Experience context model

Experience contexts describe the interface environment being rendered.
They are **not** inferred user roles and do not grant authority.

When this brief lists selected contexts, those values are install or migration
targets only — not roles: **{{CONTEXTS}}**.

Canonical vocabulary:

```ts
type ExperienceContext = "participant" | "facilitator" | "shared-display";
```

Context answers: **What kind of interface is being rendered?**

Keep these four concepts separate:

| Concept               | Answers                      | Not the same as         |
| --------------------- | ---------------------------- | ----------------------- |
| Experience context    | Interface environment        | Role, permission, route |
| User role / authority | What the identity may do     | Context prop value      |
| Route / mount point   | Where the surface is mounted | Context itself          |
| Game / workflow state | What is happening now        | Context itself          |

Theme controls visual identity. Context controls the interface environment.
Role controls authority. Route controls mount point. State controls what is
happening.

### Optional contexts

Not every application needs all three contexts. Use only the surfaces the
experience requires. Unselected or absent contexts may be legitimate. Do **not**
implement all three by default for symmetry.

### Root provider

Prefer one root provider:

```tsx
<GameScienceProvider theme="{{THEME}}" context={activeContext}>
  <Application />
</GameScienceProvider>
```

- Theme is selected once for the application.
- Active context may change with routing.
- Do not nest theme or context providers for ordinary route groups.
- Routing determines context; context does not authorise routing.
- Do not infer facilitator context merely because the signed-in identity is a
  facilitator or host.
- When a route has host/participant branches, audit each branch against the root
  provider context (see Mixed-context routes).

### Shared-display privacy contract

Where `shared-display` exists, assume public or semi-public visibility:

- no participant-private information
- no personal role instructions
- no private scores unless explicitly safe
- no controls required for operation
- no hover-dependent information
- no reliance on keyboard focus
- landscape / large-screen presentation
- strong distance legibility and minimal prose
- robust reconnect and waiting states

Post-game share links are not automatically shared displays.

### Screen splitting

Split compositions when information hierarchy, available actions, privacy,
viewport, interactivity, density, or operational controls materially differ.
Retain one composition when the only difference is one or two conditional
authorised actions. Do not create separate routes solely to remove every
conditional render.

### Classification rules

- Do not infer context solely from names (`HostLobby`, `reveal`, `SharedSummary`).
- `unclassified` is a valid audit result — clarify before broad migration.
- Admin is not a registry context.
- Observer is not automatically shared display.
- Inspect data shown, actions, intended viewer, privacy, viewport, interactivity.

### Authorisation separation

Keep application authorisation, RLS, and role storage outside registry migration
work. Use distinct issue classes:

- UI context migration
- Route/surface architecture
- Application authorisation
- Data security / RLS
- Application-specific requirement

Do not rewrite database roles merely because a UI surface is being migrated.

### Route declaration

Declare context through route metadata, route groups, a route-to-context map, a
root layout decision, or a project context configuration file. Project route
names may differ; map them to the canonical vocabulary in the context record.

### Local context record

Maintain application-owned documentation at:

```text
src/docs/gamescience-ui-contexts.md
```

Record registry version, theme, contexts in use, route mapping, shared-display
privacy, application authority architecture (not credentials), retained
application-owned surfaces, and deviations. Do not store secrets or tokens.

### Required context audit table

For every existing route, screen, or major layout:

| Route/surface | Experience context                                        | Authenticated role | Required authority | Interactivity                               | Privacy                                   | Intended viewport                       | Current shell | Registry shell target                                           | Current pattern | Registry target | Split required       | Risk                | Notes |
| ------------- | --------------------------------------------------------- | ------------------ | ------------------ | ------------------------------------------- | ----------------------------------------- | --------------------------------------- | ------------- | --------------------------------------------------------------- | --------------- | --------------- | -------------------- | ------------------- | ----- |
|               | participant / facilitator / shared-display / unclassified |                    |                    | interactive / operational / non-interactive | personal / operational / public-room-safe | mobile / desktop-tablet / large-display |               | ParticipantShell / FacilitatorShell / SharedDisplayShell / none |                 |                 | yes / no / uncertain | low / medium / high |       |
