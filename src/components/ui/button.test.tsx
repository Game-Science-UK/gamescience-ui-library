import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
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
    expect(button.querySelectorAll('[data-slot="loading"]')).toHaveLength(1);
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

  it("renders asChild anchor without crashing", () => {
    render(
      <Button asChild>
        <a href="/join">Join</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Join" });
    expect(link).toHaveAttribute("href", "/join");
    expect(link).toHaveClass("gs-button");
  });

  it("renders asChild anchor with loading without Slot child crash", () => {
    render(
      <Button asChild loading>
        <a href="/join">Joining…</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Joining…" });
    expect(link).toHaveAttribute("href", "/join");
    expect(link).toHaveAttribute("aria-busy", "true");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link.querySelectorAll('[data-slot="loading"]')).toHaveLength(1);
    expect(link).toHaveTextContent("Joining…");
  });

  it("marks asChild disabled with aria-disabled and keeps href", () => {
    render(
      <Button asChild disabled>
        <a href="/join">Join</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Join" });
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("href", "/join");
    expect(link).not.toHaveAttribute("disabled");
  });

  it("prevents asChild loading click and child onClick", async () => {
    const user = userEvent.setup();
    const childClick = vi.fn();
    render(
      <Button asChild loading>
        <a href="/join" onClick={childClick}>
          Joining…
        </a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Joining…" });
    await user.click(link);
    expect(childClick).not.toHaveBeenCalled();
  });

  it("merges existing child className", () => {
    render(
      <Button asChild className="from-button">
        <a href="/join" className="from-child">
          Join
        </a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Join" });
    expect(link).toHaveClass("from-button");
    expect(link).toHaveClass("from-child");
    expect(link).toHaveClass("gs-button");
  });

  it("forwards ref to asChild anchor", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Button asChild ref={ref as React.Ref<HTMLButtonElement>}>
        <a href="/join">Join</a>
      </Button>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    expect(ref.current?.getAttribute("href")).toBe("/join");
  });

  it("prevents keyboard activation while asChild loading", async () => {
    const user = userEvent.setup();
    const childClick = vi.fn();
    render(
      <Button asChild loading>
        <a href="/join" onClick={childClick}>
          Joining…
        </a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Joining…" });
    link.focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(childClick).not.toHaveBeenCalled();
  });

  it("fails clearly when asChild receives multiple children", () => {
    expect(() =>
      render(
        <Button asChild>
          <a href="/a">A</a>
          <a href="/b">B</a>
        </Button>,
      ),
    ).toThrow(/asChild requires exactly one valid React element child/i);
  });

  it("fails clearly when asChild receives a non-element child", () => {
    expect(() => render(<Button asChild>plain text</Button>)).toThrow(
      /asChild requires exactly one valid React element child/i,
    );
  });

  it("SSR fixture (React 19 renderToString) supports asChild loading", () => {
    const html = renderToString(
      <Button asChild loading>
        <a href="/join">Joining…</a>
      </Button>,
    );
    expect(html).toContain('href="/join"');
    expect(html).toContain("aria-busy");
    expect(html).toContain("Joining…");
    expect(html).toContain("animate-spin");
  });
});

describe("Button React 18 fixture parity", () => {
  it("documents React.version and exercises asChild loading under the active runtime", () => {
    // Library unit tests run on the workspace React major. Dedicated clean-consumer
    // smoke covers React 18 and React 19 installs separately.
    expect(React.version.startsWith("18.") || React.version.startsWith("19.")).toBe(true);
    const html = renderToString(
      <Button asChild loading>
        <a href="/join">Joining…</a>
      </Button>,
    );
    expect(html).toContain("gs-button");
    expect((html.match(/animate-spin/g) ?? []).length).toBe(1);
  });
});
