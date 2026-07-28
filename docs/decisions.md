# Architectural decision log

## ADR-001: Themes applied at the root

**Decision:** Apply theme only through `GameScienceProvider` via `data-theme`.

**Why:** Prevents mixed themes, theme props sprawl, and component forks. One game application has one visual identity.

## ADR-002: Context is separate from theme

**Decision:** `participant` / `facilitator` / `shared-display` are experience contexts, not themes.

**Why:** The same brand must serve mobile participants, desktop facilitators, and large shared displays with different density and interaction rules.

## ADR-003: No theme-specific primitive forks

**Decision:** Prohibit `CitadelButton`, `TechInput`, `GlassCard` as core primitives.

**Why:** Visual differences belong in tokens. Forks duplicate behaviour and break registry consistency.

## ADR-004: Sonner is the only toast system

**Decision:** Use Sonner exclusively; do not ship legacy toast/toaster/use-toast.

**Why:** Existing workspace fragmentation caused dual toast systems. One approved approach reduces agent confusion.

## ADR-005: Curated registry subset

**Decision:** Ship only components needed by real GameScience patterns, not all ~46 shadcn primitives.

**Why:** Lovable projects already contain unused defaults. Catalogue presence — not file presence — is the source of truth.

## ADR-006: Source distribution via static registry

**Decision:** Distribute as a public static shadcn registry rather than a private runtime npm package.

**Why:** Matches Lovable/shadcn workflows, avoids private npm credential requirements, and keeps installed UI editable as project-local source.

## ADR-007: Domain-led folders

**Decision:** Organise by `ui` / `game` / `display` / `patterns` / `templates` instead of atoms/molecules/organisms.

**Why:** Domain folders communicate purpose to humans and agents more clearly than subjective atomic tiers.

## ADR-008: Start with two themes and a lobby vertical slice

**Decision:** Implement `gamescience` + `citadel` and join/lobby across all three contexts before expanding the catalogue.

**Why:** Proves theme architecture, context behaviour, Storybook controls, registry distribution, and agent docs with a complete thin slice.
