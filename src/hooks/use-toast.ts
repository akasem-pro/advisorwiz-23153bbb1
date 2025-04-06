
import { toast as sonnerToast, ToastT } from "sonner";
import { ReactNode } from "react";

export type ToastProps = {
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  action?: ReactNode;
  duration?: number;
  className?: string;
};

const useToast = () => {
  return {
    toast: (title: string, { description, variant, action, duration, className, ...props }: ToastProps = {}) => {
      // Map our variant to sonner's type
      const toastType = variant === "destructive" ? "error" : "default";
      
      if (toastType === "default") {
        return sonnerToast(title, {
          description,
          duration,
          action: action && typeof action === 'object' ? action : undefined,
          className,
          ...props
        });
      } else {
        return sonnerToast.error(title, {
          description,
          duration,
          action: action && typeof action === 'object' ? action : undefined,
          className,
          ...props
        });
      }
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
