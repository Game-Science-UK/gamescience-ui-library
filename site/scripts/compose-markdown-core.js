/**
 * Pure deterministic Markdown composers for GameScience Pages workflows.
 * No DOM, fetch, clipboard, browser globals, or implicit Date.
 */

function requireString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`compose: missing ${label}`);
  }
  return value;
}

function substitute(template, values) {
  let out = template;
  for (const [key, value] of Object.entries(values)) {
    out = out.split(`{{${key}}}`).join(value);
  }
  return out;
}

function joinSections(sections) {
  return sections.filter((s) => typeof s === "string" && s.trim()).join("\n\n");
}

/**
 * @param {object} input
 * @param {object} input.modules - inlined module strings from migration-config.json
 */
export function composeMigrationBrief(input) {
  const modules = input.modules;
  if (!modules || typeof modules !== "object") {
    throw new Error("composeMigrationBrief: modules required");
  }

  const version = requireString(input.version, "version");
  const registryUrl = requireString(input.registryUrl, "registryUrl");
  const theme = requireString(input.theme, "theme");
  const mode = requireString(input.mode, "mode");
  const stack = requireString(input.stack, "stack");
  const projectType = requireString(input.projectType, "projectType");
  const generatedAt = requireString(input.generatedAt, "generatedAt");
  const contexts = Array.isArray(input.contexts) ? input.contexts : [];
  if (contexts.length === 0) {
    throw new Error("composeMigrationBrief: contexts required");
  }

  const modeLabels = {
    audit: "MODE: AUDIT ONLY — DO NOT MODIFY FILES",
    incremental: "MODE: SAFE INCREMENTAL MIGRATION",
    full: "MODE: FULL VISUAL ALIGNMENT",
  };
  const modeLabel = modeLabels[mode];
  if (!modeLabel) throw new Error(`composeMigrationBrief: unknown mode ${mode}`);

  const modeBody = modules.modes?.[mode];
  const themeBody = modules.themes?.[theme];
  const stackBody = modules.stacks?.[stack];
  if (!modeBody) throw new Error(`composeMigrationBrief: missing mode module ${mode}`);
  if (!themeBody) throw new Error(`composeMigrationBrief: missing theme module ${theme}`);
  if (!stackBody) throw new Error(`composeMigrationBrief: missing stack module ${stack}`);

  const contextKey =
    contexts.length > 1 || contexts.includes("multi") || contexts.includes("multi-context")
      ? "multi-context"
      : contexts[0];
  const contextBody = modules.contexts?.[contextKey];
  if (!contextBody) {
    throw new Error(`composeMigrationBrief: missing context module ${contextKey}`);
  }

  const values = {
    VERSION: version,
    REGISTRY_URL: registryUrl,
    THEME: theme,
    MODE: mode,
    MODE_LABEL: modeLabel,
    STACK: stack,
    CONTEXTS: contexts.join(", "),
    PROJECT_TYPE: projectType,
    GENERATED_AT: generatedAt,
  };

  const configBlock = `# GameScience UI migration brief

\`\`\`text
${modeLabel}
\`\`\`

## Migration configuration

| Field | Value |
| --- | --- |
| Registry version | ${version} |
| Immutable registry URL | \`${registryUrl}\` |
| Theme | ${theme} |
| Contexts | ${contexts.join(", ")} |
| Mode | ${mode} |
| Consumer stack | ${stack} |
| Project type | ${projectType} |
| Generated at | ${generatedAt} (informational; not registry identity) |
`;

  return substitute(
    joinSections([
      configBlock,
      modules.core,
      modules.architectureRules,
      modules.fileOwnership,
      modeBody,
      themeBody,
      stackBody,
      contextBody,
      modules.auditOutput,
      modules.validation,
      modules.overwritePolicy,
      modules.cleanup,
      modules.finalReport,
    ]),
    values,
  );
}

export function composeStartBrief(input) {
  const modules = input.modules;
  if (!modules?.start) throw new Error("composeStartBrief: modules.start required");

  const version = requireString(input.version, "version");
  const registryUrl = requireString(input.registryUrl, "registryUrl");
  const theme = requireString(input.theme, "theme");
  const generatedAt = requireString(input.generatedAt, "generatedAt");
  const contexts = Array.isArray(input.contexts) ? input.contexts : [];
  if (contexts.length === 0) throw new Error("composeStartBrief: contexts required");

  const themeBody = modules.themes?.[theme];
  if (!themeBody) throw new Error(`composeStartBrief: missing theme module ${theme}`);

  const values = {
    VERSION: version,
    REGISTRY_URL: registryUrl,
    THEME: theme,
    CONTEXTS: contexts.join(", "),
    GENERATED_AT: generatedAt,
  };

  const header = `# GameScience UI start-project brief

## Configuration

| Field | Value |
| --- | --- |
| Registry version | ${version} |
| Immutable registry URL | \`${registryUrl}\` |
| Theme | ${theme} |
| Contexts | ${contexts.join(", ")} |
| Generated at | ${generatedAt} (informational) |
`;

  return substitute(
    joinSections([
      header,
      modules.start,
      modules.architectureRules,
      modules.fileOwnership,
      themeBody,
      modules.overwritePolicy,
      modules.startFinalReport,
    ]),
    values,
  );
}

export function composeUpgradeBrief(input) {
  const modules = input.modules;
  if (!modules?.upgrade) throw new Error("composeUpgradeBrief: modules.upgrade required");

  const fromVersion = requireString(input.fromVersion, "fromVersion");
  const toVersion = requireString(input.toVersion, "toVersion");
  const registryUrl = requireString(input.registryUrl, "registryUrl");
  const theme = requireString(input.theme, "theme");
  const generatedAt = requireString(input.generatedAt, "generatedAt");
  const comparisonHarness = Boolean(input.comparisonHarness);
  const affectedItems = Array.isArray(input.affectedItems)
    ? input.affectedItems.join(", ")
    : "review with --diff";

  const values = {
    FROM_VERSION: fromVersion,
    TO_VERSION: toVersion,
    VERSION: toVersion,
    REGISTRY_URL: registryUrl,
    THEME: theme,
    COMPARISON_HARNESS: comparisonHarness ? "yes" : "no",
    AFFECTED_ITEMS: affectedItems,
    GENERATED_AT: generatedAt,
  };

  const header = `# GameScience UI upgrade brief

## Configuration

| Field | Value |
| --- | --- |
| Current version | ${fromVersion} |
| Target version | ${toVersion} |
| Immutable target registry URL | \`${registryUrl}\` |
| Installed theme | ${theme} |
| Comparison harness | ${comparisonHarness ? "yes" : "no"} |
| Affected items (if known) | ${affectedItems} |
| Generated at | ${generatedAt} (informational) |
`;

  return substitute(
    joinSections([
      header,
      modules.upgrade,
      modules.architectureRules,
      modules.fileOwnership,
      modules.overwritePolicy,
      modules.upgradeFinalReport,
    ]),
    values,
  );
}
