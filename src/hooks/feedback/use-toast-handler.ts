
import { useToast } from "../use-toast";
import { useCallback } from "react";

// Define the toast types
type ToastType = 'success' | 'error' | 'warning' | 'info';

// Define the options type
interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: React.ReactNode;
}

/**
 * Hook for handling toast notifications with standardized appearance
 */
export const useToastHandler = () => {
  const { toast } = useToast();
  
  /**
   * Show a toast notification with configured appearance based on feed item
   */
  const showToastNotification = useCallback((
    feedbackItem: any, 
    options: any, 
    onClose?: () => void
  ) => {
    // Map our variant to sonner's type
    const toastType = feedbackItem.variant === 'error' ? 'error' : 
                      feedbackItem.variant === 'warning' ? 'warning' : 
                      feedbackItem.variant === 'success' ? 'success' : 'default';
    
    toast({
      title: feedbackItem.title,
      description: feedbackItem.description,
      variant: feedbackItem.variant === 'error' ? 'destructive' : 'default',
      duration: options.duration || 5000,
      action: options.action
    });
  }, [toast]);
  
  /**
   * Show a success toast notification
   */
  const showSuccess = useCallback((message: string, options?: ToastOptions) => {
    toast({
      title: options?.title || "Success",
      description: message,
      variant: "default",
      duration: options?.duration || 5000,
      action: options?.action
    });
  }, [toast]);
  
  /**
   * Show an error toast notification
   */
  const showError = useCallback((message: string, options?: ToastOptions) => {
    toast({
      title: options?.title || "Error",
      description: message,
      variant: "destructive",
      duration: options?.duration || 7000,
      action: options?.action
    });
  }, [toast]);
  
  /**
   * Show a warning toast notification
   */
  const showWarning = useCallback((message: string, options?: ToastOptions) => {
    toast({
      title: options?.title || "Warning",
      description: message,
      variant: "default",
      duration: options?.duration || 5000,
      action: options?.action
    });
  }, [toast]);
  
  /**
   * Show an info toast notification
   */
  const showInfo = useCallback((message: string, options?: ToastOptions) => {
    toast({
      title: options?.title || "Information",
      description: message,
      variant: "default",
      duration: options?.duration || 5000,
      action: options?.action
    });
  }, [toast]);
  
  /**
   * Show a toast with a custom title and settings
   */
  const showCustomToast = useCallback((
    type: ToastType,
    message: string,
    options?: ToastOptions
  ) => {
    const variant = type === 'error' ? "destructive" : "default";
    
    toast({
      title: options?.title || type.charAt(0).toUpperCase() + type.slice(1),
      description: message,
      variant,
      duration: options?.duration || (type === 'error' ? 7000 : 5000),
      action: options?.action
    });
  }, [toast]);
  
  /**
   * Show a toast with an action button
   */
  const showActionToast = useCallback((
    message: string,
    actionLabel: string,
    onAction: () => void,
    options?: ToastOptions
  ) => {
    const actionButton = (
      <button 
        onClick={onAction}
        className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
      >
        {actionLabel}
      </button>
    );
    
    toast({
      title: options?.title,
      description: message,
      variant: "default",
      duration: options?.duration || 10000, // Longer duration for action toasts
      action: actionButton
    });
  }, [toast]);
  
  return {
    showToastNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showCustomToast,
    showActionToast
  };
};
