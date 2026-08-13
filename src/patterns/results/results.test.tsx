import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Results } from "./results";
import { resultsFixture, sharedDisplayResultsFixture } from "@/fixtures/results";

describe("Results", () => {
  it("renders the outcome headline and stats", () => {
    render(<Results {...resultsFixture} />);
    expect(screen.getByRole("heading", { name: "Contained exposure" })).toBeInTheDocument();
    expect(screen.getByText("Agreement")).toBeInTheDocument();
    expect(screen.getByText("5 / 5")).toBeInTheDocument();
  });

  it("renders a shared-display density with larger stats", () => {
    render(<Results {...sharedDisplayResultsFixture} />);
    expect(screen.getByText("Elevated risk")).toBeInTheDocument();
  });
});
