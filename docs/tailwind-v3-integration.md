# Tailwind CSS v3 integration

GameScience foundations are stack-agnostic. There is **no** separate Tailwind 3
registry item. Consumers install `@gamescience/base` and one theme through the
same immutable registry URLs used by Tailwind 4 projects.

React and router choice is independent of Tailwind support. Tailwind version
does not determine router integration.

## What base provides

`@gamescience/base` installs:

- stack-agnostic foundation tokens and CSS (`src/foundations/`)
- provider, utilities, version metadata, and shared helpers

It does **not** install a Tailwind 3 config, a Tailwind 4 bridge, or a framework
router.

Semantic colour tokens are authored as **HSL triplets** (for example
`221 83% 53%`), not complete `hsl()` values. Themes implement every token in
`src/themes/theme-contract.ts`.

## Application ownership

Tailwind 3 consumers retain their own `tailwind.config.ts` (or `.js`).

They must:

1. Keep existing `@tailwind base`, `@tailwind components`, and
   `@tailwind utilities` directives
2. Import the stack-agnostic foundation CSS and **exactly one** theme CSS
3. Map GameScience semantic tokens through `hsl(var(--token))` (and related
   `var(--token)` mappings for non-colour tokens)
4. **Not** install or import `tailwind-v4-bridge.css`

## Application CSS entry

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "./foundations/index.css";
@import "./themes/gamescience.css"; /* or citadel.css */
```

Do not place `@tailwind` directives inside GameScience foundation files.

## Required `tailwind.config.ts` mappings

Derive the map from the registry token contract
(`src/themes/theme-contract.ts`) and the library’s own Tailwind 3 config. The
colour channels use HSL triplets with optional alpha via
`hsl(var(--token) / <alpha-value>)`.

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        surface: {
          DEFAULT: "hsl(var(--surface) / <alpha-value>)",
          subtle: "hsl(var(--surface-subtle) / <alpha-value>)",
          raised: "hsl(var(--surface-raised) / <alpha-value>)",
          overlay: "hsl(var(--surface-overlay) / <alpha-value>)",
        },
        border: {
          DEFAULT: "hsl(var(--border) / <alpha-value>)",
          strong: "hsl(var(--border-strong) / <alpha-value>)",
        },
        "focus-ring": "hsl(var(--focus-ring) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          hover: "hsl(var(--primary-hover) / <alpha-value>)",
          active: "hsl(var(--primary-active) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          hover: "hsl(var(--secondary-hover) / <alpha-value>)",
          active: "hsl(var(--secondary-active) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          foreground: "hsl(var(--warning-foreground) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "hsl(var(--danger) / <alpha-value>)",
          foreground: "hsl(var(--danger-foreground) / <alpha-value>)",
        },
        information: {
          DEFAULT: "hsl(var(--information) / <alpha-value>)",
          foreground: "hsl(var(--information-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        control: "var(--radius-control)",
        card: "var(--radius-card)",
        panel: "var(--radius-panel)",
        overlay: "var(--radius-overlay)",
        pill: "var(--radius-pill)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
      },
      fontWeight: {
        heading: "var(--font-weight-heading)",
        label: "var(--font-weight-label)",
        body: "var(--font-weight-body)",
      },
      letterSpacing: {
        heading: "var(--tracking-heading)",
        label: "var(--tracking-label)",
      },
      boxShadow: {
        control: "var(--shadow-control)",
        card: "var(--shadow-card)",
        overlay: "var(--shadow-overlay)",
        focus: "var(--shadow-focus)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        standard: "var(--duration-standard)",
        emphasis: "var(--duration-emphasis)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
        emphasis: "var(--ease-emphasis)",
      },
      maxWidth: {
        content: "var(--content-max-width)",
      },
      spacing: {
        "section-gap": "var(--section-gap)",
        "panel-sm": "var(--panel-padding-sm)",
        "panel-md": "var(--panel-padding-md)",
        "panel-lg": "var(--panel-padding-lg)",
      },
      minHeight: {
        "control-sm": "var(--control-height-sm)",
        "control-md": "var(--control-height-md)",
        "control-lg": "var(--control-height-lg)",
      },
      height: {
        "control-sm": "var(--control-height-sm)",
        "control-md": "var(--control-height-md)",
        "control-lg": "var(--control-height-lg)",
      },
    },
  },
  plugins: [],
};

export default config;
```

Notes:

- GameScience does **not** define `--input` or `--ring`. Use `border` /
  `border-strong` and `focus-ring` (utilities such as `border-border`,
  `ring-focus-ring`, `shadow-focus`).
- Shape, typography, shadow, sizing, and motion tokens above are part of the
  same contract; merge them into the consumer config rather than inventing a
  second token set.
- When the published contract gains tokens, update the consumer map from
  `theme-contract.ts` / the installed base payload — do not rely on memory.

## Install

```bash
npx shadcn@latest add @gamescience/base
npx shadcn@latest add @gamescience/theme-gamescience   # or theme-citadel
```

Use the immutable versioned registry URL, for example:

```text
https://game-science-uk.github.io/gamescience-ui-library/versions/<version>/r/{name}.json
```

## Do not install the Tailwind 4 bridge

`docs/tailwind-v4-bridge.css` / `consumer/tailwind-v4-bridge.css` is for Tailwind 4
/ CSS-first consumers only. Tailwind 3 projects must not import it.

## Related

- [tailwind-v4-integration.md](./tailwind-v4-integration.md)
- [theming.md](./theming.md)
- [font-loading.md](./font-loading.md)
- [registry-usage.md](./registry-usage.md)
