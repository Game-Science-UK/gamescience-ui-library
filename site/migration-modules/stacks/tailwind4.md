## Stack guidance — Tailwind 4

Selected Tailwind integration: **Tailwind 4**.

This branch applies only when the project uses Tailwind 4 (including typical
Lovable Tailwind 4 projects). It is not universal guidance for every consumer.

Router / framework detection is separate:

> Tailwind version does not determine router integration.

### Required actions

1. Install `@gamescience/base` and the selected theme normally through the
   immutable registry URL
2. Import the stack-agnostic foundation CSS (`src/foundations/index.css`)
3. Import exactly one theme CSS file
4. Install/import the approved Tailwind 4 bridge
   (`docs/tailwind-v4-integration.md` / published `tailwind-v4-bridge.css`)
5. Use CSS-first scanning and token mapping
6. Do **not** introduce `tailwind.config.ts` merely for the registry
7. No circular `@theme` mappings such as `--x: var(--x)`
8. No remote font `@import` in theme/foundation CSS — load fonts via
   application-owned HTML `<link>` elements

### Application CSS shape

```css
@import "tailwindcss";
@import "./foundations/index.css";
@import "./themes/{{THEME}}.css";
@import "./gamescience-tw4-bridge.css";
```

Preserve the project’s existing framework and router. Do not rebuild the app as
a generic Vite project solely to consume the registry.

### Stack support classification

Inspect the installed registry payload, foundation CSS, and declared
dependencies before classifying support. Do not infer support solely from the
names of published guides.

Classify as one of:

- Supported
- Supported with stack-specific integration
- Unsupported
- Uncertain — payload inspection required

Use “blocking mismatch” only for a verified incompatibility.
