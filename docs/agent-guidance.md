# Agent guidance

See the root [`AGENTS.md`](../AGENTS.md) for the authoritative agent operating rules.

Additional notes:

- Always read `public/registry/agent-catalogue.json` before inventing UI
- Prefer a complete registry pattern over assembling primitives — see
  Storybook **Components/Examples/Patterns** for `decision`, `timed-round`,
  `briefing`, `scripted-reveal`, `results`, `debrief`, `facilitator-console`,
  `shared-display-game`, `attention-takeover`, and the join/lobby flows
- Prefer Storybook reference screens under `Templates` when available
- Use the same fixtures across participant, facilitator, and shared-display stories when proving state presentation
- When proposing a new registry item, update `scripts/registry-manifest.ts` and regenerate the catalogue
