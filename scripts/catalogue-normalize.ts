import {
  PAGES_SITE_PATH,
  PAGES_VERSION,
  versionedRegistryTemplate,
  latestRegistryTemplate,
} from "./pages-config.ts";

export type PublicCatalogueScope =
  "base-themes" | "core-ui" | "game-display" | "patterns" | "templates";

export interface NormalizedCatalogueItem {
  name: string;
  registryItem: string;
  title: string;
  category: string;
  scope: PublicCatalogueScope;
  description: string;
  contexts: string[];
  /** Human-readable context labels derived only from catalogue contexts metadata. */
  contextLabel: string;
  themes: string[];
  dependencies: string[];
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

export function formatContextLabel(contexts: string[]): string {
  if (contexts.includes("all") || contexts.length === 0) {
    return "All contexts";
  }
  const labels = contexts.map((context) => CONTEXT_LABELS[context] ?? context);
  if (labels.length === 1) return labels[0]!;
  return labels.join(" · ");
}

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

const CORE_UI_NAMES = new Set([
  "button",
  "input",
  "panel",
  "badge",
  "alert",
  "progress",
  "skeleton",
]);

function scopeFor(name: string, category: string): PublicCatalogueScope {
  if (category === "base" || category === "theme") return "base-themes";
  if (category === "pattern") return "patterns";
  if (category === "template") return "templates";
  if (GAME_DISPLAY_NAMES.has(name)) return "game-display";
  if (CORE_UI_NAMES.has(name)) return "core-ui";
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

    if (!category) {
      throw new Error(`Catalogue item ${name} missing category`);
    }
    if (contextsRaw.length === 0) {
      throw new Error(`Catalogue item ${name} missing contexts`);
    }
    if (themesRaw.length === 0) {
      throw new Error(`Catalogue item ${name} missing themes`);
    }

    const scope = scopeFor(name, category);
    const contexts = contextsRaw.includes("all") ? ["all"] : contextsRaw.filter((c) => c !== "all");
    const contextLabel = formatContextLabel(contexts);

    items.push({
      name,
      registryItem,
      title,
      category,
      scope,
      description,
      contexts,
      contextLabel,
      themes: themesRaw,
      dependencies: uses,
      rawRegistryUrl: `${sitePath}/r/${name}.json`,
      versionedRegistryUrl: `${sitePath}/versions/${version}/r/${name}.json`,
      installCommand: `npx shadcn@latest add ${registryItem}`,
    });

    // Ensure URL templates stay versioned for consumers (latest only for raw path label).
    void versionedTemplate;
    void latestTemplate;
  }

  items.sort((a, b) => a.name.localeCompare(b.name));

  if (items.length !== 24) {
    throw new Error(`Expected 24 catalogue items after normalization, got ${items.length}`);
  }

  return items;
}

export const SCOPE_LABELS: Record<PublicCatalogueScope, string> = {
  "base-themes": "Base / themes",
  "core-ui": "Core UI",
  "game-display": "Game / display",
  patterns: "Patterns",
  templates: "Templates",
};
