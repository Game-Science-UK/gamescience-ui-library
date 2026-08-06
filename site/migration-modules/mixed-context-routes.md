## Mixed-context routes

A single route may render different compositions based on role or loaded session
state. Example:

```text
/lobby/:sessionId
├── host branch → FacilitatorShell + FacilitatorLobby
└── participant branch → bespoke participant lobby
```

Static route→context maps can report “migrated” while the root
`GameScienceProvider` context is wrong for one branch.

### Detect

- One route rendering different shells based on role or session data
- Facilitator composition inside a participant provider context
- Participant composition inside a facilitator provider context
- Route-to-context maps that classify a mixed route too early
- Nested `GameScienceProvider`s introduced to work around the mismatch

### Required audit field

| Route | Branch condition | Branch context | Root provider context | Match | Recommendation |
| ----- | ---------------- | -------------- | --------------------- | ----- | -------------- |
|       |                  |                |                       |       |                |

### Classifications

| Classification                         | Meaning                                                              |
| -------------------------------------- | -------------------------------------------------------------------- |
| Context-safe                           | Branch context matches root provider context                         |
| Context mismatch                       | Branch composition disagrees with root context                       |
| Context unresolved until data loads    | Context cannot be known until session/identity loads                 |
| Mixed-context route requiring decision | Materially different jobs/privacy/interaction models share one route |

### Guidance

- Prefer **separate routes** when jobs, privacy or interaction models differ.
- When the difference is only one or two authorised actions, one composition may
  remain.
- Do **not** use nested GameScience providers as the default fix.
- Do **not** infer facilitator context merely because the current identity is a
  facilitator.
- If context cannot be resolved until session data loads, define a
  context-neutral loading boundary, then mount the correct surface.
- Do **not** report shell adoption as architecturally complete until provider
  context has been verified for every branch.
