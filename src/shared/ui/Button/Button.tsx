import React, { ButtonHTMLAttributes } from 'react';
import { LoaderCircle } from 'lucide-react';
import clsx from 'clsx';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, disabled, isLoading, ...props }, ref) => {
    const isDisabled = disabled || isLoading;
    
    const baseClasses =
      'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2';

    const variantClasses = clsx({
      'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
      'bg-gray-600 text-white hover:bg-gray-700': variant === 'secondary',
      'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-900': variant === 'outline',
    });

    const Classes = clsx(baseClasses, variantClasses);

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={Classes}
        {...props}
      >
        {isLoading ? (
          <LoaderCircle data-testid="button-spinner" className="h-4 w-4 animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
