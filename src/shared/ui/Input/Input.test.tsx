import {createRef} from "react";
import { describe, it, expect} from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import { FormFieldContext } from "../FormField/FormFieldContext";

describe("<Input />", () => {

  it("forwards ref to the underlying input element", () => {
    const ref = createRef<HTMLInputElement>();

    render(<Input ref={ref} placeholder="Ref input" />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByRole("textbox"));
  });

  describe("with FormFieldContext", () => {
    it("receives id from FormField context when rendered inside FormField provider", () => {
      render(
        <FormFieldContext.Provider value={{ id: "test-id", invalid: false }}>
          <Input placeholder="Input" />
        </FormFieldContext.Provider>
      );
      
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "test-id");
    });

    it("receives aria-invalid from FormField context when rendered inside FormField provider", () => {
      render(
        <FormFieldContext.Provider value={{ id: "test-id", invalid: true }}>
          <Input placeholder="Input" />
        </FormFieldContext.Provider>
      );
      
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    });

    it("receives aria-describedby from FormField context when rendered inside FormField provider", () => {
      render(
        <FormFieldContext.Provider value={{ id: "test-id", invalid: false, describedBy: "test-error-id" }}>
          <Input placeholder="Input" />
        </FormFieldContext.Provider>
      );
      
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-describedby", "test-error-id");
    });

    it("uses direct props when rendered outside FormField context", () => {
      render(
        <Input 
          id="direct-id" 
          aria-invalid={true} 
          aria-describedby="direct-hint" 
          placeholder="Input" 
        />
      );
      
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "direct-id");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-describedby", "direct-hint");
    });
  });
});
