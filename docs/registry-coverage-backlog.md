# Registry coverage backlog

Candidates identified from Lovable project audits. **0.5.0** shipped the
discussion/vote/results domain component set listed under “Shipped in 0.5.0”.
Remaining rows need further evidence before promotion.

## Shipped in 0.5.0

| Item             | Layer              | Notes                            |
| ---------------- | ------------------ | -------------------------------- |
| Countdown        | reusable component | `@gamescience/countdown`         |
| PhaseProgress    | reusable component | `@gamescience/phase-progress`    |
| ConnectionBanner | reusable component | `@gamescience/connection-banner` |
| PhaseHeader      | reusable component | `@gamescience/phase-header`      |
| PhaseDirective   | reusable component | `@gamescience/phase-directive`   |
| RolePanel        | reusable component | `@gamescience/role-panel`        |
| VoteStatus       | reusable component | `@gamescience/vote-status`       |
| OutcomeSummary   | reusable component | `@gamescience/outcome-summary`   |
| StickyActionBar  | reusable component | `@gamescience/sticky-action-bar` |

See [game-domain-components.md](./game-domain-components.md).

## Deferred candidates

| Candidate                          | Source projects  | Contexts                     | Frequency  | Likely layer            | Evidence                                   | Status   | Next audit needed                         |
| ---------------------------------- | ---------------- | ---------------------------- | ---------- | ----------------------- | ------------------------------------------ | -------- | ----------------------------------------- |
| DiscussionView                     | Citadel          | participant                  | high       | pattern                 | Heavy app state + choreography             | deferred | After ≥2 projects adopt domain components |
| VoteView                           | Citadel          | participant                  | high       | pattern                 | Vote mutations + reveal prep               | deferred | Multi-project API comparison              |
| SharedVoteReveal                   | Citadel          | shared-display               | medium     | pattern                 | Reveal choreography                        | deferred | Keep app-owned motion                     |
| ParticipantResults / SharedResults | Citadel          | participant / shared-display | medium     | pattern                 | Outcome taxonomy + charts                  | deferred | Compose OutcomeSummary locally first      |
| FacilitatorDebrief                 | Citadel          | facilitator                  | medium     | pattern                 | Ops + narrative                            | deferred | Multi-project recurrence                  |
| LockedSelectionPanel               | Citadel          | participant                  | medium     | reusable component      | Tied to option-slot identity               | deferred | After option-slot decision                |
| AttentionRedirectBanner            | Citadel          | multi                        | medium     | reusable component      | Banner vs takeover variance                | deferred | Coordination doctrine                     |
| CompanyContext                     | Citadel          | participant                  | low        | composition             | Tiny strip; PhaseHeader subbar may suffice | deferred | Confirm standalone value                  |
| Option-slot colour ramp            | Citadel (vendor) | vote/results                 | medium     | theme tokens            | Single-app vendor slots                    | deferred | Sentinel + other audits                   |
| Stat                               | Sentinel 3.0     | facilitator, shared-display  | medium     | reusable component      | Metric tiles                               | deferred | After domain adoption                     |
| CopyableValue                      | Sentinel 3.0     | facilitator                  | medium     | reusable component      | Copyable codes/IDs                         | deferred | Recurrence check                          |
| SelectionGrid / VotingGrid         | Sentinel 3.0     | participant                  | medium     | pattern                 | Choice grids                               | deferred | Multi-project recurrence                  |
| BriefingPanel                      | Sentinel 3.0     | participant / facilitator    | medium     | pattern                 | Briefing shell                             | deferred | Compare with PhaseDirective + Panel       |
| FacilitatorOperations              | Sentinel 3.0     | facilitator                  | medium     | template / app-specific | Ops control strip                          | deferred | Keep local                                |
| SharedDisplayBoard                 | Sentinel 3.0     | shared-display               | medium     | template / pattern      | Live board                                 | deferred | Privacy + recurrence                      |
| DataTable / DateRangePicker        | General          | facilitator                  | low–medium | composition             | Prefer primitives first                    | deferred | Compose Table / Calendar                  |
| App Sidebar variants               | Facilitator apps | facilitator                  | medium     | template                | Conflicts with FacilitatorShell            | deferred | Shell roadmap                             |

## Classification guide for audits

- **Primitive gap** — standard UI primitive absent from the registry (should be rare after 0.3.0)
- **Reusable component candidate** — cross-project composition
- **Pattern candidate** — complete interaction slice
- **Template candidate** — page-level operational or display composition
- **Application-specific** — game mechanic, visualisation, content, or business logic
- **Insufficient evidence** — potentially reusable but not yet repeated

Do not publish a registry item without sufficient multi-project evidence.
