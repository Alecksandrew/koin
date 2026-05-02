import { cva } from "class-variance-authority";

export const wrapperVariants = cva([
  "flex",
  "flex-col",
  "gap-1",
  "w-full"
]);

export const labelVariants = cva([
  "text-sm",
  "font-medium",
  "text-foreground",
]);

export const hintVariants = cva([
  "text-xs",
  "text-foreground/60",
]);

export const errorVariants = cva([
  "text-xs",
  "text-dangerous",
]);
