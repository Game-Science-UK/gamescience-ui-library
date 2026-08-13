import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Decision } from "./decision";
import {
  decisionOptionsFixture,
  resolvedDecisionFixture,
  tiedDecisionFixture,
} from "@/fixtures/decision";

describe("Decision", () => {
  it("disables commit until an option is selected", () => {
    render(<Decision phase="sealed" options={decisionOptionsFixture} onCommit={() => undefined} />);
    expect(screen.getByRole("button", { name: "Commit selection" })).toBeDisabled();
  });

  it("invokes onCommit from the sealed phase", async () => {
    const user = userEvent.setup();
    const onCommit = vi.fn();
    render(
      <Decision
        phase="sealed"
        options={decisionOptionsFixture}
        selectedOptionId="b"
        onCommit={onCommit}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Commit selection" }));
    expect(onCommit).toHaveBeenCalledTimes(1);
  });

  it("shows the winning option when resolved", () => {
    render(<Decision {...resolvedDecisionFixture} />);
    expect(screen.getByRole("heading", { name: "Escalate immediately" })).toBeInTheDocument();
  });

  it("shows a tie message when no majority is reached", () => {
    render(<Decision {...tiedDecisionFixture} />);
    expect(screen.getByText("No majority reached")).toBeInTheDocument();
  });
});
