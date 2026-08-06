import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhaseHeader } from "./phase-header";

describe("PhaseHeader", () => {
  it("renders three regions", () => {
    render(
      <PhaseHeader
        eyebrow={<span>Brand</span>}
        phase={<span>Discussion</span>}
        trailing={<span>01:00</span>}
        intent="warning"
      />,
    );
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("Discussion")).toBeInTheDocument();
    expect(screen.getByText("01:00")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveAttribute("data-intent", "warning");
  });
});
