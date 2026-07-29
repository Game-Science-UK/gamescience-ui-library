/** Shared Pages base-path helper. Never use page-relative `../` for registry URLs. */

export const PAGES_SITE_PATH = "/gamescience-ui-library";

export function withBase(pathname) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path.startsWith(PAGES_SITE_PATH)) return path;
  return `${PAGES_SITE_PATH}${path}`;
}

export function assetUrl(relative) {
  return withBase(`/assets/${relative.replace(/^\//, "")}`);
}

export function docsUrl(relative) {
  return withBase(`/docs/${relative.replace(/^\//, "")}`);
}

export function registryItemUrl(name) {
  return withBase(`/r/${name}.json`);
}

export function versionedRegistryItemUrl(version, name) {
  return withBase(`/versions/${version}/r/${name}.json`);
}

export function versionedRegistryTemplate(version) {
  return withBase(`/versions/${version}/r/{name}.json`);
}
