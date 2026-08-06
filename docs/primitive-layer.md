# Primitive layer

GameScience UI 0.3.0 completes the shared shadcn primitive vocabulary.

## What this means

Standard UI primitives — forms, overlays, menus, disclosure, data display,
layout helpers, and feedback — are available as independently installable
`@gamescience/*` registry items.

APIs stay close to upstream shadcn/Radix conventions so Lovable agents can use
familiar composition patterns such as `Dialog` / `DialogTrigger` /
`DialogContent`.

Theme identity remains token-driven. There is one theme-neutral source
implementation per primitive. Gamescience and Citadel both render through
semantic tokens.

## Install only what you need

Do not install the entire primitive catalogue by default.

Prefer:

1. High-level GameScience patterns when they cover the job
2. Individual primitives when composing application-owned screens
3. Local application UI only for game-specific visuals and mechanics

`@gamescience/base` still installs foundations, provider, utilities, and Sonner
wiring — not every primitive.

## Higher-level components are evidence-driven

0.5.0 adds reusable **game/domain components** (Countdown, PhaseHeader,
VoteStatus, and related items) above this primitive layer. Install them only
when needed — see [game-domain-components.md](./game-domain-components.md).

Further compositions such as Stat, CopyableValue, SelectionGrid, VotingGrid, or
BriefingPanel are **not** added merely because one project uses them. Later
audits decide which repeated compositions deserve registry promotion. See
[registry-coverage-backlog.md](./registry-coverage-backlog.md).

## Game-specific UI stays local

Sector illustrations, minimaps, reveal choreography, scoring, networking, RLS,
and AI functions remain application-owned.

## Date picker and combobox

- Date picker: compose `Calendar` + `Popover` (and optionally `Form`)
- Combobox: compose `Command` + `Popover` (or `Dialog`)

Upstream shadcn also publishes alternate combobox stacks; GameScience keeps the
Command + Popover composition path to avoid introducing a second UI runtime.

## Exclusions in 0.3.0

| Item               | Reason                                                     |
| ------------------ | ---------------------------------------------------------- |
| Chart              | Opinionated recharts dependency; defer                     |
| Sidebar            | Conflicts with FacilitatorShell; defer as template concern |
| Combobox (base-ui) | Alternate stack; use Command + Popover                     |
| DataTable          | Higher-level composition; defer                            |
| DateRangePicker    | Higher-level composition; defer                            |

## Context suitability

Primitives are generally context-neutral at runtime. Documentation metadata may
mark suitability (for example Table → facilitator primarily, Tooltip →
interactive contexts). These are guidance, not runtime errors.
