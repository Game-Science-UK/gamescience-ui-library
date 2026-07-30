# Experience context model

GameScience UI uses a small context model to describe the kind of interface
currently being rendered.

```ts
type ExperienceContext = "participant" | "facilitator" | "shared-display";
```

The model answers one question:

> What interface environment is this surface designed for?

It influences layout, density, content scale, viewport assumptions, interaction
model, privacy expectations, focus and keyboard behaviour, responsive treatment,
shell selection, information hierarchy, control visibility, and distance
legibility.

It does **not** answer who the authenticated user is, what database role they
hold, what they are authorised to do, how RLS is implemented, which route
library is used, whether the user is an administrator, how game state is stored,
or how session ownership works.

Use “shared display” in prose and `shared-display` in code.

## Four concepts to keep separate

| Concept                | Question answered                         | Examples                                                |
| ---------------------- | ----------------------------------------- | ------------------------------------------------------- |
| Experience context     | What kind of interface is being rendered? | `participant`, `facilitator`, `shared-display`          |
| User role or authority | What is this identity permitted to do?    | participant, facilitator, host, observer, administrator |
| Route or mount point   | Where is the surface mounted?             | `/join`, `/host/$code`, `/display/$code`                |
| Game or workflow state | What is happening within the surface?     | joining, waiting, voting, presenting                    |

Authority is application-owned. It may be implemented through authenticated
identity, session ownership, role tables, permission functions, route guards,
RLS, host tokens, or signed links. The registry does not prescribe role storage
or authorisation architecture.

Routes frequently imply context, but routes are application structure rather
than the context model itself.

State does not define context. A waiting state may appear in participant,
facilitator, and shared-display contexts with different compositions.

## Mental model

Theme controls visual identity.
Context controls the interface environment.
Role controls authority.
Route controls where the interface is mounted.
State controls what is happening.

## Principles

### 1. Context describes the surface

Context is a presentation and interaction contract. It is not an identity claim.

### 2. Context is not authorisation

Setting:

```tsx
<GameScienceProvider context="facilitator">
```

does not grant facilitator permissions. The application must separately verify
authority.

### 3. Context is not necessarily a user role

Examples:

- a facilitator may open a participant preview
- a facilitator may operate a shared display
- a producer may observe a facilitator interface
- a participant may view a public shared-display route
- an unauthenticated device may render a shared display using a scoped token

### 4. One context is active per rendered application root

Preferred pattern:

```tsx
function ApplicationRoot() {
  const context = resolveExperienceContext();

  return (
    <GameScienceProvider theme="gamescience" context={context}>
      <RouterOutlet />
    </GameScienceProvider>
  );
}
```

- Theme is selected once for the application.
- Context is selected for the active surface.
- Context can change with navigation.
- Provider state should remain at the highest practical application boundary.
- Routing determines context; context does not authorise routing.

Do not recommend nested providers for ordinary route groups. Helper names such
as `resolveExperienceContext` are examples, not required APIs.

### 5. Not every application requires all three contexts

Valid applications include:

- participant only
- participant + facilitator
- participant + shared display
- facilitator + shared display
- all three contexts

Use only the contexts the game genuinely needs. Do not create a shared-display
route merely to satisfy the registry model.

### 6. Contexts should be explicit

Applications should declare context through one or more of:

- route metadata
- route groups
- a route-to-context mapping
- a root layout decision
- a project context configuration file

Do not rely solely on filenames such as `HostPage` or `BoardScreen` where a
machine-readable declaration is practical.

### 7. Split compositions when jobs materially differ

Separate context compositions when they differ materially in:

- information hierarchy
- available actions
- privacy
- intended viewport
- interaction model
- content density
- public versus personal information

Do not split a screen merely because one authorised user sees one additional
button.

### 8. Shared display has a public-surface contract

A shared-display surface should assume:

- public or semi-public visibility
- no participant-private information
- no personal role instructions
- no private scores unless explicitly safe
- no controls required for operation
- no hover-dependent information
- no reliance on keyboard focus
- landscape or large-screen presentation
- strong distance legibility
- minimal prose
- robust reconnect and waiting states

### 9. Shells express context, not entire applications

`ParticipantShell`, `FacilitatorShell`, and `SharedDisplayShell` establish
context behaviour such as viewport, spacing, content bounds, safe area, density,
background, scaling, and interaction assumptions.

They do not replace project-specific navigation, state management, or
operations.

### 10. Application logic remains application-owned

GameScience patterns receive state and callbacks. They do not own networking,
WebSockets, scoring, persistence, authentication, authorisation, route state,
analytics, or session orchestration.

## Context characteristics

|                  | Participant                                          | Facilitator                                | Shared display                                     |
| ---------------- | ---------------------------------------------------- | ------------------------------------------ | -------------------------------------------------- |
| Typical device   | Personal / mobile-first                              | Desktop or tablet                          | Large screen / room display                        |
| Interaction      | Touch, focused task                                  | Keyboard and pointer, operational controls | Non-interactive                                    |
| Information      | Limited, participant-safe                            | Denser operational detail                  | Minimal, distance-legible                          |
| Privacy          | May include private instructions                     | Operational / session-private              | Public or room-safe only                           |
| Typical shell    | `ParticipantShell`                                   | `FacilitatorShell`                         | `SharedDisplayShell`                               |
| Typical patterns | `ParticipantJoinFlow`, waiting / status compositions | `FacilitatorLobby`, operational panels     | `SharedDisplayLobby`, room code / count / headings |

### Participant

Personal device, mobile-first, touch interaction, focused task, limited
information, participant-safe state, safe-area handling, clear reconnect and
error recovery. May display private instructions intended for that participant.

### Facilitator

Operational interface, desktop or tablet, denser information, controls and
management actions, participant monitoring, exceptions and recovery, keyboard
and pointer use, access to operational or private session information.

### Shared display

Large screen, public or room-visible, non-interactive, distance legibility,
minimal prose, no participant-private information, no hover dependency, usually
landscape, follows session state controlled elsewhere.

## Context versus role examples

### Example A: Facilitator opening a shared display

- Authenticated role: facilitator
- Current context: `shared-display`
- Route: `/display/ABC123`
- Interactivity: none
- Privacy: public room-safe

### Example B: Facilitator previewing participant flow

- Authenticated role: facilitator
- Current context: `participant`
- Route: `/preview/participant/ABC123`
- Interactivity: participant-like preview
- Privacy: test or preview data

### Example C: Anonymous participant

- Authenticated role: none or anonymous session
- Current context: `participant`
- Route: `/join`
- Interactivity: touch
- Privacy: personal

### Example D: Token-controlled display

- Authenticated role: none
- Authority: scoped display token
- Current context: `shared-display`
- Route: `/display/ABC123`
- Interactivity: none
- Privacy: public room-safe

## Router integration

Router guidance is documentation only. Do not treat these examples as registry
runtime dependencies.

### Route-to-context map

```ts
export const experienceContextRoutes = {
  participant: ["/join", "/lobby", "/play"],
  facilitator: ["/host", "/facilitate"],
  "shared-display": ["/display", "/present", "/projection", "/board"],
} as const;
```

### Route metadata

Conceptual declaration:

```ts
{
  path: "/display/:code",
  context: "shared-display",
}
```

### TanStack Router

Use route static data or a project-owned route map to resolve the active
`ExperienceContext`. Confirm the installed TanStack Router version’s static-data
API before copying snippets into production code.

### React Router

Use a project-owned `ContextRoute` wrapper or route metadata map. `ContextRoute`
is application-owned unless later introduced as a registry helper.

### File-based routing

Either group by context:

```text
routes/
├── participant/
├── facilitator/
└── shared-display/
```

or keep familiar route names and map them explicitly:

```text
routes/
├── join.tsx
├── lobby.$code.tsx
├── facilitate.$code.tsx
└── display.$code.tsx
```

Project routes may retain names such as `/present` or `/host`. The context
record must map them to the canonical vocabulary (`shared-display`,
`facilitator`, `participant`).

## Screen-splitting decision framework

For an existing screen shared between roles or routes, ask:

1. Does the information hierarchy differ?
2. Do available actions differ substantially?
3. Does one surface expose information that is unsafe on another?
4. Are viewport assumptions materially different?
5. Is one surface interactive and another non-interactive?
6. Is content density materially different?
7. Does one composition require operational controls?
8. Is the difference only one or two conditional actions?

Guidance:

- When 1–7 materially differ, split the compositions.
- When only 8 applies, retain one composition with a small authorised action
  branch where appropriate.
- Do not create separate routes solely to remove every conditional render.
- Do not retain one large component when it is performing fundamentally
  different context jobs.

### Lobby example

| Surface              | Context          | Job                                    |
| -------------------- | ---------------- | -------------------------------------- |
| Participant lobby    | `participant`    | Personal waiting, identity, reconnect  |
| Facilitator lobby    | `facilitator`    | Monitor participants, readiness, start |
| Shared-display lobby | `shared-display` | Room code, count, public waiting       |

These are three compositions, not one lobby with three role branches.

## Context audit fields

When migrating or reviewing a project, classify every major route, screen, or
layout:

| Field                 | Meaning                                                               |
| --------------------- | --------------------------------------------------------------------- |
| Route/surface         | Where it is mounted                                                   |
| Experience context    | `participant`, `facilitator`, `shared-display`, or `unclassified`     |
| Authenticated role    | Current identity/role, if any                                         |
| Required authority    | Permission required to access or act                                  |
| Interactivity         | interactive, operational, or non-interactive                          |
| Privacy               | personal, operational, public-room-safe                               |
| Intended viewport     | mobile, desktop/tablet, large display                                 |
| Current shell         | Existing layout wrapper                                               |
| Registry shell target | `ParticipantShell`, `FacilitatorShell`, `SharedDisplayShell`, or none |
| Current pattern       | Existing join/lobby/display composition                               |
| Registry target       | Registry pattern or retained application composition                  |
| Split required        | yes / no / uncertain                                                  |
| Risk                  | low / medium / high                                                   |
| Notes                 | Business logic and migration constraints                              |

`unclassified` is a valid audit result when evidence is insufficient. Do not
force uncertain screens into the nearest registry context.

## Classification rules

### Do not infer context solely from names

- `HostLobby` may still contain participant composition.
- A route named `reveal` may be participant-private rather than shared-display.
- `SharedSummary` may be a post-game share link rather than a live shared display.

Inspect data shown, actions available, intended viewer, privacy, viewport, and
interactivity.

### Post-game share links are not automatically shared displays

A shareable report or take-home screen may remain an application-owned surface.
Classify it as `shared-display` only when it is intended for room-scale, public,
non-interactive presentation.

### Admin is not a registry context

Administrative configuration may use facilitator context where the interaction
model fits, or remain an application-owned operational surface. Do not add
`admin` to `ExperienceContext`.

### Observer is not automatically shared display

An observer may use participant context, facilitator context, or a dedicated
application-owned read-only surface. Classify by interface behaviour, not role
name.

## Keep authorisation separate

Report role and security findings separately from UI context migration.

Issue classes:

- UI context migration
- Route/surface architecture
- Application authorisation
- Data security / RLS
- Application-specific requirement

A role-schema cleanup does not block registry adoption unless a specific
technical dependency makes that true. Prefer a separate security workstream.
Do not ask a registry agent to rewrite database roles merely because a UI
surface is being migrated.

## Project context record

Consuming projects should maintain:

```text
src/docs/gamescience-ui-contexts.md
```

Suggested structure:

```md
# GameScience UI context record

## Registry

- Version:
- Theme:

## Contexts in use

- Participant:
- Facilitator:
- Shared display:

## Route mapping

| Route or surface | Context | Shell | Pattern | Authority |
| ---------------- | ------- | ----- | ------- | --------- |

## Shared-display privacy

- Public data shown:
- Private data excluded:
- Control surface:
- Reconnect behaviour:

## Application authority

- Authentication method:
- Facilitator authority:
- Display authority:
- Participant identity:

## Retained application-owned surfaces

- Surface:
- Reason it does not map to a registry context:

## Deviations

- Deviation:
- Rationale:
- Review date:
```

This is application documentation. It is not installed by registry components.
It must not contain secrets or tokens. Authority fields describe architecture,
not credentials.

## Consistency without identical routing

Across Lovable projects, consistency means:

- canonical vocabulary (`participant`, `facilitator`, `shared-display`)
- explicit route or surface mapping
- one root provider
- context-specific shells where the contract fits
- pattern separation where jobs materially differ
- shared-display privacy review when that context exists
- application-owned authority
- a maintained context record

Consistency does **not** require identical route names across every project.

Every major surface should declare:

- its context
- its authority
- its privacy level
- its interaction model
- its shell

## Avoid over-standardisation

The model explicitly permits:

- participant-only projects
- games without a live shared display
- post-game shareable outputs outside the three-context model
- game-specific operational screens
- application-owned admin tools
- project-specific route names
- small conditional actions inside otherwise shared compositions
- read-only observer experiences classified by actual behaviour

Do not force a project into three routes purely for symmetry.
