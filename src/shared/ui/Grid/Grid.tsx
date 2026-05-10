import { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import { GridVariants } from "./variants";
import { parseGridProps } from "./utils";

export type GridProps<T extends ElementType> = {
  children?: ReactNode;
  as?: T;
} & GridVariants
  & Omit<ComponentPropsWithoutRef<T>, "className">;

export const Grid = <T extends ElementType = "div">({
  as,
  children,
  cols,
  rows,
  gap,
  align,
  justify,
  ...props
}: GridProps<T>) => {
  const Component = as || "div";
  const className = parseGridProps({ cols, rows, gap, align, justify });

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};