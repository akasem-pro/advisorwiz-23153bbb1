
import { toast as sonnerToast, ToastT, useToaster } from "sonner";

export type ToastProps = Omit<Parameters<typeof sonnerToast>[1], "close" | "position" | "cancel" | "promise"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
};

const useToast = () => {
  const { toasts, dismiss } = useToaster();
  return {
    toast: (props: ToastProps) => {
      const { title, description, variant, ...options } = props;
      return sonnerToast(title as string, {
        ...options,
        description
      });
    },
    toasts,
    dismiss
  };
};

export { useToast, sonnerToast as toast };
