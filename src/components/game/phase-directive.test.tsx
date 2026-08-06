import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhaseDirective } from "./phase-directive";

describe("PhaseDirective", () => {
  it("renders plain treatment without panel chrome", () => {
    const { container } = render(
      <PhaseDirective treatment="plain" eyebrow="Now">
        Discuss quietly.
      </PhaseDirective>,
    );
    expect(container.querySelector(".gs-panel")).toBeNull();
    expect(screen.getByText("Discuss quietly.")).toBeInTheDocument();
    expect(screen.getByText("Now")).toHaveClass("gs-eyebrow-dotted");
  });

  it("composes Panel for panel treatment", () => {
    const { container } = render(
      <PhaseDirective treatment="panel" intent="critical">
        Act now.
      </PhaseDirective>,
    );
    expect(container.querySelector(".gs-panel")).not.toBeNull();
    expect(container.querySelector(".gs-phase-directive")).toHaveAttribute(
      "data-intent",
      "critical",
    );
  });
});
