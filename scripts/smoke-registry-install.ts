import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registryItems } from "./registry-manifest.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const smokeRoot = path.join(root, "tmp/registry-smoke");
const registryDir = path.join(root, "public/registry/r");

type ThemeName = "gamescience" | "citadel";
type PatternName = "join-flow" | "lobby" | "shared-display-lobby";

interface SmokeScenario {
  id: string;
  theme: ThemeName;
  pattern: PatternName;
}

/**
 * Independent consumer scenarios.
 * Each pattern is installed only with its declared registry dependency graph —
 * never with sibling patterns from the library monorepo.
 */
const scenarios: SmokeScenario[] = [
  { id: "gamescience-join-flow", theme: "gamescience", pattern: "join-flow" },
  { id: "citadel-join-flow", theme: "citadel", pattern: "join-flow" },
  { id: "gamescience-lobby", theme: "gamescience", pattern: "lobby" },
  { id: "citadel-lobby", theme: "citadel", pattern: "lobby" },
  { id: "gamescience-shared-display-lobby", theme: "gamescience", pattern: "shared-display-lobby" },
  { id: "citadel-shared-display-lobby", theme: "citadel", pattern: "shared-display-lobby" },
];

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

function writeSharedTooling(dir: string) {
  writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify(
      {
        name: "gamescience-registry-smoke",
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

function writeScenarioTooling(dir: string) {
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

  writeFileSync(
    path.join(dir, "tailwind.config.ts"),
    readFileSync(path.join(root, "tailwind.config.ts"), "utf8"),
  );
  writeFileSync(
    path.join(dir, "postcss.config.js"),
    readFileSync(path.join(root, "postcss.config.js"), "utf8"),
  );
  writeFileSync(
    path.join(dir, "index.html"),
    `<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`,
  );
}

function mainEntryFor(scenario: SmokeScenario): string {
  const themeImport = `@/themes/${scenario.theme}.css`;

  if (scenario.pattern === "join-flow") {
    return `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameScienceProvider } from "@/providers/gamescience-provider";
import { ParticipantJoinFlow } from "@/patterns/join/participant-join-flow";
import { ParticipantShell } from "@/templates/participant-shell/participant-shell";
import "@/foundations/index.css";
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
`;
  }

  if (scenario.pattern === "lobby") {
    return `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameScienceProvider } from "@/providers/gamescience-provider";
import { FacilitatorLobby } from "@/patterns/lobby/facilitator-lobby";
import { FacilitatorShell } from "@/templates/facilitator-shell/facilitator-shell";
import "@/foundations/index.css";
import "${themeImport}";

const session = {
  code: "B7K2",
  title: "Strategy Simulation",
  participantCount: 2,
  expectedParticipantCount: 24,
  stage: "lobby" as const,
  status: "active" as const,
};

const participants = [
  {
    id: "p-1",
    displayName: "Team Alpha",
    connection: "connected" as const,
    readiness: "ready" as const,
  },
  {
    id: "p-2",
    displayName: "Team Bravo",
    connection: "connected" as const,
    readiness: "not-ready" as const,
  },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameScienceProvider theme="${scenario.theme}" context="facilitator">
      <FacilitatorShell subtitle="Smoke · facilitator lobby">
        <FacilitatorLobby
          session={session}
          participants={participants}
          status="active"
          onStart={() => undefined}
        />
      </FacilitatorShell>
    </GameScienceProvider>
  </StrictMode>,
);
`;
  }

  return `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameScienceProvider } from "@/providers/gamescience-provider";
import { SharedDisplayLobby } from "@/patterns/lobby/shared-display-lobby";
import { SharedDisplayShell } from "@/templates/shared-display-shell/shared-display-shell";
import "@/foundations/index.css";
import "${themeImport}";

const session = {
  code: "B7K2",
  title: "Strategy Simulation",
  participantCount: 18,
  expectedParticipantCount: 24,
  stage: "lobby" as const,
  status: "active" as const,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameScienceProvider theme="${scenario.theme}" context="shared-display">
      <SharedDisplayShell>
        <SharedDisplayLobby session={session} status="active" />
      </SharedDisplayShell>
    </GameScienceProvider>
  </StrictMode>,
);
`;
}

function assertCleanPatternInstall(scenario: SmokeScenario, installed: Set<string>) {
  const forbiddenByPattern: Record<PatternName, string[]> = {
    "join-flow": ["lobby", "shared-display-lobby", "facilitator-shell", "shared-display-shell"],
    lobby: ["join-flow", "shared-display-lobby", "participant-shell", "shared-display-shell"],
    "shared-display-lobby": ["join-flow", "lobby", "participant-shell", "facilitator-shell"],
  };

  const forbidden = forbiddenByPattern[scenario.pattern];
  const leaked = forbidden.filter((name) => installed.has(name));
  if (leaked.length > 0) {
    throw new Error(
      `[smoke:${scenario.id}] dependency graph leaked sibling packages: ${leaked.join(", ")}`,
    );
  }

  const themeItem = `theme-${scenario.theme}`;
  if (!installed.has(themeItem)) {
    throw new Error(`[smoke:${scenario.id}] expected ${themeItem} to be installed`);
  }
  if (!installed.has(scenario.pattern)) {
    throw new Error(`[smoke:${scenario.id}] expected ${scenario.pattern} to be installed`);
  }

  const otherTheme = scenario.theme === "gamescience" ? "theme-citadel" : "theme-gamescience";
  if (installed.has(otherTheme)) {
    throw new Error(`[smoke:${scenario.id}] unexpectedly installed ${otherTheme}`);
  }
}

function prepareScenario(scenario: SmokeScenario) {
  const scenarioDir = path.join(smokeRoot, "scenarios", scenario.id);
  rmSync(scenarioDir, { recursive: true, force: true });
  mkdirSync(path.join(scenarioDir, "src"), { recursive: true });
  writeScenarioTooling(scenarioDir);

  const themeItem = `theme-${scenario.theme}`;
  const installed = new Set<string>();
  installItem("base", scenarioDir, installed);
  installItem(themeItem, scenarioDir, installed);
  installItem(scenario.pattern, scenarioDir, installed);

  assertCleanPatternInstall(scenario, installed);
  writeFileSync(path.join(scenarioDir, "src/main.tsx"), mainEntryFor(scenario));

  console.log(`[smoke:${scenario.id}] installed: ${[...installed].sort().join(", ")}`);
  return scenarioDir;
}

function main() {
  if (!existsSync(path.join(registryDir, "base.json"))) {
    console.error("Registry not built. Run npm run registry:build first.");
    process.exit(1);
  }

  for (const required of ["join-flow", "lobby", "shared-display-lobby", "theme-citadel"] as const) {
    if (!existsSync(path.join(registryDir, `${required}.json`))) {
      console.error(`Missing registry item ${required}.json — run npm run registry:build`);
      process.exit(1);
    }
  }

  rmSync(smokeRoot, { recursive: true, force: true });
  mkdirSync(smokeRoot, { recursive: true });
  writeSharedTooling(smokeRoot);

  console.log("[smoke] installing shared consumer dependencies once");
  run("npm install", smokeRoot);

  const failures: string[] = [];

  for (const scenario of scenarios) {
    const scenarioDir = prepareScenario(scenario);
    try {
      const viteBin = path.join(smokeRoot, "node_modules/.bin/vite");
      run(`"${viteBin}" build`, scenarioDir);
      console.log(`[smoke:${scenario.id}] build succeeded`);
    } catch {
      failures.push(scenario.id);
      console.error(`[smoke:${scenario.id}] build FAILED`);
    }
  }

  if (failures.length > 0) {
    console.error(`[smoke] failed scenarios: ${failures.join(", ")}`);
    process.exit(1);
  }

  console.log(`[smoke] all ${scenarios.length} registry installation scenarios built successfully`);
}

main();
