import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FacilitatorConsole } from "./facilitator-console";
import { facilitatorConsoleFixture, pausedConsoleFixture } from "@/fixtures/facilitator-console";

describe("FacilitatorConsole", () => {
  it("renders phase, status, and participant list", () => {
    render(<FacilitatorConsole {...facilitatorConsoleFixture} />);
    expect(screen.getByText("Discussion")).toBeInTheDocument();
    expect(screen.getByText("Team Alpha")).toBeInTheDocument();
  });

  it("invokes onAdvance", async () => {
    const user = userEvent.setup();
    const onAdvance = vi.fn();
    render(
      <FacilitatorConsole
        {...facilitatorConsoleFixture}
        onAdvance={onAdvance}
        onPause={() => undefined}
        onEnd={() => undefined}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Advance" }));
    expect(onAdvance).toHaveBeenCalledTimes(1);
  });

  it("shows resume instead of pause when paused", () => {
    render(<FacilitatorConsole {...pausedConsoleFixture} onResume={() => undefined} />);
    expect(screen.getByRole("button", { name: "Resume" })).toBeInTheDocument();
  });

  it("renders the private facilitator-only slot", () => {
    render(<FacilitatorConsole {...facilitatorConsoleFixture} privateSlot={<p>Hidden state</p>} />);
    expect(screen.getByText("Hidden state")).toBeInTheDocument();
  });
});
