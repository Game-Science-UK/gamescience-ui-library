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

describe("compose-markdown-core", () => {
  const config = loadConfig();
  const registryUrl =
    "https://game-science-uk.github.io/gamescience-ui-library/versions/0.2.1/r/{name}.json";

  it("composes citadel participant audit lovable-tw4", () => {
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
    expect(md).toContain("MODE: AUDIT ONLY — DO NOT MODIFY FILES");
    expect(md).toContain(registryUrl);
    expect(md).toContain("citadel");
    expect(md).toContain("Pacific primary");
    expect(md).toContain("Lovable / Tailwind 4");
    expect(md).toContain("Overwrite policy");
    expect(md).toContain("gamescience-ui-migration.md");
    expect(md).toContain("Final report");
    expect(md).toContain(FIXED_DATE);
    expect(md).not.toContain("/gamescience-ui-library/r/{name}.json\n");
  });

  it("composes gamescience facilitator incremental", () => {
    const md = composeMigrationBrief({
      modules: config.modules,
      version: "0.2.1",
      registryUrl,
      theme: "gamescience",
      mode: "incremental",
      stack: "lovable-tailwind4",
      contexts: ["facilitator"],
      projectType: "facilitator-console",
      generatedAt: FIXED_DATE,
    });
    expect(md).toContain("MODE: SAFE INCREMENTAL MIGRATION");
    expect(md).toContain("facilitator lobby");
    expect(md).toContain("theme-gamescience");
  });

  it("composes citadel multi-context full tailwind3", () => {
    const md = composeMigrationBrief({
      modules: config.modules,
      version: "0.2.1",
      registryUrl,
      theme: "citadel",
      mode: "full",
      stack: "tailwind3",
      contexts: ["participant", "facilitator"],
      projectType: "full-multi-surface",
      generatedAt: FIXED_DATE,
    });
    expect(md).toContain("MODE: FULL VISUAL ALIGNMENT");
    expect(md).toContain("multiple contexts");
    expect(md).toContain("Tailwind 3");
  });

  it("composes gamescience shared-display incremental unknown stack", () => {
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
    expect(md).toContain("shared-display lobby");
    expect(md).toContain("unknown");
    expect(md).toContain("Determine the consumer stack");
  });

  it("composes start briefs for both themes", () => {
    for (const theme of ["gamescience", "citadel"] as const) {
      const md = composeStartBrief({
        modules: config.modules,
        version: "0.2.1",
        registryUrl,
        theme,
        contexts: ["participant"],
        generatedAt: FIXED_DATE,
      });
      expect(md).toContain("start-project brief");
      expect(md).toContain(`theme-${theme}`);
      expect(md).toContain(registryUrl);
    }
  });

  it("composes upgrade 0.2.0 to 0.2.1", () => {
    const md = composeUpgradeBrief({
      modules: config.modules,
      fromVersion: "0.2.0",
      toVersion: "0.2.1",
      registryUrl,
      theme: "citadel",
      comparisonHarness: false,
      affectedItems: ["base", "theme-citadel"],
      generatedAt: FIXED_DATE,
    });
    expect(md).toContain("upgrade brief");
    expect(md).toContain("0.2.0");
    expect(md).toContain("0.2.1");
    expect(md).toContain(registryUrl);
    expect(md).toContain("Overwrite policy");
  });

  it("core module source is present on disk", () => {
    const core = readFileSync(path.join(root, "site/migration-modules/core.md"), "utf8");
    expect(core).toContain("{{VERSION}}");
  });
});
