import {createRef} from "react";
import { describe, it, expect} from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("<Input />", () => {

  it("forwards ref to the underlying input element", () => {
    const ref = createRef<HTMLInputElement>();

    render(<Input ref={ref} placeholder="Ref input" />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByRole("textbox"));
  });
});
