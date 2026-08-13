import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IntensitySelector } from "./intensity-selector";

describe("IntensitySelector", () => {
  it("renders a 0..max radiogroup with a zero label", () => {
    render(<IntensitySelector value={0} max={3} label="Conviction" />);
    expect(screen.getByRole("radiogroup", { name: "Conviction" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "None" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "3 tokens" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("fires onChange with the selected step", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<IntensitySelector value={1} onChange={onChange} />);
    await user.click(screen.getByRole("radio", { name: "3 tokens" }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("clamps negative max to a single zero option", () => {
    render(<IntensitySelector value={0} max={-1} />);
    expect(screen.getAllByRole("radio")).toHaveLength(1);
  });
});
