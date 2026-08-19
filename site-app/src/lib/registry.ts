/**
 * Reads the built registry as the site's single source of truth.
 *
 * Everything here comes from artefacts `registry:build` already produces, so the
 * site cannot drift from the registry the way hand-written HTML did. Nothing in
 * this module writes — the registry surface is owned by build-pages.
 */

import catalogueJson from "@registry/agent-catalogue.json";
import { GAMESCIENCE_UI_VERSION } from "@/lib/version";

export type Category = "base" | "theme" | "component" | "pattern" | "template";
export type Context = "participant" | "facilitator" | "shared-display" | "all";

export interface CatalogueEntry {
  registryItem: string;
  category: Category;
  title: string;
  purpose: string;
  useWhen: string[];
  avoid: string[];
  preferOver: string[];
  contexts: Context[];
  themes: string[];
  related: string[];
  props: string[];
  uses: string[];
  family?: string;
  interactive?: boolean;
  portal?: boolean;
  version: string;
}

export interface PayloadFile {
  path: string;
  target: string;
  type: string;
  content: string;
}

export interface Payload {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: PayloadFile[];
}

export const VERSION = GAMESCIENCE_UI_VERSION;

export const catalogue = catalogueJson as unknown as Record<string, CatalogueEntry>;

/**
 * Item payloads carry full source for the code panel — roughly 900kB across the
 * catalogue. Loaded on demand so the initial bundle stays small; only the item
 * page you open fetches its own source.
 */
const payloadLoaders = import.meta.glob<{ default: Payload }>("@registry/r/*.json");

const payloadCache = new Map<string, Payload>();

export async function loadPayload(name: string): Promise<Payload | undefined> {
  const cached = payloadCache.get(name);
  if (cached) return cached;

  const key = Object.keys(payloadLoaders).find((path) => path.endsWith(`/${name}.json`));
  const loader = key ? payloadLoaders[key] : undefined;
  if (!loader) return undefined;

  const module = await loader();
  payloadCache.set(name, module.default);
  return module.default;
}

export const itemNames = Object.keys(catalogue).sort();

export function entry(name: string): CatalogueEntry | undefined {
  return catalogue[name];
}

/** Registry item name → the `shadcn add` command a consumer runs. */
export function installCommand(name: string): string {
  return `npx shadcn@latest add @gamescience/${name}`;
}

export function versionedRegistryUrl(): string {
  return `https://game-science-uk.github.io/gamescience-ui-library/versions/${VERSION}/r/{name}.json`;
}

/** Groups for the catalogue index, in the order the sidebar should present them. */
export const CATEGORY_ORDER: Category[] = ["base", "theme", "template", "pattern", "component"];

export const CATEGORY_LABEL: Record<Category, string> = {
  base: "Foundations",
  theme: "Themes",
  template: "Shells",
  pattern: "Patterns",
  component: "Components",
};

export function byCategory(): Array<{ category: Category; items: string[] }> {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: itemNames.filter((name) => catalogue[name]?.category === category),
  })).filter((group) => group.items.length > 0);
}
