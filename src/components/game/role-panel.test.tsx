import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RolePanel } from "./role-panel";

describe("RolePanel", () => {
  it("supports uncontrolled disclosure", async () => {
    const user = userEvent.setup();
    render(
      <RolePanel
        role={{ title: "Analyst", subtitle: "Ops" }}
        priorities={["Protect data", "Escalate early"]}
      />,
    );
    expect(screen.queryByText("Protect data")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Priorities/i }));
    expect(screen.getByText("Protect data")).toBeInTheDocument();
  });

  it("supports controlled expanded state", async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    render(
      <RolePanel
        role={{ title: "Lead" }}
        priorities={["One"]}
        expanded={false}
        onExpandedChange={onExpandedChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: /Priorities/i }));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(screen.queryByText("One")).not.toBeInTheDocument();
  });

  it("renders objective section", () => {
    render(
      <RolePanel
        role={{ title: "Lead" }}
        objective={{ title: "Keep the room calm", goal: "No leaks" }}
      />,
    );
    expect(screen.getByText("Keep the room calm")).toBeInTheDocument();
    expect(screen.getByText("No leaks")).toBeInTheDocument();
  });
});
