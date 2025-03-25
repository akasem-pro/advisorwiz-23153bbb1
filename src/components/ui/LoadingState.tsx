
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const loadingVariants = cva(
  "relative flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "text-primary",
        secondary: "text-secondary",
        ghost: "text-muted-foreground",
        destructive: "text-destructive",
      },
      size: {
        default: "h-10 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
        full: "w-full h-32",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const spinnerVariants = cva(
  "animate-spin rounded-full border-current",
  {
    variants: {
      size: {
        default: "h-5 w-5 border-2",
        sm: "h-4 w-4 border-2",
        lg: "h-6 w-6 border-3",
        icon: "h-4 w-4 border-2",
        full: "h-8 w-8 border-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface LoadingStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  label?: string;
  showSpinner?: boolean;
}

const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ className, variant, size, label = "Loading...", showSpinner = true, ...props }, ref) => {
    return (
      <div
        className={cn(loadingVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {showSpinner && (
          <div className={cn(spinnerVariants({ size }), "border-b-transparent mr-2")} />
        )}
        <span className="text-sm">{label}</span>
      </div>
    );
  }
);

LoadingState.displayName = "LoadingState";

export { LoadingState };
