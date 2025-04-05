
import { toast as sonnerToast } from "sonner";
import { ReactNode } from "react";

export type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  action?: ReactNode;
  duration?: number;
  className?: string; // Add className support
};

const useToast = () => {
  return {
    toast: ({ title, description, variant, action, duration, className, ...props }: ToastProps) => {
      // Map our variant to sonner's type
      const toastType = variant === "destructive" ? "error" : "default";
      
      return sonnerToast[toastType](title as string, {
        description,
        duration,
        action: action && typeof action === 'object' ? action : undefined,
        className,
        ...props
      });
    },
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        sonnerToast.dismiss();
      }
    }
  };
};

export { useToast, sonnerToast as toast };
