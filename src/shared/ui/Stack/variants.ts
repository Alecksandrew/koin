export type Breakpoint = "base" | "xs" | "sm" | "md" | "lg" | "xl";

export type ResponsiveProp<T> = T | Partial<Record<Breakpoint, T>>;

export type SpacingToken = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type DirectionToken = "row" | "col" | "row-reverse" | "col-reverse";
export type AlignToken = "start" | "center" | "end" | "baseline" | "stretch";
export type JustifyToken = "normal" | "start" | "center" | "end" | "between" | "around" | "evenly";
export type WrapToken = "wrap" | "nowrap" | "wrap-reverse";

export interface StackVariants {
  direction?: ResponsiveProp<DirectionToken>;
  align?: ResponsiveProp<AlignToken>;
  justify?: ResponsiveProp<JustifyToken>;
  wrap?: ResponsiveProp<WrapToken>;
  gap?: ResponsiveProp<SpacingToken>;
}

