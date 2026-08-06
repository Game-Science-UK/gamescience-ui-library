import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx,mdx}",
    "./.storybook/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        surface: {
          DEFAULT: "oklch(var(--surface) / <alpha-value>)",
          subtle: "oklch(var(--surface-subtle) / <alpha-value>)",
          raised: "oklch(var(--surface-raised) / <alpha-value>)",
          overlay: "oklch(var(--surface-overlay) / <alpha-value>)",
        },
        border: {
          DEFAULT: "oklch(var(--border) / <alpha-value>)",
          strong: "oklch(var(--border-strong) / <alpha-value>)",
        },
        "focus-ring": "oklch(var(--focus-ring) / <alpha-value>)",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          hover: "oklch(var(--primary-hover) / <alpha-value>)",
          active: "oklch(var(--primary-active) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          hover: "oklch(var(--secondary-hover) / <alpha-value>)",
          active: "oklch(var(--secondary-active) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "oklch(var(--success) / <alpha-value>)",
          foreground: "oklch(var(--success-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "oklch(var(--warning) / <alpha-value>)",
          foreground: "oklch(var(--warning-foreground) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "oklch(var(--danger) / <alpha-value>)",
          foreground: "oklch(var(--danger-foreground) / <alpha-value>)",
        },
        information: {
          DEFAULT: "oklch(var(--information) / <alpha-value>)",
          foreground: "oklch(var(--information-foreground) / <alpha-value>)",
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
