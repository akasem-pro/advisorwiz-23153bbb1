
import { toast as sonnerToast, type ToastT } from "sonner";
import { ReactNode } from "react";

export type ToastProps = Omit<Parameters<typeof sonnerToast>[1], "close" | "position" | "cancel" | "promise"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  action?: ReactNode | (() => ReactNode);
};

const useToast = () => {
  return {
    toast: ({ title, description, variant, action, ...props }: ToastProps) => {
      return sonnerToast(title as string, {
        ...props,
        description,
        // Map our variant to sonner's type if needed
        variant: variant === "destructive" ? "error" : undefined,
        // Handle action properly
        action: action && typeof action === 'function' 
          ? { label: 'Action', onClick: () => {} } 
          : (typeof action === 'object' ? { label: 'Action', onClick: () => {} } : undefined)
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
