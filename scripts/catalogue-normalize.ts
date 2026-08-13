import {
  PAGES_SITE_PATH,
  PAGES_VERSION,
  versionedRegistryTemplate,
  latestRegistryTemplate,
} from "./pages-config.ts";
import { registryItems } from "./registry-manifest.ts";

export type PublicCatalogueScope =
  | "foundations"
  | "themes"
  | "forms"
  | "overlays"
  | "navigation"
  | "disclosure"
  | "data-display"
  | "feedback"
  | "layout"
  | "core-ui"
  | "game-display"
  | "patterns"
  | "templates";

export interface NormalizedCatalogueItem {
  name: string;
  registryItem: string;
  title: string;
  category: string;
  scope: PublicCatalogueScope;
  family: PublicCatalogueScope;
  description: string;
  contexts: string[];
  /** Human-readable context labels derived only from catalogue contexts metadata. */
  contextLabel: string;
  themes: string[];
  dependencies: string[];
  interactive: boolean | null;
  portal: boolean | null;
  rawRegistryUrl: string;
  versionedRegistryUrl: string;
  installCommand: string;
}

const CONTEXT_LABELS: Record<string, string> = {
  all: "All contexts",
  participant: "Participant",
  facilitator: "Facilitator",
  "shared-display": "Shared display",
};

const GAME_DISPLAY_NAMES = new Set([
  "game-code-input",
  "connection-status",
  "participant-identity",
  "participant-status",
  "waiting-state",
  "room-code-display",
  "display-heading",
  "participant-count-display",
]);

const FAMILY_BY_NAME: Record<string, PublicCatalogueScope> = {
  base: "foundations",
  "theme-gamescience": "themes",
  "theme-citadel": "themes",
  "theme-sentinel": "themes",
  button: "forms",
  input: "forms",
  label: "forms",
  textarea: "forms",
  checkbox: "forms",
  "radio-group": "forms",
  switch: "forms",
  slider: "forms",
  select: "forms",
  "input-otp": "forms",
  form: "forms",
  calendar: "forms",
  toggle: "forms",
  "toggle-group": "forms",
  dialog: "overlays",
  "alert-dialog": "overlays",
  sheet: "overlays",
  drawer: "overlays",
  popover: "overlays",
  "hover-card": "overlays",
  tooltip: "overlays",
  "context-menu": "overlays",
  "dropdown-menu": "overlays",
  command: "overlays",
  menubar: "navigation",
  "navigation-menu": "navigation",
  breadcrumb: "navigation",
  pagination: "navigation",
  accordion: "disclosure",
  collapsible: "disclosure",
  tabs: "disclosure",
  card: "data-display",
  table: "data-display",
  avatar: "data-display",
  carousel: "data-display",
  panel: "layout",
  separator: "layout",
  "scroll-area": "layout",
  resizable: "layout",
  "aspect-ratio": "layout",
  badge: "feedback",
  alert: "feedback",
  progress: "feedback",
  skeleton: "feedback",
  sonner: "feedback",
  spinner: "feedback",
  empty: "feedback",
};

export function formatContextLabel(contexts: string[]): string {
  if (contexts.includes("all") || contexts.length === 0) {
    return "All contexts";
  }
  const labels = contexts.map((context) => CONTEXT_LABELS[context] ?? context);
  if (labels.length === 1) return labels[0]!;
  return labels.join(" · ");
}

function scopeFor(name: string, category: string, family?: string): PublicCatalogueScope {
  if (family && family in SCOPE_LABELS) return family as PublicCatalogueScope;
  if (FAMILY_BY_NAME[name]) return FAMILY_BY_NAME[name]!;
  if (category === "base") return "foundations";
  if (category === "theme") return "themes";
  if (category === "pattern") return "patterns";
  if (category === "template") return "templates";
  if (GAME_DISPLAY_NAMES.has(name)) return "game-display";
  throw new Error(`Cannot normalize catalogue scope for ${name} (category=${category})`);
}

export function normalizeCatalogue(
  catalogue: Record<string, Record<string, unknown>>,
  options?: { version?: string; sitePath?: string },
): NormalizedCatalogueItem[] {
  const version = options?.version ?? PAGES_VERSION;
  const sitePath = options?.sitePath ?? PAGES_SITE_PATH;
  const versionedTemplate = versionedRegistryTemplate(version);
  const latestTemplate = latestRegistryTemplate();
  const expectedCount = registryItems.length;

  const items: NormalizedCatalogueItem[] = [];

  for (const [name, raw] of Object.entries(catalogue)) {
    const category = String(raw.category ?? "");
    const title = String(raw.title ?? name);
    const purpose = String(raw.purpose ?? "").trim();
    const description =
      purpose || `GameScience registry item ${name}. See the agent catalogue for usage guidance.`;
    const contextsRaw = Array.isArray(raw.contexts) ? raw.contexts.map(String) : [];
    const themesRaw = Array.isArray(raw.themes) ? raw.themes.map(String) : [];
    const uses = Array.isArray(raw.uses) ? raw.uses.map(String) : [];
    const registryItem = String(raw.registryItem ?? `@gamescience/${name}`);
    const familyRaw = typeof raw.family === "string" ? raw.family : undefined;

    if (!category) {
      throw new Error(`Catalogue item ${name} missing category`);
    }
    if (contextsRaw.length === 0) {
      throw new Error(`Catalogue item ${name} missing contexts`);
    }
    if (themesRaw.length === 0) {
      throw new Error(`Catalogue item ${name} missing themes`);
    }

    const scope = scopeFor(name, category, familyRaw);
    const contexts = contextsRaw.includes("all") ? ["all"] : contextsRaw.filter((c) => c !== "all");
    const contextLabel = formatContextLabel(contexts);
    const interactive =
      typeof raw.interactive === "boolean"
        ? raw.interactive
        : FAMILY_BY_NAME[name]
          ? !["layout", "foundations", "themes"].includes(scope)
          : null;
    const portal = typeof raw.portal === "boolean" ? raw.portal : null;

    items.push({
      name,
      registryItem,
      title,
      category,
      scope,
      family: scope,
      description,
      contexts,
      contextLabel,
      themes: themesRaw,
      dependencies: uses,
      interactive,
      portal,
      rawRegistryUrl: `${sitePath}/r/${name}.json`,
      versionedRegistryUrl: `${sitePath}/versions/${version}/r/${name}.json`,
      installCommand: `npx shadcn@latest add ${registryItem}`,
    });

    void versionedTemplate;
    void latestTemplate;
  }

  items.sort((a, b) => a.name.localeCompare(b.name));

  if (items.length !== expectedCount) {
    throw new Error(
      `Expected ${expectedCount} catalogue items after normalization, got ${items.length}`,
    );
  }

  return items;
}

export const SCOPE_LABELS: Record<PublicCatalogueScope, string> = {
  foundations: "Foundations",
  themes: "Themes",
  forms: "Forms",
  overlays: "Overlays",
  navigation: "Navigation",
  disclosure: "Disclosure",
  "data-display": "Data display",
  feedback: "Feedback",
  layout: "Layout",
  "core-ui": "Core UI",
  "game-display": "Game / display",
  patterns: "Patterns",
  templates: "Templates",
};
