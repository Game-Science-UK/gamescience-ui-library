import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";

/** Public GitHub Pages site root (project pages). */
export const PAGES_SITE_ORIGIN = "https://game-science-uk.github.io";
export const PAGES_SITE_PATH = "/gamescience-ui-library";
export const PAGES_SITE_URL = `${PAGES_SITE_ORIGIN}${PAGES_SITE_PATH}`;

export const PAGES_VERSION = GAMESCIENCE_UI_VERSION;

/** Approved consumer-facing Markdown published at `/docs/*` (unversioned). */
export const PUBLIC_PAGES_DOCS = [
  "tailwind-v3-integration.md",
  "tailwind-v4-integration.md",
  "font-loading.md",
  "registry-usage.md",
  "registry-update-policy.md",
  "lovable-test-project.md",
  "theming.md",
  "context-model.md",
  "primitive-layer.md",
  "registry-coverage-backlog.md",
  "migration-notes.md",
  "github-pages-setup.md",
  "registry-homepage.md",
  "migration-workflow.md",
  "start-project-workflow.md",
  "upgrade-workflow.md",
  "public-pages-policy.md",
] as const;

export type PublicPagesDoc = (typeof PUBLIC_PAGES_DOCS)[number];

/** Document-specific marker text used by pages:validate and smoke:pages. */
export const PUBLIC_PAGES_DOC_MARKERS: Record<PublicPagesDoc, string> = {
  "tailwind-v3-integration.md": "Tailwind CSS v3 integration",
  "tailwind-v4-integration.md": "Tailwind CSS v4 integration",
  "font-loading.md": "Font loading",
  "registry-usage.md": "Registry usage",
  "registry-update-policy.md": "Registry update policy",
  "lovable-test-project.md": "Lovable test project setup",
  "theming.md": "Theming",
  "context-model.md": "Experience context model",
  "primitive-layer.md": "Primitive layer",
  "registry-coverage-backlog.md": "Registry coverage backlog",
  "migration-notes.md": "Migration notes",
  "github-pages-setup.md": "GitHub Pages setup checklist",
  "registry-homepage.md": "Registry homepage",
  "migration-workflow.md": "Migration workflow",
  "start-project-workflow.md": "Start project workflow",
  "upgrade-workflow.md": "Upgrade workflow",
  "public-pages-policy.md": "Public Pages policy",
};

/** Companion CSS published beside the Tailwind 4 integration guide. */
export const PUBLIC_PAGES_BRIDGE_CSS = "tailwind-v4-bridge.css";

export function latestRegistryTemplate(baseUrl = PAGES_SITE_URL) {
  return `${baseUrl}/r/{name}.json`;
}

export function versionedRegistryTemplate(version = PAGES_VERSION, baseUrl = PAGES_SITE_URL) {
  return `${baseUrl}/versions/${version}/r/{name}.json`;
}

export function latestCatalogueUrl(baseUrl = PAGES_SITE_URL) {
  return `${baseUrl}/agent-catalogue.json`;
}

export function versionedCatalogueUrl(version = PAGES_VERSION, baseUrl = PAGES_SITE_URL) {
  return `${baseUrl}/versions/${version}/agent-catalogue.json`;
}

export function buildVersionJson(options?: { version?: string; siteUrl?: string }) {
  const version = options?.version ?? PAGES_VERSION;
  const siteUrl = options?.siteUrl ?? PAGES_SITE_URL;
  return {
    name: "gamescience-ui-library",
    version,
    registryNamespace: "@gamescience",
    registryBase: versionedRegistryTemplate(version, siteUrl),
    latestRegistryBase: latestRegistryTemplate(siteUrl),
    catalogueUrl: versionedCatalogueUrl(version, siteUrl),
    latestCatalogueUrl: latestCatalogueUrl(siteUrl),
    siteUrl,
  };
}
