import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  composeMigrationBrief,
  composeStartBrief,
  composeUpgradeBrief,
} from "../../site/scripts/compose-markdown-core.js";
import { compileMigrationConfig } from "../../scripts/write-site-pages.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const FIXED_DATE = "2026-07-29";

function loadConfig() {
  return compileMigrationConfig(["0.1.0", "0.2.0", "0.2.1"]);
}

const CONTEXT_MARKERS = [
  "Experience context model",
  "inferred user roles",
  "User role / authority",
  "Route / mount point",
  "Game / workflow state",
  "Not every application needs all three contexts",
  "one root provider",
  "Required context audit table",
  "Screen splitting",
  "Shared-display privacy contract",
  "Authorisation separation",
  "src/docs/gamescience-ui-contexts.md",
  "implement all three by default",
] as const;

function assertSharedContextGuidance(md: string, registryUrl: string) {
  for (const marker of CONTEXT_MARKERS) {
    expect(md).toContain(marker);
  }
  expect(md).toContain(registryUrl);
  expect(md).toContain("Do **not**");
  expect(md).toMatch(/implement all three by default/);
  expect(md).not.toMatch(
    /facilitator context (grants|equals|means) facilitator (authority|permission)/i,
  );
  expect(md).not.toMatch(/\/gamescience-ui-library\/r\/\{name\}\.json\n/);
}

describe("compose-markdown-core", () => {
  const config = loadConfig();
  const registryUrl =
    "https://game-science-uk.github.io/gamescience-ui-library/versions/0.2.1/r/{name}.json";

  it("includes contextModel module exactly once in compiled config", () => {
    expect(config.modules.contextModel).toContain("Experience context model");
    const serialized = JSON.stringify(config.modules);
    expect((serialized.match(/## Experience context model/g) ?? []).length).toBe(1);
  });

  it("composes citadel participant-only audit lovable-tw4", () => {
    const md = composeMigrationBrief({
      modules: config.modules,
      version: "0.2.1",
      registryUrl,
      theme: "citadel",
      mode: "audit",
      stack: "lovable-tailwind4",
      contexts: ["participant"],
      projectType: "participant-experience",
      generatedAt: FIXED_DATE,
    });
    assertSharedContextGuidance(md, registryUrl);
    expect(md).toContain("MODE: AUDIT ONLY — DO NOT MODIFY FILES");
    expect(md).toContain("citadel");
    expect(md).toContain("Pacific primary");
    expect(md).toContain("Lovable / Tailwind 4");
    expect(md).toContain("complete context inventory");
    expect(md).toContain("do **not** change routes or providers");
    expect(md).toContain("unclassified");
    expect(md).toContain("Context architecture recommendation");
    expect(md).toContain("gamescience-ui-migration.md");
    expect(md).toContain(FIXED_DATE);
    expect(md).toContain("| Contexts | participant |");
  });

  it("composes gamescience participant+facilitator incremental", () => {
    const md = composeMigrationBrief({
      modules: config.modules,
      version: "0.2.1",
      registryUrl,
      theme: "gamescience",
      mode: "incremental",
      stack: "lovable-tailwind4",
      contexts: ["participant", "facilitator"],
      projectType: "full-multi-surface",
      generatedAt: FIXED_DATE,
    });
    assertSharedContextGuidance(md, registryUrl);
    expect(md).toContain("MODE: SAFE INCREMENTAL MIGRATION");
    expect(md).toContain("multiple contexts");
    expect(md).toContain("context-appropriate vertical slice");
    expect(md).toContain("Establish **one** root `GameScienceProvider`");
    expect(md).toContain("theme-gamescience");
  });

  it("composes citadel all-three-context full tailwind3", () => {
    const md = composeMigrationBrief({
      modules: config.modules,
      version: "0.2.1",
      registryUrl,
      theme: "citadel",
      mode: "full",
      stack: "tailwind3",
      contexts: ["participant", "facilitator", "shared-display"],
      projectType: "full-multi-surface",
      generatedAt: FIXED_DATE,
    });
    assertSharedContextGuidance(md, registryUrl);
    expect(md).toContain("MODE: FULL VISUAL ALIGNMENT");
    expect(md).toContain("Migrate context by context");
    expect(md).toContain("inventing a fourth context");
    expect(md).toContain("Tailwind 3");
    expect(md).toContain("shared-display");
  });

  it("composes unknown-context legacy project guidance", () => {
    const md = composeMigrationBrief({
      modules: config.modules,
      version: "0.2.1",
      registryUrl,
      theme: "gamescience",
      mode: "audit",
      stack: "unknown",
      contexts: ["participant", "facilitator", "shared-display"],
      projectType: "unknown",
      generatedAt: FIXED_DATE,
    });
    assertSharedContextGuidance(md, registryUrl);
    expect(md).toContain("unknown");
    expect(md).toContain("Determine the consumer stack");
    expect(md).toContain("unclassified");
    expect(md).toContain("Do not infer context solely from names");
  });

  it("composes shared-display incremental unknown stack", () => {
    const md = composeMigrationBrief({
      modules: config.modules,
      version: "0.2.1",
      registryUrl,
      theme: "gamescience",
      mode: "incremental",
      stack: "unknown",
      contexts: ["shared-display"],
      projectType: "shared-display",
      generatedAt: FIXED_DATE,
    });
    assertSharedContextGuidance(md, registryUrl);
    expect(md).toContain("shared-display lobby");
    expect(md).toContain("no participant-private information");
  });

  it("composes start briefs for participant-only, participant+facilitator, and all three", () => {
    const cases = [
      ["participant"],
      ["participant", "facilitator"],
      ["participant", "facilitator", "shared-display"],
    ] as const;

    for (const contexts of cases) {
      for (const theme of ["gamescience", "citadel"] as const) {
        const md = composeStartBrief({
          modules: config.modules,
          version: "0.2.1",
          registryUrl,
          theme,
          contexts: [...contexts],
          generatedAt: FIXED_DATE,
        });
        assertSharedContextGuidance(md, registryUrl);
        expect(md).toContain("start-project brief");
        expect(md).toContain(`theme-${theme}`);
        expect(md).toContain("Context planning");
        expect(md).toContain("Unselected contexts are **not** required");
        expect(md).toContain("src/docs/gamescience-ui-contexts.md");
        expect(md).toContain(contexts.join(", "));
      }
    }
  });

  it("composes upgrade briefs for each context-model status", () => {
    for (const status of ["yes", "partial", "no", "unknown"] as const) {
      const md = composeUpgradeBrief({
        modules: config.modules,
        fromVersion: "0.2.0",
        toVersion: "0.2.1",
        registryUrl,
        theme: "citadel",
        comparisonHarness: false,
        affectedItems: ["base", "theme-citadel"],
        contextModelStatus: status,
        generatedAt: FIXED_DATE,
      });
      assertSharedContextGuidance(md, registryUrl);
      expect(md).toContain("upgrade brief");
      expect(md).toContain("Context-model compatibility review");
      expect(md).toContain("0.2.0");
      expect(md).toContain("0.2.1");
      expect(md).toContain("Overwrite policy");
      expect(md).toContain(`existing project mapping (${status})`);
      expect(md).toContain("Avoid restructuring routes merely because a new registry version");
    }
  });

  it("core module source is present on disk", () => {
    const core = readFileSync(path.join(root, "site/migration-modules/core.md"), "utf8");
    expect(core).toContain("{{VERSION}}");
    const contextModel = readFileSync(
      path.join(root, "site/migration-modules/context-model.md"),
      "utf8",
    );
    expect(contextModel).toContain("Experience context model");
  });
});
