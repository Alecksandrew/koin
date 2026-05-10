export const BREAKPOINTS = ["base", "xs", "sm", "md", "lg", "xl"] as const;
export const SPACING_TOKENS = ["none", "xs", "sm", "md", "lg", "xl"] as const;
export const COLS_TOKENS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  "none",
] as const;
export const ROWS_TOKENS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  "none",
] as const;
export const ALIGN_TOKENS = [
  "start",
  "center",
  "end",
  "baseline",
  "stretch",
] as const;
export const JUSTIFY_TOKENS = [
  "normal",
  "start",
  "center",
  "end",
  "between",
  "around",
  "evenly",
] as const;

export type Breakpoint = (typeof BREAKPOINTS)[number];

type BreakpointValues<T> = Record<Breakpoint, T>;

export type ResponsiveProp<T> =
  | T
  | ({ base: T } & Partial<BreakpointValues<T>>);

export type SpacingToken = (typeof SPACING_TOKENS)[number];
export type ColsToken = (typeof COLS_TOKENS)[number];
export type RowsToken = (typeof ROWS_TOKENS)[number];
export type AlignToken = (typeof ALIGN_TOKENS)[number];
export type JustifyToken = (typeof JUSTIFY_TOKENS)[number];

export interface GridVariants {
  cols?: ResponsiveProp<ColsToken>;
  rows?: ResponsiveProp<RowsToken>;
  gap?: ResponsiveProp<SpacingToken>;
  align?: ResponsiveProp<AlignToken>;
  justify?: ResponsiveProp<JustifyToken>;
}
