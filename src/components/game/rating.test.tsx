import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Rating } from "./rating";

describe("Rating", () => {
  it("renders a read-only image with a value summary", () => {
    render(<Rating value={3} max={5} readOnly label="Reflection" />);
    expect(screen.getByRole("img")).toHaveAccessibleName("3 out of 5");
    expect(screen.getByText(/Reflection: 3 out of 5/)).toBeInTheDocument();
  });

  it("fires onChange when interactive", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating value={0} onChange={onChange} />);
    await user.click(screen.getByRole("radio", { name: "4 out of 5" }));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
