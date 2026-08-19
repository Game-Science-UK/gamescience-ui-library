import type { Config } from "tailwindcss";

import base from "../tailwind.config.ts";

/**
 * Tailwind for the documentation site.
 *
 * Extends the library config so previews resolve the same semantic tokens
 * (`bg-surface`, `text-muted-foreground`, …) that registry components use.
 *
 * Site chrome deliberately does **not** use those tokens. Chrome is painted
 * with the `site-*` scale below, which is fixed, so switching a preview's theme
 * re-themes the preview and nothing else.
 */
const config: Config = {
  ...base,
  content: ["./site-app/index.html", "./site-app/src/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    ...base.theme,
    extend: {
      ...base.theme?.extend,
      colors: {
        ...(base.theme?.extend?.colors as Record<string, unknown>),
        site: {
          bg: "hsl(240 6% 7%)",
          panel: "hsl(240 5% 10%)",
          raised: "hsl(240 5% 13%)",
          border: "hsl(240 5% 18%)",
          "border-strong": "hsl(240 5% 26%)",
          fg: "hsl(240 6% 96%)",
          muted: "hsl(240 4% 64%)",
          dim: "hsl(240 4% 46%)",
          accent: "hsl(345 76% 55%)",
          "accent-fg": "hsl(0 0% 100%)",
        },
      },
      fontFamily: {
        site: ["Inter", "system-ui", "sans-serif"],
        "site-mono": ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
};

export default config;
