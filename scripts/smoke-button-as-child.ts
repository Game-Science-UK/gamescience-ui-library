/**
 * Clean-consumer smoke for Button asChild + loading under React 18/19 and
 * Tailwind 3/4 with Gamescience + Citadel themes.
 *
 * Proves: no Slot crash, spinner classes present, anchor href retained,
 * provider mounted, typecheck + vite build succeed.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GAMESCIENCE_UI_VERSION } from "../src/lib/version.ts";
import { registryItems } from "./registry-manifest.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const smokeRoot = path.join(root, "tmp/button-as-child-smoke");
const registryDir = path.join(root, "public/registry/r");
const tsxBin = path.join(root, "node_modules/.bin/tsx");

type ThemeName = "gamescience" | "citadel";
type ReactMajor = "18" | "19";
type Stack = "tailwind3" | "tailwind4";

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

function run(cmd: string, args: string[], cwd: string, timeoutMs = 300_000) {
  const result = spawnSync(cmd, args, {
    cwd,
    encoding: "utf8",
    timeout: timeoutMs,
    env: process.env,
  });
  if (result.status !== 0) {
    throw new Error(
      `${cmd} ${args.join(" ")} failed\n${result.stdout ?? ""}\n${result.stderr ?? ""}`,
    );
  }
  return `${result.stdout ?? ""}${result.stderr ?? ""}`;
}

function writeFixture(dir: string, theme: ThemeName, stack: Stack, reactMajor: ReactMajor) {
  mkdirSync(path.join(dir, "src"), { recursive: true });
  const reactVersion = reactMajor === "18" ? "^18.3.1" : "^19.1.0";
  const typesVersion = reactMajor === "18" ? "^18.3.1" : "^19.1.8";
  const typesDomVersion = reactMajor === "18" ? "^18.3.1" : "^19.1.6";
  const tailwindDep =
    stack === "tailwind3"
      ? { tailwindcss: "^3.4.17", autoprefixer: "^10.4.21", postcss: "^8.5.6" }
      : { tailwindcss: "^4.1.11", "@tailwindcss/vite": "^4.1.11" };

  writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify(
      {
        name: "gamescience-button-as-child-smoke",
        private: true,
        type: "module",
        dependencies: {
          react: reactVersion,
          "react-dom": reactVersion,
          "class-variance-authority": "^0.7.1",
          clsx: "^2.1.1",
          "tailwind-merge": "^3.3.1",
          "lucide-react": "^0.525.0",
          "@radix-ui/react-slot": "^1.2.3",
          sonner: "^2.0.6",
        },
        devDependencies: {
          "@types/react": typesVersion,
          "@types/react-dom": typesDomVersion,
          "@vitejs/plugin-react": "^4.7.0",
          typescript: "~5.8.3",
          vite: "^7.0.5",
          ...tailwindDep,
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
          paths: { "@/*": ["./src/*"] },
          typeRoots: ["./node_modules/@types"],
        },
        include: [
          "src/ssr-assert.tsx",
          "src/main.tsx",
          "src/components/ui/button.tsx",
          "src/lib/**/*",
          "src/providers/**/*",
          "src/themes/**/*",
        ],
      },
      null,
      2,
    ),
  );

  if (stack === "tailwind3") {
    writeFileSync(
      path.join(dir, "vite.config.ts"),
      `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
`,
    );
    writeFileSync(
      path.join(dir, "postcss.config.js"),
      `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };\n`,
    );
    writeFileSync(
      path.join(dir, "tailwind.config.js"),
      `export default { content: ["./index.html", "./src/**/*.{ts,tsx}"], theme: { extend: {} }, plugins: [] };\n`,
    );
    writeFileSync(
      path.join(dir, "src/app.css"),
      `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n@import "./foundations/index.css";\n@import "./themes/${theme}.css";\n`,
    );
  } else {
    writeFileSync(
      path.join(dir, "vite.config.ts"),
      `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
`,
    );
    writeFileSync(
      path.join(dir, "src/tailwind-v4-bridge.css"),
      readFileSync(path.join(root, "consumer/tailwind-v4-bridge.css"), "utf8"),
    );
    writeFileSync(
      path.join(dir, "src/app.css"),
      `@import "tailwindcss";\n@import "./tailwind-v4-bridge.css";\n@import "./foundations/index.css";\n@import "./themes/${theme}.css";\n`,
    );
  }

  writeFileSync(
    path.join(dir, "index.html"),
    `<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n`,
  );

  writeFileSync(
    path.join(dir, "src/ssr-assert.tsx"),
    `import React from "react";
import { renderToString } from "react-dom/server";
import { GameScienceProvider } from "./providers/gamescience-provider";
import { Button } from "./components/ui/button";

const html = renderToString(
  <GameScienceProvider theme="${theme}" context="participant">
    <main>
      <Button>Save</Button>
      <Button loading>Save</Button>
      <Button asChild>
        <a href="/join">Join</a>
      </Button>
      <Button asChild loading>
        <a href="/join">Joining…</a>
      </Button>
    </main>
  </GameScienceProvider>,
);

if (!html.includes('href="/join"')) throw new Error("anchor href missing");
if (!html.includes("aria-busy")) throw new Error("aria-busy missing");
if (!html.includes("animate-spin")) throw new Error("spinner class missing");
if ((html.match(/animate-spin/g) ?? []).length < 2) {
  throw new Error("expected loading indicators for native + asChild cases");
}
if (!html.includes("gs-button")) throw new Error("gs-button class missing");
console.log("ssr-assert ok", { theme: "${theme}", react: React.version });
`,
  );

  writeFileSync(
    path.join(dir, "src/main.tsx"),
    `import React from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import { GameScienceProvider } from "./providers/gamescience-provider";
import { Button } from "./components/ui/button";

createRoot(document.getElementById("root")!).render(
  <GameScienceProvider theme="${theme}" context="participant">
    <main className="min-h-screen bg-background p-6 text-foreground space-y-3">
      <Button>Save</Button>
      <Button loading>Save</Button>
      <Button asChild>
        <a href="/join">Join</a>
      </Button>
      <Button asChild loading>
        <a href="/join">Joining…</a>
      </Button>
    </main>
  </GameScienceProvider>,
);
`,
  );
}

function main() {
  if (!existsSync(path.join(registryDir, "button.json"))) {
    throw new Error("Run npm run registry:build first");
  }
  if (!existsSync(tsxBin)) {
    throw new Error("Missing monorepo tsx binary for SSR assertions");
  }

  rmSync(smokeRoot, { recursive: true, force: true });
  mkdirSync(smokeRoot, { recursive: true });

  const failures: string[] = [];
  const matrix: Array<{ theme: ThemeName; stack: Stack; react: ReactMajor }> = [
    { theme: "citadel", stack: "tailwind3", react: "18" },
    { theme: "citadel", stack: "tailwind3", react: "19" },
    { theme: "gamescience", stack: "tailwind3", react: "19" },
    { theme: "citadel", stack: "tailwind4", react: "19" },
    { theme: "gamescience", stack: "tailwind4", react: "18" },
  ];

  for (const { theme, stack, react } of matrix) {
    const id = `${theme}-${stack}-react${react}`;
    const dir = path.join(smokeRoot, id);
    try {
      writeFixture(dir, theme, stack, react);
      const installed = new Set<string>();
      installItem("base", dir, installed);
      installItem(`theme-${theme}`, dir, installed);
      installItem("button", dir, installed);

      run("npm", ["install"], dir);
      run(
        path.join(dir, "node_modules/.bin/tsc"),
        ["-p", "tsconfig.json", "--pretty", "false"],
        dir,
      );
      run(tsxBin, ["src/ssr-assert.tsx"], dir);
      run(path.join(dir, "node_modules/.bin/vite"), ["build"], dir);
      console.log(`[smoke:button-as-child:${id}] succeeded (${GAMESCIENCE_UI_VERSION})`);
    } catch (error) {
      failures.push(id);
      console.error(`[smoke:button-as-child:${id}] FAILED`, error);
    }
  }

  if (failures.length) {
    throw new Error(`[smoke:button-as-child] failed: ${failures.join(", ")}`);
  }
  console.log("[smoke:button-as-child] all fixtures succeeded");
}

main();
