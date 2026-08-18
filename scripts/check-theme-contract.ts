import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REQUIRED_THEME_TOKENS, SUPPORTED_THEMES } from "../src/themes/theme-contract.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * A token declared with no value (`--background: ;`) satisfies a presence check
 * but renders nothing. Scaffolded themes start in exactly that state, so empty
 * declarations are treated as unimplemented.
 */
function tokensWithoutValues(themeName: string, css: string): string[] {
  const block = themeBlock(themeName, css);
  return REQUIRED_THEME_TOKENS.filter((token) => {
    const pattern = new RegExp(`${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*:\\s*([^;]*);`);
    const match = pattern.exec(block);
    return match !== null && (match[1] ?? "").trim() === "";
  });
}

function themeBlock(themeName: string, css: string): string {
  const selector = `[data-theme="${themeName}"]`;
  const start = css.indexOf(selector);
  if (start === -1) {
    throw new Error(`Theme selector ${selector} not found`);
  }
  const remainder = css.slice(start);
  const nextTheme = remainder.search(/\n\[data-theme="/);
  return nextTheme === -1 ? remainder : remainder.slice(0, nextTheme);
}

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
  const empty = tokensWithoutValues(theme, css);
  if (missing.length > 0 || empty.length > 0) {
    failed = true;
    if (missing.length > 0) {
      console.error(`[theme-contract] ${theme} is missing tokens:`);
      for (const token of missing) console.error(`  - ${token}`);
    }
    if (empty.length > 0) {
      console.error(`[theme-contract] ${theme} declares ${empty.length} token(s) with no value:`);
      for (const token of empty) console.error(`  - ${token}`);
    }
  } else {
    console.log(
      `[theme-contract] ${theme} implements ${REQUIRED_THEME_TOKENS.length} required tokens`,
    );
  }
}

if (failed) {
  process.exit(1);
}
