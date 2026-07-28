/**
 * Machine-checkable semantic token contract for GameScience themes.
 * Both gamescience and citadel CSS files must declare every token.
 */

export const REQUIRED_THEME_TOKENS = [
  // Colour
  "--background",
  "--foreground",
  "--surface",
  "--surface-subtle",
  "--surface-raised",
  "--surface-overlay",
  "--border",
  "--border-strong",
  "--focus-ring",
  "--primary",
  "--primary-hover",
  "--primary-active",
  "--primary-foreground",
  "--secondary",
  "--secondary-hover",
  "--secondary-active",
  "--secondary-foreground",
  "--accent",
  "--accent-foreground",
  "--muted",
  "--muted-foreground",
  "--success",
  "--success-foreground",
  "--warning",
  "--warning-foreground",
  "--danger",
  "--danger-foreground",
  "--information",
  "--information-foreground",
  // Shape
  "--radius-control",
  "--radius-card",
  "--radius-panel",
  "--radius-overlay",
  "--radius-pill",
  "--border-width-control",
  "--border-width-panel",
  // Typography
  "--font-display",
  "--font-body",
  "--font-mono",
  "--font-weight-heading",
  "--font-weight-label",
  "--font-weight-body",
  "--tracking-heading",
  "--tracking-label",
  "--text-transform-label",
  // Sizing and density
  "--control-height-sm",
  "--control-height-md",
  "--control-height-lg",
  "--control-padding-inline-sm",
  "--control-padding-inline-md",
  "--control-padding-inline-lg",
  "--panel-padding-sm",
  "--panel-padding-md",
  "--panel-padding-lg",
  "--section-gap",
  "--content-max-width",
  // Depth
  "--shadow-control",
  "--shadow-card",
  "--shadow-overlay",
  "--shadow-focus",
  // Motion
  "--duration-fast",
  "--duration-standard",
  "--duration-emphasis",
  "--ease-standard",
  "--ease-emphasis",
  "--press-scale",
  "--hover-translate",
] as const;

export type ThemeToken = (typeof REQUIRED_THEME_TOKENS)[number];

export const SUPPORTED_THEMES = ["gamescience", "citadel"] as const;
export type GameTheme = (typeof SUPPORTED_THEMES)[number];

export const SUPPORTED_CONTEXTS = ["participant", "facilitator", "shared-display"] as const;
export type ExperienceContext = (typeof SUPPORTED_CONTEXTS)[number];
