import React, { ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";
import { ButtonVariant, variants } from "./variants";

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariant,
  "className"
> {
  isLoading?: boolean;
  boxShadow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      children,
      disabled,
      isLoading,
      boxShadow,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={variants({ variant, size })}
        {...props}
      >
        {isLoading && (
          <LoaderCircle
            data-testid="button-spinner"
            className="h-4 w-4 animate-spin absolute"
          />
        )}
        <span className={`${isLoading && "opacity-0"}`} aria-hidden={isLoading}>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
