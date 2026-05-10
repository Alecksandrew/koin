import { describe, it, expect } from "vitest";
import { parseGridProps, parseResponsiveProp } from "./utils";
import { GridVariants } from "./variants";

describe("parseGridProps", () => {

  describe("parseGridProps", () => {
    it("parses scalar values correctly", () => {

      const gridPropsObject: GridVariants = {
        cols: 3,
        gap: "md",
        rows: 4,
        align: "center",
        justify: "between"
      }
      const result = parseGridProps(gridPropsObject);

      //cols
      expect(result).toContain("grid-cols-3");
      //gap
      expect(result).toContain("gap-md");
      //rows
      expect(result).toContain("grid-rows-4");
      //align
      expect(result).toContain("items-center");
      //justify
      expect(result).toContain("justify-between");
    });

    it("parses responsive object values correctly", () => {

      const gridPropsObject: GridVariants = {
        rows: { base: 2, md: 4 },
        cols: { base: 1, md: 3 },
        gap: { base: "sm", lg: "lg" },
        align: { base: "center", lg: "start" },
        justify: { base: "center", lg: "end" }
      }

      const result = parseGridProps(gridPropsObject);

      //cols
      expect(result).toContain("grid-cols-1");
      expect(result).toContain("md:grid-cols-3");
      //gap
      expect(result).toContain("gap-sm");
      expect(result).toContain("lg:gap-lg");
      //align
      expect(result).toContain("items-center");
      expect(result).toContain("lg:items-start");
      //justify
      expect(result).toContain("justify-center");
      expect(result).toContain("lg:justify-end");
      //rows
      expect(result).toContain("grid-rows-2");
      expect(result).toContain("md:grid-rows-4");

    });

    it("falls back correctly on empty objects", () => {
      const result = parseGridProps({});

      expect(result).toBe("grid");
    });
  })

  describe("parseResponsiveProp", () => {
    it("parses scalar values correctly", () => {

      const result = parseResponsiveProp(4, "grid-cols-");

      expect(result).toBe("grid-cols-4");
    })

    it("parse responsive object values correctly", () => {
      const result = parseResponsiveProp({ base: 4, xs: 2, sm: 3, md: 2, lg: 5, xl: 1 }, "grid-cols-");

      expect(result).toBe("grid-cols-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-1");
    })

    it("falls back correctly on empty objects", () => {
      const result = parseResponsiveProp({}, "grid-cols-");

      expect(result).toBe("");
    })
  })
});
