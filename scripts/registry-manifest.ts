import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";
import { SUPPORTED_THEMES, type GameTheme } from "../src/themes/theme-contract.ts";

/**
 * Every theme in the contract. Items omitting `catalogue.themes` are
 * theme-agnostic and resolve to this list, so adding a theme to
 * `SUPPORTED_THEMES` propagates without touching each item.
 */
export const ALL_THEMES: readonly GameTheme[] = SUPPORTED_THEMES;

export type RegistryItemType =
  | "registry:style"
  | "registry:theme"
  | "registry:ui"
  | "registry:component"
  | "registry:block"
  | "registry:lib"
  | "registry:file";

export interface RegistryFile {
  path: string;
  type: RegistryItemType;
  target?: string;
}

export interface RegistryItemDefinition {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  category: "base" | "theme" | "component" | "pattern" | "template";
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  catalogue: {
    useWhen: string[];
    avoid: string[];
    preferOver?: string[];
    contexts: Array<"participant" | "facilitator" | "shared-display" | "all">;
    /** Omit for theme-agnostic items; resolves to every supported theme. */
    themes?: readonly GameTheme[];
    related?: string[];
    props?: string[];
    family?:
      | "foundations"
      | "themes"
      | "forms"
      | "overlays"
      | "navigation"
      | "disclosure"
      | "data-display"
      | "feedback"
      | "layout"
      | "game-display"
      | "patterns"
      | "templates"
      | "core-ui";
    interactive?: boolean;
    portal?: boolean;
  };
}

export const REGISTRY_NAMESPACE = "@gamescience";
export const REGISTRY_VERSION = GAMESCIENCE_UI_VERSION;

/**
 * Configurable registry base for local development docs/install examples.
 * Production consumers should pin the GitHub Pages versioned URL — see scripts/pages-config.ts.
 */
export const REGISTRY_BASE_URL = process.env.GAMESCIENCE_REGISTRY_URL ?? "http://localhost:4343";

/** Public GitHub Pages site used in published consumer metadata and docs. */
export const PUBLIC_PAGES_SITE_URL =
  process.env.GAMESCIENCE_PAGES_URL ?? "https://game-science-uk.github.io/gamescience-ui-library";

export const registryItems: RegistryItemDefinition[] = [
  {
    name: "base",
    type: "registry:style",
    title: "GameScience Base",
    description: "Provider, token foundations, utilities, and shared types.",
    category: "base",
    dependencies: [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "sonner",
      "lucide-react",
      "@radix-ui/react-slot",
      "@radix-ui/react-label",
      "@radix-ui/react-progress",
    ],
    files: [
      {
        path: "src/foundations/tokens.css",
        type: "registry:file",
        target: "src/foundations/tokens.css",
      },
      {
        path: "src/foundations/typography.css",
        type: "registry:file",
        target: "src/foundations/typography.css",
      },
      {
        path: "src/foundations/motion.css",
        type: "registry:file",
        target: "src/foundations/motion.css",
      },
      {
        path: "src/foundations/responsive.css",
        type: "registry:file",
        target: "src/foundations/responsive.css",
      },
      {
        path: "src/foundations/index.css",
        type: "registry:file",
        target: "src/foundations/index.css",
      },
      {
        path: "src/themes/theme-contract.ts",
        type: "registry:lib",
        target: "src/themes/theme-contract.ts",
      },
      { path: "src/themes/index.ts", type: "registry:lib", target: "src/themes/index.ts" },
      { path: "src/lib/cn.ts", type: "registry:lib", target: "src/lib/cn.ts" },
      {
        path: "src/lib/accessibility.ts",
        type: "registry:lib",
        target: "src/lib/accessibility.ts",
      },
      {
        path: "src/lib/connection.ts",
        type: "registry:lib",
        target: "src/lib/connection.ts",
      },
      { path: "src/lib/version.ts", type: "registry:lib", target: "src/lib/version.ts" },
      {
        path: "src/providers/game-theme-context.ts",
        type: "registry:lib",
        target: "src/providers/game-theme-context.ts",
      },
      {
        path: "src/providers/experience-context.ts",
        type: "registry:lib",
        target: "src/providers/experience-context.ts",
      },
      {
        path: "src/providers/gamescience-provider.tsx",
        type: "registry:component",
        target: "src/providers/gamescience-provider.tsx",
      },
      { path: "src/providers/index.ts", type: "registry:lib", target: "src/providers/index.ts" },
      { path: "src/types/game.ts", type: "registry:lib", target: "src/types/game.ts" },
      {
        path: "src/components/ui/sonner.tsx",
        type: "registry:ui",
        target: "src/components/ui/sonner.tsx",
      },
      {
        path: "consumer/gamescience-ui.json",
        type: "registry:file",
        // shadcn CLI resolves registry:file under src/; keep a stable agent-readable path.
        target: "src/docs/gamescience-ui.json",
      },
      {
        path: "consumer/gamescience-ui-guidance.md",
        type: "registry:file",
        target: "src/docs/gamescience-ui-guidance.md",
      },
    ],
    catalogue: {
      useWhen: ["bootstrapping a GameScience game application"],
      avoid: [
        "installing without selecting a theme",
        "nesting multiple GameScienceProvider themes",
      ],
      contexts: ["all"],
      props: ["theme", "context", "register", "className"],
    },
  },
  {
    name: "theme-gamescience",
    type: "registry:theme",
    title: "GameScience Theme",
    description: "House theme CSS for GameScience applications.",
    category: "theme",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/themes/gamescience.css",
        type: "registry:file",
        target: "src/themes/gamescience.css",
      },
    ],
    catalogue: {
      useWhen: ["using the default GameScience visual identity"],
      avoid: ["mixing with citadel in the same screen"],
      contexts: ["all"],
      themes: ["gamescience"],
      related: ["theme-citadel"],
    },
  },
  {
    name: "theme-citadel",
    type: "registry:theme",
    title: "Citadel Theme",
    description:
      "Citadel 4.1 HUD theme CSS with semantic tokens and theme-scoped treatments — no component forks. Font stacks only; load fonts at the application level (see docs/font-loading.md).",
    category: "theme",
    registryDependencies: ["base"],
    files: [
      { path: "src/themes/citadel.css", type: "registry:file", target: "src/themes/citadel.css" },
    ],
    catalogue: {
      useWhen: ["building Citadel-branded game experiences"],
      avoid: [
        "creating CitadelButton or other theme-named forks",
        "installing alongside theme-gamescience as concurrent nested themes",
      ],
      contexts: ["all"],
      themes: ["citadel"],
      related: ["theme-gamescience"],
    },
  },
  {
    name: "theme-sentinel",
    type: "registry:theme",
    title: "Sentinel Theme",
    description:
      "Sentinel theme CSS with semantic tokens and theme-scoped treatments — no component forks. Font stacks only; load fonts at the application level (see docs/font-loading.md).",
    category: "theme",
    registryDependencies: ["base"],
    files: [
      { path: "src/themes/sentinel.css", type: "registry:file", target: "src/themes/sentinel.css" },
    ],
    catalogue: {
      useWhen: ["building Sentinel-branded game experiences"],
      avoid: [
        "creating SentinelButton or other theme-named forks",
        "installing alongside another theme as concurrent nested themes",
      ],
      contexts: ["all"],
      themes: ["sentinel"],
      related: ["theme-gamescience", "theme-citadel"],
    },
  },
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "Semantic button primitive with intent, size, emphasis, and loading states.",
    category: "component",
    registryDependencies: ["base"],
    dependencies: ["@radix-ui/react-slot", "class-variance-authority", "lucide-react"],
    files: [
      {
        path: "src/components/ui/button.tsx",
        type: "registry:ui",
        target: "src/components/ui/button.tsx",
      },
      {
        path: "src/components/ui/button-group.tsx",
        type: "registry:ui",
        target: "src/components/ui/button-group.tsx",
      },
    ],
    catalogue: {
      useWhen: ["primary and secondary actions across all contexts"],
      avoid: ["passing theme or glass/neon visual props"],
      preferOver: ["TechButton", "CitadelButton"],
      contexts: ["all"],
      props: ["intent", "size", "emphasis", "loading", "disabled"],
    },
  },
  {
    name: "input",
    type: "registry:ui",
    title: "Input",
    description: "Text input primitive with invalid-state support.",
    category: "component",
    registryDependencies: ["base", "label"],
    files: [
      {
        path: "src/components/ui/input.tsx",
        type: "registry:ui",
        target: "src/components/ui/input.tsx",
      },
    ],
    catalogue: {
      useWhen: ["collecting short text values"],
      avoid: ["using placeholder-only labels"],
      preferOver: ["TechInput"],
      contexts: ["participant", "facilitator"],
      props: ["invalid", "disabled"],
      family: "forms",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "panel",
    type: "registry:ui",
    title: "Panel",
    description: "Surface container with semantic elevation and emphasis.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/panel.tsx",
        type: "registry:ui",
        target: "src/components/ui/panel.tsx",
      },
    ],
    catalogue: {
      useWhen: ["grouping related content on a surface"],
      avoid: ["GlassCard as a core primitive"],
      preferOver: ["GlassCard", "TechPanel"],
      contexts: ["all"],
      props: ["elevation", "padding", "emphasis"],
    },
  },
  {
    name: "badge",
    type: "registry:ui",
    title: "Badge",
    description: "Compact status and metadata label with semantic intent and treatment axes.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/badge.tsx",
        type: "registry:ui",
        target: "src/components/ui/badge.tsx",
      },
    ],
    catalogue: {
      useWhen: ["showing compact status values"],
      avoid: [
        "colour-only status without text",
        "intent=outline (deprecated — use treatment=outlined)",
      ],
      contexts: ["all"],
      props: ["intent", "treatment"],
    },
  },
  {
    name: "alert",
    type: "registry:ui",
    title: "Alert",
    description: "Inline status messaging with icons and titles.",
    category: "component",
    registryDependencies: ["base"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/components/ui/alert.tsx",
        type: "registry:ui",
        target: "src/components/ui/alert.tsx",
      },
    ],
    catalogue: {
      useWhen: ["surfacing form or operational warnings"],
      avoid: ["using alerts for transient toast notifications — use Sonner"],
      contexts: ["participant", "facilitator"],
      props: ["intent", "title"],
    },
  },
  {
    name: "progress",
    type: "registry:ui",
    title: "Progress",
    description: "Determinate progress indicator.",
    category: "component",
    registryDependencies: ["base"],
    dependencies: ["@radix-ui/react-progress"],
    files: [
      {
        path: "src/components/ui/progress.tsx",
        type: "registry:ui",
        target: "src/components/ui/progress.tsx",
      },
    ],
    catalogue: {
      useWhen: ["showing lobby fill or round completion"],
      avoid: ["encoding game scoring logic in the component"],
      contexts: ["all"],
      props: ["value", "label"],
    },
  },
  {
    name: "skeleton",
    type: "registry:ui",
    title: "Skeleton",
    description: "Loading placeholder surface.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/skeleton.tsx",
        type: "registry:ui",
        target: "src/components/ui/skeleton.tsx",
      },
    ],
    catalogue: {
      useWhen: ["reserving layout while content loads"],
      avoid: ["using as a decorative element"],
      contexts: ["all"],
    },
  },
  {
    name: "game-code-input",
    type: "registry:component",
    title: "Game Code Input",
    description: "Room/session code field with validation messaging.",
    category: "component",
    registryDependencies: ["base", "input"],
    files: [
      {
        path: "src/components/game/game-code-input.tsx",
        type: "registry:component",
        target: "src/components/game/game-code-input.tsx",
      },
    ],
    catalogue: {
      useWhen: ["collecting a participant room code"],
      avoid: ["embedding networking validation inside the component"],
      contexts: ["participant"],
      related: ["join-flow"],
      props: ["value", "onChange", "error", "hint"],
    },
  },
  {
    name: "connection-status",
    type: "registry:component",
    title: "Connection Status",
    description: "Accessible connection state presentation.",
    category: "component",
    registryDependencies: ["base", "badge", "button"],
    files: [
      {
        path: "src/components/game/connection-status.tsx",
        type: "registry:component",
        target: "src/components/game/connection-status.tsx",
      },
    ],
    catalogue: {
      useWhen: ["showing connected, reconnecting, or offline state"],
      avoid: ["colour-only status without labels"],
      contexts: ["participant", "facilitator"],
      props: ["state", "attempt", "onRetry"],
    },
  },
  {
    name: "participant-identity",
    type: "registry:component",
    title: "Participant Identity",
    description: "Display-name capture for join flows.",
    category: "component",
    registryDependencies: ["base", "input"],
    files: [
      {
        path: "src/components/game/participant-identity.tsx",
        type: "registry:component",
        target: "src/components/game/participant-identity.tsx",
      },
    ],
    catalogue: {
      useWhen: ["collecting a participant display name"],
      avoid: ["storing identity persistence inside the component"],
      contexts: ["participant"],
      related: ["join-flow"],
    },
  },
  {
    name: "participant-status",
    type: "registry:component",
    title: "Participant Status",
    description: "Connection and readiness summary for a participant.",
    category: "component",
    registryDependencies: ["base", "badge", "connection-status"],
    files: [
      {
        path: "src/components/game/participant-status.tsx",
        type: "registry:component",
        target: "src/components/game/participant-status.tsx",
      },
    ],
    catalogue: {
      useWhen: ["rendering facilitator participant lists"],
      avoid: ["showing private role information on shared display"],
      contexts: ["facilitator"],
      related: ["lobby"],
    },
  },
  {
    name: "waiting-state",
    type: "registry:component",
    title: "Waiting State",
    description: "Centered waiting/idle messaging.",
    category: "component",
    registryDependencies: ["base", "spinner"],
    files: [
      {
        path: "src/components/game/waiting-state.tsx",
        type: "registry:component",
        target: "src/components/game/waiting-state.tsx",
      },
    ],
    catalogue: {
      useWhen: ["lobby and transitional waiting moments"],
      avoid: ["encoding timers or stage authority"],
      contexts: ["all"],
    },
  },
  {
    name: "countdown",
    type: "registry:component",
    title: "Countdown",
    description:
      "Semantic elapsed or remaining time display. Does not calculate time — pass a formatted value.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/game/countdown.tsx",
        type: "registry:component",
        target: "src/components/game/countdown.tsx",
      },
    ],
    catalogue: {
      useWhen: ["showing stage timers or remaining time in headers and HUDs"],
      avoid: [
        "passing raw seconds and deriving warning thresholds inside the component",
        "announcing every second by default",
      ],
      contexts: ["all"],
      family: "game-display",
      interactive: false,
      portal: false,
      props: ["formattedTime", "label", "intent", "state", "treatment", "size", "accessibleLabel"],
      related: ["phase-header", "sticky-action-bar"],
    },
  },
  {
    name: "phase-progress",
    type: "registry:component",
    title: "Phase Progress",
    description: "Discrete phase or step progression without owning the game phase model.",
    category: "component",
    registryDependencies: ["base", "badge"],
    files: [
      {
        path: "src/components/game/phase-progress.tsx",
        type: "registry:component",
        target: "src/components/game/phase-progress.tsx",
      },
    ],
    catalogue: {
      useWhen: ["communicating ordered phase steps across facilitator or display surfaces"],
      avoid: ["embedding round semantics", "replacing linear Progress for continuous values"],
      contexts: ["all"],
      family: "game-display",
      interactive: false,
      portal: false,
      props: ["steps", "activeId", "label", "trailingStatus", "density"],
      related: ["progress", "badge"],
    },
  },
  {
    name: "connection-banner",
    type: "registry:component",
    title: "Connection Banner",
    description:
      "Significant connection interruption banner. Complements compact ConnectionStatus and blocking WaitingState.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/game/connection-banner.tsx",
        type: "registry:component",
        target: "src/components/game/connection-banner.tsx",
      },
    ],
    catalogue: {
      useWhen: ["surfacing reconnecting, disconnected, or restored connection across a surface"],
      avoid: [
        "owning socket or heartbeat logic",
        "replacing compact ConnectionStatus for inline badges",
      ],
      preferOver: ["duplicating Alert solely for connection chrome"],
      contexts: ["all"],
      family: "game-display",
      interactive: true,
      portal: false,
      props: ["state", "title", "description", "action", "treatment"],
      related: ["connection-status", "waiting-state", "alert", "button"],
    },
  },
  {
    name: "phase-header",
    type: "registry:component",
    title: "Phase Header",
    description:
      "Compact participant/game surface header with eyebrow, phase pill, and trailing status slots.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/game/phase-header.tsx",
        type: "registry:component",
        target: "src/components/game/phase-header.tsx",
      },
    ],
    catalogue: {
      useWhen: ["participant operational headers with phase and timer regions"],
      avoid: [
        "replacing FacilitatorShell or DisplayHeading",
        "putting instructional body copy in the header",
      ],
      contexts: ["participant"],
      family: "game-display",
      interactive: false,
      portal: false,
      props: ["eyebrow", "phase", "trailing", "intent", "sticky"],
      related: ["countdown", "phase-directive", "badge"],
    },
  },
  {
    name: "phase-directive",
    type: "registry:component",
    title: "Phase Directive",
    description:
      "Current-task instruction or phase guidance with plain, strip, or panel treatments.",
    category: "component",
    registryDependencies: ["base", "panel"],
    files: [
      {
        path: "src/components/game/phase-directive.tsx",
        type: "registry:component",
        target: "src/components/game/phase-directive.tsx",
      },
    ],
    catalogue: {
      useWhen: ["showing the current participant or facilitator task instruction"],
      avoid: ["owning phase-change animation", "encoding game rules"],
      contexts: ["participant", "facilitator"],
      family: "game-display",
      interactive: false,
      portal: false,
      props: ["eyebrow", "children", "treatment", "intent"],
      related: ["panel", "phase-header"],
    },
  },
  {
    name: "role-panel",
    type: "registry:component",
    title: "Role Panel",
    description:
      "Participant role summary with optional priorities disclosure, identity slot, and private objective.",
    category: "component",
    registryDependencies: ["base", "panel", "separator"],
    files: [
      {
        path: "src/components/game/role-panel.tsx",
        type: "registry:component",
        target: "src/components/game/role-panel.tsx",
      },
    ],
    catalogue: {
      useWhen: ["presenting a resolved participant role summary"],
      avoid: [
        "resolving roles inside the component",
        "shipping avatar scanners or radar as registry deps",
      ],
      contexts: ["participant"],
      family: "game-display",
      interactive: true,
      portal: false,
      props: [
        "role",
        "priorities",
        "objective",
        "identity",
        "privateLabel",
        "defaultExpanded",
        "expanded",
        "onExpandedChange",
      ],
      related: ["panel", "separator", "participant-identity"],
    },
  },
  {
    name: "vote-status",
    type: "registry:component",
    title: "Vote Status",
    description:
      "Aggregate voting progress without owning vote logic. Auto mode uses pips for small rooms.",
    category: "component",
    registryDependencies: ["base", "progress"],
    files: [
      {
        path: "src/components/game/vote-status.tsx",
        type: "registry:component",
        target: "src/components/game/vote-status.tsx",
      },
    ],
    catalogue: {
      useWhen: ["showing how many votes are in without revealing identities"],
      avoid: ["exposing participant identities", "assuming anonymous voting"],
      contexts: ["participant", "facilitator", "shared-display"],
      family: "game-display",
      interactive: false,
      portal: false,
      props: ["voted", "total", "anonymous", "locked", "treatment", "progress", "size", "label"],
      related: ["progress", "sticky-action-bar"],
    },
  },
  {
    name: "outcome-summary",
    type: "registry:component",
    title: "Outcome Summary",
    description:
      "High-level outcome, description, optional metrics and actions. Does not own outcome taxonomy.",
    category: "component",
    registryDependencies: ["base", "panel", "badge"],
    files: [
      {
        path: "src/components/game/outcome-summary.tsx",
        type: "registry:component",
        target: "src/components/game/outcome-summary.tsx",
      },
    ],
    catalogue: {
      useWhen: ["summarising round or session outcomes with semantic intent"],
      avoid: [
        "encoding game outcome keys such as optimal or catastrophic",
        "passing participant-private metrics on shared display",
      ],
      contexts: ["all"],
      family: "game-display",
      interactive: true,
      portal: false,
      props: ["outcome", "metrics", "actions", "density"],
      related: ["panel", "badge"],
    },
  },
  {
    name: "option-selector",
    type: "registry:component",
    title: "Option Selector",
    description:
      "Single-choice option list for decision and vote compositions. Owns selection presentation only.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/game/option-selector.tsx",
        type: "registry:component",
        target: "src/components/game/option-selector.tsx",
      },
    ],
    catalogue: {
      useWhen: ["presenting a set of mutually exclusive options to select"],
      avoid: [
        "owning commit, scoring, or reveal state",
        "encoding game-specific option taxonomies",
      ],
      preferOver: ["recreating a selectable card list from primitives"],
      contexts: ["participant"],
      family: "game-display",
      interactive: true,
      portal: false,
      props: ["options", "selectedId", "onSelect", "label", "disabled", "layout"],
      related: ["decision", "panel"],
    },
  },
  {
    name: "intensity-selector",
    type: "registry:component",
    title: "Intensity Selector",
    description:
      "Discrete 0..max intensity or conviction selector for sealed commitments. Owns only value presentation.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/game/intensity-selector.tsx",
        type: "registry:component",
        target: "src/components/game/intensity-selector.tsx",
      },
    ],
    catalogue: {
      useWhen: ["capturing a discrete conviction or intensity value on a bounded scale"],
      avoid: [
        "owning token economy or validity rules",
        "replacing continuous Slider where continuous",
      ],
      preferOver: ["recreating a token stepper from buttons"],
      contexts: ["participant"],
      family: "game-display",
      interactive: true,
      portal: false,
      props: ["value", "max", "onChange", "label", "unitLabel", "zeroLabel", "disabled"],
      related: ["decision", "option-selector"],
    },
  },
  {
    name: "stat",
    type: "registry:component",
    title: "Stat",
    description:
      "Single metric tile for score, viability, and aggregate grids. Value is application-owned.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/game/stat.tsx",
        type: "registry:component",
        target: "src/components/game/stat.tsx",
      },
    ],
    catalogue: {
      useWhen: ["showing score, viability, or aggregate metrics in grids"],
      avoid: [
        "encoding outcome taxonomy inside the tile",
        "hard-coding game-specific metric labels",
      ],
      preferOver: ["overloading vote-status for score/viability grids"],
      contexts: ["all"],
      family: "game-display",
      interactive: false,
      portal: false,
      props: ["label", "value", "hint", "intent", "size"],
      related: ["results", "outcome-summary"],
    },
  },
  {
    name: "rating",
    type: "registry:component",
    title: "Rating",
    description:
      "Star rating for debrief and reflection compositions. Owns only star presentation.",
    category: "component",
    registryDependencies: ["base"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/components/game/rating.tsx",
        type: "registry:component",
        target: "src/components/game/rating.tsx",
      },
    ],
    catalogue: {
      useWhen: ["capturing or displaying a star rating in reflection or debrief flows"],
      avoid: ["owning score semantics", "assuming a fixed scale beyond max"],
      contexts: ["participant", "facilitator"],
      family: "game-display",
      interactive: true,
      portal: false,
      props: ["value", "max", "onChange", "readOnly", "label"],
      related: ["debrief"],
    },
  },
  {
    name: "sticky-action-bar",
    type: "registry:component",
    title: "Sticky Action Bar",
    description: "Mobile participant action region anchored to the bottom of the active surface.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/game/sticky-action-bar.tsx",
        type: "registry:component",
        target: "src/components/game/sticky-action-bar.tsx",
      },
    ],
    catalogue: {
      useWhen: ["participant bottom action regions with optional status row"],
      avoid: [
        "hard-coding application max widths",
        "owning vote state",
        "using fixed positioning without shell compensation",
      ],
      contexts: ["participant"],
      family: "game-display",
      interactive: true,
      portal: false,
      props: ["status", "children", "intent", "sticky"],
      related: ["vote-status", "button", "participant-shell"],
    },
  },
  {
    name: "room-code-display",
    type: "registry:component",
    title: "Room Code Display",
    description: "Large privacy-safe room code presentation.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/display/room-code-display.tsx",
        type: "registry:component",
        target: "src/components/display/room-code-display.tsx",
      },
    ],
    catalogue: {
      useWhen: ["showing a join code on shared displays or facilitator consoles"],
      avoid: ["pairing with private participant details on shared display"],
      contexts: ["facilitator", "shared-display"],
    },
  },
  {
    name: "display-heading",
    type: "registry:component",
    title: "Display Heading",
    description: "Large shared-display heading with optional eyebrow.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/display/display-heading.tsx",
        type: "registry:component",
        target: "src/components/display/display-heading.tsx",
      },
    ],
    catalogue: {
      useWhen: ["titling shared-display screens at distance-readable scale"],
      avoid: ["using as a participant mobile page title without need"],
      contexts: ["shared-display", "facilitator"],
      related: ["shared-display-lobby"],
    },
  },
  {
    name: "participant-count-display",
    type: "registry:component",
    title: "Participant Count Display",
    description: "Privacy-safe connected participant count for shared displays.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/display/participant-count-display.tsx",
        type: "registry:component",
        target: "src/components/display/participant-count-display.tsx",
      },
    ],
    catalogue: {
      useWhen: ["showing aggregate join progress on a shared display"],
      avoid: ["listing private participant identities on shared display"],
      contexts: ["shared-display", "facilitator"],
      related: ["shared-display-lobby"],
    },
  },
  {
    name: "join-flow",
    type: "registry:block",
    title: "Participant Join Flow",
    description: "Participant code entry, identity, waiting, and reconnect states.",
    category: "pattern",
    registryDependencies: [
      "base",
      "button",
      "input",
      "panel",
      "alert",
      "game-code-input",
      "participant-identity",
      "connection-status",
      "waiting-state",
      "participant-shell",
    ],
    files: [
      {
        path: "src/patterns/join/participant-join-flow.tsx",
        type: "registry:block",
        target: "src/patterns/join/participant-join-flow.tsx",
      },
      {
        path: "src/patterns/join/index.ts",
        type: "registry:lib",
        target: "src/patterns/join/index.ts",
      },
    ],
    catalogue: {
      useWhen: [
        "creating a participant game joining experience",
        "collecting a room code and participant identity",
      ],
      avoid: ["adding networking logic inside the pattern", "creating a game-specific copy"],
      preferOver: ["manually assembling a room-code form from primitives"],
      contexts: ["participant"],
      related: ["lobby", "shared-display-lobby", "participant-shell"],
    },
  },
  {
    name: "create-session",
    type: "registry:block",
    title: "Create Session",
    description:
      "Facilitator create-session form with optional host/session names, an application-owned configuration slot, and a ready state showing the generated code.",
    category: "pattern",
    registryDependencies: ["base", "button", "input", "label", "panel", "room-code-display"],
    files: [
      {
        path: "src/patterns/create-session/create-session.tsx",
        type: "registry:block",
        target: "src/patterns/create-session/create-session.tsx",
      },
      {
        path: "src/patterns/create-session/index.ts",
        type: "registry:lib",
        target: "src/patterns/create-session/index.ts",
      },
    ],
    catalogue: {
      useWhen: [
        "creating a new session or room as a facilitator",
        "collecting an optional session and host name before generating a room code",
      ],
      avoid: [
        "owning code generation, persistence, or networking",
        "encoding game-specific configuration such as duration or naming modes",
      ],
      contexts: ["facilitator"],
      family: "patterns",
      props: [
        "sessionName",
        "onSessionNameChange",
        "hostName",
        "onHostNameChange",
        "onSubmit",
        "isSubmitting",
        "submitDisabledReason",
        "createdCode",
        "configSlot",
      ],
      related: ["lobby", "shared-display-lobby", "room-code-display", "facilitator-console"],
    },
  },
  {
    name: "lobby",
    type: "registry:block",
    title: "Facilitator Lobby",
    description: "Facilitator lobby with room code, participant status, and start controls.",
    category: "pattern",
    registryDependencies: [
      "base",
      "button",
      "panel",
      "badge",
      "alert",
      "progress",
      "participant-status",
      "room-code-display",
      "facilitator-shell",
    ],
    files: [
      {
        path: "src/patterns/lobby/facilitator-lobby.tsx",
        type: "registry:block",
        target: "src/patterns/lobby/facilitator-lobby.tsx",
      },
    ],
    catalogue: {
      useWhen: ["operating a pre-start facilitator lobby"],
      avoid: ["owning stage-transition authority inside the pattern"],
      contexts: ["facilitator"],
      related: ["join-flow", "shared-display-lobby"],
    },
  },
  {
    name: "shared-display-lobby",
    type: "registry:block",
    title: "Shared Display Lobby",
    description: "Privacy-safe shared-display lobby with room code and join progress.",
    category: "pattern",
    registryDependencies: [
      "base",
      "panel",
      "badge",
      "waiting-state",
      "room-code-display",
      "display-heading",
      "participant-count-display",
      "shared-display-shell",
    ],
    files: [
      {
        path: "src/patterns/lobby/shared-display-lobby.tsx",
        type: "registry:block",
        target: "src/patterns/lobby/shared-display-lobby.tsx",
      },
    ],
    catalogue: {
      useWhen: ["broadcasting a join/lobby state on a shared room display"],
      avoid: ["showing participant-private information"],
      contexts: ["shared-display"],
      related: ["join-flow", "lobby"],
    },
  },
  {
    name: "decision",
    type: "registry:block",
    title: "Decision",
    description:
      "Core sealed → declaration → negotiation → lock → resolve decision loop. A vote is the degenerate sealed → resolved case.",
    category: "pattern",
    registryDependencies: [
      "base",
      "badge",
      "button",
      "panel",
      "phase-directive",
      "waiting-state",
      "option-selector",
      "intensity-selector",
      "outcome-summary",
    ],
    files: [
      {
        path: "src/patterns/decision/decision.tsx",
        type: "registry:block",
        target: "src/patterns/decision/decision.tsx",
      },
      {
        path: "src/patterns/decision/index.ts",
        type: "registry:lib",
        target: "src/patterns/decision/index.ts",
      },
    ],
    catalogue: {
      useWhen: [
        "running the core participant decision loop from sealed commit through resolve",
        "implementing a vote as the sealed → resolved subset",
      ],
      avoid: [
        "owning scoring, networking, or stage authority",
        "encoding game-specific option taxonomies",
        "revealing intensity before resolution",
      ],
      preferOver: ["hand-assembling option lists and commit controls"],
      contexts: ["participant"],
      family: "patterns",
      props: [
        "phase",
        "directive",
        "options",
        "selectedOptionId",
        "intensity",
        "maxIntensity",
        "declaration",
        "hasCommitted",
        "result",
        "onSelectOption",
        "onSetIntensity",
        "onCommit",
        "onLock",
      ],
      related: ["timed-round", "option-selector", "intensity-selector", "results"],
    },
  },
  {
    name: "timed-round",
    type: "registry:block",
    title: "Timed Round",
    description:
      "Round/beat container wrapping injected content with countdown, phase progress, directive, and action footer.",
    category: "pattern",
    registryDependencies: [
      "base",
      "countdown",
      "phase-header",
      "phase-progress",
      "phase-directive",
      "sticky-action-bar",
    ],
    files: [
      {
        path: "src/patterns/timed-round/timed-round.tsx",
        type: "registry:block",
        target: "src/patterns/timed-round/timed-round.tsx",
      },
      {
        path: "src/patterns/timed-round/index.ts",
        type: "registry:lib",
        target: "src/patterns/timed-round/index.ts",
      },
    ],
    catalogue: {
      useWhen: ["wrapping a timed game beat or round with common chrome"],
      avoid: ["owning timer math or phase transitions", "encoding game-specific round content"],
      contexts: ["participant", "facilitator"],
      family: "patterns",
      props: [
        "eyebrow",
        "phase",
        "phaseIntent",
        "countdown",
        "steps",
        "activeStepId",
        "progressLabel",
        "directive",
        "directiveEyebrow",
        "children",
        "footer",
        "footerStatus",
      ],
      related: ["decision", "countdown", "phase-progress", "phase-directive"],
    },
  },
  {
    name: "briefing",
    type: "registry:block",
    title: "Briefing",
    description:
      "Paced slide-deck walkthrough with phase progress, panel body, and previous/next/complete controls.",
    category: "pattern",
    registryDependencies: ["base", "button", "panel", "phase-progress"],
    files: [
      {
        path: "src/patterns/briefing/briefing.tsx",
        type: "registry:block",
        target: "src/patterns/briefing/briefing.tsx",
      },
      {
        path: "src/patterns/briefing/index.ts",
        type: "registry:lib",
        target: "src/patterns/briefing/index.ts",
      },
    ],
    catalogue: {
      useWhen: ["walking participants or facilitators through briefing slides"],
      avoid: ["owning stage authority or slide timing"],
      contexts: ["participant", "facilitator"],
      family: "patterns",
      props: [
        "slides",
        "activeSlideId",
        "eyebrow",
        "title",
        "progressLabel",
        "onPrevious",
        "onNext",
        "onComplete",
      ],
      related: ["scripted-reveal", "phase-progress", "panel"],
    },
  },
  {
    name: "scripted-reveal",
    type: "registry:block",
    title: "Scripted Reveal",
    description:
      "Timed mid-round announcement and reveal with countdown, announce, revealed, and complete steps.",
    category: "pattern",
    registryDependencies: ["base", "badge", "button", "panel", "countdown"],
    files: [
      {
        path: "src/patterns/scripted-reveal/scripted-reveal.tsx",
        type: "registry:block",
        target: "src/patterns/scripted-reveal/scripted-reveal.tsx",
      },
      {
        path: "src/patterns/scripted-reveal/index.ts",
        type: "registry:lib",
        target: "src/patterns/scripted-reveal/index.ts",
      },
    ],
    catalogue: {
      useWhen: ["announcing and revealing a timed mid-round event"],
      avoid: ["owning reveal choreography or game content"],
      contexts: ["participant", "shared-display"],
      family: "patterns",
      props: ["step", "eyebrow", "headline", "description", "intent", "countdown", "onAcknowledge"],
      related: ["timed-round", "countdown", "attention-takeover"],
    },
  },
  {
    name: "results",
    type: "registry:block",
    title: "Results",
    description: "Staged outcome reveal composing outcome summary with a stat grid.",
    category: "pattern",
    registryDependencies: ["base", "outcome-summary", "stat"],
    files: [
      {
        path: "src/patterns/results/results.tsx",
        type: "registry:block",
        target: "src/patterns/results/results.tsx",
      },
      {
        path: "src/patterns/results/index.ts",
        type: "registry:lib",
        target: "src/patterns/results/index.ts",
      },
    ],
    catalogue: {
      useWhen: ["revealing round or session outcomes with metric tiles"],
      avoid: ["owning outcome taxonomy or scoring"],
      contexts: ["participant", "facilitator", "shared-display"],
      family: "patterns",
      props: ["outcome", "stats", "actions", "density"],
      related: ["outcome-summary", "stat", "decision", "debrief"],
    },
  },
  {
    name: "debrief",
    type: "registry:block",
    title: "Debrief",
    description:
      "Facilitated reflection with What/So What/Now What sections, rating, and responses.",
    category: "pattern",
    registryDependencies: ["base", "accordion", "textarea", "rating"],
    files: [
      {
        path: "src/patterns/debrief/debrief.tsx",
        type: "registry:block",
        target: "src/patterns/debrief/debrief.tsx",
      },
      {
        path: "src/patterns/debrief/index.ts",
        type: "registry:lib",
        target: "src/patterns/debrief/index.ts",
      },
    ],
    catalogue: {
      useWhen: ["running a facilitated reflection or debrief after a round"],
      avoid: ["owning response persistence or aggregation"],
      contexts: ["participant", "facilitator"],
      family: "patterns",
      props: [
        "title",
        "ratingValue",
        "ratingMax",
        "ratingLabel",
        "onRatingChange",
        "sections",
        "defaultOpen",
      ],
      related: ["rating", "accordion", "textarea", "results"],
    },
  },
  {
    name: "facilitator-console",
    type: "registry:block",
    title: "Facilitator Console",
    description:
      "Session control strip with pause/resume/advance/end, participant status, connection state, and progress.",
    category: "pattern",
    registryDependencies: [
      "base",
      "badge",
      "button",
      "panel",
      "progress",
      "connection-status",
      "participant-status",
    ],
    files: [
      {
        path: "src/patterns/facilitator-console/facilitator-console.tsx",
        type: "registry:block",
        target: "src/patterns/facilitator-console/facilitator-console.tsx",
      },
      {
        path: "src/patterns/facilitator-console/index.ts",
        type: "registry:lib",
        target: "src/patterns/facilitator-console/index.ts",
      },
    ],
    catalogue: {
      useWhen: ["operating an in-session facilitator control surface"],
      avoid: [
        "owning stage transitions or session orchestration",
        "rendering private participant data on shared display",
      ],
      contexts: ["facilitator"],
      family: "patterns",
      props: [
        "session",
        "participants",
        "status",
        "phaseLabel",
        "progressValue",
        "progressLabel",
        "onPause",
        "onResume",
        "onAdvance",
        "onEnd",
        "privateSlot",
      ],
      related: ["lobby", "timed-round", "participant-status", "connection-status"],
    },
  },
  {
    name: "shared-display-game",
    type: "registry:block",
    title: "Shared Display Game",
    description: "In-game shared-display states (waiting, active, reveal, results, debrief).",
    category: "pattern",
    registryDependencies: ["base", "badge", "display-heading", "phase-progress"],
    files: [
      {
        path: "src/patterns/shared-display-game/shared-display-game.tsx",
        type: "registry:block",
        target: "src/patterns/shared-display-game/shared-display-game.tsx",
      },
      {
        path: "src/patterns/shared-display-game/index.ts",
        type: "registry:lib",
        target: "src/patterns/shared-display-game/index.ts",
      },
    ],
    catalogue: {
      useWhen: ["driving the in-game shared room display across states"],
      avoid: ["showing participant-private information"],
      contexts: ["shared-display"],
      family: "patterns",
      props: [
        "state",
        "eyebrow",
        "heading",
        "description",
        "steps",
        "activeStepId",
        "progressLabel",
        "children",
      ],
      related: ["shared-display-lobby", "results", "debrief", "phase-progress"],
    },
  },
  {
    name: "attention-takeover",
    type: "registry:block",
    title: "Attention Takeover",
    description: "Full-surface 'watch the display' attention redirect with optional countdown.",
    category: "pattern",
    registryDependencies: ["base", "badge", "button", "countdown"],
    files: [
      {
        path: "src/patterns/attention-takeover/attention-takeover.tsx",
        type: "registry:block",
        target: "src/patterns/attention-takeover/attention-takeover.tsx",
      },
      {
        path: "src/patterns/attention-takeover/index.ts",
        type: "registry:lib",
        target: "src/patterns/attention-takeover/index.ts",
      },
    ],
    catalogue: {
      useWhen: ["redirecting participant attention back to the shared display"],
      avoid: ["owning stage authority or redirect routing"],
      contexts: ["participant"],
      family: "patterns",
      props: ["eyebrow", "headline", "description", "intent", "countdown", "onAcknowledge"],
      related: ["scripted-reveal", "countdown", "shared-display-game"],
    },
  },
  {
    name: "participant-shell",
    type: "registry:block",
    title: "Participant Shell",
    description: "Mobile-first participant layout shell.",
    category: "template",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/templates/participant-shell/participant-shell.tsx",
        type: "registry:block",
        target: "src/templates/participant-shell/participant-shell.tsx",
      },
    ],
    catalogue: {
      useWhen: ["wrapping participant screens"],
      avoid: ["putting facilitator density into this shell"],
      contexts: ["participant"],
    },
  },
  {
    name: "facilitator-shell",
    type: "registry:block",
    title: "Facilitator Shell",
    description: "Desktop facilitator console layout shell.",
    category: "template",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/templates/facilitator-shell/facilitator-shell.tsx",
        type: "registry:block",
        target: "src/templates/facilitator-shell/facilitator-shell.tsx",
      },
    ],
    catalogue: {
      useWhen: ["wrapping facilitator operational screens"],
      avoid: ["encoding session orchestration in the shell"],
      contexts: ["facilitator"],
    },
  },
  {
    name: "shared-display-shell",
    type: "registry:block",
    title: "Shared Display Shell",
    description: "Landscape non-interactive shared display shell.",
    category: "template",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/templates/shared-display-shell/shared-display-shell.tsx",
        type: "registry:block",
        target: "src/templates/shared-display-shell/shared-display-shell.tsx",
      },
    ],
    catalogue: {
      useWhen: ["wrapping shared room displays"],
      avoid: ["showing participant-private information"],
      contexts: ["shared-display"],
    },
  },
  {
    name: "label",
    type: "registry:ui",
    title: "Label",
    description: "Accessible form label primitive.",
    category: "component",
    dependencies: ["@radix-ui/react-label"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/label.tsx",
        type: "registry:ui",
        target: "src/components/ui/label.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Accessible form label primitive."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "forms",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "textarea",
    type: "registry:ui",
    title: "Textarea",
    description: "Multi-line text input primitive.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/textarea.tsx",
        type: "registry:ui",
        target: "src/components/ui/textarea.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Multi-line text input primitive."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "forms",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "checkbox",
    type: "registry:ui",
    title: "Checkbox",
    description: "Boolean selection control.",
    category: "component",
    dependencies: ["@radix-ui/react-checkbox"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/checkbox.tsx",
        type: "registry:ui",
        target: "src/components/ui/checkbox.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Boolean selection control."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "forms",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "radio-group",
    type: "registry:ui",
    title: "Radio Group",
    description: "Single-choice radio selection control.",
    category: "component",
    dependencies: ["@radix-ui/react-radio-group"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/radio-group.tsx",
        type: "registry:ui",
        target: "src/components/ui/radio-group.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Single-choice radio selection control."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "forms",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "switch",
    type: "registry:ui",
    title: "Switch",
    description: "Binary toggle switch control.",
    category: "component",
    dependencies: ["@radix-ui/react-switch"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/switch.tsx",
        type: "registry:ui",
        target: "src/components/ui/switch.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Binary toggle switch control."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "forms",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "slider",
    type: "registry:ui",
    title: "Slider",
    description: "Range value slider control.",
    category: "component",
    dependencies: ["@radix-ui/react-slider"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/slider.tsx",
        type: "registry:ui",
        target: "src/components/ui/slider.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Range value slider control."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "forms",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "select",
    type: "registry:ui",
    title: "Select",
    description: "Accessible select menu primitive.",
    category: "component",
    dependencies: ["@radix-ui/react-select"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/select.tsx",
        type: "registry:ui",
        target: "src/components/ui/select.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Accessible select menu primitive."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "forms",
      interactive: true,
      portal: true,
    },
  },
  {
    name: "input-otp",
    type: "registry:ui",
    title: "Input OTP",
    description: "One-time-passcode segmented input.",
    category: "component",
    dependencies: ["input-otp"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/input-otp.tsx",
        type: "registry:ui",
        target: "src/components/ui/input-otp.tsx",
      },
    ],
    catalogue: {
      useWhen: ["One-time-passcode segmented input."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "forms",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "form",
    type: "registry:ui",
    title: "Form",
    description: "React Hook Form field helpers with accessible labelling.",
    category: "component",
    dependencies: [
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
      "@hookform/resolvers",
      "zod",
      "react-hook-form",
    ],
    registryDependencies: ["base", "button", "label"],
    files: [
      {
        path: "src/components/ui/form.tsx",
        type: "registry:ui",
        target: "src/components/ui/form.tsx",
      },
    ],
    catalogue: {
      useWhen: ["React Hook Form field helpers with accessible labelling."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "forms",
      interactive: true,
      portal: false,
      related: ["button", "label"],
    },
  },
  {
    name: "calendar",
    type: "registry:ui",
    title: "Calendar",
    description:
      "Date calendar primitive powered by react-day-picker. Compose with Popover for a date picker.",
    category: "component",
    dependencies: ["react-day-picker", "date-fns"],
    registryDependencies: ["base", "button"],
    files: [
      {
        path: "src/components/ui/calendar.tsx",
        type: "registry:ui",
        target: "src/components/ui/calendar.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Date calendar primitive powered by react-day-picker."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "forms",
      interactive: true,
      portal: false,
      related: ["button"],
    },
  },
  {
    name: "toggle",
    type: "registry:ui",
    title: "Toggle",
    description: "Pressable toggle button control.",
    category: "component",
    dependencies: ["@radix-ui/react-toggle"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/toggle.tsx",
        type: "registry:ui",
        target: "src/components/ui/toggle.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Pressable toggle button control."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "forms",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "toggle-group",
    type: "registry:ui",
    title: "Toggle Group",
    description: "Grouped toggle selection control.",
    category: "component",
    dependencies: ["@radix-ui/react-toggle-group"],
    registryDependencies: ["base", "toggle"],
    files: [
      {
        path: "src/components/ui/toggle-group.tsx",
        type: "registry:ui",
        target: "src/components/ui/toggle-group.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Grouped toggle selection control."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "forms",
      interactive: true,
      portal: false,
      related: ["toggle"],
    },
  },
  {
    name: "dialog",
    type: "registry:ui",
    title: "Dialog",
    description: "Modal dialog primitive with portal content.",
    category: "component",
    dependencies: ["@radix-ui/react-dialog"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/dialog.tsx",
        type: "registry:ui",
        target: "src/components/ui/dialog.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Modal dialog primitive with portal content."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "overlays",
      interactive: true,
      portal: true,
    },
  },
  {
    name: "alert-dialog",
    type: "registry:ui",
    title: "Alert Dialog",
    description: "Confirmational alert dialog primitive.",
    category: "component",
    dependencies: ["@radix-ui/react-alert-dialog"],
    registryDependencies: ["base", "button"],
    files: [
      {
        path: "src/components/ui/alert-dialog.tsx",
        type: "registry:ui",
        target: "src/components/ui/alert-dialog.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Confirmational alert dialog primitive."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "overlays",
      interactive: true,
      portal: true,
      related: ["button"],
    },
  },
  {
    name: "sheet",
    type: "registry:ui",
    title: "Sheet",
    description: "Slide-over sheet dialog primitive.",
    category: "component",
    dependencies: ["@radix-ui/react-dialog"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/sheet.tsx",
        type: "registry:ui",
        target: "src/components/ui/sheet.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Slide-over sheet dialog primitive."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "overlays",
      interactive: true,
      portal: true,
    },
  },
  {
    name: "drawer",
    type: "registry:ui",
    title: "Drawer",
    description: "Mobile-friendly drawer overlay (vaul).",
    category: "component",
    dependencies: ["vaul", "@radix-ui/react-dialog"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/drawer.tsx",
        type: "registry:ui",
        target: "src/components/ui/drawer.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Mobile-friendly drawer overlay (vaul)."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "overlays",
      interactive: true,
      portal: true,
    },
  },
  {
    name: "popover",
    type: "registry:ui",
    title: "Popover",
    description: "Anchored popover overlay.",
    category: "component",
    dependencies: ["@radix-ui/react-popover"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/popover.tsx",
        type: "registry:ui",
        target: "src/components/ui/popover.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Anchored popover overlay."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "overlays",
      interactive: true,
      portal: true,
    },
  },
  {
    name: "hover-card",
    type: "registry:ui",
    title: "Hover Card",
    description: "Hover-triggered content card.",
    category: "component",
    dependencies: ["@radix-ui/react-hover-card"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/hover-card.tsx",
        type: "registry:ui",
        target: "src/components/ui/hover-card.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Hover-triggered content card."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["facilitator"],
      family: "overlays",
      interactive: true,
      portal: true,
    },
  },
  {
    name: "tooltip",
    type: "registry:ui",
    title: "Tooltip",
    description: "Pointer/focus tooltip overlay.",
    category: "component",
    dependencies: ["@radix-ui/react-tooltip"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/tooltip.tsx",
        type: "registry:ui",
        target: "src/components/ui/tooltip.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Pointer/focus tooltip overlay."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "overlays",
      interactive: true,
      portal: true,
    },
  },
  {
    name: "context-menu",
    type: "registry:ui",
    title: "Context Menu",
    description: "Right-click context menu.",
    category: "component",
    dependencies: ["@radix-ui/react-context-menu"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/context-menu.tsx",
        type: "registry:ui",
        target: "src/components/ui/context-menu.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Right-click context menu."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["facilitator"],
      family: "overlays",
      interactive: true,
      portal: true,
    },
  },
  {
    name: "dropdown-menu",
    type: "registry:ui",
    title: "Dropdown Menu",
    description: "Dropdown action menu.",
    category: "component",
    dependencies: ["@radix-ui/react-dropdown-menu"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/dropdown-menu.tsx",
        type: "registry:ui",
        target: "src/components/ui/dropdown-menu.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Dropdown action menu."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "overlays",
      interactive: true,
      portal: true,
    },
  },
  {
    name: "menubar",
    type: "registry:ui",
    title: "Menubar",
    description: "Horizontal application menubar.",
    category: "component",
    dependencies: ["@radix-ui/react-menubar"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/menubar.tsx",
        type: "registry:ui",
        target: "src/components/ui/menubar.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Horizontal application menubar."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["facilitator"],
      family: "navigation",
      interactive: true,
      portal: true,
    },
  },
  {
    name: "command",
    type: "registry:ui",
    title: "Command",
    description:
      "Command palette / combobox list primitive (cmdk). Compose with Popover for combobox patterns.",
    category: "component",
    dependencies: ["cmdk"],
    registryDependencies: ["base", "dialog"],
    files: [
      {
        path: "src/components/ui/command.tsx",
        type: "registry:ui",
        target: "src/components/ui/command.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Command palette / combobox list primitive (cmdk)."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["facilitator"],
      family: "overlays",
      interactive: true,
      portal: true,
      related: ["dialog"],
    },
  },
  {
    name: "navigation-menu",
    type: "registry:ui",
    title: "Navigation Menu",
    description: "Site/app navigation menu primitive.",
    category: "component",
    dependencies: ["@radix-ui/react-navigation-menu"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/navigation-menu.tsx",
        type: "registry:ui",
        target: "src/components/ui/navigation-menu.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Site/app navigation menu primitive."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["facilitator"],
      family: "navigation",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "accordion",
    type: "registry:ui",
    title: "Accordion",
    description: "Expandable accordion disclosure.",
    category: "component",
    dependencies: ["@radix-ui/react-accordion"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/accordion.tsx",
        type: "registry:ui",
        target: "src/components/ui/accordion.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Expandable accordion disclosure."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "disclosure",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "collapsible",
    type: "registry:ui",
    title: "Collapsible",
    description: "Single collapsible disclosure region.",
    category: "component",
    dependencies: ["@radix-ui/react-collapsible"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/collapsible.tsx",
        type: "registry:ui",
        target: "src/components/ui/collapsible.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Single collapsible disclosure region."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "disclosure",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "tabs",
    type: "registry:ui",
    title: "Tabs",
    description: "Tabbed content navigation.",
    category: "component",
    dependencies: ["@radix-ui/react-tabs"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/tabs.tsx",
        type: "registry:ui",
        target: "src/components/ui/tabs.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Tabbed content navigation."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "disclosure",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "breadcrumb",
    type: "registry:ui",
    title: "Breadcrumb",
    description: "Hierarchical breadcrumb navigation.",
    category: "component",
    dependencies: ["@radix-ui/react-slot"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/breadcrumb.tsx",
        type: "registry:ui",
        target: "src/components/ui/breadcrumb.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Hierarchical breadcrumb navigation."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["facilitator"],
      family: "navigation",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "pagination",
    type: "registry:ui",
    title: "Pagination",
    description: "Paged navigation controls.",
    category: "component",
    registryDependencies: ["base", "button"],
    files: [
      {
        path: "src/components/ui/pagination.tsx",
        type: "registry:ui",
        target: "src/components/ui/pagination.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Paged navigation controls."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["facilitator"],
      family: "navigation",
      interactive: true,
      portal: false,
      related: ["button"],
    },
  },
  {
    name: "resizable",
    type: "registry:ui",
    title: "Resizable",
    description: "Resizable panel group layout helper.",
    category: "component",
    dependencies: ["react-resizable-panels"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/resizable.tsx",
        type: "registry:ui",
        target: "src/components/ui/resizable.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Resizable panel group layout helper."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["facilitator"],
      family: "layout",
      interactive: false,
      portal: false,
    },
  },
  {
    name: "scroll-area",
    type: "registry:ui",
    title: "Scroll Area",
    description: "Accessible custom scroll container.",
    category: "component",
    dependencies: ["@radix-ui/react-scroll-area"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/scroll-area.tsx",
        type: "registry:ui",
        target: "src/components/ui/scroll-area.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Accessible custom scroll container."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["all"],
      family: "layout",
      interactive: false,
      portal: false,
    },
  },
  {
    name: "separator",
    type: "registry:ui",
    title: "Separator",
    description: "Visual content separator with optional hairline treatment.",
    category: "component",
    dependencies: ["@radix-ui/react-separator"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/separator.tsx",
        type: "registry:ui",
        target: "src/components/ui/separator.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Visual content separator.", "hairline dividers in role and summary panels"],
      avoid: [
        "theme-named forks",
        "embedding business logic",
        "application-owned HairlineStrip React",
      ],
      contexts: ["all"],
      family: "layout",
      interactive: false,
      props: ["orientation", "decorative", "treatment"],
      portal: false,
    },
  },
  {
    name: "card",
    type: "registry:ui",
    title: "Card",
    description:
      "Composable card surface for content grouping. Prefer Panel for GameScience shell surfaces when elevation semantics matter.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/card.tsx",
        type: "registry:ui",
        target: "src/components/ui/card.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Composable card surface for content grouping."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["all"],
      family: "data-display",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "table",
    type: "registry:ui",
    title: "Table",
    description: "Semantic HTML table primitives.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/table.tsx",
        type: "registry:ui",
        target: "src/components/ui/table.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Semantic HTML table primitives."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["facilitator"],
      family: "data-display",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "avatar",
    type: "registry:ui",
    title: "Avatar",
    description: "User/entity avatar with image and fallback.",
    category: "component",
    dependencies: ["@radix-ui/react-avatar"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/avatar.tsx",
        type: "registry:ui",
        target: "src/components/ui/avatar.tsx",
      },
    ],
    catalogue: {
      useWhen: ["User/entity avatar with image and fallback."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "data-display",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "aspect-ratio",
    type: "registry:ui",
    title: "Aspect Ratio",
    description: "Aspect-ratio layout wrapper.",
    category: "component",
    dependencies: ["@radix-ui/react-aspect-ratio"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/aspect-ratio.tsx",
        type: "registry:ui",
        target: "src/components/ui/aspect-ratio.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Aspect-ratio layout wrapper."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["all"],
      family: "layout",
      interactive: false,
      portal: false,
    },
  },
  {
    name: "carousel",
    type: "registry:ui",
    title: "Carousel",
    description: "Embla-powered carousel primitive.",
    category: "component",
    dependencies: ["embla-carousel-react"],
    registryDependencies: ["base", "button"],
    files: [
      {
        path: "src/components/ui/carousel.tsx",
        type: "registry:ui",
        target: "src/components/ui/carousel.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Embla-powered carousel primitive."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "data-display",
      interactive: true,
      portal: false,
      related: ["button"],
    },
  },
  {
    name: "sonner",
    type: "registry:ui",
    title: "Sonner",
    description:
      "Canonical toast notification surface (Sonner). Already included with base; install explicitly when needed as a discoverable item.",
    category: "component",
    dependencies: ["sonner"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/sonner.tsx",
        type: "registry:ui",
        target: "src/components/ui/sonner.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Canonical toast notification surface (Sonner)."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "feedback",
      interactive: true,
      portal: true,
    },
  },
  {
    name: "spinner",
    type: "registry:ui",
    title: "Spinner",
    description: "Inline loading spinner indicator.",
    category: "component",
    dependencies: ["lucide-react"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/spinner.tsx",
        type: "registry:ui",
        target: "src/components/ui/spinner.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Inline loading spinner indicator."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "feedback",
      interactive: true,
      portal: false,
    },
  },
  {
    name: "empty",
    type: "registry:ui",
    title: "Empty",
    description: "Empty-state composition primitive.",
    category: "component",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/empty.tsx",
        type: "registry:ui",
        target: "src/components/ui/empty.tsx",
      },
    ],
    catalogue: {
      useWhen: ["Empty-state composition primitive."],
      avoid: ["theme-named forks", "embedding business logic"],
      contexts: ["participant", "facilitator"],
      family: "feedback",
      interactive: true,
      portal: false,
    },
  },
];
