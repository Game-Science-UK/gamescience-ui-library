/**
 * Converts hex colours to the bare OKLCH channel triplets used by theme tokens.
 *
 *   npm run theme:oklch -- '#02050A' '#B983FF'
 *   npm run theme:oklch -- --token --background '#02050A'
 *   echo '#02050A #EAF6FF' | npm run theme:oklch
 *
 * Theme CSS stores colours as `L C H` (no `oklch()` wrapper) and consumes them
 * as `oklch(var(--token))`, so extraction briefs quoting hex need converting
 * before they can be pasted into a theme. Doing that by hand is the slowest and
 * least verifiable step in adding a theme.
 */

function srgbToLinear(channel: number): number {
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

export function hexToOklch(hex: string): { l: number; c: number; h: number } {
  const clean = hex.trim().replace(/^#/, "");
  const expanded =
    clean.length === 3
      ? clean
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : clean;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    throw new Error(`"${hex}" is not a 3- or 6-digit hex colour`);
  }

  const [r, g, b] = [0, 2, 4].map((offset) =>
    srgbToLinear(parseInt(expanded.slice(offset, offset + 2), 16) / 255),
  ) as [number, number, number];

  // Linear sRGB → OKLab (Björn Ottosson).
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  const okL = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const okA = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const okB = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  const chroma = Math.sqrt(okA * okA + okB * okB);
  // Hue is meaningless for achromatic colours; report 0 rather than atan2 noise.
  const hue = chroma < 1e-6 ? 0 : ((Math.atan2(okB, okA) * 180) / Math.PI + 360) % 360;

  return { l: okL, c: chroma, h: hue };
}

/** Formats to the precision used by the existing theme stylesheets. */
export function formatChannels({ l, c, h }: { l: number; c: number; h: number }): string {
  return `${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)}`;
}

// ------------------------------------------------------------------- CLI

async function runCli() {
  const argv = process.argv.slice(2);
  const asToken = argv.includes("--token");
  const rest = argv.filter((arg) => arg !== "--token");

  const readStdin = async (): Promise<string> => {
    if (process.stdin.isTTY) return "";
    const chunks: Buffer[] = [];
    for await (const chunk of process.stdin) chunks.push(Buffer.from(chunk));
    return Buffer.concat(chunks).toString("utf8");
  };

  const inputs = rest.length > 0 ? rest : (await readStdin()).split(/\s+/).filter(Boolean);

  if (inputs.length === 0) {
    console.error(
      "[theme:oklch] usage: npm run theme:oklch -- '#02050A' ['#B983FF' ...]\n" +
        "               npm run theme:oklch -- --token --background '#02050A'",
    );
    process.exit(1);
  }

  let failed = false;
  // In --token mode arguments pair up as `--token-name` `#hex`.
  for (let index = 0; index < inputs.length; index += asToken ? 2 : 1) {
    const label = asToken ? inputs[index] : undefined;
    const hex = asToken ? inputs[index + 1] : inputs[index];
    if (!hex) {
      console.error(`[theme:oklch] missing hex value for "${label}"`);
      failed = true;
      continue;
    }
    try {
      const channels = formatChannels(hexToOklch(hex));
      console.log(asToken ? `  ${label}: ${channels}; /* ${hex} */` : `${hex}  →  ${channels}`);
    } catch (error) {
      console.error(`[theme:oklch] ${(error as Error).message}`);
      failed = true;
    }
  }

  if (failed) process.exit(1);
}

if (process.argv[1]?.endsWith("hex-to-oklch.ts")) {
  await runCli();
}
