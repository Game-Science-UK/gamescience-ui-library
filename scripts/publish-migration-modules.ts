/**
 * Publishes the migration module corpus as data.
 *
 * The composer UI that used to render these has been replaced by the
 * documentation app, but the data itself is still a published contract: the
 * `adopt` and `migrate` skills fetch `/docs/migration-config.json`, and
 * `pages:validate` and `smoke:pages` both assert it. Emitting it here keeps that
 * contract independent of how the site is rendered.
 */

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { SUPPORTED_THEMES } from "../src/themes/theme-contract.ts";
import { PAGES_SITE_URL, PAGES_VERSION, versionedRegistryTemplate } from "./pages-config.ts";

const root = path.resolve(import.meta.dirname, "..");
const modulesRoot = path.join(root, "site/migration-modules");

function readModule(relative: string) {
  const full = path.join(modulesRoot, relative);
  if (!existsSync(full)) throw new Error(`Missing migration module ${relative}`);
  return readFileSync(full, "utf8");
}

export function compileMigrationConfig(availableVersions: string[]) {
  return {
    version: PAGES_VERSION,
    registryUrlTemplate: versionedRegistryTemplate(PAGES_VERSION, PAGES_SITE_URL),
    availableVersions,
    modules: {
      core: readModule("core.md"),
      architectureRules: readModule("architecture-rules.md"),
      contextModel: readModule("context-model.md"),
      fileOwnership: readModule("file-ownership.md"),
      auditOutput: readModule("audit-output.md"),
      coverageReporting: readModule("coverage-reporting.md"),
      projectStateRecord: readModule("project-state-record.md"),
      sliceReconciliation: readModule("slice-reconciliation.md"),
      mixedContextRoutes: readModule("mixed-context-routes.md"),
      visualLossReview: readModule("visual-loss-review.md"),
      validation: readModule("validation.md"),
      cleanup: readModule("cleanup.md"),
      overwritePolicy: readModule("overwrite-policy.md"),
      finalReport: readModule("final-report.md"),
      start: readModule("start/start.md"),
      startFinalReport: readModule("start/final-report.md"),
      upgrade: readModule("upgrade/upgrade.md"),
      upgradeFinalReport: readModule("upgrade/final-report.md"),
      modes: {
        audit: readModule("modes/audit.md"),
        incremental: readModule("modes/incremental.md"),
        full: readModule("modes/full.md"),
      },
      // Derived from the contract, so `theme:new` only has to drop the module
      // file in place — no code edit, and no theme can be silently omitted.
      themes: Object.fromEntries(
        SUPPORTED_THEMES.map((theme) => [theme, readModule(`themes/${theme}.md`)]),
      ),
      stacks: {
        tailwind3: readModule("stacks/tailwind3.md"),
        tailwind4: readModule("stacks/tailwind4.md"),
        detect: readModule("stacks/detect.md"),
      },
      contexts: {
        participant: readModule("contexts/participant.md"),
        facilitator: readModule("contexts/facilitator.md"),
        "shared-display": readModule("contexts/shared-display.md"),
        "multi-context": readModule("contexts/multi-context.md"),
      },
    },
  };
}

/** Writes `docs/migration-config.json` and the raw `docs/migration/**` corpus. */
export function publishMigrationModules(docsOut: string, availableVersions: string[]) {
  mkdirSync(docsOut, { recursive: true });
  writeFileSync(
    path.join(docsOut, "migration-config.json"),
    `${JSON.stringify(compileMigrationConfig(availableVersions), null, 2)}\n`,
  );

  const target = path.join(docsOut, "migration");
  mkdirSync(target, { recursive: true });
  cpSync(modulesRoot, target, { recursive: true });
}
