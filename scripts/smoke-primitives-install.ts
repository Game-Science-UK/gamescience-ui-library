/**
 * Clean-consumer smoke for representative GameScience primitive families.
 * Tailwind 3 Vite fixtures for both themes.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";
import { registryItems } from "./registry-manifest.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const smokeRoot = path.join(root, "tmp/primitives-smoke");
const registryDir = path.join(root, "public/registry/r");

type ThemeName = "gamescience" | "citadel";

const bundles: Record<string, string[]> = {
  forms: ["label", "input", "textarea", "checkbox", "radio-group", "switch", "select", "form"],
  overlays: ["dialog", "alert-dialog", "sheet", "drawer", "popover", "tooltip"],
  navigation: ["tabs", "accordion", "collapsible", "dropdown-menu", "breadcrumb"],
  "data-feedback": [
    "card",
    "table",
    "pagination",
    "scroll-area",
    "sonner",
    "progress",
    "alert",
    "skeleton",
  ],
};

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

function writeFixture(dir: string, theme: ThemeName, items: string[]) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify(
      {
        name: "gamescience-primitives-smoke",
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
          "@radix-ui/react-dialog": "^1.1.14",
          "@radix-ui/react-alert-dialog": "^1.1.14",
          "@radix-ui/react-popover": "^1.1.14",
          "@radix-ui/react-tooltip": "^1.2.7",
          "@radix-ui/react-select": "^2.2.5",
          "@radix-ui/react-checkbox": "^1.3.2",
          "@radix-ui/react-radio-group": "^1.3.7",
          "@radix-ui/react-switch": "^1.2.5",
          "@radix-ui/react-tabs": "^1.1.12",
          "@radix-ui/react-accordion": "^1.2.11",
          "@radix-ui/react-collapsible": "^1.1.11",
          "@radix-ui/react-dropdown-menu": "^2.1.15",
          "@radix-ui/react-scroll-area": "^1.2.9",
          "@radix-ui/react-separator": "^1.1.7",
          vaul: "^1.1.2",
          "react-hook-form": "^7.60.0",
          "@hookform/resolvers": "^5.1.1",
          zod: "^3.25.76",
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
    `import path from "node:path";\nimport react from "@vitejs/plugin-react";\nimport { defineConfig } from "vite";\nexport default defineConfig({ plugins: [react()], resolve: { alias: { "@": path.resolve(__dirname, "src") } } });\n`,
  );
  writeFileSync(
    path.join(dir, "tailwind.config.js"),
    `export default { content: ["./index.html","./src/**/*.{ts,tsx}"], theme: { extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        surface: { DEFAULT: "hsl(var(--surface) / <alpha-value>)", subtle: "hsl(var(--surface-subtle) / <alpha-value>)", raised: "hsl(var(--surface-raised) / <alpha-value>)", overlay: "hsl(var(--surface-overlay) / <alpha-value>)" },
        border: { DEFAULT: "hsl(var(--border) / <alpha-value>)", strong: "hsl(var(--border-strong) / <alpha-value>)" },
        "focus-ring": "hsl(var(--focus-ring) / <alpha-value>)",
        primary: { DEFAULT: "hsl(var(--primary) / <alpha-value>)", hover: "hsl(var(--primary-hover) / <alpha-value>)", active: "hsl(var(--primary-active) / <alpha-value>)", foreground: "hsl(var(--primary-foreground) / <alpha-value>)" },
        secondary: { DEFAULT: "hsl(var(--secondary) / <alpha-value>)", hover: "hsl(var(--secondary-hover) / <alpha-value>)", active: "hsl(var(--secondary-active) / <alpha-value>)", foreground: "hsl(var(--secondary-foreground) / <alpha-value>)" },
        accent: { DEFAULT: "hsl(var(--accent) / <alpha-value>)", foreground: "hsl(var(--accent-foreground) / <alpha-value>)" },
        muted: { DEFAULT: "hsl(var(--muted) / <alpha-value>)", foreground: "hsl(var(--muted-foreground) / <alpha-value>)" },
        success: { DEFAULT: "hsl(var(--success) / <alpha-value>)", foreground: "hsl(var(--success-foreground) / <alpha-value>)" },
        warning: { DEFAULT: "hsl(var(--warning) / <alpha-value>)", foreground: "hsl(var(--warning-foreground) / <alpha-value>)" },
        danger: { DEFAULT: "hsl(var(--danger) / <alpha-value>)", foreground: "hsl(var(--danger-foreground) / <alpha-value>)" },
        information: { DEFAULT: "hsl(var(--information) / <alpha-value>)", foreground: "hsl(var(--information-foreground) / <alpha-value>)" },
      },
      borderRadius: { control: "var(--radius-control)", card: "var(--radius-card)", panel: "var(--radius-panel)", overlay: "var(--radius-overlay)", pill: "var(--radius-pill)" },
      boxShadow: { control: "var(--shadow-control)", card: "var(--shadow-card)", overlay: "var(--shadow-overlay)", focus: "var(--shadow-focus)" },
      height: { "control-sm": "var(--control-height-sm)", "control-md": "var(--control-height-md)", "control-lg": "var(--control-height-lg)" },
    } }, plugins: [] };\n`,
  );
  writeFileSync(
    path.join(dir, "postcss.config.js"),
    `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };\n`,
  );
  writeFileSync(
    path.join(dir, "index.html"),
    `<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n`,
  );
  mkdirSync(path.join(dir, "src"), { recursive: true });
  writeFileSync(
    path.join(dir, "src/main.tsx"),
    `import React from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import { GameScienceProvider } from "./providers/gamescience-provider";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";

createRoot(document.getElementById("root")!).render(
  <GameScienceProvider theme="${theme}" context="facilitator">
    <main className="min-h-screen bg-background p-6 text-foreground">
      <Card>
        <CardHeader><CardTitle>Primitives ${theme}</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          <div className="grid gap-1"><Label htmlFor="n">Name</Label><Input id="n" /></div>
          <Dialog>
            <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
            <DialogContent><DialogTitle>Portal OK</DialogTitle></DialogContent>
          </Dialog>
          <p className="text-muted-foreground">Installed: ${items.join(", ")}</p>
        </CardContent>
      </Card>
    </main>
  </GameScienceProvider>
);
`,
  );
  writeFileSync(
    path.join(dir, "src/app.css"),
    `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n@import "./foundations/index.css";\n@import "./themes/${theme}.css";\n`,
  );
}

async function main() {
  if (!existsSync(path.join(registryDir, "base.json"))) {
    throw new Error("Run npm run registry:build first");
  }
  rmSync(smokeRoot, { recursive: true, force: true });
  mkdirSync(smokeRoot, { recursive: true });

  const failures: string[] = [];
  for (const theme of ["gamescience", "citadel"] as const) {
    for (const [bundleName, items] of Object.entries(bundles)) {
      const id = `${theme}-${bundleName}`;
      const dir = path.join(smokeRoot, id);
      try {
        writeFixture(dir, theme, items);
        const installed = new Set<string>();
        installItem("base", dir, installed);
        installItem(`theme-${theme}`, dir, installed);
        // Shared harness imports used by main.tsx across all bundles.
        for (const shared of ["button", "card", "dialog", "input", "label"]) {
          installItem(shared, dir, installed);
        }
        for (const item of items) installItem(item, dir, installed);

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
        console.log(`[smoke:primitives:${id}] succeeded (${GAMESCIENCE_UI_VERSION})`);
      } catch (error) {
        failures.push(id);
        console.error(`[smoke:primitives:${id}] FAILED`, error);
      }
    }
  }

  if (failures.length) {
    throw new Error(`[smoke:primitives] failed: ${failures.join(", ")}`);
  }
  console.log("[smoke:primitives] all primitive family fixtures succeeded");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
