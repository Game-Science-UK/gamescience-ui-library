import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StickyActionBar } from "./sticky-action-bar";

describe("StickyActionBar", () => {
  it("renders status and actions", () => {
    render(
      <StickyActionBar status={<span>2 / 5</span>} intent="warning">
        <button type="button">Submit</button>
      </StickyActionBar>,
    );
    expect(screen.getByText("2 / 5")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(document.querySelector(".gs-sticky-action-bar")).toHaveAttribute(
      "data-intent",
      "warning",
    );
    expect(document.querySelector(".gs-sticky-action-bar")).toHaveAttribute("data-sticky", "true");
  });
});
