
import { toast as sonnerToast, type ToastT } from "sonner";

export type ToastProps = Omit<Parameters<typeof sonnerToast>[1], "close" | "position" | "cancel" | "promise"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
};

const useToast = () => {
  return {
    toast: ({ title, description, variant, ...props }: ToastProps) => {
      return sonnerToast(title as string, {
        ...props,
        description
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
