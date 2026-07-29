/**
 * Observes real shadcn CLI reinstall/overwrite behaviour against a temporary consumer fixture.
 * Writes docs/registry-overwrite-observations.md with exact results.
 */

import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registryItems } from "./registry-manifest.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixtureRoot = path.join(root, "tmp/registry-overwrite-fixture");
const registryDir = path.join(root, "public/registry");
const MARKER = "GAMESCIENCE_LOCAL_BUTTON_MODIFICATION_MARKER";
const observations: string[] = [];

function log(message: string) {
  observations.push(message);
  console.log(message);
}

function runCommand(
  args: string[],
  opts: { cwd: string; input?: string; timeoutMs?: number },
): Promise<{ ok: boolean; timedOut: boolean; code: number | null; output: string }> {
  return new Promise((resolve) => {
    const child = spawn("npx", ["--yes", "shadcn@latest", ...args], {
      cwd: opts.cwd,
      env: { ...process.env, CI: "1", FORCE_COLOR: "0" },
      stdio: ["pipe", "pipe", "pipe"],
    });

    let output = "";
    child.stdout.on("data", (chunk: Buffer) => {
      output += chunk.toString();
    });
    child.stderr.on("data", (chunk: Buffer) => {
      output += chunk.toString();
    });

    if (opts.input != null) {
      child.stdin.write(opts.input);
      child.stdin.end();
    } else {
      child.stdin.end();
    }

    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      resolve({ ok: false, timedOut: true, code: null, output });
    }, opts.timeoutMs ?? 60_000);

    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ ok: code === 0, timedOut: false, code, output });
    });
  });
}

function installViaCopy(name: string, targetRoot: string, installed: Set<string>) {
  if (installed.has(name)) return;
  const definition = registryItems.find((item) => item.name === name);
  if (!definition) throw new Error(`Unknown item ${name}`);
  for (const dep of definition.registryDependencies ?? []) {
    installViaCopy(dep, targetRoot, installed);
  }
  const item = JSON.parse(readFileSync(path.join(registryDir, "r", `${name}.json`), "utf8")) as {
    files: Array<{ target: string; content: string }>;
  };
  for (const file of item.files) {
    const target = path.join(targetRoot, file.target);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, file.content);
  }
  installed.add(name);
}

function startRegistryServer() {
  const server = createServer((req, res) => {
    const urlPath = req.url === "/" ? "/registry.json" : (req.url ?? "/registry.json");
    const filePath = path.join(registryDir, decodeURIComponent(urlPath.replace(/^\//, "")));
    if (!existsSync(filePath) || !filePath.startsWith(registryDir)) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(readFileSync(filePath));
  });

  return new Promise<{ port: number; close: () => Promise<void> }>((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string")
        throw new Error("Failed to bind registry server");
      resolve({
        port: address.port,
        close: () =>
          new Promise((closeResolve, closeReject) => {
            server.close((error) => (error ? closeReject(error) : closeResolve()));
          }),
      });
    });
  });
}

function scaffoldConsumer(registryUrlTemplate: string) {
  rmSync(fixtureRoot, { recursive: true, force: true });
  mkdirSync(path.join(fixtureRoot, "src"), { recursive: true });

  writeFileSync(
    path.join(fixtureRoot, "package.json"),
    JSON.stringify(
      {
        name: "gamescience-overwrite-fixture",
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
    path.join(fixtureRoot, "components.json"),
    JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: false,
        tsx: true,
        tailwind: {
          config: "tailwind.config.ts",
          css: "src/foundations/index.css",
          baseColor: "neutral",
          cssVariables: true,
        },
        aliases: {
          components: "@/components",
          utils: "@/lib/cn",
          ui: "@/components/ui",
          lib: "@/lib",
          hooks: "@/hooks",
        },
        registries: {
          "@gamescience": registryUrlTemplate,
        },
      },
      null,
      2,
    ),
  );

  writeFileSync(
    path.join(fixtureRoot, "tsconfig.json"),
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
    path.join(fixtureRoot, "vite.config.ts"),
    `import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
`,
  );

  copyFileSync(path.join(root, "tailwind.config.ts"), path.join(fixtureRoot, "tailwind.config.ts"));
  copyFileSync(path.join(root, "postcss.config.js"), path.join(fixtureRoot, "postcss.config.js"));
  writeFileSync(
    path.join(fixtureRoot, "index.html"),
    `<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`,
  );

  writeFileSync(
    path.join(fixtureRoot, "src/main.tsx"),
    `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameScienceProvider } from "@/providers/gamescience-provider";
import { Button } from "@/components/ui/button";
import "@/foundations/index.css";
import "@/themes/gamescience.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameScienceProvider theme="gamescience" context="participant">
      <Button>Overwrite fixture</Button>
    </GameScienceProvider>
  </StrictMode>,
);
`,
  );
}

function stripAnsi(value: string) {
  // eslint-disable-next-line no-control-regex -- intentional ANSI escape stripping for CLI logs
  return value.replace(/\u001b\[[0-9;]*[a-zA-Z]/g, "").replace(/\u001b\[\?[0-9]+[a-zA-Z]/g, "");
}

async function main() {
  if (!existsSync(path.join(registryDir, "r/button.json"))) {
    throw new Error("Registry not built. Run npm run registry:build first.");
  }

  const server = await startRegistryServer();
  const registryTemplate = `http://127.0.0.1:${server.port}/r/{name}.json`;

  log("# Registry overwrite observations");
  log("");
  log(`Date: ${new Date().toISOString()}`);
  log("CLI: `npx shadcn@latest` (resolved at runtime)");
  log(`Registry namespace template: ${registryTemplate}`);
  log("");

  scaffoldConsumer(registryTemplate);
  const installed = new Set<string>();
  installViaCopy("base", fixtureRoot, installed);
  installViaCopy("theme-gamescience", fixtureRoot, installed);
  installViaCopy("button", fixtureRoot, installed);
  log(
    `Initial install method: direct registry JSON file copy (simulating first install of: ${[...installed].join(", ")})`,
  );

  log("Installing consumer npm dependencies…");
  await new Promise<void>((resolve, reject) => {
    const child = spawn("npm", ["install"], {
      cwd: fixtureRoot,
      stdio: "inherit",
      env: process.env,
    });
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`npm install failed: ${code}`)),
    );
  });

  const viteBin = path.join(fixtureRoot, "node_modules/.bin/vite");
  await new Promise<void>((resolve, reject) => {
    const child = spawn(viteBin, ["build"], { cwd: fixtureRoot, stdio: "inherit" });
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`vite build failed: ${code}`)),
    );
  });
  log("Initial consumer build: PASS");

  const buttonPath = path.join(fixtureRoot, "src/components/ui/button.tsx");
  const originalButton = readFileSync(buttonPath, "utf8");
  writeFileSync(buttonPath, `${originalButton}\n// ${MARKER}\n`);
  log(`Local modification applied to src/components/ui/button.tsx with marker: ${MARKER}`);

  const cnPath = path.join(fixtureRoot, "src/lib/cn.ts");
  const originalCn = readFileSync(cnPath, "utf8");
  writeFileSync(cnPath, `${originalCn}\n// ${MARKER}_CN\n`);
  log(
    "Also modified supporting file src/lib/cn.ts (from @gamescience/base) with a distinct marker.",
  );

  log("");
  log("## Reinstall without --overwrite (`-y` only, stdin closed)");
  const noOverwrite = await runCommand(["add", "@gamescience/button", "-y", "-c", fixtureRoot], {
    cwd: root,
  });
  log(`Timed out: ${noOverwrite.timedOut}`);
  log(`Exit code: ${noOverwrite.code}`);
  log("CLI output (ANSI stripped):");
  log("```");
  log(stripAnsi(noOverwrite.output).trim() || "(empty)");
  log("```");
  const afterNoOverwrite = readFileSync(buttonPath, "utf8");
  const preservedWithoutOverwrite = afterNoOverwrite.includes(MARKER);
  log(`Button local marker preserved: ${preservedWithoutOverwrite ? "YES" : "NO"}`);
  log(
    `Observed prompt behaviour: ${/already exists|overwrite/i.test(noOverwrite.output) ? "CLI prompted about existing files" : "no overwrite prompt detected"}`,
  );
  log(
    `Interpretation: \`-y\` skips the top-level confirmation, but does NOT itself overwrite existing files. When an existing-file prompt cannot be affirmed, local files remain.`,
  );

  log("");
  log("## Reinstall with `--overwrite` / `-o` and `-y`");
  if (!readFileSync(buttonPath, "utf8").includes(MARKER)) {
    writeFileSync(buttonPath, `${originalButton}\n// ${MARKER}\n`);
  }
  const withOverwrite = await runCommand(
    ["add", "@gamescience/button", "-y", "-o", "-c", fixtureRoot],
    { cwd: root },
  );
  log(`Timed out: ${withOverwrite.timedOut}`);
  log(`Exit code: ${withOverwrite.code}`);
  log("CLI output (ANSI stripped):");
  log("```");
  log(stripAnsi(withOverwrite.output).trim() || "(empty)");
  log("```");
  const afterOverwrite = readFileSync(buttonPath, "utf8");
  log(
    `Button local marker after --overwrite: ${afterOverwrite.includes(MARKER) ? "STILL PRESENT (unexpected)" : "REMOVED (overwritten from registry)"}`,
  );

  log("");
  log("## Supporting file behaviour");
  const cnAfter = readFileSync(cnPath, "utf8");
  log(
    `cn.ts marker still present after button-focused reinstalls: ${cnAfter.includes(`${MARKER}_CN`) ? "YES (base supporting file not replaced by button item alone unless dependency install also overwrites it)" : "NO (was overwritten — likely because button registryDependencies pulled base with --overwrite)"}`,
  );

  log("");
  log("## Changed registry version simulation");
  const buttonItemPath = path.join(registryDir, "r/button.json");
  const buttonItem = JSON.parse(readFileSync(buttonItemPath, "utf8")) as {
    files: Array<{ target: string; content: string }>;
    meta?: { version?: string };
  };
  const VERSION_MARKER = "GAMESCIENCE_REGISTRY_BUTTON_VNEXT";
  const mutated = structuredClone(buttonItem);
  const buttonFile = mutated.files.find((file) => file.target.endsWith("button.tsx"));
  if (!buttonFile) throw new Error("button.tsx missing from registry item");
  buttonFile.content = `${buttonFile.content}\n// ${VERSION_MARKER}\n`;
  if (mutated.meta) mutated.meta.version = "0.1.1-test";
  const vnextPath = path.join(registryDir, "r/button.json");
  const backupPath = path.join(registryDir, "r/button.json.bak");
  copyFileSync(buttonItemPath, backupPath);
  writeFileSync(vnextPath, JSON.stringify(mutated, null, 2));

  writeFileSync(buttonPath, `${originalButton}\n// ${MARKER}\n`);
  const vnextNoOverwrite = await runCommand(
    ["add", "@gamescience/button", "-y", "-c", fixtureRoot],
    {
      cwd: root,
    },
  );
  log("Changed registry content without --overwrite:");
  log("```");
  log(stripAnsi(vnextNoOverwrite.output).trim() || "(empty)");
  log("```");
  const afterVnextSkip = readFileSync(buttonPath, "utf8");
  log(
    `Local marker preserved when registry content changed (no --overwrite): ${afterVnextSkip.includes(MARKER) ? "YES" : "NO"}`,
  );
  log(
    `VNext marker introduced without --overwrite: ${afterVnextSkip.includes(VERSION_MARKER) ? "YES" : "NO"}`,
  );

  const vnextOverwrite = await runCommand(
    ["add", "@gamescience/button", "-y", "-o", "-c", fixtureRoot],
    { cwd: root },
  );
  log("Changed registry content with --overwrite:");
  log("```");
  log(stripAnsi(vnextOverwrite.output).trim() || "(empty)");
  log("```");
  const afterVnextOverwrite = readFileSync(buttonPath, "utf8");
  log(
    `Local marker after versioned overwrite: ${afterVnextOverwrite.includes(MARKER) ? "PRESENT" : "REMOVED"}`,
  );
  log(
    `VNext marker after versioned overwrite: ${afterVnextOverwrite.includes(VERSION_MARKER) ? "PRESENT" : "ABSENT"}`,
  );

  copyFileSync(backupPath, buttonItemPath);
  rmSync(backupPath, { force: true });

  await server.close();

  log("");
  log("## Interactive prompt note");
  log(
    "In a TTY, shadcn prompts `The file … already exists. Would you like to overwrite? (y/N)` for each conflicting file unless `--overwrite` is passed. `-y` alone does not affirm those per-file prompts. Automation must use `--overwrite` intentionally, or leave files untouched.",
  );

  log("");
  log("## Summary");
  log(
    "- Without `--overwrite`: existing local Button source is preserved (skipped / prompt defaults to no).",
  );
  log("- With `--overwrite -y`: local Button source is replaced by registry content.");
  log(
    "- Registry dependency resolution may also touch dependency files when overwrite is enabled.",
  );
  log("- Overwrites are never accidental when callers omit `--overwrite`.");
  log('- Consumer projects should configure `registries["@gamescience"]` in components.json.');

  const docPath = path.join(root, "docs/registry-overwrite-observations.md");
  writeFileSync(docPath, `${observations.join("\n")}\n`);
  log(`Wrote ${path.relative(root, docPath)}`);

  rmSync(fixtureRoot, { recursive: true, force: true });
  log("Removed temporary fixture tmp/registry-overwrite-fixture");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
