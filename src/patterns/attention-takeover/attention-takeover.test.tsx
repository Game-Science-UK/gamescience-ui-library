import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AttentionTakeover } from "./attention-takeover";
import {
  attentionTakeoverFixture,
  urgentAttentionTakeoverFixture,
} from "@/fixtures/attention-takeover";

describe("AttentionTakeover", () => {
  it("renders an assertive status with headline", () => {
    render(<AttentionTakeover {...attentionTakeoverFixture} />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "assertive");
    expect(screen.getByRole("heading", { name: "Watch the shared display" })).toBeInTheDocument();
  });

  it("renders a countdown when provided", () => {
    render(<AttentionTakeover {...urgentAttentionTakeoverFixture} />);
    expect(screen.getByRole("timer")).toHaveAccessibleName("30 seconds remaining");
  });

  it("invokes onAcknowledge", async () => {
    const user = userEvent.setup();
    const onAcknowledge = vi.fn();
    render(<AttentionTakeover {...attentionTakeoverFixture} onAcknowledge={onAcknowledge} />);
    await user.click(screen.getByRole("button", { name: "I am watching" }));
    expect(onAcknowledge).toHaveBeenCalledTimes(1);
  });
});
