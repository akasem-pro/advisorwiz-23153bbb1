
import { toast as sonnerToast, type Toast } from "sonner";
import { ReactNode } from "react";

export type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  action?: ReactNode;
  duration?: number;
};

const useToast = () => {
  return {
    toast: ({ title, description, variant, action, duration, ...props }: ToastProps) => {
      // Map our variant to sonner's type
      const toastType = variant === "destructive" ? "error" : "default";
      
      return sonnerToast[toastType](title as string, {
        description,
        duration,
        action: action && typeof action === 'object' ? action : undefined,
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
