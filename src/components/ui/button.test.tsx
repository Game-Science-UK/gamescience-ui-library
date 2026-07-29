import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders primary intent by default", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("disables interaction while loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("respects disabled state", () => {
    render(<Button disabled>Locked</Button>);
    expect(screen.getByRole("button", { name: "Locked" })).toBeDisabled();
  });

  it("exposes emphasis and gs-button hooks for theme styling", () => {
    render(
      <Button emphasis="strong" size="lg">
        Continue
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Continue" });
    expect(button).toHaveClass("gs-button");
    expect(button).toHaveAttribute("data-emphasis", "strong");
    expect(button).toHaveAttribute("data-size", "lg");
  });

  it("keeps disabled strong buttons without interactive glow hooks conflict", () => {
    render(
      <Button emphasis="strong" disabled>
        Locked
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Locked" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-emphasis", "strong");
  });
});
