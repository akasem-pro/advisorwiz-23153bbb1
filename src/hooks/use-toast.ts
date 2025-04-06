
import { toast as sonnerToast } from "sonner";
import { ReactNode } from "react";

export type ToastProps = {
  title?: string;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  action?: ReactNode;
  duration?: number;
  className?: string;
};

// Define toast function type that accepts either an object or a string + object
export interface ToastFunction {
  (props: ToastProps): void;
  (title: string, props?: Omit<ToastProps, "title">): void;
}

// Custom hook for toast functionality
export const useToast = () => {
  // Unified toast function that handles both calling patterns
  const toast = ((titleOrProps: string | ToastProps, options?: Omit<ToastProps, "title">) => {
    // If first argument is a string, use it as title and second argument as options
    if (typeof titleOrProps === 'string') {
      const title = titleOrProps;
      const { description, variant, action, duration, className, ...rest } = options || {};
      
      // Map our variant to sonner's type
      const toastType = variant === "destructive" ? "error" : "default";
      
      if (toastType === "default") {
        return sonnerToast(title, {
          description,
          duration,
          action: action && typeof action === 'object' ? action : undefined,
          className,
          ...rest
        });
      } else {
        return sonnerToast.error(title, {
          description,
          duration,
          action: action && typeof action === 'object' ? action : undefined,
          className,
          ...rest
        });
      }
    } 
    // If first argument is an object, extract title and use rest as options
    else {
      const { title, description, variant, action, duration, className, ...rest } = titleOrProps;
      
      // Map our variant to sonner's type
      const toastType = variant === "destructive" ? "error" : "default";
      
      if (toastType === "default") {
        return sonnerToast(title || "", {
          description,
          duration,
          action: action && typeof action === 'object' ? action : undefined,
          className,
          ...rest
        });
      } else {
        return sonnerToast.error(title || "", {
          description,
          duration,
          action: action && typeof action === 'object' ? action : undefined,
          className,
          ...rest
        });
      }
    }
  }) as ToastFunction;

  const dismiss = (toastId?: string) => {
    if (toastId) {
      sonnerToast.dismiss(toastId);
    } else {
      sonnerToast.dismiss();
    }
  };

  return {
    toast,
    dismiss
  };
};

export { sonnerToast as toast };
