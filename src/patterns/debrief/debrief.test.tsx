import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Debrief } from "./debrief";
import { debriefFixture, debriefSectionsFixture } from "@/fixtures/debrief";

describe("Debrief", () => {
  it("renders a read-only rating and the three reflection sections", () => {
    render(<Debrief {...debriefFixture} />);
    expect(screen.getByRole("img")).toHaveAccessibleName("4 out of 5");
    expect(screen.getByRole("button", { name: /So What/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Now What/ })).toBeInTheDocument();
  });

  it("invokes onResponseChange when typing", async () => {
    const user = userEvent.setup();
    const onResponseChange = vi.fn();
    render(
      <Debrief
        sections={debriefSectionsFixture.map((section) => ({
          ...section,
          onResponseChange,
        }))}
      />,
    );
    await user.type(screen.getByRole("textbox", { name: "What reflection" }), "Hello");
    expect(onResponseChange).toHaveBeenCalled();
  });
});
