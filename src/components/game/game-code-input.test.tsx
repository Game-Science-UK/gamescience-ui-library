import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GameCodeInput } from "./game-code-input";

describe("GameCodeInput", () => {
  it("uppercases typed codes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<GameCodeInput value="" onChange={onChange} />);
    await user.type(screen.getByLabelText("Game code"), "ab");
    expect(onChange).toHaveBeenCalledWith("A");
    expect(onChange).toHaveBeenCalledWith("B");
  });

  it("announces validation errors", () => {
    render(
      <GameCodeInput
        value="XXXX"
        onChange={() => undefined}
        error="That code was not recognised"
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("That code was not recognised");
    expect(screen.getByLabelText("Game code")).toHaveAttribute("aria-invalid", "true");
  });
});
