import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GameScienceProvider } from "@/providers/gamescience-provider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

describe("Select", () => {
  it("renders a disabled trigger", () => {
    render(
      <GameScienceProvider theme="gamescience" context="participant">
        <Select disabled>
          <SelectTrigger aria-label="Choice">
            <SelectValue placeholder="Pick one" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">A</SelectItem>
          </SelectContent>
        </Select>
      </GameScienceProvider>,
    );
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
