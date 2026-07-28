import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REQUIRED_THEME_TOKENS, SUPPORTED_THEMES } from "../src/themes/theme-contract.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function tokensPresentInTheme(themeName: string, css: string): string[] {
  const selector = `[data-theme="${themeName}"]`;
  const start = css.indexOf(selector);
  if (start === -1) {
    throw new Error(`Theme selector ${selector} not found`);
  }

  // Capture the primary theme block (until the next top-level [data-theme or EOF).
  const remainder = css.slice(start);
  const nextTheme = remainder.search(/\n\[data-theme="/);
  const block = nextTheme === -1 ? remainder : remainder.slice(0, nextTheme);

  return REQUIRED_THEME_TOKENS.filter((token) => {
    const pattern = new RegExp(`${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*:`);
    return !pattern.test(block);
  });
}

let failed = false;

for (const theme of SUPPORTED_THEMES) {
  const filePath = path.join(root, "src/themes", `${theme}.css`);
  const css = readFileSync(filePath, "utf8");
  const missing = tokensPresentInTheme(theme, css);
  if (missing.length > 0) {
    failed = true;
    console.error(`[theme-contract] ${theme} is missing tokens:`);
    for (const token of missing) console.error(`  - ${token}`);
  } else {
    console.log(
      `[theme-contract] ${theme} implements ${REQUIRED_THEME_TOKENS.length} required tokens`,
    );
  }
}

if (failed) {
  process.exit(1);
}
