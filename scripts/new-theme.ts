/**
 * Scaffolds a new registry theme so the only remaining work is authoring token
 * values and theme-scoped treatments.
 *
 *   npm run theme:new -- <slug> [--title "Display Name"] [--registers a,b]
 *
 * Performs every mechanical registration step:
 *   1. src/themes/<slug>.css with all required tokens stubbed, grouped by section
 *   2. @import in src/themes/index.css
 *   3. <slug> added to SUPPORTED_THEMES
 *   4. Storybook theme toolbar entry
 *   5. registry:theme item in the manifest
 *
 * Theme-agnostic registry items resolve their theme list from SUPPORTED_THEMES,
 * so no per-item edits are needed.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { REQUIRED_THEME_TOKENS, SUPPORTED_THEMES } from "../src/themes/theme-contract.ts";

const repoRoot = path.resolve(import.meta.dirname, "..");

function fail(message: string): never {
  console.error(`[theme:new] ${message}`);
  process.exit(1);
}

// ---------------------------------------------------------------- arguments

const argv = process.argv.slice(2);
const slug = argv.find((arg) => !arg.startsWith("--"));
if (!slug) fail('missing theme slug — usage: npm run theme:new -- <slug> [--title "Name"]');

if (!/^[a-z][a-z0-9-]*$/.test(slug)) {
  fail(`slug "${slug}" must be lowercase kebab-case (letters, digits, hyphens)`);
}
if ((SUPPORTED_THEMES as readonly string[]).includes(slug)) {
  fail(`theme "${slug}" already exists in SUPPORTED_THEMES`);
}

function flag(name: string): string | undefined {
  const index = argv.indexOf(`--${name}`);
  return index === -1 ? undefined : argv[index + 1];
}

const title =
  flag("title") ??
  slug.replace(/(^|-)([a-z])/g, (_, sep, ch) => (sep ? " " : "") + ch.toUpperCase());
const registers = (flag("registers") ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

// ------------------------------------------------------- 1. theme stylesheet

const cssPath = path.join(repoRoot, "src/themes", `${slug}.css`);
if (existsSync(cssPath)) fail(`${path.relative(repoRoot, cssPath)} already exists`);

/** Group tokens using the section comments in the theme contract. */
function groupedTokens(): Array<{ section: string; tokens: string[] }> {
  const source = readFileSync(path.join(repoRoot, "src/themes/theme-contract.ts"), "utf8");
  const groups: Array<{ section: string; tokens: string[] }> = [];
  let current: { section: string; tokens: string[] } | undefined;

  for (const line of source.split("\n")) {
    const comment = /^\s*\/\/\s*(.+?)\s*$/.exec(line);
    const token = /^\s*"(--[a-z0-9-]+)",\s*$/.exec(line);
    if (comment) {
      current = { section: comment[1] ?? "Tokens", tokens: [] };
      groups.push(current);
    } else if (token?.[1] && current) {
      current.tokens.push(token[1]);
    }
  }

  const grouped = groups.filter((group) => group.tokens.length > 0);
  const seen = grouped.flatMap((group) => group.tokens);
  const missing = REQUIRED_THEME_TOKENS.filter((token) => !seen.includes(token));
  // Fall back to a flat list if the contract's comment structure ever changes.
  if (grouped.length === 0) return [{ section: "Tokens", tokens: [...REQUIRED_THEME_TOKENS] }];
  if (missing.length > 0) grouped.push({ section: "Ungrouped", tokens: missing });
  return grouped;
}

const groups = groupedTokens();

const tokenBlock = groups
  .map(
    (group) =>
      `  /* ${group.section} */\n` + group.tokens.map((token) => `  ${token}: ;`).join("\n"),
  )
  .join("\n\n");

const registerBlocks = registers
  .slice(1) // the first register is the default and lives in the base block
  .map(
    (register) => `
/* Register: ${register}. Override only the tokens that differ from the default. */
[data-theme="${slug}"][data-register="${register}"] {
  /* --token: value; */
}
`,
  )
  .join("");

const css = `/**
 * ${title} theme.
 *
 * Every token in REQUIRED_THEME_TOKENS must be declared — \`npm run theme:check\`
 * enforces this. Colour tokens are bare OKLCH channels (\`L C H\`, no wrapper),
 * consumed as \`oklch(var(--token))\`. Use \`npm run theme:oklch\` to convert hex.
 *
 * Do not fork React components. Style through tokens first, then theme-scoped
 * \`gs-*\` hooks. Do not embed remote font imports here — fonts are application-owned.
 */

[data-theme="${slug}"] {
${tokenBlock}
}
${registerBlocks}
/* Theme-scoped treatments.
 *
 * Add \`gs-*\` hook rules below only where tokens alone cannot express the design.
 * Every hook you use must already exist in the component source; if it does not,
 * raise it as a contract addition rather than editing components ad hoc.
 *
 * [data-theme="${slug}"] .gs-panel { }
 * [data-theme="${slug}"] .gs-button { }
 */
`;

writeFileSync(cssPath, css);

// --------------------------------------------------- 2. stylesheet aggregate

const indexCssPath = path.join(repoRoot, "src/themes/index.css");
const indexCss = readFileSync(indexCssPath, "utf8").trimEnd();
writeFileSync(indexCssPath, `${indexCss}\n@import "./${slug}.css";\n`);

// ------------------------------------------------------- 3. contract listing

const contractPath = path.join(repoRoot, "src/themes/theme-contract.ts");
const contract = readFileSync(contractPath, "utf8");
const themesLine = /export const SUPPORTED_THEMES = \[([^\]]*)\] as const;/.exec(contract);
if (!themesLine) fail("could not locate SUPPORTED_THEMES in the theme contract");
writeFileSync(
  contractPath,
  contract.replace(
    themesLine[0],
    `export const SUPPORTED_THEMES = [${themesLine[1]?.trim()}, "${slug}"] as const;`,
  ),
);

// ------------------------------------------------------ 4. Storybook toolbar

const previewPath = path.join(repoRoot, ".storybook/preview.tsx");
const preview = readFileSync(previewPath, "utf8");
const lastThemeOption = [
  ...preview.matchAll(/^(\s*)\{ value: "([a-z0-9-]+)", title: "[^"]*" \},$/gm),
]
  .filter((match) => (SUPPORTED_THEMES as readonly string[]).includes(match[2] ?? ""))
  .pop();
if (!lastThemeOption) {
  console.warn("[theme:new] could not locate the Storybook theme toolbar — add the entry manually");
} else {
  writeFileSync(
    previewPath,
    preview.replace(
      lastThemeOption[0],
      `${lastThemeOption[0]}\n${lastThemeOption[1]}{ value: "${slug}", title: "${title}" },`,
    ),
  );
}

// -------------------------------------------------------- 5. registry item

const manifestPath = path.join(repoRoot, "scripts/registry-manifest.ts");
const manifest = readFileSync(manifestPath, "utf8");
const anchor = '  {\n    name: "button",';
if (!manifest.includes(anchor)) {
  console.warn('[theme:new] could not locate the "button" item — add the registry item manually');
} else {
  const item = `  {
    name: "theme-${slug}",
    type: "registry:theme",
    title: "${title} Theme",
    description:
      "${title} theme CSS with semantic tokens and theme-scoped treatments — no component forks. Font stacks only; load fonts at the application level (see docs/font-loading.md).",
    category: "theme",
    registryDependencies: ["base"],
    files: [
      { path: "src/themes/${slug}.css", type: "registry:file", target: "src/themes/${slug}.css" },
    ],
    catalogue: {
      useWhen: ["building ${title}-branded game experiences"],
      avoid: [
        "creating ${title.replace(/\s+/g, "")}Button or other theme-named forks",
        "installing alongside another theme as concurrent nested themes",
      ],
      contexts: ["all"],
      themes: ["${slug}"],
      related: [${SUPPORTED_THEMES.map((theme) => `"theme-${theme}"`).join(", ")}],
    },
  },
`;
  writeFileSync(manifestPath, manifest.replace(anchor, `${item}${anchor}`));
}

// ---------------------------------------------- 6. migration theme module

// `migration-config.json` carries a per-theme validation lens, compiled from
// these modules and fetched by the adopt and migrate skills. The compiler
// iterates SUPPORTED_THEMES, so a missing module fails the build.
const moduleDir = path.join(repoRoot, "site/migration-modules/themes");
const modulePath = path.join(moduleDir, `${slug}.md`);
mkdirSync(moduleDir, { recursive: true });
writeFileSync(
  modulePath,
  `## Theme validation lens — ${title}

Selected theme: **${slug}**

Migrated screens must derive visual identity from \`@gamescience/theme-${slug}\` / \`${slug}.css\`.

Validation lens (not permission to fork components):

- TODO: describe the field, primary, emphasis and warning roles
- TODO: describe geometry, elevation and border grammar
- TODO: describe typography grammar
- TODO: list appearances this theme must never produce

Do **not** create \`${title.replace(/\s+/g, "")}Button\` or other ${title}-specific component APIs.
`,
);

// ------------------------------------------------------------------ summary

console.log(`[theme:new] scaffolded "${slug}" (${title})

  created  src/themes/${slug}.css        ${REQUIRED_THEME_TOKENS.length} tokens stubbed${
    registers.length > 1 ? `, ${registers.length} registers` : ""
  }
  updated  src/themes/index.css
  updated  src/themes/theme-contract.ts  SUPPORTED_THEMES
  updated  .storybook/preview.tsx        theme toolbar
  updated  scripts/registry-manifest.ts  theme-${slug} item
  created  site/migration-modules/themes/${slug}.md

Theme-agnostic registry items resolve from SUPPORTED_THEMES — no per-item edits needed.

Next:
  1. Author the token values in src/themes/${slug}.css
  2. npm run theme:check       verify all ${REQUIRED_THEME_TOKENS.length} tokens are declared
  3. npm run registry:build    regenerate payloads
  4. npm run validate          full suite
  5. release-registry          cut the new immutable version
`);
