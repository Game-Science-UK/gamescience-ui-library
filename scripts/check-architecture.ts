/**
 * Architecture contract checker for GameScience UI Library.
 * Scans shared source for prohibited theme coupling, styling, naming, toast, and layer violations.
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const libraryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export interface ArchitectureViolation {
  rule: string;
  file: string;
  detail: string;
}

export interface ArchitectureCheckOptions {
  rootDir?: string;
  runSelfTests?: boolean;
}

interface ScanContext {
  rootDir: string;
  violations: ArchitectureViolation[];
}

const SHARED_SCAN_DIRS = ["src/components", "src/patterns", "src/templates"] as const;

const CONTENT_ALLOWLIST: Array<{ file: string; rule: string; reason: string }> = [];

const PROHIBITED_COMPONENT_NAMES = [
  "CitadelButton",
  "GamescienceButton",
  "GameScienceButton",
  "TechButton",
  "TechInput",
  "TechPanel",
  "GlassCard",
];

const NETWORKING_IMPORTS =
  /\bfrom\s+["'](?:socket\.io-client|ws|@supabase\/supabase-js|firebase\/(?:auth|firestore)|axios|graphql-request)["']|\bimport\s+["'](?:socket\.io-client|ws)["']/;

const LEGACY_TOAST_FILES = new Set(["toast.tsx", "toaster.tsx", "use-toast.ts", "use-toast.tsx"]);

function toPosix(filePath: string) {
  return filePath.split(path.sep).join("/");
}

function rel(ctx: ScanContext, file: string) {
  return toPosix(path.relative(ctx.rootDir, file));
}

function walkFiles(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walkFiles(full, acc);
    else if (/\.(tsx?|jsx?|css)$/.test(entry)) acc.push(full);
  }
  return acc;
}

function isAllowlisted(relative: string, rule: string) {
  return CONTENT_ALLOWLIST.some((entry) => entry.file === relative && entry.rule === rule);
}

function isUnder(relative: string, segments: readonly string[]) {
  return segments.some((segment) => relative === segment || relative.startsWith(`${segment}/`));
}

function isExemptThemeReference(relative: string) {
  return (
    relative.startsWith("src/themes/") ||
    relative.startsWith("src/foundations/") ||
    relative === "src/providers/gamescience-provider.tsx" ||
    relative.startsWith("scripts/") ||
    relative.startsWith("docs/") ||
    relative.startsWith("stories/") ||
    relative.includes(".test.") ||
    relative.includes(".spec.") ||
    relative.includes(".stories.")
  );
}

function push(ctx: ScanContext, rule: string, file: string, detail: string) {
  const relative = rel(ctx, file);
  if (isAllowlisted(relative, rule)) return;
  ctx.violations.push({ rule, file: relative, detail });
}

function checkThemeProp(ctx: ScanContext, file: string, content: string) {
  const relative = rel(ctx, file);
  if (!isUnder(relative, SHARED_SCAN_DIRS) || isExemptThemeReference(relative)) return;

  const lines = content.split("\n");
  const real = lines.filter((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*")) return false;
    if (/never pass theme/i.test(line) || /do not.*theme prop/i.test(line)) return false;
    // Ignore third-party JSX attributes such as Sonner's theme="system".
    if (
      /theme\s*=\s*["'{]/.test(line) &&
      !/\btheme\s*\?\s*:/.test(line) &&
      !/\btheme\s*:\s*/.test(line)
    ) {
      return false;
    }
    return (
      /\btheme\s*\?\s*:/.test(line) ||
      /\btheme\s*:\s*(?:GameTheme|["'][^"']+["']\s*\|)/.test(line) ||
      /\(\s*\{[^}]*\btheme\b[^}]*\}\s*:\s*\{/.test(line) ||
      /\{\s*theme\s*\}\s*:/.test(line)
    );
  });

  if (real.length > 0) {
    push(ctx, "theme-prop", file, `Shared component declares a theme prop: ${real[0]?.trim()}`);
  }
}

function checkThemeImports(ctx: ScanContext, file: string, content: string) {
  const relative = rel(ctx, file);
  if (!isUnder(relative, SHARED_SCAN_DIRS) || isExemptThemeReference(relative)) return;

  if (
    /from\s+["'][^"']*themes\/(?:citadel|gamescience)/.test(content) ||
    /import\s+["'][^"']*themes\/(?:citadel|gamescience)\.css["']/.test(content)
  ) {
    push(ctx, "theme-import", file, "Shared component imports a concrete theme module");
  }

  if (
    /data-theme\s*===|theme\s*===\s*["'](?:citadel|gamescience)["']|["'](?:citadel|gamescience)["']\s*===/.test(
      content,
    ) ||
    /\[data-theme=["'](?:citadel|gamescience)["']\]/.test(content)
  ) {
    push(ctx, "theme-branch", file, "Shared component branches on a concrete theme identity");
  }
}

function checkProhibitedNames(ctx: ScanContext, file: string, content: string) {
  const relative = rel(ctx, file);
  const base = path.basename(file, path.extname(file));

  for (const name of PROHIBITED_COMPONENT_NAMES) {
    if (base === name || base.toLowerCase() === name.toLowerCase()) {
      push(ctx, "prohibited-name", file, `Prohibited component filename/export pattern: ${name}`);
    }
    if (
      isUnder(relative, SHARED_SCAN_DIRS) &&
      new RegExp(
        `\\b(?:function|const|class|export\\s+(?:function|const|class)|interface|type)\\s+${name}\\b`,
      ).test(content)
    ) {
      push(ctx, "prohibited-name", file, `Prohibited export or declaration: ${name}`);
    }
  }

  if (
    isUnder(relative, [...SHARED_SCAN_DIRS, "src/providers"]) &&
    /\bKPMG\b/i.test(`${base}${content}`)
  ) {
    push(ctx, "client-name", file, "Client name (KPMG) found in shared source");
  }

  if (
    isUnder(relative, SHARED_SCAN_DIRS) &&
    (/(?:Button|Card|Panel|Input)V\d+$/.test(base) ||
      /^(?:New|Final|Temp|Old)[A-Z]/.test(base) ||
      /V2$/.test(base))
  ) {
    push(
      ctx,
      "versioned-or-placeholder-name",
      file,
      `Versioned or placeholder component name: ${base}`,
    );
  }
}

function checkFilenameCase(ctx: ScanContext, file: string) {
  const relative = rel(ctx, file);
  if (!isUnder(relative, [...SHARED_SCAN_DIRS, "src/providers", "src/templates"])) return;
  const base = path.basename(file);
  if (!/\.(tsx|ts)$/.test(base)) return;
  if (base.includes(".test.") || base.includes(".spec.")) return;
  if (/^[A-Z][A-Za-z0-9]*\.(tsx|ts)$/.test(base)) {
    push(ctx, "filename-case", file, `Expected kebab-case filename, found PascalCase: ${base}`);
  }
}

function checkRawHex(ctx: ScanContext, file: string, content: string) {
  const relative = rel(ctx, file);
  if (!isUnder(relative, SHARED_SCAN_DIRS)) return;

  const hex = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;
  if (hex.test(content)) {
    const line = content.split("\n").find((entry) => hex.test(entry));
    push(ctx, "raw-hex", file, `Raw hexadecimal colour in shared UI: ${line?.trim()}`);
  }
}

function checkLegacyToast(ctx: ScanContext, file: string) {
  const base = path.basename(file);
  if (LEGACY_TOAST_FILES.has(base)) {
    push(ctx, "legacy-toast-file", file, `Legacy toast file is prohibited; use Sonner (${base})`);
  }

  const content = readFileSync(file, "utf8");
  if (
    /from\s+["'][^"']*(?:\/ui\/toaster|\/ui\/toast|\/hooks\/use-toast|@\/components\/ui\/toast)/.test(
      content,
    )
  ) {
    push(ctx, "legacy-toast-import", file, "Import from legacy shadcn toast implementation");
  }
}

function checkLayerViolations(ctx: ScanContext, file: string, content: string) {
  const relative = rel(ctx, file);
  if (!isUnder(relative, SHARED_SCAN_DIRS)) return;

  if (NETWORKING_IMPORTS.test(content)) {
    push(
      ctx,
      "networking-import",
      file,
      "Shared component/pattern imports a networking or persistence client",
    );
  }

  if (
    /from\s+["'][^"']*themes\/assets\/(?:citadel|gamescience)/.test(content) &&
    isUnder(relative, ["src/components/ui"])
  ) {
    push(ctx, "theme-asset-in-ui", file, "Core UI component imports theme-specific assets");
  }
}

export function runArchitectureChecks(
  options: ArchitectureCheckOptions = {},
): ArchitectureViolation[] {
  const ctx: ScanContext = {
    rootDir: options.rootDir ?? libraryRoot,
    violations: [],
  };

  const files = [
    ...SHARED_SCAN_DIRS.flatMap((dir) => walkFiles(path.join(ctx.rootDir, dir))),
    ...walkFiles(path.join(ctx.rootDir, "src/providers")),
    ...walkFiles(path.join(ctx.rootDir, "src/lib")),
  ];

  for (const file of walkFiles(path.join(ctx.rootDir, "src"))) {
    checkLegacyToast(ctx, file);
  }

  for (const file of files) {
    const content = readFileSync(file, "utf8");
    checkThemeProp(ctx, file, content);
    checkThemeImports(ctx, file, content);
    checkProhibitedNames(ctx, file, content);
    checkFilenameCase(ctx, file);
    checkRawHex(ctx, file, content);
    checkLayerViolations(ctx, file, content);
  }

  return ctx.violations;
}

function writeFixture(dir: string, relative: string, content: string) {
  const full = path.join(dir, relative);
  mkdirSync(path.dirname(full), { recursive: true });
  writeFileSync(full, content);
}

function formatViolations(violations: ArchitectureViolation[]) {
  return violations.map((v) => `  [${v.rule}] ${v.file}: ${v.detail}`).join("\n");
}

function runSelfTests() {
  const fixtureRoot = path.join(libraryRoot, "tmp/architecture-fixtures");
  rmSync(fixtureRoot, { recursive: true, force: true });

  const good = path.join(fixtureRoot, "good");
  const bad = path.join(fixtureRoot, "bad");

  writeFixture(
    good,
    "src/components/ui/button.tsx",
    `export function Button(props: { intent?: "primary" }) { return <button {...props} /> }`,
  );
  writeFixture(
    good,
    "src/components/game/game-code-input.tsx",
    `export function GameCodeInput() { return <div className="text-primary" /> }`,
  );

  writeFixture(
    bad,
    "src/components/ui/CitadelButton.tsx",
    `export function CitadelButton({ theme }: { theme?: "citadel" }) { return <button style={{ color: "#ff5500" }} /> }`,
  );
  writeFixture(bad, "src/components/ui/toast.tsx", `export function toast() {}`);
  writeFixture(
    bad,
    "src/patterns/join/bad-join.tsx",
    `import { io } from "socket.io-client";\nexport function BadJoin() { io("x"); return null }`,
  );

  const goodViolations = runArchitectureChecks({ rootDir: good, runSelfTests: false });
  const badViolations = runArchitectureChecks({ rootDir: bad, runSelfTests: false });

  if (goodViolations.length > 0) {
    throw new Error(
      `Architecture self-test failed: good fixtures produced violations:\n${formatViolations(goodViolations)}`,
    );
  }

  const requiredRules = new Set([
    "filename-case",
    "prohibited-name",
    "theme-prop",
    "raw-hex",
    "legacy-toast-file",
    "networking-import",
  ]);
  const found = new Set(badViolations.map((v) => v.rule));
  const missing = [...requiredRules].filter((rule) => !found.has(rule));
  if (missing.length > 0) {
    throw new Error(
      `Architecture self-test failed: bad fixtures missing expected rules: ${missing.join(", ")}\n${formatViolations(badViolations)}`,
    );
  }

  console.log("[architecture:check] self-tests passed (good=0, bad detects required rules)");
  rmSync(fixtureRoot, { recursive: true, force: true });
}

export function main(options: ArchitectureCheckOptions = {}) {
  if (options.runSelfTests !== false) {
    runSelfTests();
  }

  const violations = runArchitectureChecks({ ...options, rootDir: options.rootDir ?? libraryRoot });
  if (violations.length > 0) {
    console.error("[architecture:check] failed:\n" + formatViolations(violations));
    process.exitCode = 1;
    return;
  }

  console.log("[architecture:check] passed");
}

const isDirectRun = process.argv[1]?.includes("check-architecture");
if (isDirectRun) {
  main();
}
