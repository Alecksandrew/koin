import { cva, type VariantProps } from "class-variance-authority";

export type InputVariant = VariantProps<typeof variants>;

export const variants = cva(
  [
    "w-full",
    "bg-interactive",
    "outline-2",
    "outline-transparent",
    "focus:outline-interactive-focus",
    "rounded-lg",
    "p-2",
    "aria-invalid:outline-dangerous",
    "aria-invalid:text-dangerous",
  ],
  {
    variants: {
      inputSize: {
        sm: ["h-8", "text-xs"],
        medium: ["h-10", "text-sm"],
        lg: ["h-12", "text-base"],
      },
    },
    defaultVariants: {
      inputSize: "medium",
    },
  },
);
