import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

import { PAGES_SITE_PATH } from "../scripts/pages-config.ts";
import { buildSkillsIndex, skillsDir } from "../scripts/skills-index.ts";

const repoRoot = path.resolve(import.meta.dirname, "..");

/**
 * In production these paths are static files written into `pages-dist` by
 * `build-pages`. The dev server has no such tree, and Vite's SPA fallback would
 * answer them with `index.html`, so the skills and docs pages would try to parse
 * markup as JSON.
 *
 * This serves the same bytes from the repository, so `npm run site:dev` shows
 * exactly what the deployed site will.
 */
function publishedContent(): Plugin {
  const routes: Array<{ prefix: string; dir: string; type: string }> = [
    { prefix: `${PAGES_SITE_PATH}/skills/`, dir: skillsDir, type: "text/markdown" },
    { prefix: `${PAGES_SITE_PATH}/docs/`, dir: path.join(repoRoot, "docs"), type: "text/markdown" },
  ];

  return {
    name: "gamescience-published-content",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const url = (request.url ?? "").split("?")[0] ?? "";

        if (url === `${PAGES_SITE_PATH}/skills/index.json`) {
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify(buildSkillsIndex(), null, 2));
          return;
        }

        for (const route of routes) {
          if (!url.startsWith(route.prefix)) continue;

          // Contain reads to the mapped directory.
          const relative = decodeURIComponent(url.slice(route.prefix.length));
          const file = path.resolve(route.dir, relative);
          if (!file.startsWith(path.resolve(route.dir))) break;

          if (existsSync(file) && file.endsWith(".md")) {
            response.setHeader("Content-Type", route.type);
            response.end(readFileSync(file, "utf8"));
            return;
          }
        }

        next();
      });
    },
  };
}

/**
 * Documentation site for the registry.
 *
 * Builds to `site-dist/`, which `build-pages.ts` merges into `pages-dist` during
 * the latest stage. It never writes the registry surface — `/r`, `/versions`,
 * `/docs`, `/skills`, `/storybook` and the root metadata JSON are owned by
 * build-pages and asserted untouched by `pages:validate`.
 *
 * The app imports the library from source so previews are real components inside
 * a real GameScienceProvider, which is what makes the theme switcher meaningful.
 */
export default defineConfig({
  root: import.meta.dirname,
  base: `${PAGES_SITE_PATH}/`,
  plugins: [react(), publishedContent()],
  resolve: {
    alias: {
      "@": path.join(repoRoot, "src"),
      "@site": path.join(import.meta.dirname, "src"),
      "@registry": path.join(repoRoot, "public/registry"),
      "@content": repoRoot,
    },
  },
  build: {
    outDir: path.join(repoRoot, "site-dist"),
    emptyOutDir: true,
  },
});
