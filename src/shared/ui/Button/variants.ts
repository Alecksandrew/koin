import { cva, type VariantProps } from "class-variance-authority";

export type ButtonVariant = VariantProps<typeof variants>;

export const variants = cva(
[
  "font-semibold",
  "rounded-md",
  "inline-flex",
  "items-center",
  "justify-center",
  "transition-colors",
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-blue-500",
  "disabled:opacity-50",
  "disabled:pointer-events-none",
],
{
variants: {
    variant: {
        primary: [
            "bg-primary",
            "text-primary-foreground",
            "hover:bg-primary-hover",
        ],
        secondary: [
            "bg-secondary",
            "text-secondary-foreground",
            "hover:bg-secondary-hover",
        ],
        dangerous: [
            "bg-dangerous",
            "hover:bg-dangerous-hover",
            "text-dangerous-foreground",
        ],
    },
    size: {
        sm: [
            "h-8",
            "px-3",
            "text-xs",
        ],
        medium: [
            "h-10",
            "px-4",
            "py-2",
            "text-sm",
        ],
        lg: [
            "h-12",
            "px-8",
            "text-base",
        ],
    },
},
defaultVariants: {
        variant: "primary",
        size: "medium",
    },
},
);