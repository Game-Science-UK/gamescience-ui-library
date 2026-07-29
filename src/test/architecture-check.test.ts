import { describe, expect, it } from "vitest";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runArchitectureChecks } from "../../scripts/check-architecture";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

describe("architecture contract checker", () => {
  it("passes against the real library source tree", () => {
    const violations = runArchitectureChecks({ rootDir: root, runSelfTests: false });
    expect(violations).toEqual([]);
  });

  it("detects prohibited patterns in a synthetic tree", () => {
    const fixture = path.join(root, "tmp/architecture-unit-fixture");
    rmSync(fixture, { recursive: true, force: true });

    const badFile = path.join(fixture, "src/components/ui/CitadelButton.tsx");
    mkdirSync(path.dirname(badFile), { recursive: true });
    writeFileSync(
      badFile,
      `export function CitadelButton(props: { theme?: "citadel" }) {
  return <button style={{ color: "#ff00aa" }} {...props} />;
}
`,
    );

    writeFileSync(
      path.join(fixture, "src/components/ui/toast.tsx"),
      `export function toast() { return null }\n`,
    );

    // Point checker at fixture by copying structure under a temp remap:
    // runArchitectureChecks expects paths relative to library root.
    // Instead, write into the real src temporarily is unsafe.
    // We validate the exported helper against library root emptiness above,
    // and rely on script self-tests for fixture detection.
    // Here we assert the helper returns structured violations when scanning
    // by temporarily using rootDir only for walk — files must live under rootDir/src.
    const violations = runArchitectureChecks({ rootDir: fixture, runSelfTests: false });
    const rules = new Set(violations.map((v) => v.rule));
    expect(rules.has("filename-case") || rules.has("prohibited-name")).toBe(true);
    expect(rules.has("legacy-toast-file")).toBe(true);
    expect(rules.has("raw-hex") || rules.has("theme-prop")).toBe(true);

    rmSync(fixture, { recursive: true, force: true });
  });
});
