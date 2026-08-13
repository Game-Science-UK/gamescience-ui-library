import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ScriptedReveal } from "./scripted-reveal";
import { scriptedRevealFixture } from "@/fixtures/scripted-reveal";

describe("ScriptedReveal", () => {
  it("renders a countdown during the countdown step", () => {
    render(<ScriptedReveal {...scriptedRevealFixture} />);
    expect(screen.getByRole("timer")).toHaveAccessibleName("10 seconds remaining");
    expect(screen.getByRole("heading", { name: "Regulator intervenes" })).toBeInTheDocument();
  });

  it("renders an acknowledge action outside the countdown step", async () => {
    const user = userEvent.setup();
    const onAcknowledge = vi.fn();
    render(
      <ScriptedReveal
        step="announce"
        headline="Regulator intervenes"
        onAcknowledge={onAcknowledge}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Acknowledge" }));
    expect(onAcknowledge).toHaveBeenCalledTimes(1);
  });

  it("shows a continue action when complete", () => {
    render(<ScriptedReveal step="complete" headline="Done" onAcknowledge={() => undefined} />);
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });
});
