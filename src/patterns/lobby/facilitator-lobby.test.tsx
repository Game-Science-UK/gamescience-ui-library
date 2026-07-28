import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { readyLobbyFixture } from "@/fixtures/lobby";
import { FacilitatorLobby } from "./facilitator-lobby";

describe("FacilitatorLobby", () => {
  it("invokes onStart when start is available", async () => {
    const user = userEvent.setup();
    const onStart = vi.fn();
    render(
      <FacilitatorLobby
        session={readyLobbyFixture.session}
        participants={readyLobbyFixture.participants}
        status="ready"
        onStart={onStart}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Start session" }));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it("disables start when lobby is not ready", () => {
    render(
      <FacilitatorLobby
        session={readyLobbyFixture.session}
        participants={readyLobbyFixture.participants}
        status="active"
        onStart={() => undefined}
      />,
    );
    expect(screen.getByRole("button", { name: "Start session" })).toBeDisabled();
  });
});
