import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stack } from "./Stack";

describe("<Stack />", () => {
  describe("Behavior and Semantics", () => {
    it("renders children correctly", () => {
      render(<Stack>Content</Stack>);
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("renders as a <div> by default", () => {
      render(<Stack data-testid="stack">Content</Stack>);
      const element = screen.getByTestId("stack");
      expect(element.tagName).toBe("DIV");
    });

    it("renders using the requested semantic HTML tag via 'as' prop", () => {
      const { rerender } = render(<Stack as="section" data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack").tagName).toBe("SECTION");

      rerender(<Stack as="nav" data-testid="stack">Content</Stack>);
      expect(screen.getByTestId("stack").tagName).toBe("NAV");
    });

    it("propagates native HTML attributes", () => {
      render(
        <Stack aria-label="test stack" id="my-stack" data-custom="value" data-testid="stack">
          Content
        </Stack>
      );
      const element = screen.getByTestId("stack");
      expect(element).toHaveAttribute("id", "my-stack");
      expect(element).toHaveAttribute("aria-label", "test stack");
      expect(element).toHaveAttribute("data-custom", "value");
    });
  });
});
