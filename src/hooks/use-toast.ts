
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

interface Toast {
  (props: ToastProps): void;
  (title: string, props?: ToastProps): void;
}

// Define a custom toast function type that accepts either an object or a string + object
const useToast = () => {
  const toast: Toast = (titleOrProps: string | ToastProps, props?: ToastProps) => {
    // If first argument is a string, use it as title and second argument as props
    if (typeof titleOrProps === 'string') {
      const title = titleOrProps;
      const { description, variant, action, duration, className, ...rest } = props || {};
      
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
    // If first argument is an object, extract title and use rest as props
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
  };

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

export { useToast, sonnerToast as toast };
