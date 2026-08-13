import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    defaultName: "Docs",
  },
  // Sidebar order: parameters.options.storySort in .storybook/preview.tsx
  // (Introduction → Foundations → Patterns → Components/Examples → Components → Templates).
  async viteFinal(config) {
    return mergeConfig(config, {
      // Storybook's Vite builder already uses base './' so /storybook/ subpath hosting works.
      // Do not copy Vite public/ (registry JSON) into the Storybook artifact.
      publicDir: false,
      build: {
        // pages:validate rejects published source maps.
        sourcemap: false,
      },
      resolve: {
        alias: {
          "@": path.resolve(dirname, "../src"),
        },
      },
    });
  },
};

export default config;
