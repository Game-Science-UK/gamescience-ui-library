import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registryItems } from "./registry-manifest.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixtureDir = path.join(root, "tmp/registry-smoke");
const registryDir = path.join(root, "public/registry/r");

const itemsToInstall = ["base", "theme-gamescience", "button", "input", "panel", "join-flow"];

function run(command: string, cwd = fixtureDir) {
  execSync(command, { cwd, stdio: "inherit" });
}

function installItem(name: string, installed: Set<string>) {
  if (installed.has(name)) return;
  const definition = registryItems.find((item) => item.name === name);
  if (!definition) throw new Error(`Unknown registry item ${name}`);

  for (const dep of definition.registryDependencies ?? []) {
    installItem(dep, installed);
  }

  const itemJson = JSON.parse(readFileSync(path.join(registryDir, `${name}.json`), "utf8")) as {
    files: Array<{ target: string; content: string }>;
    dependencies?: string[];
  };

  for (const file of itemJson.files) {
    const target = path.join(fixtureDir, file.target);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, file.content);
  }

  installed.add(name);
}

function main() {
  if (!existsSync(path.join(registryDir, "base.json"))) {
    console.error("Registry not built. Run npm run registry:build first.");
    process.exit(1);
  }

  rmSync(fixtureDir, { recursive: true, force: true });
  mkdirSync(fixtureDir, { recursive: true });

  writeFileSync(
    path.join(fixtureDir, "package.json"),
    JSON.stringify(
      {
        name: "gamescience-registry-smoke",
        private: true,
        type: "module",
        scripts: {
          build: "tsc -b && vite build",
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
    path.join(fixtureDir, "tsconfig.json"),
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
    path.join(fixtureDir, "vite.config.ts"),
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
    path.join(fixtureDir, "tailwind.config.ts"),
    readFileSync(path.join(root, "tailwind.config.ts"), "utf8"),
  );
  writeFileSync(
    path.join(fixtureDir, "postcss.config.js"),
    readFileSync(path.join(root, "postcss.config.js"), "utf8"),
  );
  writeFileSync(
    path.join(fixtureDir, "index.html"),
    `<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`,
  );

  mkdirSync(path.join(fixtureDir, "src"), { recursive: true });

  const installed = new Set<string>();
  for (const name of itemsToInstall) {
    installItem(name, installed);
  }

  writeFileSync(
    path.join(fixtureDir, "src/main.tsx"),
    `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameScienceProvider } from "@/providers/gamescience-provider";
import { ParticipantJoinFlow } from "@/patterns/join/participant-join-flow";
import { ParticipantShell } from "@/templates/participant-shell/participant-shell";
import "@/foundations/index.css";
import "@/themes/gamescience.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameScienceProvider theme="gamescience" context="participant">
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

  console.log(`[smoke] installed items: ${[...installed].join(", ")}`);
  run("npm install");
  run("npx vite build");
  console.log("[smoke] registry installation fixture built successfully");
}

main();
