import React, { ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";
import clsx from "clsx";

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "medium" | "sm" | "lg";
  boxShadow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      children,
      disabled,
      isLoading,
      boxShadow,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    const baseClasses =
      "font-semibold text-md rounded-lg inline-flex items-center justify-center  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";

    const variantStyles = {
      primary: "bg-primary text-secondary hover:bg-primary/90",
      secondary: "bg-secondary text-primary hover:bg-secondary/90",
      outline:
        "border-2 border-primary bg-transparent hover:bg-gray-100 text-primary",
    };

    const sizeStyles = {
      medium: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-8 text-base",
    };

    const Classes = clsx(
      baseClasses,
      variantStyles[variant],
      sizeStyles[size],
      boxShadow && "shadow-lg",
    );

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={Classes}
        {...props}
      >
        {isLoading ? (
          <LoaderCircle
            data-testid="button-spinner"
            className="h-4 w-4 animate-spin"
          />
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
