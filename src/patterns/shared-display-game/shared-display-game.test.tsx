import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SharedDisplayGame } from "./shared-display-game";
import {
  sharedDisplayGameFixture,
  waitingDisplayGameFixture,
} from "@/fixtures/shared-display-game";

describe("SharedDisplayGame", () => {
  it("renders the heading and state badge", () => {
    render(<SharedDisplayGame {...sharedDisplayGameFixture} />);
    expect(screen.getByRole("heading", { name: "Decision in progress" })).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders phase progress when steps are provided", () => {
    render(<SharedDisplayGame {...sharedDisplayGameFixture} />);
    expect(screen.getByRole("navigation", { name: "Round progress" })).toBeInTheDocument();
  });

  it("renders a waiting state without steps", () => {
    render(<SharedDisplayGame {...waitingDisplayGameFixture} />);
    expect(screen.getByRole("heading", { name: "Stand by" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
