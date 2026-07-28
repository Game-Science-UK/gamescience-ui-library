import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GameScienceProvider } from "./gamescience-provider";
import { useExperienceContext } from "./experience-context";
import { useGameTheme } from "./game-theme-context";

function Probe() {
  const { theme } = useGameTheme();
  const { context } = useExperienceContext();
  return (
    <span>
      {theme}:{context}
    </span>
  );
}

describe("GameScienceProvider", () => {
  it("applies data-theme and data-context attributes", () => {
    const { container } = render(
      <GameScienceProvider theme="citadel" context="shared-display">
        <Probe />
      </GameScienceProvider>,
    );
    const root = container.querySelector("[data-gamescience-ui]");
    expect(root).toHaveAttribute("data-theme", "citadel");
    expect(root).toHaveAttribute("data-context", "shared-display");
    expect(screen.getByText("citadel:shared-display")).toBeInTheDocument();
  });
});
