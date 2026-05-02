import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormField } from "./FormField";
import { Input } from "../Input";

describe("<FormField />", () => {
  describe("rendering", () => {
    it("renders the label with the provided text", () => {
      render(
        <FormField id="test" label="Test Label">
          <Input />
        </FormField>
      );
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("renders the children inside the component", () => {
      render(
        <FormField id="test" label="Test Label">
          <Input placeholder="Child Input" />
        </FormField>
      );
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders the hint text when hint prop is provided", () => {
      render(
        <FormField id="test" label="Test Label" hint="Test Hint">
          <Input />
        </FormField>
      );
      expect(screen.getByText("Test Hint")).toBeInTheDocument();
    });

    it("renders the error message with role alert when error prop is provided", () => {
      render(
        <FormField id="test" label="Test Label" error="Test Error">
          <Input />
        </FormField>
      );
      const errorElement = screen.getByRole("alert");
      expect(errorElement).toHaveTextContent("Test Error");
    });

    it("does not render the hint when hint prop is undefined", () => {
      render(
        <FormField id="test" label="Test Label">
          <Input />
        </FormField>
      );
      expect(screen.queryByText("Test Hint")).not.toBeInTheDocument();
    });

    it("does not render the error when error prop is undefined", () => {
      render(
        <FormField id="test" label="Test Label">
          <Input />
        </FormField>
      );
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("does not render the error when error prop is an empty string", () => {
      render(
        <FormField id="test" label="Test Label" error="">
          <Input />
        </FormField>
      );
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("connects the label to the input using htmlFor and the provided id prop", () => {
      render(
        <FormField id="test-name" label="Test Label">
          <Input />
        </FormField>
      );
      
      const input = screen.getByLabelText("Test Label");
      expect(input).toHaveAttribute("id", "test-name");
    });

    it("sets aria-invalid to true on the input when error is provided", () => {
      render(
        <FormField id="test" label="Test Label" error="Test Error">
          <Input />
        </FormField>
      );
      expect(screen.getByLabelText("Test Label")).toHaveAttribute("aria-invalid", "true");
    });

    it("sets aria-invalid to false on the input when no error is provided", () => {
      render(
        <FormField id="test" label="Test Label">
          <Input />
        </FormField>
      );
      expect(screen.getByLabelText("Test Label")).toHaveAttribute("aria-invalid", "false");
    });

    it("sets aria-describedby on the input pointing to the error id when error exists", () => {
      render(
        <FormField id="test" label="Test Label" error="Test Error">
          <Input />
        </FormField>
      );
      const input = screen.getByLabelText("Test Label");
      const errorElement = screen.getByRole("alert");
      
      expect(input).toHaveAttribute("aria-describedby", errorElement.id);
      expect(errorElement).toHaveAttribute("id", "test-error");
    });

    it("sets aria-describedby on the input pointing to the hint id when hint exists", () => {
      render(
        <FormField id="test" label="Test Label" hint="Test Hint">
          <Input />
        </FormField>
      );
      const input = screen.getByLabelText("Test Label");
      const hintElement = screen.getByText("Test Hint");
      
      expect(input).toHaveAttribute("aria-describedby", hintElement.id);
      expect(hintElement).toHaveAttribute("id", "test-hint");
    });

    it("sets aria-describedby combining error and hint ids when both exist", () => {
      render(
        <FormField id="test" label="Test Label" hint="Test Hint" error="Test Error">
          <Input />
        </FormField>
      );
      const input = screen.getByLabelText("Test Label");
      
      expect(input).toHaveAttribute("aria-describedby", "test-error test-hint");
    });
  });
});
