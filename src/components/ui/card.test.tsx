import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";

describe("Card", () => {
  it("renders title and description", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>Lobby details</CardDescription>
        </CardHeader>
      </Card>,
    );
    expect(screen.getByText("Session")).toBeInTheDocument();
    expect(screen.getByText("Lobby details")).toBeInTheDocument();
  });
});
