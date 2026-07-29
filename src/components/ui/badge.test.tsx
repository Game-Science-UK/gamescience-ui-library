import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("maps legacy intent=outline to default + outlined", () => {
    const { container } = render(<Badge intent="outline">Legacy</Badge>);
    const badge = container.firstElementChild;
    expect(badge).toHaveAttribute("data-intent", "default");
    expect(badge).toHaveAttribute("data-treatment", "outlined");
  });

  it("lets explicit treatment win over legacy outline intent", () => {
    const { container } = render(
      <Badge intent="outline" treatment="subtle">
        Precedence
      </Badge>,
    );
    const badge = container.firstElementChild;
    expect(badge).toHaveAttribute("data-intent", "default");
    expect(badge).toHaveAttribute("data-treatment", "subtle");
  });

  it("exposes data attributes for theme styling", () => {
    const { container } = render(
      <Badge intent="information" treatment="outlined">
        Classified
      </Badge>,
    );
    const badge = container.firstElementChild;
    expect(badge).toHaveAttribute("data-intent", "information");
    expect(badge).toHaveAttribute("data-treatment", "outlined");
    expect(badge).toHaveClass("gs-badge");
  });
});
