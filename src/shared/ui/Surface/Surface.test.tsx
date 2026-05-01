import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Surface } from "./Surface";

describe("<Surface />", () => {
  it("renders the children content inside the specified element", () => {
    render(
      <Surface as="div" data-testid="surface">
        <span>Test Content</span>
      </Surface>
    );

    const surface = screen.getByTestId("surface");
    expect(surface).toBeInTheDocument();
    expect(surface).toHaveTextContent("Test Content");
    expect(surface.tagName.toLowerCase()).toBe("div");
  });

  it("renders the correct HTML element for each 'as' value", () => {
    const { rerender } = render(
      <Surface as="section" data-testid="surface">
        Content
      </Surface>
    );
    expect(screen.getByTestId("surface").tagName.toLowerCase()).toBe("section");

    rerender(
      <Surface as="dialog" data-testid="surface">
        Content
      </Surface>
    );
    expect(screen.getByTestId("surface").tagName.toLowerCase()).toBe("dialog");

    rerender(
      <Surface as="header" data-testid="surface">
        Content
      </Surface>
    );
    expect(screen.getByTestId("surface").tagName.toLowerCase()).toBe("header");
  });

  it("propagates native HTML attributes", () => {
    render(
      <Surface
        as="div"
        data-testid="surface"
        aria-label="surface-label"
        id="surface-id"
      >
        Content
      </Surface>
    );

    const surface = screen.getByTestId("surface");
    expect(surface).toHaveAttribute("aria-label", "surface-label");
    expect(surface).toHaveAttribute("id", "surface-id");
  });

  it("is hidden when children is null", () => {
    render(
      <Surface as="div" data-testid="surface">
        {null}
      </Surface>
    );

    expect(screen.getByTestId("surface")).not.toBeVisible();
  });

  it("is hidden when children is undefined", () => {
    render(<Surface as="div" data-testid="surface" />);

    expect(screen.getByTestId("surface")).not.toBeVisible();
  });

  it("is hidden when children is an empty string", () => {
    render(
      <Surface as="div" data-testid="surface">
        {""}
      </Surface>
    );

    expect(screen.getByTestId("surface")).not.toBeVisible();
  });
});
