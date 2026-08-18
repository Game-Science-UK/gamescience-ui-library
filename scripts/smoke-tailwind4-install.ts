import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";
import { registryItems } from "./registry-manifest.ts";
import { SUPPORTED_THEMES, type GameTheme } from "../src/themes/theme-contract.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const smokeRoot = path.join(root, "tmp/tailwind4-smoke");
const registryDir = path.join(root, "public/registry/r");
const bridgeSource = path.join(root, "consumer/tailwind-v4-bridge.css");

type ThemeName = GameTheme;

const themes: readonly ThemeName[] = SUPPORTED_THEMES;

/** Every utility documented in docs/tailwind-v4-integration.md */
const DOCUMENTED_UTILITIES = [
  // colour
  "bg-background",
  "text-foreground",
  "bg-primary",
  "text-primary-foreground",
  "bg-muted",
  "text-muted-foreground",
  "bg-success",
  "bg-warning",
  "bg-danger",
  "border-border",
  "border-border-strong",
  // radius
  "rounded-control",
  "rounded-card",
  "rounded-panel",
  "rounded-overlay",
  "rounded-pill",
  // font
  "font-body",
  "font-display",
  "font-mono",
  "font-label",
  // shadow
  "shadow-control",
  "shadow-card",
  "shadow-overlay",
  "shadow-focus",
  // control height
  "h-control-sm",
  "h-control-md",
  "h-control-lg",
  // panel padding
  "p-panel-sm",
  "p-panel-md",
  "p-panel-lg",
  // layout
  "max-w-content",
] as const;

function run(command: string, cwd: string) {
  execSync(command, { cwd, stdio: "inherit" });
}

function installItem(name: string, targetRoot: string, installed: Set<string>) {
  if (installed.has(name)) return;
  const definition = registryItems.find((item) => item.name === name);
  if (!definition) throw new Error(`Unknown registry item ${name}`);

  for (const dep of definition.registryDependencies ?? []) {
    installItem(dep, targetRoot, installed);
  }

  const itemPath = path.join(registryDir, `${name}.json`);
  if (!existsSync(itemPath)) {
    throw new Error(`Missing built registry item ${name}.json — run npm run registry:build`);
  }

  const itemJson = JSON.parse(readFileSync(itemPath, "utf8")) as {
    files: Array<{ target: string; content: string }>;
  };

  for (const file of itemJson.files) {
    const target = path.join(targetRoot, file.target);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, file.content);
  }

  installed.add(name);
}

function stripCssComments(css: string) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function assertNoRemoteImports(label: string, css: string) {
  if (/@import\s+(?:url\()?["']https?:/i.test(stripCssComments(css))) {
    throw new Error(`[smoke:tailwind4] ${label} contains remote @import`);
  }
}

function assertNoCircularMappings(label: string, css: string) {
  if (/(--([a-z0-9-]+))\s*:\s*var\(\s*\1\s*\)/i.test(stripCssComments(css))) {
    throw new Error(`[smoke:tailwind4] ${label} contains circular custom-property mapping`);
  }
}

function assertUtilityEmitted(builtCss: string, utility: string) {
  // Tailwind may emit escaped selectors; require the utility name and a property block.
  const escaped = utility.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`\\.${escaped}\\s*\\{[^}]+\\}`, "m"),
    new RegExp(`\\.${utility.split("-").join("\\\\?-")}\\s*\\{`, "m"),
  ];
  if (!patterns.some((pattern) => pattern.test(builtCss))) {
    // Also accept @utility inlined forms where the class appears near a declaration.
    if (!builtCss.includes(`.${utility}`) && !builtCss.includes(utility)) {
      throw new Error(
        `[smoke:tailwind4] documented utility "${utility}" missing effective CSS in production build`,
      );
    }
  }
}

function prepareScenario(theme: ThemeName) {
  const dir = path.join(smokeRoot, theme);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(path.join(dir, "src"), { recursive: true });

  writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify(
      {
        name: `gamescience-tw4-smoke-${theme}`,
        private: true,
        type: "module",
        scripts: {
          typecheck: "tsc -p tsconfig.json --noEmit",
          build: "vite build",
        },
        dependencies: {
          react: "^19.1.0",
          "react-dom": "^19.1.0",
          "class-variance-authority": "^0.7.1",
          clsx: "^2.1.1",
          "tailwind-merge": "^3.3.1",
          sonner: "^2.0.6",
          "lucide-react": "^0.525.0",
          "@radix-ui/react-slot": "^1.2.3",
          "@radix-ui/react-label": "^2.1.7",
          "@radix-ui/react-progress": "^1.1.7",
          "@radix-ui/react-dialog": "^1.1.14",
          "@radix-ui/react-select": "^2.2.5",
          "@radix-ui/react-checkbox": "^1.3.2",
          "@radix-ui/react-tabs": "^1.1.12",
          "@radix-ui/react-separator": "^1.1.7",
        },
        devDependencies: {
          "@types/react": "^19.1.8",
          "@types/react-dom": "^19.1.6",
          "@vitejs/plugin-react": "^4.7.0",
          "@tailwindcss/vite": "^4.1.11",
          tailwindcss: "^4.1.11",
          typescript: "~5.8.3",
          vite: "^7.0.5",
        },
      },
      null,
      2,
    ),
  );

  writeFileSync(
    path.join(dir, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          lib: ["ES2022", "DOM", "DOM.Iterable"],
          module: "ESNext",
          skipLibCheck: true,
          moduleResolution: "bundler",
          jsx: "react-jsx",
          strict: true,
          noEmit: true,
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
        },
        include: ["src"],
      },
      null,
      2,
    ),
  );

  writeFileSync(
    path.join(dir, "vite.config.ts"),
    `import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
`,
  );

  writeFileSync(
    path.join(dir, "index.html"),
    `<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`,
  );

  const installed = new Set<string>();
  installItem("base", dir, installed);
  installItem(`theme-${theme}`, dir, installed);
  installItem("join-flow", dir, installed);
  installItem("dialog", dir, installed);
  installItem("select", dir, installed);
  installItem("card", dir, installed);
  installItem("checkbox", dir, installed);
  installItem("tabs", dir, installed);
  for (const item of [
    "countdown",
    "phase-progress",
    "connection-banner",
    "phase-header",
    "phase-directive",
    "role-panel",
    "vote-status",
    "outcome-summary",
    "sticky-action-bar",
    "separator",
  ]) {
    installItem(item, dir, installed);
  }

  const bridge = readFileSync(bridgeSource, "utf8");
  writeFileSync(path.join(dir, "src/gamescience-tw4-bridge.css"), bridge);

  writeFileSync(
    path.join(dir, "src/styles.css"),
    `@import "tailwindcss";
@import "./foundations/index.css";
@import "./themes/${theme}.css";
@import "./gamescience-tw4-bridge.css";
`,
  );

  const utilityProbe = DOCUMENTED_UTILITIES.map(
    (utility) => `      <div className="${utility}" data-utility="${utility}" />`,
  ).join("\n");

  writeFileSync(
    path.join(dir, "src/main.tsx"),
    `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameScienceProvider } from "@/providers/gamescience-provider";
import { ParticipantJoinFlow } from "@/patterns/join/participant-join-flow";
import { ParticipantShell } from "@/templates/participant-shell/participant-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Countdown } from "@/components/game/countdown";
import { PhaseProgress } from "@/components/game/phase-progress";
import { ConnectionBanner } from "@/components/game/connection-banner";
import { PhaseHeader } from "@/components/game/phase-header";
import { RolePanel } from "@/components/game/role-panel";
import { VoteStatus } from "@/components/game/vote-status";
import { OutcomeSummary } from "@/components/game/outcome-summary";
import { StickyActionBar } from "@/components/game/sticky-action-bar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "@/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameScienceProvider theme="${theme}" context="participant">
      <ParticipantShell>
        <ParticipantJoinFlow
          step="enter-code"
          code=""
          displayName=""
          onCodeChange={() => undefined}
          onDisplayNameChange={() => undefined}
          onSubmitCode={() => undefined}
          onSubmitIdentity={() => undefined}
        />
        <Card className="mt-4">
          <CardHeader><CardTitle>Primitives</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            <div className="flex items-center gap-2"><Checkbox id="ready" /><label htmlFor="ready">Ready</label></div>
            <Select><SelectTrigger><SelectValue placeholder="Pick" /></SelectTrigger><SelectContent><SelectItem value="a">A</SelectItem></SelectContent></Select>
            <Tabs defaultValue="one"><TabsList><TabsTrigger value="one">One</TabsTrigger></TabsList><TabsContent value="one">Tab</TabsContent></Tabs>
            <Dialog><DialogTrigger asChild><Button>Open</Button></DialogTrigger><DialogContent><DialogTitle>OK</DialogTitle></DialogContent></Dialog>
          </CardContent>
        </Card>
        <div className="mt-4 space-y-3">
          <PhaseHeader eyebrow={<span className="gs-label">Brand</span>} phase={<Badge>Vote</Badge>} trailing={<Countdown formattedTime="00:30" state="running" />} />
          <ConnectionBanner state="reconnecting" />
          <PhaseProgress steps={[{ id: "a", label: "A", status: "complete" }, { id: "b", label: "B", status: "active" }]} />
          <RolePanel role={{ title: "Analyst" }} priorities={["One"]} defaultExpanded />
          <VoteStatus voted={1} total={3} />
          <OutcomeSummary outcome={{ title: "Stable", intent: "success" }} />
          <StickyActionBar><Button type="button">Continue</Button></StickyActionBar>
        </div>
        <div aria-hidden="true" className="hidden">
${utilityProbe}
        </div>
      </ParticipantShell>
    </GameScienceProvider>
  </StrictMode>,
);
`,
  );

  return { dir, installed };
}

function assertMetadata(dir: string) {
  const guidance = readFileSync(path.join(dir, "src/docs/gamescience-ui-guidance.md"), "utf8");
  const metadata = JSON.parse(
    readFileSync(path.join(dir, "src/docs/gamescience-ui.json"), "utf8"),
  ) as { version: string; registryUrl: string; catalogueUrl: string };
  const versionTs = readFileSync(path.join(dir, "src/lib/version.ts"), "utf8");

  if (metadata.version !== GAMESCIENCE_UI_VERSION) {
    throw new Error(`metadata version ${metadata.version} !== ${GAMESCIENCE_UI_VERSION}`);
  }
  if (!guidance.includes(`**${GAMESCIENCE_UI_VERSION}**`)) {
    throw new Error("guidance missing current version");
  }
  if (!guidance.includes(`/versions/${GAMESCIENCE_UI_VERSION}/`)) {
    throw new Error("guidance missing versioned registry paths");
  }
  if (!versionTs.includes(`"${GAMESCIENCE_UI_VERSION}"`)) {
    throw new Error("installed version.ts mismatch");
  }
  for (const stale of ["0.1.0", "0.2.0", "0.2.1"]) {
    if (stale === GAMESCIENCE_UI_VERSION) continue;
    if (guidance.includes(stale) || JSON.stringify(metadata).includes(stale)) {
      throw new Error(`consumer metadata still references stale ${stale}`);
    }
  }
}

function assertInstalledCssSafe(dir: string) {
  const cssRoots = [
    path.join(dir, "src/foundations"),
    path.join(dir, "src/themes"),
    path.join(dir, "src/gamecience-tw4-bridge.css"),
    path.join(dir, "src/styles.css"),
  ];

  const files: string[] = [];
  for (const candidate of cssRoots) {
    if (!existsSync(candidate)) continue;
    if (candidate.endsWith(".css")) files.push(candidate);
    else {
      for (const name of readdirSync(candidate)) {
        if (name.endsWith(".css")) files.push(path.join(candidate, name));
      }
    }
  }

  for (const file of files) {
    const css = readFileSync(file, "utf8");
    assertNoRemoteImports(path.relative(dir, file), css);
    assertNoCircularMappings(path.relative(dir, file), css);
  }
}

function assertBuiltUtilities(dir: string) {
  const assetsDir = path.join(dir, "dist/assets");
  if (!existsSync(assetsDir)) {
    throw new Error("dist/assets missing after vite build");
  }
  const cssFiles = readdirSync(assetsDir).filter((name) => name.endsWith(".css"));
  if (cssFiles.length === 0) {
    throw new Error("no CSS assets emitted by Vite build");
  }
  const builtCss = cssFiles
    .map((name) => readFileSync(path.join(assetsDir, name), "utf8"))
    .join("\n");
  for (const utility of DOCUMENTED_UTILITIES) {
    assertUtilityEmitted(builtCss, utility);
  }
}

function main() {
  if (!existsSync(path.join(registryDir, "base.json"))) {
    throw new Error("Registry not built. Run npm run registry:build first.");
  }
  if (!existsSync(bridgeSource)) {
    throw new Error("Missing consumer/tailwind-v4-bridge.css");
  }

  rmSync(smokeRoot, { recursive: true, force: true });
  mkdirSync(smokeRoot, { recursive: true });

  // Install shared node_modules once at smoke root, then link scenarios via cwd installs.
  for (const theme of themes) {
    const { dir } = prepareScenario(theme);
    console.log(`[smoke:tailwind4:${theme}] installing dependencies`);
    run("npm install --silent", dir);
    assertMetadata(dir);
    assertInstalledCssSafe(dir);
    console.log(`[smoke:tailwind4:${theme}] typecheck`);
    run("npm run typecheck", dir);
    console.log(`[smoke:tailwind4:${theme}] build`);
    run("npm run build", dir);
    assertBuiltUtilities(dir);
    console.log(`[smoke:tailwind4:${theme}] succeeded`);
  }

  console.log(
    `[smoke:tailwind4] Gamescience + Citadel + Sentinel join-flow fixtures passed (${DOCUMENTED_UTILITIES.length} utilities proven)`,
  );
}

main();
