# Registry coverage backlog

Candidates identified from Lovable project audits. **0.5.0** shipped the
discussion/vote/results domain component set listed under "Shipped in 0.5.0".
**1.1.0** promoted the core game loop into game-agnostic patterns after
two-project evidence (Citadel 4.1 + MS Deal Room).

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

## Promoted in 1.1.0

Two-project evidence (Citadel 4.1 + MS Deal Room) promoted the core game loop into
game-agnostic patterns and added the missing domain components:

| Candidate                          | Promoted to           | Layer     |
| ---------------------------------- | --------------------- | --------- |
| VoteView + DiscussionView          | `decision`            | pattern   |
| SelectionGrid / VotingGrid         | `decision`            | pattern   |
| SharedVoteReveal                   | `shared-display-game` | pattern   |
| ParticipantResults / SharedResults | `results`             | pattern   |
| FacilitatorDebrief                 | `debrief`             | pattern   |
| BriefingPanel                      | `briefing`            | pattern   |
| AttentionRedirectBanner            | `attention-takeover`  | pattern   |
| Stat                               | `stat`                | component |
| (new) Option selector              | `option-selector`     | component |
| (new) Intensity selector           | `intensity-selector`  | component |
| (new) Star rating                  | `rating`              | component |

Also added `timed-round`, `facilitator-console`, `scripted-reveal`, and
`shared-display-game` container patterns to complete the loop.

## Deferred candidates

| Candidate                          | Source projects  | Contexts                     | Frequency  | Likely layer            | Evidence                                   | Status   | Next audit needed                          |
| ---------------------------------- | ---------------- | ---------------------------- | ---------- | ----------------------- | ------------------------------------------ | -------- | ------------------------------------------ |
| DiscussionView                     | Citadel          | participant                  | high       | pattern                 | Heavy app state + choreography             | promoted | Promoted to `decision` in 1.1.0            |
| VoteView                           | Citadel          | participant                  | high       | pattern                 | Vote mutations + reveal prep               | promoted | Promoted to `decision` in 1.1.0            |
| SharedVoteReveal                   | Citadel          | shared-display               | medium     | pattern                 | Reveal choreography                        | promoted | Promoted to `shared-display-game` in 1.1.0 |
| ParticipantResults / SharedResults | Citadel          | participant / shared-display | medium     | pattern                 | Outcome taxonomy + charts                  | promoted | Promoted to `results` in 1.1.0             |
| FacilitatorDebrief                 | Citadel          | facilitator                  | medium     | pattern                 | Ops + narrative                            | promoted | Promoted to `debrief` in 1.1.0             |
| LockedSelectionPanel               | Citadel          | participant                  | medium     | reusable component      | Tied to option-slot identity               | deferred | After option-slot decision                 |
| AttentionRedirectBanner            | Citadel          | multi                        | medium     | reusable component      | Banner vs takeover variance                | promoted | Promoted to `attention-takeover` in 1.1.0  |
| CompanyContext                     | Citadel          | participant                  | low        | composition             | Tiny strip; PhaseHeader subbar may suffice | deferred | Confirm standalone value                   |
| Option-slot colour ramp            | Citadel (vendor) | vote/results                 | medium     | theme tokens            | Single-app vendor slots                    | deferred | Sentinel + other audits                    |
| Stat                               | Sentinel 3.0     | facilitator, shared-display  | medium     | reusable component      | Metric tiles                               | promoted | Promoted to `stat` in 1.1.0                |
| CopyableValue                      | Sentinel 3.0     | facilitator                  | medium     | reusable component      | Copyable codes/IDs                         | deferred | Recurrence check                           |
| SelectionGrid / VotingGrid         | Sentinel 3.0     | participant                  | medium     | pattern                 | Choice grids                               | promoted | Promoted to `decision` in 1.1.0            |
| BriefingPanel                      | Sentinel 3.0     | participant / facilitator    | medium     | pattern                 | Briefing shell                             | promoted | Promoted to `briefing` in 1.1.0            |
| FacilitatorOperations              | Sentinel 3.0     | facilitator                  | medium     | template / app-specific | Ops control strip                          | promoted | Promoted to `facilitator-console` in 1.1.0 |
| SharedDisplayBoard                 | Sentinel 3.0     | shared-display               | medium     | template / pattern      | Live board                                 | promoted | Promoted to `shared-display-game` in 1.1.0 |
| DataTable / DateRangePicker        | General          | facilitator                  | low–medium | composition             | Prefer primitives first                    | deferred | Compose Table / Calendar                   |
| App Sidebar variants               | Facilitator apps | facilitator                  | medium     | template                | Conflicts with FacilitatorShell            | deferred | Shell roadmap                              |

## Classification guide for audits

- **Primitive gap** — standard UI primitive absent from the registry (should be rare after 0.3.0)
- **Reusable component candidate** — cross-project composition
- **Pattern candidate** — complete interaction slice
- **Template candidate** — page-level operational or display composition
- **Application-specific** — game mechanic, visualisation, content, or business logic
- **Insufficient evidence** — potentially reusable but not yet repeated

Do not publish a registry item without sufficient multi-project evidence.
