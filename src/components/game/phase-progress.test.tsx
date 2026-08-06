import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhaseProgress } from "./phase-progress";

const steps = [
  { id: "a", label: "Brief", status: "complete" as const },
  { id: "b", label: "Discuss", status: "active" as const },
  { id: "c", label: "Vote", status: "pending" as const },
];

describe("PhaseProgress", () => {
  it("exposes ordered steps and current step", () => {
    render(<PhaseProgress steps={steps} label="Round progress" />);
    expect(screen.getByRole("navigation", { name: "Round progress" })).toBeInTheDocument();
    expect(screen.getByText(/Current step: Discuss/i)).toBeInTheDocument();
    expect(screen.getByText(/1 of 3 steps complete/i)).toBeInTheDocument();
  });

  it("honours explicit blocked status", () => {
    render(
      <PhaseProgress steps={[{ id: "x", label: "Locked", status: "blocked" }]} density="compact" />,
    );
    expect(screen.getByText(/blocked:/i)).toBeInTheDocument();
  });
});
