import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Briefing } from "./briefing";
import { briefingFixture, lastBriefingSlideId } from "@/fixtures/briefing";

describe("Briefing", () => {
  it("renders the active slide and position", () => {
    render(<Briefing {...briefingFixture} />);
    expect(screen.getByRole("heading", { name: "Context" })).toBeInTheDocument();
    expect(screen.getByText(/1 of 4/)).toBeInTheDocument();
  });

  it("disables previous on the first slide", () => {
    render(<Briefing {...briefingFixture} onNext={() => undefined} />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
  });

  it("offers complete on the last slide", () => {
    render(
      <Briefing
        {...briefingFixture}
        activeSlideId={lastBriefingSlideId}
        onPrevious={() => undefined}
        onComplete={() => undefined}
      />,
    );
    expect(screen.getByRole("button", { name: "Complete briefing" })).toBeInTheDocument();
  });

  it("invokes onNext from a middle slide", async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();
    render(
      <Briefing
        {...briefingFixture}
        activeSlideId="roles"
        onNext={onNext}
        onPrevious={() => undefined}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
