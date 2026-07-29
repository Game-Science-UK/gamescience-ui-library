import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  REGISTRY_BASE_URL,
  REGISTRY_NAMESPACE,
  REGISTRY_VERSION,
  registryItems,
  type RegistryItemDefinition,
} from "./registry-manifest.ts";
import {
  PAGES_SITE_URL,
  versionedCatalogueUrl,
  versionedRegistryTemplate,
  latestRegistryTemplate,
} from "./pages-config.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/registry");

function writeConsumerMetadata() {
  const metadata = {
    name: "GameScience UI",
    version: REGISTRY_VERSION,
    registryNamespace: REGISTRY_NAMESPACE,
    registryUrl: versionedRegistryTemplate(REGISTRY_VERSION, PAGES_SITE_URL),
    latestRegistryUrl: latestRegistryTemplate(PAGES_SITE_URL),
    catalogueUrl: versionedCatalogueUrl(REGISTRY_VERSION, PAGES_SITE_URL),
    themeRule: "One active theme per application",
    contexts: ["participant", "facilitator", "shared-display"],
    guidanceFile: "src/docs/gamescience-ui-guidance.md",
  };
  mkdirSync(path.join(root, "consumer"), { recursive: true });
  writeFileSync(
    path.join(root, "consumer/gamescience-ui.json"),
    `${JSON.stringify(metadata, null, 2)}\n`,
  );
}

function ensureCleanOutput() {
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(path.join(outDir, "r"), { recursive: true });
}

function toRegistryDependency(name: string) {
  return `${REGISTRY_NAMESPACE}/${name}`;
}

function buildItem(item: RegistryItemDefinition) {
  const files = item.files.map((file) => {
    const absolute = path.join(root, file.path);
    const content = readFileSync(absolute, "utf8");
    return {
      path: file.path,
      type: file.type,
      target: file.target ?? file.path,
      content,
    };
  });

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies ?? [],
    registryDependencies: (item.registryDependencies ?? []).map(toRegistryDependency),
    files,
    meta: {
      category: item.category,
      version: REGISTRY_VERSION,
      namespace: REGISTRY_NAMESPACE,
    },
  };
}

function buildCatalogue() {
  const catalogue: Record<string, unknown> = {};
  for (const item of registryItems) {
    catalogue[item.name] = {
      registryItem: toRegistryDependency(item.name),
      category: item.category,
      title: item.title,
      purpose: item.description,
      useWhen: item.catalogue.useWhen,
      avoid: item.catalogue.avoid,
      preferOver: item.catalogue.preferOver ?? [],
      contexts: item.catalogue.contexts,
      themes: item.catalogue.themes,
      related: item.catalogue.related ?? [],
      props: item.catalogue.props ?? [],
      uses: item.registryDependencies ?? [],
      deprecatedAlternatives: item.catalogue.preferOver ?? [],
      version: REGISTRY_VERSION,
    };
  }
  return catalogue;
}

function main() {
  writeConsumerMetadata();
  ensureCleanOutput();

  const index = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "gamescience",
    homepage: "https://gamescience.ai",
    version: REGISTRY_VERSION,
    items: registryItems.map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      registryDependencies: (item.registryDependencies ?? []).map(toRegistryDependency),
      dependencies: item.dependencies ?? [],
      files: item.files.map((file) => ({
        path: file.path,
        type: file.type,
        target: file.target,
      })),
    })),
  };

  writeFileSync(path.join(outDir, "registry.json"), JSON.stringify(index, null, 2));
  writeFileSync(path.join(root, "registry/registry.json"), JSON.stringify(index, null, 2));

  const categoryDir: Record<RegistryItemDefinition["category"], string> = {
    base: "base",
    theme: "themes",
    component: "components",
    pattern: "patterns",
    template: "templates",
  };

  for (const item of registryItems) {
    const built = buildItem(item);
    const json = JSON.stringify(built, null, 2);
    writeFileSync(path.join(outDir, "r", `${item.name}.json`), json);
    const categoryPath = path.join(root, "registry", categoryDir[item.category]);
    mkdirSync(categoryPath, { recursive: true });
    writeFileSync(path.join(categoryPath, `${item.name}.json`), json);
  }

  const catalogue = buildCatalogue();
  writeFileSync(path.join(outDir, "agent-catalogue.json"), JSON.stringify(catalogue, null, 2));

  writeFileSync(
    path.join(outDir, "install.md"),
    [
      `# GameScience Registry`,
      ``,
      `Version: ${REGISTRY_VERSION}`,
      `Base URL: ${REGISTRY_BASE_URL}`,
      ``,
      `## Examples`,
      ``,
      `\`\`\`bash`,
      `npx shadcn@latest add ${REGISTRY_BASE_URL}/r/base.json`,
      `npx shadcn@latest add ${REGISTRY_BASE_URL}/r/theme-citadel.json`,
      `npx shadcn@latest add ${REGISTRY_BASE_URL}/r/join-flow.json`,
      `\`\`\``,
      ``,
    ].join("\n"),
  );

  console.log(`[registry:build] wrote ${registryItems.length} items to public/registry`);
  console.log(`[registry:build] catalogue: public/registry/agent-catalogue.json`);
  console.log(`[registry:build] serve with: npm run registry:serve`);
}

main();
