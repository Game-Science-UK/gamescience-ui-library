import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConnectionBanner } from "./connection-banner";

describe("ConnectionBanner", () => {
  it("uses live region status semantics", () => {
    render(<ConnectionBanner state="reconnecting" />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveAttribute("data-state", "reconnecting");
    expect(screen.getByText("Reconnecting")).toBeInTheDocument();
  });

  it("renders action slot", () => {
    render(<ConnectionBanner state="disconnected" action={<button type="button">Retry</button>} />);
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("maps restored to success intent", () => {
    render(<ConnectionBanner state="restored" />);
    expect(screen.getByRole("status")).toHaveAttribute("data-intent", "success");
  });
});
