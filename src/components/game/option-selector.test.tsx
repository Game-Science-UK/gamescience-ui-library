import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OptionSelector } from "./option-selector";

const options = [
  { id: "a", title: "Contain and observe", description: "Watch and wait" },
  { id: "b", title: "Escalate immediately" },
  { id: "c", title: "Request more intelligence" },
];

describe("OptionSelector", () => {
  it("renders a labelled radiogroup with all options", () => {
    render(<OptionSelector options={options} label="Choose" />);
    expect(screen.getByRole("radiogroup", { name: "Choose" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Contain and observe/ })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("marks the selected option and fires onSelect", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<OptionSelector options={options} selectedId="b" onSelect={onSelect} />);
    expect(screen.getByRole("radio", { name: /Escalate immediately/ })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await user.click(screen.getByRole("radio", { name: /Contain and observe/ }));
    expect(onSelect).toHaveBeenCalledWith("a");
  });

  it("disables all options when disabled", () => {
    render(<OptionSelector options={options} disabled />);
    for (const option of screen.getAllByRole("radio")) {
      expect(option).toBeDisabled();
    }
  });
});
