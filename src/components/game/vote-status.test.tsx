import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VOTE_STATUS_PIP_THRESHOLD, VoteStatus } from "./vote-status";

describe("VoteStatus", () => {
  it("announces a full status sentence", () => {
    render(<VoteStatus voted={3} total={5} anonymous locked />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
    expect(
      screen.getByText(/3 of 5 votes received, anonymous voting, voting locked/i),
    ).toBeInTheDocument();
  });

  it("uses pips for small rooms in auto mode", () => {
    const { container } = render(<VoteStatus voted={2} total={4} progress="auto" />);
    expect(container.querySelector(".gs-vote-status")).toHaveAttribute("data-progress", "pips");
    expect(container.querySelectorAll("li")).toHaveLength(4);
  });

  it("falls back to bar above pip threshold", () => {
    const total = VOTE_STATUS_PIP_THRESHOLD + 1;
    const { container } = render(<VoteStatus voted={1} total={total} progress="auto" />);
    expect(container.querySelector(".gs-vote-status")).toHaveAttribute("data-progress", "bar");
    expect(container.querySelector(".gs-progress")).not.toBeNull();
  });

  it("clamps voted for render safety without changing caller props", () => {
    render(<VoteStatus voted={9} total={3} />);
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });
});
