
import { toast } from "sonner";

type ToastProps = {
  title?: string;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  action?: React.ReactNode;
  duration?: number;
};

export function useToast() {
  function showToast(props: ToastProps): void;
  function showToast(title: string, props?: Omit<ToastProps, "title">): void;
  function showToast(titleOrProps: string | ToastProps, options?: Omit<ToastProps, "title">) {
    if (typeof titleOrProps === 'string') {
      const title = titleOrProps;
      const { description, variant, action, duration, ...rest } = options || {};
      
      if (variant === "destructive") {
        toast.error(title, { description, duration, action });
      } else {
        toast(title, { description, duration, action });
      }
    } else {
      const { title, description, variant, action, duration, ...rest } = titleOrProps;
      
      if (variant === "destructive") {
        toast.error(title || "", { description, duration, action });
      } else {
        toast(title || "", { description, duration, action });
      }
    }
  }

  return {
    toast: showToast
  };
}

export { toast };
