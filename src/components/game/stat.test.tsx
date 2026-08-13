import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stat } from "./stat";

describe("Stat", () => {
  it("renders a label and value with intent", () => {
    render(<Stat label="Deal viability" value="78" intent="success" />);
    expect(screen.getByText("Deal viability")).toBeInTheDocument();
    expect(screen.getByText("78")).toBeInTheDocument();
    expect(screen.getByText("78").closest(".gs-stat")).toHaveAttribute("data-intent", "success");
  });

  it("renders an optional hint", () => {
    render(<Stat label="Rooms" value="3" hint="of 12 active" />);
    expect(screen.getByText("of 12 active")).toBeInTheDocument();
  });
});
