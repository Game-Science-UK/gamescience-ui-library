import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Countdown } from "./countdown";

describe("Countdown", () => {
  it("renders as a timer with formatted time", () => {
    render(
      <Countdown
        formattedTime="01:24"
        state="running"
        accessibleLabel="1 minute 24 seconds remaining"
      />,
    );
    const timer = screen.getByRole("timer");
    expect(timer).toHaveAttribute("data-state", "running");
    expect(timer).toHaveAttribute("aria-live", "off");
    expect(timer).toHaveAccessibleName("1 minute 24 seconds remaining");
    expect(screen.getByText("01:24")).toBeInTheDocument();
  });

  it("maps expired state to critical intent by default", () => {
    render(<Countdown formattedTime="00:00" state="expired" />);
    expect(screen.getByRole("timer")).toHaveAttribute("data-intent", "critical");
  });

  it("supports contained treatment", () => {
    const { container } = render(
      <Countdown formattedTime="00:10" treatment="contained" intent="warning" />,
    );
    expect(container.querySelector(".gs-countdown")).toHaveAttribute("data-treatment", "contained");
  });
});
