import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConnectionStatus } from "./connection-status";

describe("ConnectionStatus", () => {
  it("exposes accessible status text", () => {
    render(<ConnectionStatus state="reconnecting" attempt={2} />);
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "reconnecting");
    expect(screen.getByText(/Connection status: Reconnecting/i)).toBeInTheDocument();
  });

  it("offers retry when offline", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ConnectionStatus state="offline" onRetry={onRetry} />);
    await user.click(screen.getByRole("button", { name: "Retry connection" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
