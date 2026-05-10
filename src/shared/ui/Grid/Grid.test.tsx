import { render, screen } from "@testing-library/react";
import { describe, it, expect} from "vitest";
import { Grid } from "./Grid";

describe("<Grid />", () => {
  it("renders a div by default with children", () => {
    render(<Grid>Test Content</Grid>);
    const element = screen.getByText("Test Content");
    expect(element.tagName).toBe("DIV");
    expect(element).toBeInTheDocument();
  });

  it("renders a custom HTML element via the 'as' prop", () => {
    render(<Grid as="ul">Test Content</Grid>);
    const element = screen.getByText("Test Content");
    expect(element.tagName).toBe("UL");
  });

});
