import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OutcomeSummary } from "./outcome-summary";

describe("OutcomeSummary", () => {
  it("maps critical intent and renders metrics/actions", () => {
    render(
      <OutcomeSummary
        outcome={{
          label: "High risk",
          title: "Exposure",
          description: "Aggregate only",
          intent: "critical",
        }}
        metrics={[{ label: "Score", value: "12", intent: "warning" }]}
        actions={<button type="button">Continue</button>}
        density="shared-display"
      />,
    );
    expect(screen.getByRole("heading", { name: "Exposure" })).toBeInTheDocument();
    expect(screen.getByText("High risk")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
    expect(document.querySelector(".gs-outcome-summary")).toHaveAttribute(
      "data-intent",
      "critical",
    );
  });
});
