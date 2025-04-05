
import { toast as sonnerToast, type ToastT } from "sonner";
import { ReactNode } from "react";

export type ToastProps = Omit<Parameters<typeof sonnerToast>[1], "close" | "position" | "cancel" | "promise"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  action?: ReactNode;
};

const useToast = () => {
  return {
    toast: ({ title, description, variant, action, ...props }: ToastProps) => {
      // Map our variant to sonner's type if needed
      const toastType = variant === "destructive" ? "error" : "default";
      
      return sonnerToast[toastType](title as string, {
        ...props,
        description,
        // We're not setting variant anymore since it doesn't exist in ExternalToast
        // Instead we're using the appropriate toast method (error or default)
        action: action && typeof action === 'object' ? action : undefined
      });
    },
    // Since useToaster isn't available, we'll handle toasts and dismiss differently
    toasts: [] as ToastT[],
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
