import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Panel, PanelTitle } from "./panel";

describe("Panel", () => {
  it("exposes emphasis and content wrapper for scope decorations", () => {
    const { container } = render(
      <Panel elevation="raised" emphasis="strong" className="space-y-2">
        <PanelTitle>Session</PanelTitle>
      </Panel>,
    );

    const panel = container.querySelector(".gs-panel");
    expect(panel).toHaveAttribute("data-emphasis", "strong");
    expect(panel).toHaveAttribute("data-elevation", "raised");
    expect(panel?.querySelector(".gs-panel-content")).toBeTruthy();
    expect(screen.getByText("Session")).toBeInTheDocument();
  });
});
