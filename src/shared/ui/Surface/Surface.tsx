import {  HTMLAttributes, HTMLElementType, ReactNode } from "react";
import { SurfaceVariant, variants } from "./variants";

export interface SurfaceProps extends Omit<HTMLAttributes<HTMLElement>, "className">, SurfaceVariant {
  as: HTMLElementType;
  children?: ReactNode;
}

export function Surface({ as: HTMLTag, children, variant, boxShadow, hidden, ...props }: SurfaceProps) {
  const isEmpty =
    children === null || children === undefined || children === "";

  return (
    <HTMLTag className={variants({ variant, boxShadow })} {...props} hidden={hidden ?? isEmpty}>
      {children}
    </HTMLTag>
  );
}
