/**
 * Smoke-test consumer installs from a locally served pages-dist (Pages-style layout).
 *
 * 1) Installs six versioned theme×pattern scenarios by fetching registry JSON over HTTP
 *    from the Pages output (validates serving, graphs, typecheck, build).
 * 2) Runs one shadcn CLI namespace install against the same served registry.
 */

import { spawn } from "node:child_process";
import { createServer, type Server } from "node:http";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registryItems } from "./registry-manifest.ts";
import { PAGES_VERSION, PUBLIC_PAGES_DOC_MARKERS } from "./pages-config.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDist = path.join(root, "pages-dist");
const smokeRoot = path.join(root, "tmp/pages-smoke");

type ThemeName = "gamescience" | "citadel";
type PatternName = "join-flow" | "lobby" | "shared-display-lobby";

interface Scenario {
  id: string;
  theme: ThemeName;
  pattern: PatternName;
}

const scenarios: Scenario[] = [
  { id: "gamescience-join-flow", theme: "gamescience", pattern: "join-flow" },
  { id: "citadel-join-flow", theme: "citadel", pattern: "join-flow" },
  { id: "gamescience-lobby", theme: "gamescience", pattern: "lobby" },
  { id: "citadel-lobby", theme: "citadel", pattern: "lobby" },
  { id: "gamescience-shared-display-lobby", theme: "gamescience", pattern: "shared-display-lobby" },
  { id: "citadel-shared-display-lobby", theme: "citadel", pattern: "shared-display-lobby" },
];

function run(command: string, args: string[], cwd: string) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit", env: process.env });
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} ${args.join(" ")} failed: ${code}`)),
    );
  });
}

function runCapture(
  command: string,
  args: string[],
  cwd: string,
  timeoutMs = 120_000,
  options?: { stdin?: "ignore" | "end" },
) {
  return new Promise<{ code: number | null; output: string; timedOut: boolean }>((resolve) => {
    const stdinMode = options?.stdin ?? "end";
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env, CI: "1", FORCE_COLOR: "0" },
      stdio: [stdinMode === "ignore" ? "ignore" : "pipe", "pipe", "pipe"],
    });
    let output = "";
    child.stdout?.on("data", (d: Buffer) => {
      output += d.toString();
    });
    child.stderr?.on("data", (d: Buffer) => {
      output += d.toString();
    });
    if (stdinMode === "end") child.stdin?.end();
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      resolve({ code: null, output, timedOut: true });
    }, timeoutMs);
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, output, timedOut: false });
    });
  });
}

function startStaticServer(dir: string): Promise<{ port: number; server: Server }> {
  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url ?? "/").split("?")[0] ?? "/");
    let relative = urlPath === "/" ? "/index.html" : urlPath;
    let filePath = path.join(dir, relative.replace(/^\//, ""));
    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
      relative = `${relative.replace(/\/$/, "")}/index.html`;
    }
    if (!filePath.startsWith(dir) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("not found");
      return;
    }
    const ext = path.extname(filePath);
    const type =
      ext === ".json"
        ? "application/json; charset=utf-8"
        : ext === ".html"
          ? "text/html; charset=utf-8"
          : ext === ".md"
            ? "text/markdown; charset=utf-8"
            : ext === ".css"
              ? "text/css; charset=utf-8"
              : ext === ".js"
                ? "text/javascript; charset=utf-8"
                : "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(readFileSync(filePath));
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") throw new Error("failed to bind");
      resolve({ port: address.port, server });
    });
  });
}

async function fetchJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json") && !contentType.includes("text/plain")) {
    // Accept JSON bodies even if content-type is loose; reject HTML fallbacks.
    const text = await response.text();
    if (text.trimStart().startsWith("<!doctype") || text.trimStart().startsWith("<html")) {
      throw new Error(`Received HTML fallback for ${url}`);
    }
    return JSON.parse(text) as {
      files: Array<{ target: string; content: string }>;
      registryDependencies?: string[];
    };
  }
  return (await response.json()) as {
    files: Array<{ target: string; content: string }>;
    registryDependencies?: string[];
  };
}

async function installItemFromPages(
  name: string,
  targetRoot: string,
  baseUrl: string,
  installed: Set<string>,
) {
  if (installed.has(name)) return;
  const definition = registryItems.find((item) => item.name === name);
  if (!definition) throw new Error(`Unknown registry item ${name}`);

  for (const dep of definition.registryDependencies ?? []) {
    await installItemFromPages(dep, targetRoot, baseUrl, installed);
  }

  const url = `${baseUrl}/versions/${PAGES_VERSION}/r/${name}.json`;
  const itemJson = await fetchJson(url);
  for (const file of itemJson.files) {
    const target = path.join(targetRoot, file.target);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, file.content);
  }
  installed.add(name);
}

function writeSharedPackage() {
  rmSync(smokeRoot, { recursive: true, force: true });
  mkdirSync(smokeRoot, { recursive: true });
  writeFileSync(
    path.join(smokeRoot, "package.json"),
    JSON.stringify(
      {
        name: "gamescience-pages-smoke",
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
}

function prepareScenario(scenario: Scenario, registryTemplate: string) {
  const dir = path.join(smokeRoot, "scenarios", scenario.id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(path.join(dir, "src"), { recursive: true });

  writeFileSync(
    path.join(dir, "components.json"),
    JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: false,
        tsx: true,
        iconLibrary: "lucide",
        tailwind: {
          config: "tailwind.config.ts",
          css: "src/index.css",
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
          "@gamescience": registryTemplate,
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
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
`,
  );
  cpSync(path.join(root, "tailwind.config.ts"), path.join(dir, "tailwind.config.ts"));
  cpSync(path.join(root, "postcss.config.js"), path.join(dir, "postcss.config.js"));
  writeFileSync(
    path.join(dir, "index.html"),
    `<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`,
  );
  writeFileSync(
    path.join(dir, "src/index.css"),
    `@import "./foundations/index.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
`,
  );

  return dir;
}

function writeMain(dir: string, scenario: Scenario) {
  const themeImport = `@/themes/${scenario.theme}.css`;
  if (scenario.pattern === "join-flow") {
    writeFileSync(
      path.join(dir, "src/main.tsx"),
      `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameScienceProvider } from "@/providers/gamescience-provider";
import { ParticipantJoinFlow } from "@/patterns/join/participant-join-flow";
import { ParticipantShell } from "@/templates/participant-shell/participant-shell";
import "@/index.css";
import "${themeImport}";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameScienceProvider theme="${scenario.theme}" context="participant">
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
      </ParticipantShell>
    </GameScienceProvider>
  </StrictMode>,
);
`,
    );
    return;
  }

  if (scenario.pattern === "lobby") {
    writeFileSync(
      path.join(dir, "src/main.tsx"),
      `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameScienceProvider } from "@/providers/gamescience-provider";
import { FacilitatorLobby } from "@/patterns/lobby/facilitator-lobby";
import { FacilitatorShell } from "@/templates/facilitator-shell/facilitator-shell";
import "@/index.css";
import "${themeImport}";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameScienceProvider theme="${scenario.theme}" context="facilitator">
      <FacilitatorShell>
        <FacilitatorLobby
          session={{ code: "B7K2", participantCount: 1, stage: "lobby", status: "active" }}
          participants={[{ id: "p-1", displayName: "Alpha", connection: "connected", readiness: "ready" }]}
          status="active"
          onStart={() => undefined}
        />
      </FacilitatorShell>
    </GameScienceProvider>
  </StrictMode>,
);
`,
    );
    return;
  }

  writeFileSync(
    path.join(dir, "src/main.tsx"),
    `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameScienceProvider } from "@/providers/gamescience-provider";
import { SharedDisplayLobby } from "@/patterns/lobby/shared-display-lobby";
import { SharedDisplayShell } from "@/templates/shared-display-shell/shared-display-shell";
import "@/index.css";
import "${themeImport}";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameScienceProvider theme="${scenario.theme}" context="shared-display">
      <SharedDisplayShell>
        <SharedDisplayLobby
          session={{ code: "B7K2", participantCount: 8, expectedParticipantCount: 24, stage: "lobby", status: "active" }}
          status="active"
        />
      </SharedDisplayShell>
    </GameScienceProvider>
  </StrictMode>,
);
`,
  );
}

function assertCleanInstall(dir: string, scenario: Scenario) {
  const otherTheme = scenario.theme === "gamescience" ? "citadel" : "gamescience";
  if (existsSync(path.join(dir, `src/themes/${otherTheme}.css`))) {
    throw new Error(`[smoke:pages:${scenario.id}] unexpected sibling theme installed`);
  }

  const forbiddenPatterns: Record<PatternName, string[]> = {
    "join-flow": [
      "src/patterns/lobby/facilitator-lobby.tsx",
      "src/patterns/lobby/shared-display-lobby.tsx",
    ],
    lobby: [
      "src/patterns/join/participant-join-flow.tsx",
      "src/patterns/lobby/shared-display-lobby.tsx",
    ],
    "shared-display-lobby": [
      "src/patterns/join/participant-join-flow.tsx",
      "src/patterns/lobby/facilitator-lobby.tsx",
    ],
  };

  for (const relative of forbiddenPatterns[scenario.pattern]) {
    if (existsSync(path.join(dir, relative))) {
      throw new Error(`[smoke:pages:${scenario.id}] leaked sibling pattern file ${relative}`);
    }
  }

  if (!existsSync(path.join(dir, "src/docs/gamescience-ui.json"))) {
    throw new Error(
      `[smoke:pages:${scenario.id}] base metadata src/docs/gamescience-ui.json missing`,
    );
  }
}

async function assertPublicDocs(siteBase: string) {
  const checks: Array<{ path: string; marker: string; allowHtml?: boolean }> = [
    { path: "/", marker: "What is a registry?", allowHtml: true },
    { path: "/catalogue/", marker: "Component catalogue", allowHtml: true },
    { path: "/start/", marker: "Start a new Lovable project", allowHtml: true },
    { path: "/upgrade/", marker: "Upgrade a registry project", allowHtml: true },
    { path: "/migrate/", marker: "Migrate an existing Lovable project", allowHtml: true },
    { path: "/docs/", marker: "GameScience UI documentation", allowHtml: true },
    { path: "/version.json", marker: `"version"`, allowHtml: true },
    { path: "/agent-catalogue.json", marker: "theme-citadel", allowHtml: true },
    { path: "/r/base.json", marker: "GameScience Base", allowHtml: true },
    { path: "/docs/migration-config.json", marker: "architectureRules", allowHtml: true },
    {
      path: "/docs/tailwind-v4-integration.md",
      marker: PUBLIC_PAGES_DOC_MARKERS["tailwind-v4-integration.md"],
    },
    {
      path: "/docs/font-loading.md",
      marker: PUBLIC_PAGES_DOC_MARKERS["font-loading.md"],
    },
    {
      path: "/docs/registry-usage.md",
      marker: PUBLIC_PAGES_DOC_MARKERS["registry-usage.md"],
    },
  ];

  for (const check of checks) {
    const response = await fetch(`${siteBase}${check.path}`);
    if (!response.ok) {
      throw new Error(`[smoke:pages] ${check.path} returned HTTP ${response.status}`);
    }
    const body = await response.text();
    const head = body.slice(0, 400).toLowerCase();
    if (!check.allowHtml) {
      if (
        head.includes("<!doctype html") ||
        head.includes("<html") ||
        head.includes("file not found")
      ) {
        throw new Error(`[smoke:pages] ${check.path} returned an HTML error/fallback document`);
      }
    }
    if (!body.includes(check.marker)) {
      throw new Error(`[smoke:pages] ${check.path} missing expected marker "${check.marker}"`);
    }
    console.log(`[smoke:pages] docs OK ${check.path}`);
  }
}

async function runCliNamespaceProbe(port: number) {
  const registryTemplate = `http://127.0.0.1:${port}/versions/${PAGES_VERSION}/r/{name}.json`;
  const dir = prepareScenario(
    { id: "cli-probe", theme: "gamescience", pattern: "join-flow" },
    registryTemplate,
  );

  // Isolate from the library root package/components.json so shadcn does not prompt for a base.
  writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify({ name: "gamescience-pages-cli-probe", private: true, type: "module" }, null, 2),
  );

  // Ignore stdin: a closed pipe can make current shadcn CLI show an interactive library prompt.
  const result = await runCapture(
    "npx",
    ["--yes", "shadcn@latest", "add", "@gamescience/button", "-y"],
    dir,
    180_000,
    { stdin: "ignore" },
  );

  if (result.timedOut || result.code !== 0) {
    throw new Error(
      `CLI namespace probe failed (code=${result.code}, timedOut=${result.timedOut})\n${result.output}`,
    );
  }
  if (!existsSync(path.join(dir, "src/components/ui/button.tsx"))) {
    throw new Error(`CLI namespace probe did not install button.tsx\n${result.output}`);
  }
  if (!existsSync(path.join(dir, "src/docs/gamescience-ui.json"))) {
    throw new Error(
      `CLI namespace probe did not install src/docs/gamescience-ui.json via base dependency\n${result.output}`,
    );
  }
  console.log("[smoke:pages] shadcn CLI namespace probe succeeded (@gamescience/button)");
}

async function main() {
  if (!existsSync(path.join(pagesDist, "versions", PAGES_VERSION, "r", "base.json"))) {
    throw new Error("pages-dist missing versioned registry. Run npm run pages:build first.");
  }

  writeSharedPackage();
  console.log("[smoke:pages] installing shared dependencies");
  await run("npm", ["install"], smokeRoot);

  const { port, server } = await startStaticServer(pagesDist);
  const siteBase = `http://127.0.0.1:${port}`;
  const registryTemplate = `${siteBase}/versions/${PAGES_VERSION}/r/{name}.json`;
  console.log(`[smoke:pages] serving pages-dist at ${siteBase}`);
  console.log(`[smoke:pages] registry template: ${registryTemplate}`);

  const failures: string[] = [];

  try {
    try {
      await assertPublicDocs(siteBase);
    } catch (error) {
      failures.push("public-docs");
      console.error("[smoke:pages:public-docs] FAILED", error);
    }

    for (const scenario of scenarios) {
      const dir = prepareScenario(scenario, registryTemplate);
      try {
        const installed = new Set<string>();
        await installItemFromPages("base", dir, siteBase, installed);
        await installItemFromPages(`theme-${scenario.theme}`, dir, siteBase, installed);
        await installItemFromPages(scenario.pattern, dir, siteBase, installed);
        assertCleanInstall(dir, scenario);
        writeMain(dir, scenario);

        if (!existsSync(path.join(dir, "node_modules"))) {
          await run("ln", ["-s", path.join(smokeRoot, "node_modules"), "node_modules"], dir);
        }

        const tsc = await runCapture(
          path.join(smokeRoot, "node_modules/.bin/tsc"),
          ["-p", "tsconfig.json", "--pretty", "false"],
          dir,
        );
        if (tsc.code !== 0) throw new Error(`typecheck failed\n${tsc.output}`);

        const vite = await runCapture(
          path.join(smokeRoot, "node_modules/.bin/vite"),
          ["build"],
          dir,
        );
        if (vite.code !== 0) throw new Error(`vite build failed\n${vite.output}`);

        console.log(`[smoke:pages:${scenario.id}] succeeded`);
      } catch (error) {
        failures.push(scenario.id);
        console.error(`[smoke:pages:${scenario.id}] FAILED`, error);
      }
    }

    try {
      await runCliNamespaceProbe(port);
    } catch (error) {
      failures.push("cli-namespace-probe");
      console.error("[smoke:pages:cli-namespace-probe] FAILED", error);
    }
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }

  rmSync(smokeRoot, { recursive: true, force: true });

  if (failures.length > 0) {
    console.error(`[smoke:pages] failed: ${failures.join(", ")}`);
    process.exit(1);
  }

  console.log(
    `[smoke:pages] all ${scenarios.length} Pages HTTP install scenarios + CLI probe succeeded`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
