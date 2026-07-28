import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";

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
    themes: Array<"gamescience" | "citadel">;
    related?: string[];
    props?: string[];
  };
}

export const REGISTRY_NAMESPACE = "@gamescience";
export const REGISTRY_VERSION = GAMESCIENCE_UI_VERSION;

/** Configurable public base URL for the static registry. */
export const REGISTRY_BASE_URL = process.env.GAMESCIENCE_REGISTRY_URL ?? "http://localhost:4343";

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
    ],
    catalogue: {
      useWhen: ["bootstrapping a GameScience game application"],
      avoid: [
        "installing without selecting a theme",
        "nesting multiple GameScienceProvider themes",
      ],
      contexts: ["all"],
      themes: ["gamescience", "citadel"],
      props: ["theme", "context", "className"],
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
    description: "Expressive Citadel theme CSS — no component forks.",
    category: "theme",
    registryDependencies: ["base"],
    files: [
      { path: "src/themes/citadel.css", type: "registry:file", target: "src/themes/citadel.css" },
    ],
    catalogue: {
      useWhen: ["building Citadel-branded game experiences"],
      avoid: ["creating CitadelButton or other theme-named forks"],
      contexts: ["all"],
      themes: ["citadel"],
      related: ["theme-gamescience"],
    },
  },
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "Semantic button primitive with intent, size, and loading states.",
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
      themes: ["gamescience", "citadel"],
      props: ["intent", "size", "loading", "disabled"],
    },
  },
  {
    name: "input",
    type: "registry:ui",
    title: "Input",
    description: "Text input primitive with invalid-state support.",
    category: "component",
    registryDependencies: ["base"],
    files: [
      {
        path: "src/components/ui/input.tsx",
        type: "registry:ui",
        target: "src/components/ui/input.tsx",
      },
      {
        path: "src/components/ui/label.tsx",
        type: "registry:ui",
        target: "src/components/ui/label.tsx",
      },
    ],
    catalogue: {
      useWhen: ["collecting short text values"],
      avoid: ["using placeholder-only labels"],
      preferOver: ["TechInput"],
      contexts: ["participant", "facilitator"],
      themes: ["gamescience", "citadel"],
      props: ["invalid", "disabled"],
    },
  },
  {
    name: "panel",
    type: "registry:ui",
    title: "Panel",
    description: "Surface container with semantic elevation.",
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
      themes: ["gamescience", "citadel"],
      props: ["elevation", "padding"],
    },
  },
  {
    name: "badge",
    type: "registry:ui",
    title: "Badge",
    description: "Compact status and metadata label.",
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
      avoid: ["colour-only status without text"],
      contexts: ["all"],
      themes: ["gamescience", "citadel"],
      props: ["intent"],
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
      themes: ["gamescience", "citadel"],
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
      themes: ["gamescience", "citadel"],
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
      themes: ["gamescience", "citadel"],
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
      themes: ["gamescience", "citadel"],
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
      themes: ["gamescience", "citadel"],
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
      themes: ["gamescience", "citadel"],
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
      themes: ["gamescience", "citadel"],
      related: ["lobby"],
    },
  },
  {
    name: "waiting-state",
    type: "registry:component",
    title: "Waiting State",
    description: "Centered waiting/idle messaging.",
    category: "component",
    registryDependencies: ["base"],
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
      themes: ["gamescience", "citadel"],
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
      themes: ["gamescience", "citadel"],
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
      themes: ["gamescience", "citadel"],
      related: ["lobby", "participant-shell"],
    },
  },
  {
    name: "lobby",
    type: "registry:block",
    title: "Lobby Patterns",
    description: "Facilitator and shared-display lobby compositions.",
    category: "pattern",
    registryDependencies: [
      "base",
      "button",
      "panel",
      "badge",
      "alert",
      "progress",
      "participant-status",
      "waiting-state",
      "room-code-display",
      "facilitator-shell",
      "shared-display-shell",
    ],
    files: [
      {
        path: "src/patterns/lobby/facilitator-lobby.tsx",
        type: "registry:block",
        target: "src/patterns/lobby/facilitator-lobby.tsx",
      },
      {
        path: "src/patterns/lobby/shared-display-lobby.tsx",
        type: "registry:block",
        target: "src/patterns/lobby/shared-display-lobby.tsx",
      },
      {
        path: "src/patterns/lobby/index.ts",
        type: "registry:lib",
        target: "src/patterns/lobby/index.ts",
      },
      {
        path: "src/components/display/display-heading.tsx",
        type: "registry:component",
        target: "src/components/display/display-heading.tsx",
      },
      {
        path: "src/components/display/participant-count-display.tsx",
        type: "registry:component",
        target: "src/components/display/participant-count-display.tsx",
      },
      {
        path: "src/components/display/index.ts",
        type: "registry:lib",
        target: "src/components/display/index.ts",
      },
    ],
    catalogue: {
      useWhen: ["operating or broadcasting a pre-start lobby"],
      avoid: ["owning stage-transition authority inside the pattern"],
      contexts: ["facilitator", "shared-display"],
      themes: ["gamescience", "citadel"],
      related: ["join-flow"],
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
      themes: ["gamescience", "citadel"],
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
      themes: ["gamescience", "citadel"],
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
      themes: ["gamescience", "citadel"],
    },
  },
];
