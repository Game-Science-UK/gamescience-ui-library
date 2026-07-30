import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { GameScienceProvider } from "@/providers/gamescience-provider";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./dialog";

describe("Dialog", () => {
  it("renders portal content under the active theme and context", async () => {
    const user = userEvent.setup();
    render(
      <GameScienceProvider theme="citadel" context="facilitator">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Confirm</DialogTitle>
            <DialogDescription>Portal themed content</DialogDescription>
          </DialogContent>
        </Dialog>
      </GameScienceProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    const title = await screen.findByText("Confirm");
    expect(title).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("citadel");
    expect(document.documentElement.getAttribute("data-context")).toBe("facilitator");
  });
});
