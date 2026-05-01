import { cva, type VariantProps } from "class-variance-authority";

export type SurfaceVariant = VariantProps<typeof variants>;

export const variants = cva(
  [
    "rounded-md p-md",
  ],
  {
    variants: {
      variant: {
        default: [
            "bg-surface text-surface-foreground"
        ],
        primary: [
            "bg-primary text-primary-foreground"
        ],
      },
      boxShadow: {
        none: ["shadow-none"],
        xs: ["shadow-xs"],
        sm: ["shadow-sm"],
        md: ["shadow-md"],
        lg: ["shadow-lg"],
        xl: ["shadow-xl"],
      },
      
    },
    defaultVariants: {
      variant: "default",
      boxShadow: "none",
    },
  },
);
