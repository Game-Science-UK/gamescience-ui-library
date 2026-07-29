import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";

/** Public GitHub Pages site root (project pages). */
export const PAGES_SITE_ORIGIN = "https://game-science-uk.github.io";
export const PAGES_SITE_PATH = "/gamescience-ui-library";
export const PAGES_SITE_URL = `${PAGES_SITE_ORIGIN}${PAGES_SITE_PATH}`;

export const PAGES_VERSION = GAMESCIENCE_UI_VERSION;

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
