import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CreateSession } from "./create-session";
import { createSessionReadyFixture } from "@/fixtures/create-session";

function baseProps() {
  return {
    sessionName: "",
    onSessionNameChange: vi.fn(),
    onSubmit: vi.fn(),
  };
}

describe("CreateSession", () => {
  it("renders the create-session form", () => {
    render(<CreateSession {...baseProps()} />);
    expect(screen.getByRole("heading", { name: "Create session" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create session" })).toBeInTheDocument();
  });

  it("updates the session name via the controlled handler", async () => {
    const user = userEvent.setup();
    const onSessionNameChange = vi.fn();
    render(<CreateSession {...baseProps()} onSessionNameChange={onSessionNameChange} />);
    await user.type(screen.getByLabelText("Session name"), "Team Alpha");
    expect(onSessionNameChange).toHaveBeenCalled();
  });

  it("renders the optional host name field only when its handler is provided", () => {
    const { rerender } = render(<CreateSession {...baseProps()} />);
    expect(screen.queryByLabelText("Your name")).not.toBeInTheDocument();
    rerender(<CreateSession {...baseProps()} hostName="" onHostNameChange={vi.fn()} />);
    expect(screen.getByLabelText("Your name")).toBeInTheDocument();
  });

  it("invokes onSubmit on submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<CreateSession {...baseProps()} onSubmit={onSubmit} />);
    await user.click(screen.getByRole("button", { name: "Create session" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables submit when a disabled reason is provided", () => {
    render(<CreateSession {...baseProps()} submitDisabledReason="A name is required" />);
    expect(screen.getByRole("button", { name: "Create session" })).toBeDisabled();
    expect(screen.getByText("A name is required")).toBeInTheDocument();
  });

  it("renders the generated code in the ready state", () => {
    render(
      <CreateSession
        sessionName={createSessionReadyFixture.sessionName}
        onSessionNameChange={() => undefined}
        onSubmit={() => undefined}
        createdCode={createSessionReadyFixture.createdCode}
      />,
    );
    expect(screen.getByLabelText("Room code B 7 K 2")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Create session" })).not.toBeInTheDocument();
  });
});
