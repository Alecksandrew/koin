import { describe, it, expect } from "vitest";
import { parseResponsiveProp, parseStackProps } from "./utils";

//ALL THESE TESTS GONNA BE ADDED IN STORYBOOK SOON!!!!!!!
describe("Stack variants (Mapper Logic)", () => {
  describe("parseResponsiveProp", () => {
    it("returns empty string when prop is undefined", () => {
      expect(parseResponsiveProp(undefined, "gap-")).toBe("");
    });

    it("maps a primitive string value to the correct class", () => {
      expect(parseResponsiveProp("md", "gap-")).toBe("gap-md");
      expect(parseResponsiveProp("row", "flex-")).toBe("flex-row");
      expect(parseResponsiveProp("center", "items-")).toBe("items-center");
    });

    it("maps a responsive object with base key to an unprefixed class", () => {
      expect(parseResponsiveProp({ base: "col" }, "flex-")).toBe("flex-col");
    });

    it("maps a responsive object with breakpoint keys to prefixed classes", () => {
      expect(parseResponsiveProp({ sm: "md", lg: "xl" }, "gap-")).toBe("sm:gap-md lg:gap-xl");
    });

    it("maps a responsive object with both base and breakpoint keys", () => {
      const result = parseResponsiveProp({ base: "row", md: "col" }, "flex-");
      expect(result).toContain("flex-row");
      expect(result).toContain("md:flex-col");
    });
  });

  describe("parseStackProps", () => {
    it("always includes the base 'flex' class", () => {
      expect(parseStackProps({})).toBe("flex");
    });

    it("parses multiple layout properties correctly", () => {
      const result = parseStackProps({
        direction: "col",
        align: "center",
        justify: "between",
        wrap: "wrap",
        gap: "md",
      });

      expect(result).toBe("flex flex-col items-center justify-between flex-wrap gap-md");
    });

    it("parses multiple responsive objects correctly", () => {
      const result = parseStackProps({
        direction: { base: "col", md: "row" },
        gap: { xs: "sm", lg: "xl" },
      });

      expect(result).toContain("flex");
      expect(result).toContain("flex-col");
      expect(result).toContain("md:flex-row");
      expect(result).toContain("xs:gap-sm");
      expect(result).toContain("lg:gap-xl");
    });
  });
});
