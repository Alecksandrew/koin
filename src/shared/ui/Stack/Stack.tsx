import { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import { StackVariants } from "./variants";
import { parseStackProps } from "./utils";

export type StackProps<T extends ElementType> = {
  children?: ReactNode;
  as?: T;
} & StackVariants
  & Omit<ComponentPropsWithoutRef<T>, "className">;

export const Stack = <T extends ElementType = "div">({
  as,
  children,
  direction,
  align,
  justify,
  wrap,
  gap,
  ...props
}: StackProps<T>) => {
  const Component = as || "div";
  const className = parseStackProps({ direction, align, justify, wrap, gap });

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};
