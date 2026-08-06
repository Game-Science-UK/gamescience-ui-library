## Stack guidance — Tailwind 3

Selected Tailwind integration: **Tailwind 3**.

This branch applies only when the project uses Tailwind 3. It is not universal
guidance for every consumer.

Router / framework detection is separate:

> Tailwind version does not determine router integration.

### Required actions

1. Install `@gamescience/base` and the selected theme normally through the
   immutable registry URL
2. Import the stack-agnostic foundation CSS (`src/foundations/index.css`)
3. Import exactly one theme CSS file
4. Retain the project `tailwind.config.ts` (or `.js`)
5. Merge the required semantic token mappings from the installed token contract /
   `docs/tailwind-v3-integration.md` — including control heights
   (`h-control-*`), primary/secondary hover/active, and focus-ring mappings
6. Retain existing `@tailwind base`, `@tailwind components`, and
   `@tailwind utilities` directives
7. Do **not** install or import `tailwind-v4-bridge.css`
8. Prove the token contract: required utilities must appear in production CSS
   with non-empty declarations, and representative controls must compute to
   expected sizes/state colours. Config presence alone is not enough.

### Application CSS shape

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "./foundations/index.css";
@import "./themes/{{THEME}}.css";
```

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
