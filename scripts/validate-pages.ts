import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  composeMigrationBrief,
  composeStartBrief,
  composeUpgradeBrief,
} from "../site/scripts/compose-markdown-core.js";
import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";
import { registryItems, REGISTRY_VERSION } from "./registry-manifest.ts";
import {
  PAGES_SITE_PATH,
  PAGES_SITE_URL,
  PAGES_VERSION,
  PUBLIC_PAGES_BRIDGE_CSS,
  PUBLIC_PAGES_DOC_MARKERS,
  PUBLIC_PAGES_DOCS,
  versionedRegistryTemplate,
} from "./pages-config.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDist = path.join(root, "pages-dist");
const releasesDir = path.join(root, "releases");
const versionRoot = path.join(pagesDist, "versions", PAGES_VERSION);
const lockPath = path.join(root, "releases", `${PAGES_VERSION}.lock.json`);
const docsRoot = path.join(pagesDist, "docs");
const docsUrlPrefix = `${PAGES_SITE_PATH}/docs/`;

/** versioned = candidate only; full = latest + all version trees (default after promote). */
const mode = (process.env.PAGES_VALIDATE_MODE ?? "full").toLowerCase();

let failed = false;

function fail(message: string) {
  failed = true;
  console.error(`[pages:validate] ${message}`);
}

function hashFile(filePath: string) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function walkFiles(dir: string, acc: string[] = [], prefix = ""): string[] {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const key = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) walkFiles(full, acc, key);
    else acc.push(key);
  }
  return acc;
}

function assertExists(filePath: string, label: string) {
  if (!existsSync(filePath)) fail(`missing ${label}: ${path.relative(root, filePath)}`);
}

function assertJson(filePath: string, label: string) {
  assertExists(filePath, label);
  if (!existsSync(filePath)) return null;
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as Record<string, unknown>;
  } catch {
    fail(`invalid JSON: ${label}`);
    return null;
  }
}

function scanForForbidden(content: string, fileLabel: string) {
  if (/localhost|127\.0\.0\.1/i.test(content)) {
    fail(`${fileLabel} contains localhost/127.0.0.1`);
  }
  if (/\/Users\/|\/home\/|file:\/\//i.test(content)) {
    fail(`${fileLabel} contains absolute local path`);
  }
}

function stripCssComments(css: string) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function isHtmlFallback(content: string) {
  const head = content.slice(0, 400).toLowerCase();
  return (
    head.includes("<!doctype html") ||
    head.includes("<html") ||
    head.includes("file not found") ||
    head.includes("there isn't a github pages site here")
  );
}

function hasNearbyMarkdownHeading(content: string) {
  const sample = content.slice(0, 1200);
  return /^#{1,2}\s+\S+/m.test(sample);
}

function extractGuidanceDocRefs(guidance: string): string[] {
  const refs = new Set<string>();
  // Backtick paths and bare docs/*.md mentions from consumer guidance.
  for (const match of guidance.matchAll(/`?(docs\/[A-Za-z0-9._/-]+\.md)`?/g)) {
    refs.add(match[1]!);
  }
  for (const match of guidance.matchAll(/\(((\.\.\/)*docs\/[A-Za-z0-9._/-]+\.md)\)/g)) {
    refs.add(match[1]!);
  }
  for (const match of guidance.matchAll(/\((\/docs\/[A-Za-z0-9._/-]+\.md)\)/g)) {
    refs.add(match[1]!);
  }
  return [...refs];
}

/**
 * Resolve a first-party docs reference as a browser would against the Pages site base.
 * Returns the basename under pages-dist/docs when valid; otherwise fails.
 */
function resolveGuidanceDocRef(ref: string, label: string): string | null {
  if (/\/\/|%2e%2e/i.test(ref)) {
    fail(`${label}: rejected malformed docs reference ${ref}`);
    return null;
  }

  let resolved: URL;
  try {
    resolved = new URL(ref, `${PAGES_SITE_URL}/`);
  } catch {
    fail(`${label}: could not resolve docs reference ${ref}`);
    return null;
  }

  if (resolved.origin !== new URL(PAGES_SITE_URL).origin) {
    // External absolute URL — ignore.
    return null;
  }

  const pathname = resolved.pathname.replace(/\/{2,}/g, "/");
  if (!pathname.startsWith(docsUrlPrefix)) {
    fail(`${label}: docs reference ${ref} resolves outside ${docsUrlPrefix} (got ${pathname})`);
    return null;
  }

  const relative = pathname.slice(docsUrlPrefix.length);
  if (!relative || relative.includes("/") || relative.includes("..")) {
    fail(`${label}: docs reference ${ref} targets unexpected docs path ${pathname}`);
    return null;
  }
  if (!relative.endsWith(".md")) {
    fail(`${label}: docs reference ${ref} is not a Markdown asset`);
    return null;
  }
  return relative;
}

function validatePublishedMarkdown(fileName: string, content: string) {
  const label = `docs/${fileName}`;
  if (!content.trim()) {
    fail(`${label} is empty`);
    return;
  }
  if (isHtmlFallback(content)) {
    fail(`${label} looks like an HTML error/fallback document`);
    return;
  }
  if (!hasNearbyMarkdownHeading(content)) {
    fail(`${label} missing level-1/2 Markdown heading near the start`);
  }
  const marker = PUBLIC_PAGES_DOC_MARKERS[fileName as keyof typeof PUBLIC_PAGES_DOC_MARKERS];
  if (marker && !content.includes(marker)) {
    fail(`${label} missing expected marker text "${marker}"`);
  }
}

function validateRelativeDocLinks(fileName: string, content: string) {
  const label = `docs/${fileName}`;
  const docBaseUrl = `${PAGES_SITE_URL}/docs/${fileName}`;

  for (const match of content.matchAll(/\[([^\]]*)\]\(([^)]+)\)/g)) {
    const href = match[2]!.trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) continue;
    if (/^https?:\/\//i.test(href)) {
      // Ignore external URLs (including intentional GitHub source links).
      continue;
    }

    let resolved: URL;
    try {
      resolved = new URL(href, docBaseUrl);
    } catch {
      fail(`${label}: invalid relative link ${href}`);
      continue;
    }

    if (resolved.origin !== new URL(PAGES_SITE_URL).origin) continue;

    const pathname = resolved.pathname.replace(/\/{2,}/g, "/");
    if (!pathname.startsWith(docsUrlPrefix)) {
      fail(`${label}: relative link ${href} resolves outside ${docsUrlPrefix}`);
      continue;
    }

    const relative = pathname.slice(docsUrlPrefix.length);
    if (!relative || relative.includes("/") || relative.includes("..")) {
      fail(`${label}: relative link ${href} targets unexpected path ${pathname}`);
      continue;
    }
    if (!(relative.endsWith(".md") || relative.endsWith(".css"))) {
      // index.html and other assets under docs may exist; only require md/css for now.
      if (!existsSync(path.join(docsRoot, relative))) {
        fail(`${label}: relative link ${href} missing target docs/${relative}`);
      }
      continue;
    }
    if (!existsSync(path.join(docsRoot, relative))) {
      fail(`${label}: relative link ${href} missing target docs/${relative}`);
    }
  }
}

function validateSitePages() {
  const requiredPages = [
    "index.html",
    "catalogue/index.html",
    "start/index.html",
    "upgrade/index.html",
    "migrate/index.html",
    "site-data.json",
    "docs/migration-config.json",
    "assets/compose-markdown-core.js",
    "assets/site.css",
  ];
  for (const relative of requiredPages) {
    assertExists(path.join(pagesDist, relative), relative);
  }

  const indexHtml = readFileSync(path.join(pagesDist, "index.html"), "utf8");
  if (!indexHtml.includes("What is a registry?") || !indexHtml.includes("Choose a workflow")) {
    fail("homepage appears to be the old registry-only stub");
  }
  if (!indexHtml.includes(PAGES_VERSION)) {
    fail("homepage missing current PAGES_VERSION");
  }
  if (!indexHtml.includes("Theme controls visual identity")) {
    fail("homepage missing theme/context/role/route mental-model copy");
  }
  if (!indexHtml.includes("/docs/context-model.md")) {
    fail("homepage missing link to /docs/context-model.md");
  }
  for (const label of ["Participant", "Facilitator", "Shared display"]) {
    if (!indexHtml.includes(label)) {
      fail(`homepage missing context card label ${label}`);
    }
  }
  if (!indexHtml.includes("Games do not need to implement every context")) {
    fail("homepage missing optional-context note");
  }

  const siteData = assertJson(path.join(pagesDist, "site-data.json"), "site-data.json") as {
    version?: string;
    itemCount?: number;
    catalogue?: Array<Record<string, unknown>>;
  } | null;
  if (siteData) {
    if (siteData.version !== PAGES_VERSION) {
      fail(`site-data.json version mismatch: ${String(siteData.version)}`);
    }
    if (
      siteData.itemCount !== registryItems.length ||
      !Array.isArray(siteData.catalogue) ||
      siteData.catalogue.length !== registryItems.length
    ) {
      fail(
        `site-data.json must contain exactly ${registryItems.length} normalized catalogue items (REGISTRY_VERSION=${REGISTRY_VERSION})`,
      );
    }
    for (const item of siteData.catalogue ?? []) {
      for (const field of [
        "name",
        "category",
        "scope",
        "description",
        "contexts",
        "contextLabel",
        "family",
        "dependencies",
        "rawRegistryUrl",
        "versionedRegistryUrl",
      ]) {
        if (item[field] === undefined || item[field] === null || item[field] === "") {
          fail(`site-data catalogue item missing ${field}`);
          break;
        }
      }
      const rawUrl = String(item.rawRegistryUrl ?? "");
      const versionedUrl = String(item.versionedRegistryUrl ?? "");
      if (!rawUrl.startsWith(`${PAGES_SITE_PATH}/r/`)) {
        fail(`rawRegistryUrl must use Pages base path, got ${rawUrl}`);
      }
      if (!versionedUrl.startsWith(`${PAGES_SITE_PATH}/versions/`)) {
        fail(`versionedRegistryUrl must use Pages base path, got ${versionedUrl}`);
      }
      if (rawUrl.includes("..") || versionedUrl.includes("..")) {
        fail("catalogue URLs must not use path traversal");
      }
    }
  }

  const migrationConfig = assertJson(
    path.join(pagesDist, "docs/migration-config.json"),
    "docs/migration-config.json",
  ) as { version?: string; modules?: Record<string, unknown> } | null;
  if (migrationConfig) {
    if (migrationConfig.version !== PAGES_VERSION) {
      fail("migration-config.json version mismatch");
    }
    const modules = migrationConfig.modules ?? {};
    for (const key of [
      "core",
      "architectureRules",
      "contextModel",
      "fileOwnership",
      "modes",
      "themes",
      "stacks",
      "contexts",
      "overwritePolicy",
      "finalReport",
      "start",
      "upgrade",
    ]) {
      if (!(key in modules)) fail(`migration-config.json missing modules.${key}`);
    }
    const stacks = (modules.stacks ?? {}) as Record<string, unknown>;
    for (const key of ["tailwind3", "tailwind4", "detect"]) {
      if (typeof stacks[key] !== "string" || !(stacks[key] as string).trim()) {
        fail(`migration-config.json missing stacks.${key}`);
      }
    }
    if ("lovable-tailwind4" in stacks || "unknown" in stacks) {
      fail("migration-config.json must not publish legacy stack keys lovable-tailwind4/unknown");
    }
    const contextModel = modules.contextModel;
    if (typeof contextModel !== "string" || !contextModel.trim()) {
      fail("migration-config.json modules.contextModel must be a non-empty string");
    } else {
      const occurrences = (JSON.stringify(modules).match(/## Experience context model/g) ?? [])
        .length;
      if (occurrences !== 1) {
        fail(
          `migration-config.json must include the context-model module heading exactly once (found ${occurrences})`,
        );
      }
      for (const marker of [
        "inferred user roles",
        "Not every application needs all three contexts",
        "Shared-display privacy contract",
        "Authorisation separation",
        "src/docs/gamescience-ui-contexts.md",
        "Required context audit table",
      ]) {
        if (!contextModel.includes(marker)) {
          fail(`migration-config.json contextModel missing marker: ${marker}`);
        }
      }
      if (
        /facilitator context (grants|equals|means) facilitator (authority|permission)/i.test(
          contextModel,
        )
      ) {
        fail("contextModel must not equate facilitator context with facilitator authority");
      }
      if (/implement all three contexts by default/i.test(contextModel)) {
        fail("contextModel must not require all three contexts by default");
      }

      const registryUrl = versionedRegistryTemplate();
      const sampleBriefs = [
        composeMigrationBrief({
          modules: modules as never,
          version: PAGES_VERSION,
          registryUrl,
          theme: "citadel",
          mode: "audit",
          stack: "detect",
          contexts: ["participant"],
          projectType: "participant-experience",
          generatedAt: "2026-07-30",
        }),
        composeStartBrief({
          modules: modules as never,
          version: PAGES_VERSION,
          registryUrl,
          theme: "gamescience",
          contexts: ["participant", "facilitator", "shared-display"],
          generatedAt: "2026-07-30",
        }),
        composeUpgradeBrief({
          modules: modules as never,
          fromVersion: "0.2.0",
          toVersion: PAGES_VERSION,
          registryUrl,
          theme: "citadel",
          contextModelStatus: "unknown",
          generatedAt: "2026-07-30",
        }),
      ];
      for (const brief of sampleBriefs) {
        for (const marker of [
          "Experience context model",
          "inferred user roles",
          "Shared-display privacy contract",
          "Not every application needs all three contexts",
        ]) {
          if (!brief.includes(marker)) {
            fail(`generated brief missing context marker: ${marker}`);
          }
        }
        if (/player mode|host mode|board mode|projection mode/i.test(brief)) {
          fail("generated brief contains stale non-canonical context vocabulary");
        }
        if (
          /facilitator context (grants|equals|means) facilitator (authority|permission)/i.test(
            brief,
          )
        ) {
          fail("generated brief equates facilitator context with facilitator authority");
        }
      }
    }
  }

  // Generator scripts must not use raw innerHTML.
  const assetsDir = path.join(pagesDist, "assets");
  if (existsSync(assetsDir)) {
    for (const entry of readdirSync(assetsDir)) {
      if (!entry.endsWith(".js")) continue;
      const source = readFileSync(path.join(assetsDir, entry), "utf8");
      if (/\.innerHTML\s*=/.test(source) && !source.includes("escapeHtml")) {
        fail(`assets/${entry} assigns innerHTML without approved escape helper usage`);
      }
    }
  }

  // First-party absolute Pages links in HTML must resolve under pages-dist.
  for (const relative of [
    "index.html",
    "catalogue/index.html",
    "start/index.html",
    "upgrade/index.html",
    "migrate/index.html",
    "docs/index.html",
  ]) {
    const full = path.join(pagesDist, relative);
    if (!existsSync(full)) continue;
    const html = readFileSync(full, "utf8");
    for (const match of html.matchAll(/href="(\/gamescience-ui-library\/[^"]+)"/g)) {
      const href = match[1]!;
      if (href.includes("..")) {
        fail(`${relative} has traversal href ${href}`);
        continue;
      }
      const mapped = href.replace(PAGES_SITE_PATH, "");
      const target = path.join(pagesDist, mapped.replace(/^\//, ""));
      const asFile = target.endsWith("/") ? path.join(target, "index.html") : target;
      if (!existsSync(asFile) && !existsSync(target)) {
        fail(`${relative} links to missing Pages path ${href}`);
      }
    }
  }
}

function validatePublicDocumentation() {
  if (!existsSync(docsRoot)) {
    fail(
      "missing pages-dist/docs — deployable Pages artifacts require latest promotion to publish public docs",
    );
    return;
  }

  for (const name of PUBLIC_PAGES_DOCS) {
    const full = path.join(docsRoot, name);
    if (!existsSync(full)) {
      fail(`missing public documentation pages-dist/docs/${name}`);
      continue;
    }
    const content = readFileSync(full, "utf8");
    validatePublishedMarkdown(name, content);
    validateRelativeDocLinks(name, content);
  }

  const bridgePath = path.join(docsRoot, PUBLIC_PAGES_BRIDGE_CSS);
  if (!existsSync(bridgePath)) {
    fail(`missing pages-dist/docs/${PUBLIC_PAGES_BRIDGE_CSS}`);
  } else {
    const bridge = readFileSync(bridgePath, "utf8");
    if (/@import\s+(?:url\()?["']https?:/i.test(stripCssComments(bridge))) {
      fail(`docs/${PUBLIC_PAGES_BRIDGE_CSS} contains remote @import`);
    }
    if (/--([a-z0-9-]+)\s*:\s*var\(\s*--\1\s*\)/i.test(stripCssComments(bridge))) {
      fail(`docs/${PUBLIC_PAGES_BRIDGE_CSS} contains circular custom-property mapping`);
    }
  }

  const guidanceSources: Array<{ label: string; content: string }> = [];
  const consumerGuidance = path.join(root, "consumer/gamescience-ui-guidance.md");
  if (existsSync(consumerGuidance)) {
    guidanceSources.push({
      label: "consumer/gamescience-ui-guidance.md",
      content: readFileSync(consumerGuidance, "utf8"),
    });
  }

  const baseJsonPath = path.join(pagesDist, "r", "base.json");
  if (existsSync(baseJsonPath)) {
    try {
      const base = JSON.parse(readFileSync(baseJsonPath, "utf8")) as {
        files?: Array<{ target?: string; path?: string; content?: string }>;
      };
      const guidanceFile = base.files?.find(
        (file) =>
          (file.target ?? file.path ?? "").endsWith("gamescience-ui-guidance.md") &&
          typeof file.content === "string",
      );
      if (guidanceFile?.content) {
        guidanceSources.push({
          label: "pages-dist/r/base.json guidance",
          content: guidanceFile.content,
        });
      }
    } catch {
      fail("pages-dist/r/base.json is not valid JSON while validating guidance docs refs");
    }
  }

  for (const source of guidanceSources) {
    for (const ref of extractGuidanceDocRefs(source.content)) {
      const relative = resolveGuidanceDocRef(ref, source.label);
      if (!relative) continue;
      if (!existsSync(path.join(docsRoot, relative))) {
        fail(`${source.label}: resolved docs reference ${ref} missing pages-dist/docs/${relative}`);
      }
    }
  }
}

function validateLock(version: string) {
  const versionTree = path.join(pagesDist, "versions", version);
  const lockFile = path.join(releasesDir, `${version}.lock.json`);
  if (!existsSync(lockFile)) {
    fail(`missing release lock releases/${version}.lock.json`);
    return;
  }
  if (!existsSync(versionTree)) {
    fail(`missing version tree versions/${version} for lock`);
    return;
  }

  const lock = JSON.parse(readFileSync(lockFile, "utf8")) as {
    version: string;
    files: Record<string, string>;
  };
  if (lock.version !== version) {
    fail(`release lock ${version} has mismatched version field ${lock.version}`);
  }

  for (const [relative, expectedHash] of Object.entries(lock.files)) {
    const full = path.join(versionTree, relative);
    if (!existsSync(full)) {
      fail(`locked file missing from versions/${version}: ${relative}`);
      continue;
    }
    const actual = hashFile(full);
    if (actual !== expectedHash) {
      fail(
        `immutable version ${version} content drift for ${relative}. Do not rewrite locked releases.`,
      );
    }
  }
}

function main() {
  if (!existsSync(pagesDist)) {
    fail("pages-dist missing — run npm run pages:build");
    process.exit(1);
  }

  if (PAGES_VERSION !== GAMESCIENCE_UI_VERSION) {
    fail(`PAGES_VERSION !== GAMESCIENCE_UI_VERSION`);
  }

  assertExists(versionRoot, `versions/${PAGES_VERSION}`);
  const versionedVersionJson = assertJson(
    path.join(versionRoot, "version.json"),
    `versions/${PAGES_VERSION}/version.json`,
  );
  assertJson(
    path.join(versionRoot, "agent-catalogue.json"),
    `versions/${PAGES_VERSION}/agent-catalogue.json`,
  );

  if (versionedVersionJson) {
    if (versionedVersionJson.version !== PAGES_VERSION) {
      fail(`versioned version.json mismatch`);
    }
    scanForForbidden(JSON.stringify(versionedVersionJson), "versioned version.json");
  }

  for (const item of registryItems) {
    const versionedItem = path.join(versionRoot, "r", `${item.name}.json`);
    assertExists(versionedItem, `versions/${PAGES_VERSION}/r/${item.name}.json`);
    const versionedJson = assertJson(
      versionedItem,
      `versions/${PAGES_VERSION}/r/${item.name}.json`,
    );
    if (versionedJson) {
      scanForForbidden(
        JSON.stringify(versionedJson),
        `versions/${PAGES_VERSION}/r/${item.name}.json`,
      );
      const meta = versionedJson.meta as { version?: string } | undefined;
      if (meta?.version && meta.version !== PAGES_VERSION) {
        fail(`versions/${PAGES_VERSION}/r/${item.name}.json meta.version mismatch`);
      }
    }
  }

  // Always revalidate every immutable release lock present on disk.
  if (existsSync(releasesDir)) {
    for (const entry of readdirSync(releasesDir)) {
      if (!entry.endsWith(".lock.json")) continue;
      const version = entry.replace(/\.lock\.json$/, "");
      validateLock(version);
    }
  }

  if (!existsSync(lockPath)) {
    fail(
      `missing release lock releases/${PAGES_VERSION}.lock.json — run pages:build (versioned stage) once to create it`,
    );
  }

  if (mode === "full") {
    assertExists(path.join(pagesDist, "index.html"), "index.html");
    assertExists(path.join(pagesDist, ".nojekyll"), ".nojekyll");
    assertExists(path.join(pagesDist, "version.json"), "version.json");
    assertExists(path.join(pagesDist, "agent-catalogue.json"), "agent-catalogue.json");

    const versionJson = assertJson(path.join(pagesDist, "version.json"), "version.json");
    const catalogue = assertJson(
      path.join(pagesDist, "agent-catalogue.json"),
      "agent-catalogue.json",
    );

    if (versionJson) {
      if (versionJson.version !== PAGES_VERSION) {
        fail(`version.json version mismatch: ${String(versionJson.version)} !== ${PAGES_VERSION}`);
      }
      if (versionJson.latestPending === true) {
        fail("version.json still marked latestPending — run PAGES_STAGE=latest pages:build");
      }
      const registryBase = String(versionJson.registryBase ?? "");
      const latestBase = String(versionJson.latestRegistryBase ?? "");
      if (!registryBase.includes(`${PAGES_SITE_PATH}/versions/${PAGES_VERSION}/r/`)) {
        fail("version.json registryBase missing versioned Pages subpath");
      }
      if (!latestBase.includes(`${PAGES_SITE_PATH}/r/`)) {
        fail("version.json latestRegistryBase missing Pages subpath");
      }
      if (!String(versionJson.siteUrl ?? "").startsWith(PAGES_SITE_URL)) {
        fail("version.json siteUrl does not match expected Pages URL");
      }
      scanForForbidden(JSON.stringify(versionJson), "version.json");
    }

    if (catalogue) {
      for (const item of registryItems) {
        if (!(item.name in catalogue)) fail(`agent-catalogue missing ${item.name}`);
      }
      scanForForbidden(JSON.stringify(catalogue), "agent-catalogue.json");
    }

    for (const item of registryItems) {
      const latestItem = path.join(pagesDist, "r", `${item.name}.json`);
      assertExists(latestItem, `r/${item.name}.json`);
      const latestJson = assertJson(latestItem, `r/${item.name}.json`);
      if (latestJson) {
        scanForForbidden(JSON.stringify(latestJson), `r/${item.name}.json`);
        const deps = (latestJson.registryDependencies as string[] | undefined) ?? [];
        for (const dep of deps) {
          if (!dep.startsWith("@gamescience/")) {
            fail(`r/${item.name}.json has non-namespaced registryDependency: ${dep}`);
          }
          if (/\/versions\/|https?:\/\/|localhost|latest/i.test(dep)) {
            fail(`r/${item.name}.json registryDependency must stay namespaced, found: ${dep}`);
          }
        }
      }
    }

    const prohibitedNames = [".env", ".env.local", ".env.production", "credentials.json"];
    for (const name of prohibitedNames) {
      if (existsSync(path.join(pagesDist, name))) fail(`prohibited file present: ${name}`);
    }

    const allFiles = walkFiles(pagesDist);
    for (const relative of allFiles) {
      if (relative.includes("node_modules") || relative.includes("tmp/")) {
        fail(`prohibited path in pages-dist: ${relative}`);
      }
      if (relative.endsWith(".map")) fail(`source map published: ${relative}`);
      const full = path.join(pagesDist, relative);
      if (statSync(full).isFile() && (relative.endsWith(".json") || relative.endsWith(".html"))) {
        scanForForbidden(readFileSync(full, "utf8"), relative);
      }
    }

    const indexPath = path.join(pagesDist, "index.html");
    if (existsSync(indexPath)) {
      const indexHtml = readFileSync(indexPath, "utf8");
      if (!indexHtml.includes(PAGES_SITE_PATH)) {
        fail("index.html does not reference the repository Pages subpath");
      }
    }

    validatePublicDocumentation();
    validateSitePages();
  }

  if (failed) process.exit(1);
  console.log(
    `[pages:validate] pages-dist valid for ${PAGES_VERSION} (mode=${mode}, ${registryItems.length} items)`,
  );
}

main();
