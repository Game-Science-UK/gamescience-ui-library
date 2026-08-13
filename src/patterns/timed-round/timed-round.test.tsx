import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/ui/badge";
import { TimedRound } from "./timed-round";
import { roundStepsFixture } from "@/fixtures/round";

describe("TimedRound", () => {
  it("renders phase, directive, and injected beat content", () => {
    render(
      <TimedRound
        phase={<Badge intent="primary">Decision</Badge>}
        directive="Choose before the timer ends."
      >
        <p>Beat content</p>
      </TimedRound>,
    );
    expect(screen.getByText("Decision")).toBeInTheDocument();
    expect(screen.getByText("Choose before the timer ends.")).toBeInTheDocument();
    expect(screen.getByText("Beat content")).toBeInTheDocument();
  });

  it("renders phase progress steps when provided", () => {
    render(
      <TimedRound
        phase={<Badge intent="primary">Decision</Badge>}
        steps={roundStepsFixture}
        activeStepId="decide"
        progressLabel="Round progress"
      >
        <p>Beat content</p>
      </TimedRound>,
    );
    expect(screen.getByRole("navigation", { name: "Round progress" })).toBeInTheDocument();
  });

  it("renders a footer action region when provided", () => {
    render(
      <TimedRound phase={<Badge intent="primary">Decision</Badge>} footer={<button>Submit</button>}>
        <p>Beat content</p>
      </TimedRound>,
    );
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
});
