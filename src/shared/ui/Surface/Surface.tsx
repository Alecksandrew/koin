import { ElementType, HTMLAttributes, ReactNode } from "react";
import { SurfaceVariant, variants } from "./variants";

export interface SurfaceProps extends Omit<HTMLAttributes<HTMLElement>, "className">, SurfaceVariant {
  as: ElementType;
  children?: ReactNode;
}

export function Surface({ as: HTMLTag, children, variant, boxShadow, ...props }: SurfaceProps) {
  const isEmpty =
    children === null || children === undefined || children === "";

  return (
    <HTMLTag className={variants({ variant, boxShadow })} {...props} hidden={isEmpty}>
      {children}
    </HTMLTag>
  );
}
