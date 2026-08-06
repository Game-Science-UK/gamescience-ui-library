# Game domain components (0.5.0)

Reusable game/domain components for discussion, voting, and results compositions.
They sit above primitives and below application-owned patterns:

```text
foundations → themes → primitives → game/domain components → context patterns → app logic
```

Install only the items your game needs. Do **not** install the entire domain set
by default.

## Semantic contract

| Item             | Registry                         | Owns                                     | Does not own                |
| ---------------- | -------------------------------- | ---------------------------------------- | --------------------------- |
| Countdown        | `@gamescience/countdown`         | Presentation of a formatted time value   | Time math, thresholds       |
| PhaseProgress    | `@gamescience/phase-progress`    | Discrete step UI                         | Phase model / rounds        |
| ConnectionBanner | `@gamescience/connection-banner` | Banner chrome for connection states      | Sockets / heartbeat         |
| PhaseHeader      | `@gamescience/phase-header`      | Compact header slots                     | Shell headers, instructions |
| PhaseDirective   | `@gamescience/phase-directive`   | Instruction treatments                   | Phase choreography          |
| RolePanel        | `@gamescience/role-panel`        | Role summary + disclosure                | Role resolution             |
| VoteStatus       | `@gamescience/vote-status`       | Aggregate vote progress                  | Vote mutations / identity   |
| OutcomeSummary   | `@gamescience/outcome-summary`   | Outcome presentation via semantic intent | Outcome taxonomy            |
| StickyActionBar  | `@gamescience/sticky-action-bar` | Bottom action region layout              | Vote state / routing        |

## Context suitability

| Item             | Contexts                                                  |
| ---------------- | --------------------------------------------------------- |
| Countdown        | all                                                       |
| PhaseProgress    | all                                                       |
| ConnectionBanner | all                                                       |
| PhaseHeader      | participant (primary)                                     |
| PhaseDirective   | participant, facilitator                                  |
| RolePanel        | participant                                               |
| VoteStatus       | participant, facilitator, shared-display (aggregate only) |
| OutcomeSummary   | all                                                       |
| StickyActionBar  | participant                                               |

Suitability is catalogue guidance, not a runtime error.

## Typography

Registry components use only:

- `gs-display`, `gs-title`, `gs-body`, `gs-label`, `gs-mono`
- `gs-data` (tabular numeric / data face via `--font-data`)
- `gs-micro` / `gs-eyebrow-dotted` where needed

Do **not** use application `p-*` / `d-*` classes in registry source.

## When not to use

- Prefer `ConnectionStatus` for compact inline connection badges.
- Prefer `WaitingState` for full-surface blocking waits.
- Prefer FacilitatorShell / DisplayHeading for facilitator and shared-display
  chrome instead of PhaseHeader.
- Prefer composing Panel + Badge locally when you only need a one-off card.
- Keep DiscussionView / VoteView / Results patterns application-owned until
  multi-project contracts stabilize.

## Application ownership

Remain local:

- session timing and threshold decisions
- voting mutations and anonymity policy
- role resolution and private data rules
- outcome taxonomy mapping → semantic `intent`
- radar, confetti, reveal choreography, charts, analytics
- option-slot vendor colour systems (deferred from shared theme contract)

## Composition examples

```tsx
<PhaseHeader
  eyebrow={<span className="gs-label">Brand</span>}
  phase={<Badge intent="primary">Discussion</Badge>}
  trailing={<Countdown formattedTime={fmt} state="running" accessibleLabel={label} />}
/>

<RolePanel role={role} priorities={priorities} objective={objective} />

<StickyActionBar status={<VoteStatus voted={n} total={total} />}>
  <Button type="button">Continue</Button>
</StickyActionBar>
```

See Storybook **Components/Game/Domain compositions** for participant discussion
and vote reference assemblies. Those stories are not published registry patterns.

## Spacing / outer layout

Shells own content max-width and safe-area. StickyActionBar uses
`--content-max-width`, `--action-bar-pad-top`, and `--action-bar-safe-bottom`.
Applications should not hard-code mobile widths inside registry components.

## Related docs

- [registry-coverage-backlog.md](./registry-coverage-backlog.md)
- [pattern-composition.md](./pattern-composition.md)
- [migrations/0.4.1-to-0.5.0.md](./migrations/0.4.1-to-0.5.0.md)
