# Registry coverage backlog

Candidates identified from Lovable project audits that are **not** part of the
0.3.0 primitive layer. Reassess after projects migrate onto the expanded
primitive inventory.

| Candidate             | Source projects   | Contexts                    | Frequency  | Likely layer            | Evidence                            | Status   | Next audit needed              |
| --------------------- | ----------------- | --------------------------- | ---------- | ----------------------- | ----------------------------------- | -------- | ------------------------------ |
| Stat                  | Sentinel 3.0      | facilitator, shared-display | medium     | reusable component      | Metric tiles in ops/display screens | deferred | After 0.3.0 primitive adoption |
| CopyableValue         | Sentinel 3.0      | facilitator                 | medium     | reusable component      | Copyable codes/IDs                  | deferred | After 0.3.0                    |
| SelectionGrid         | Sentinel 3.0      | participant                 | medium     | pattern                 | Choice grids in briefing/vote flows | deferred | Multi-project recurrence check |
| ParticipantGrid       | Sentinel / others | facilitator                 | medium     | reusable component      | Lobby participant arrangement       | deferred | Compare with FacilitatorLobby  |
| VotingGrid            | Sentinel 3.0      | participant                 | medium     | pattern                 | Vote selection slice                | deferred | Multi-project recurrence check |
| BriefingPanel         | Sentinel 3.0      | participant / facilitator   | medium     | pattern                 | Briefing content shell              | deferred | Multi-project recurrence check |
| ConfidenceModal       | Sentinel 3.0      | participant                 | low        | pattern / app-specific  | Confidence capture dialog           | deferred | Confirm reuse                  |
| Countdown             | Multiple          | all                         | medium     | pattern                 | Stage timers                        | deferred | Compare implementations        |
| ResultsSummary        | Multiple          | all                         | medium     | pattern                 | End-of-round summary                | deferred | Multi-project recurrence check |
| FacilitatorOperations | Sentinel 3.0      | facilitator                 | medium     | template / app-specific | Ops control strip                   | deferred | Keep local until repeated      |
| SharedDisplayBoard    | Sentinel 3.0      | shared-display              | medium     | template / pattern      | Live status board                   | deferred | Privacy + recurrence review    |
| DataTable             | General           | facilitator                 | low–medium | composition             | Table + sorting/filter chrome       | deferred | Prefer Table primitive first   |
| DateRangePicker       | General           | facilitator                 | low        | composition             | Calendar + range UX                 | deferred | Compose Calendar + Popover     |
| App Sidebar variants  | Facilitator apps  | facilitator                 | medium     | template                | Conflicts with FacilitatorShell     | deferred | Shell roadmap                  |

## Classification guide for audits

- **Primitive gap** — standard UI primitive absent from the registry (should be rare after 0.3.0)
- **Reusable component candidate** — cross-project composition
- **Pattern candidate** — complete interaction slice
- **Template candidate** — page-level operational or display composition
- **Application-specific** — game mechanic, visualisation, content, or business logic
- **Insufficient evidence** — potentially reusable but not yet repeated

Do not publish a registry item without sufficient multi-project evidence.
