
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { useEffect, useState } from "react";

// Define a toast item type
type ToastItem = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  [key: string]: any;
};

export function Toaster() {
  // Using local state to track toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Listen to sonner toast events
  useEffect(() => {
    const handleToastAdd = (event: any) => {
      const toast = event.detail;
      const newToast: ToastItem = {
        id: toast.id,
        title: toast.title,
        description: toast.description,
        action: toast.action,
        variant: toast.type === "error" ? "destructive" : "default",
      };
      setToasts(prev => [...prev, newToast]);
    };

    const handleToastDismiss = (event: any) => {
      const id = event.detail;
      setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    // Add event listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('sonner-toast-add', handleToastAdd as EventListener);
      window.addEventListener('sonner-toast-dismiss', handleToastDismiss as EventListener);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('sonner-toast-add', handleToastAdd as EventListener);
        window.removeEventListener('sonner-toast-dismiss', handleToastDismiss as EventListener);
      }
    };
  }, []);

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => {
        // Remove incompatible props
        const { type, icon, jsx, richColors, invert, ...compatibleProps } = props;
        
        return (
          <Toast key={id} {...compatibleProps} variant={variant}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action && (
              typeof action === 'object' && action !== null
                ? <div>{action as React.ReactNode}</div>
                : null
            )}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
