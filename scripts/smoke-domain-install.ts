/**
 * Clean-consumer smoke for 0.5.0 game/domain components (Tailwind 3, all themes).
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";
import { registryItems } from "./registry-manifest.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const smokeRoot = path.join(root, "tmp/domain-smoke");
const registryDir = path.join(root, "public/registry/r");

type ThemeName = "gamescience" | "citadel" | "sentinel";

const domainItems = [
  "countdown",
  "phase-progress",
  "connection-banner",
  "phase-header",
  "phase-directive",
  "role-panel",
  "vote-status",
  "outcome-summary",
  "sticky-action-bar",
] as const;

function runCapture(cmd: string, args: string[], cwd: string, timeoutMs = 180_000) {
  return new Promise<{ code: number | null; output: string; timedOut: boolean }>((resolve) => {
    const child = spawn(cmd, args, { cwd, env: process.env });
    let output = "";
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, timeoutMs);
    child.stdout.on("data", (chunk) => {
      output += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      output += String(chunk);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, output, timedOut });
    });
  });
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

function writeFixture(dir: string, theme: ThemeName) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify(
      {
        name: `gamescience-domain-smoke-${theme}`,
        private: true,
        type: "module",
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
          "@radix-ui/react-separator": "^1.1.7",
        },
        devDependencies: {
          "@types/react": "^19.1.8",
          "@types/react-dom": "^19.1.6",
          "@vitejs/plugin-react": "^4.7.0",
          autoprefixer: "^10.4.21",
          postcss: "^8.5.6",
          tailwindcss: "^3.4.17",
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
          moduleResolution: "Bundler",
          jsx: "react-jsx",
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          baseUrl: ".",
          paths: { "@/*": ["src/*"] },
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
import { defineConfig } from "vite";
export default defineConfig({ plugins: [react()], resolve: { alias: { "@": path.resolve(__dirname, "src") } } });
`,
  );
  writeFileSync(
    path.join(dir, "tailwind.config.js"),
    `export default { content: ["./index.html","./src/**/*.{ts,tsx}"], theme: { extend: {
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        surface: { DEFAULT: "oklch(var(--surface) / <alpha-value>)", subtle: "oklch(var(--surface-subtle) / <alpha-value>)", raised: "oklch(var(--surface-raised) / <alpha-value>)", overlay: "oklch(var(--surface-overlay) / <alpha-value>)" },
        border: { DEFAULT: "oklch(var(--border) / <alpha-value>)", strong: "oklch(var(--border-strong) / <alpha-value>)" },
        primary: { DEFAULT: "oklch(var(--primary) / <alpha-value>)", foreground: "oklch(var(--primary-foreground) / <alpha-value>)" },
        muted: { DEFAULT: "oklch(var(--muted) / <alpha-value>)", foreground: "oklch(var(--muted-foreground) / <alpha-value>)" },
        success: { DEFAULT: "oklch(var(--success) / <alpha-value>)", foreground: "oklch(var(--success-foreground) / <alpha-value>)" },
        warning: { DEFAULT: "oklch(var(--warning) / <alpha-value>)", foreground: "oklch(var(--warning-foreground) / <alpha-value>)" },
        danger: { DEFAULT: "oklch(var(--danger) / <alpha-value>)", foreground: "oklch(var(--danger-foreground) / <alpha-value>)" },
        information: { DEFAULT: "oklch(var(--information) / <alpha-value>)", foreground: "oklch(var(--information-foreground) / <alpha-value>)" },
        accent: { DEFAULT: "oklch(var(--accent) / <alpha-value>)", foreground: "oklch(var(--accent-foreground) / <alpha-value>)" },
      },
      borderRadius: { control: "var(--radius-control)", panel: "var(--radius-panel)", card: "var(--radius-card)" },
      boxShadow: { control: "var(--shadow-control)", card: "var(--shadow-card)", focus: "var(--shadow-focus)" },
      maxWidth: { content: "var(--content-max-width)" },
      spacing: { "panel-sm": "var(--panel-padding-sm)", "panel-md": "var(--panel-padding-md)", "panel-lg": "var(--panel-padding-lg)" },
    } }, plugins: [] };
`,
  );
  writeFileSync(
    path.join(dir, "postcss.config.js"),
    `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
`,
  );
  writeFileSync(
    path.join(dir, "index.html"),
    `<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>
`,
  );
  mkdirSync(path.join(dir, "src"), { recursive: true });
  writeFileSync(
    path.join(dir, "src/main.tsx"),
    `import { createRoot } from "react-dom/client";
import "./app.css";
import { GameScienceProvider } from "./providers/gamescience-provider";
import { Countdown } from "./components/game/countdown";
import { PhaseProgress } from "./components/game/phase-progress";
import { ConnectionBanner } from "./components/game/connection-banner";
import { PhaseHeader } from "./components/game/phase-header";
import { PhaseDirective } from "./components/game/phase-directive";
import { RolePanel } from "./components/game/role-panel";
import { VoteStatus } from "./components/game/vote-status";
import { OutcomeSummary } from "./components/game/outcome-summary";
import { StickyActionBar } from "./components/game/sticky-action-bar";
import { Badge } from "./components/ui/badge";

createRoot(document.getElementById("root")!).render(
  <GameScienceProvider theme="${theme}" context="participant">
    <main className="min-h-screen space-y-4 bg-background p-4 text-foreground">
      <PhaseHeader
        eyebrow={<span className="gs-label">Brand</span>}
        phase={<Badge intent="primary">Discussion</Badge>}
        trailing={<Countdown formattedTime="01:00" state="running" />}
      />
      <ConnectionBanner state="reconnecting" />
      <PhaseProgress
        steps={[
          { id: "a", label: "Brief", status: "complete" },
          { id: "b", label: "Talk", status: "active" },
          { id: "c", label: "Vote", status: "pending" },
        ]}
      />
      <PhaseDirective treatment="strip" eyebrow="Now">Align on one recommendation.</PhaseDirective>
      <RolePanel role={{ title: "Analyst" }} priorities={["One"]} objective={{ title: "Goal" }} defaultExpanded />
      <VoteStatus voted={2} total={5} anonymous />
      <OutcomeSummary outcome={{ title: "Stable", intent: "success", label: "Outcome" }} />
      <StickyActionBar status={<VoteStatus voted={2} total={5} progress="pips" size="sm" />}>
        <button type="button" className="gs-label">Continue</button>
      </StickyActionBar>
    </main>
  </GameScienceProvider>,
);
`,
  );
  writeFileSync(
    path.join(dir, "src/app.css"),
    `@tailwind base;
@tailwind components;
@tailwind utilities;
@import "./foundations/index.css";
@import "./themes/${theme}.css";
`,
  );
}

async function main() {
  if (!existsSync(path.join(registryDir, "base.json"))) {
    throw new Error("Run npm run registry:build first");
  }
  rmSync(smokeRoot, { recursive: true, force: true });
  mkdirSync(smokeRoot, { recursive: true });

  const failures: string[] = [];
  for (const theme of ["gamescience", "citadel", "sentinel"] as const) {
    const dir = path.join(smokeRoot, theme);
    try {
      writeFixture(dir, theme);
      const installed = new Set<string>();
      installItem("base", dir, installed);
      installItem(`theme-${theme}`, dir, installed);
      installItem("badge", dir, installed);
      for (const item of domainItems) installItem(item, dir, installed);

      const npm = await runCapture("npm", ["install"], dir, 240_000);
      if (npm.code !== 0 || npm.timedOut) throw new Error(`npm install failed\n${npm.output}`);
      const tsc = await runCapture(
        path.join(dir, "node_modules/.bin/tsc"),
        ["-p", "tsconfig.json", "--pretty", "false"],
        dir,
      );
      if (tsc.code !== 0) throw new Error(`typecheck failed\n${tsc.output}`);
      const vite = await runCapture(path.join(dir, "node_modules/.bin/vite"), ["build"], dir);
      if (vite.code !== 0) throw new Error(`vite build failed\n${vite.output}`);
      console.log(`[smoke:domain:${theme}] succeeded (${GAMESCIENCE_UI_VERSION})`);
    } catch (error) {
      failures.push(theme);
      console.error(`[smoke:domain:${theme}] FAILED`, error);
    }
  }

  if (failures.length) {
    throw new Error(`[smoke:domain] failed: ${failures.join(", ")}`);
  }
  console.log("[smoke:domain] all domain fixtures succeeded");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
