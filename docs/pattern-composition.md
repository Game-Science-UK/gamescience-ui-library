# Pattern composition

Prefer complete registry patterns over assembling primitives. Keep application
logic, networking and game-specific visuals outside registry files.

## Shell + pattern + app-owned siblings

Context shells wrap the page. Patterns fill the primary composition. Application
owned media can sit **beside** the pattern inside the shell without forking:

```tsx
<SharedDisplayShell>
  <SharedDisplayLobby session={session} status={status} />
  {/* Application-owned — no registry QR/radar API required */}
  <aside aria-hidden={false}>{/* QR, illustration, ambient visual */}</aside>
</SharedDisplayShell>
```

## SharedDisplayLobby extension point (0.4.1)

**Deferred.** The current API has no `children` / `visual` / `media` slot.

Evidence from the Citadel 0.4.0 migration:

- QR was already composed as a shell sibling — composition works without a slot.
- Dropping `SubstrateRadar` was a visual-loss decision, not proof of a general
  registry need.
- A Citadel-specific `radar` prop is forbidden.

If a future optional slot is added, names under consideration are theme-neutral
(`visual`, `media`, `illustration`, `ambient`). It must be optional, preserve
default output when absent, and not weaken room-code legibility.

Until then: compose application-owned visuals as siblings; record visual-loss
decisions when a pattern replaces local chrome.

## Domain components before patterns (0.5.0)

For discussion, voting, and results screens, compose reusable domain components
first (`countdown`, `phase-header`, `phase-directive`, `role-panel`,
`vote-status`, `outcome-summary`, `sticky-action-bar`, etc.). See
[game-domain-components.md](./game-domain-components.md).

Do **not** expect published DiscussionView / VoteView / Results patterns yet.
Keep those as application compositions until multiple projects share a stable
contract.
