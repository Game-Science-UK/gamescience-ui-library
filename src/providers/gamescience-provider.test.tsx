import { render, screen } from "@testing-library/react";
import { createPortal } from "react-dom";
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

function PortalProbe() {
  return createPortal(
    <div data-testid="portal-probe" className="bg-primary text-primary-foreground">
      Portal content
    </div>,
    document.body,
  );
}

describe("GameScienceProvider", () => {
  it("applies data-theme and data-context on the provider root", () => {
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

  it("syncs theme and context onto documentElement for portals", () => {
    render(
      <GameScienceProvider theme="citadel" context="facilitator">
        <PortalProbe />
      </GameScienceProvider>,
    );

    expect(document.documentElement).toHaveAttribute("data-theme", "citadel");
    expect(document.documentElement).toHaveAttribute("data-context", "facilitator");
    expect(document.documentElement).toHaveAttribute("data-gamescience-ui");
    expect(screen.getByTestId("portal-probe")).toBeInTheDocument();
    expect(document.body.contains(screen.getByTestId("portal-probe"))).toBe(true);
  });

  it("updates documentElement attributes when theme or context changes", () => {
    const { rerender } = render(
      <GameScienceProvider theme="gamescience" context="participant">
        <span>one</span>
      </GameScienceProvider>,
    );

    expect(document.documentElement).toHaveAttribute("data-theme", "gamescience");
    expect(document.documentElement).toHaveAttribute("data-context", "participant");

    rerender(
      <GameScienceProvider theme="citadel" context="shared-display">
        <span>two</span>
      </GameScienceProvider>,
    );

    expect(document.documentElement).toHaveAttribute("data-theme", "citadel");
    expect(document.documentElement).toHaveAttribute("data-context", "shared-display");
  });

  it("restores previous documentElement attributes on unmount", () => {
    document.documentElement.setAttribute("data-theme", "pre-existing");
    document.documentElement.setAttribute("data-context", "pre-context");
    document.documentElement.removeAttribute("data-gamescience-ui");

    const { unmount } = render(
      <GameScienceProvider theme="citadel" context="participant">
        <span>mounted</span>
      </GameScienceProvider>,
    );

    expect(document.documentElement).toHaveAttribute("data-theme", "citadel");
    unmount();
    expect(document.documentElement).toHaveAttribute("data-theme", "pre-existing");
    expect(document.documentElement).toHaveAttribute("data-context", "pre-context");
    expect(document.documentElement.hasAttribute("data-gamescience-ui")).toBe(false);

    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-context");
  });

  it("defaults sentinel to the cinematic register and syncs data-register", () => {
    const { container } = render(
      <GameScienceProvider theme="sentinel" context="participant">
        <Probe />
      </GameScienceProvider>,
    );
    const root = container.querySelector("[data-gamescience-ui]");
    expect(root).toHaveAttribute("data-theme", "sentinel");
    expect(root).toHaveAttribute("data-register", "cinematic");
    expect(document.documentElement).toHaveAttribute("data-register", "cinematic");
  });

  it("applies the restrained register for sentinel and restores it on unmount", () => {
    document.documentElement.removeAttribute("data-register");
    const { container, unmount } = render(
      <GameScienceProvider theme="sentinel" context="facilitator" register="restrained">
        <span>restrained</span>
      </GameScienceProvider>,
    );
    expect(container.querySelector("[data-gamescience-ui]")).toHaveAttribute(
      "data-register",
      "restrained",
    );
    expect(document.documentElement).toHaveAttribute("data-register", "restrained");
    unmount();
    expect(document.documentElement.hasAttribute("data-register")).toBe(false);
  });

  it("does not set data-register for themes without an explicit register", () => {
    document.documentElement.removeAttribute("data-register");
    const { container } = render(
      <GameScienceProvider theme="citadel" context="participant">
        <span>no register</span>
      </GameScienceProvider>,
    );
    expect(container.querySelector("[data-gamescience-ui]")).not.toHaveAttribute("data-register");
    expect(document.documentElement.hasAttribute("data-register")).toBe(false);
  });

  it("can skip document sync when requested", () => {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-context");

    render(
      <GameScienceProvider theme="citadel" context="participant" syncDocumentAttributes={false}>
        <span>no sync</span>
      </GameScienceProvider>,
    );

    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
    expect(document.documentElement.hasAttribute("data-context")).toBe(false);
  });
});
