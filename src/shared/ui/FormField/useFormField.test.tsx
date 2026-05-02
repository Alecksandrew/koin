import React, { ReactNode } from "react";
import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFormField } from "./useFormField";
import { FormFieldContext } from "./FormFieldContext";

describe("useFormField", () => {
  it("should return the props directly when no FormFieldContext is present", () => {
    const { result } = renderHook(() =>
      useFormField({
        id: "direct-id",
        "aria-describedby": "direct-hint",
        "aria-invalid": true,
      })
    );

    expect(result.current.id).toBe("direct-id");
    expect(result.current["aria-describedby"]).toBe("direct-hint");
    expect(result.current["aria-invalid"]).toBe(true);
  });

  it("should override direct props with FormFieldContext values when present", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FormFieldContext.Provider
        value={{
          id: "context-id",
          describedBy: "context-hint context-error",
          invalid: true,
        }}
      >
        {children}
      </FormFieldContext.Provider>
    );

    const { result } = renderHook(
      () =>
        useFormField({
          id: "direct-id",
          "aria-describedby": "direct-hint",
          "aria-invalid": false,
        }),
      { wrapper }
    );

    expect(result.current.id).toBe("context-id");
    expect(result.current["aria-describedby"]).toBe("context-hint context-error");
    expect(result.current["aria-invalid"]).toBe(true);
  });

  it("should fallback to direct prop if context describedBy is undefined", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FormFieldContext.Provider
        value={{
          id: "context-id",
          invalid: true,
          describedBy: undefined,
        }}
      >
        {children}
      </FormFieldContext.Provider>
    );

    const { result } = renderHook(
      () =>
        useFormField({
          "aria-describedby": "direct-hint",
        }),
      { wrapper }
    );

    expect(result.current.id).toBe("context-id");
    expect(result.current["aria-invalid"]).toBe(true);
    expect(result.current["aria-describedby"]).toBe("direct-hint"); 
  });
});
