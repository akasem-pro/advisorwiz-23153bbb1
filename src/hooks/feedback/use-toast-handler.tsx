
import { useCallback } from "react";
import { toast } from "sonner";

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
    
    toast[toastType]?.(feedbackItem.description, {
      id: feedbackItem.id,
      title: feedbackItem.title,
      duration: options.duration || 5000,
      action: options.action,
      onDismiss: onClose
    });
  }, []);
  
  /**
   * Show a success toast notification
   */
  const showSuccess = useCallback((message: string, options?: ToastOptions) => {
    toast.success(message, {
      title: options?.title || "Success",
      duration: options?.duration || 5000,
      action: options?.action
    });
  }, []);
  
  /**
   * Show an error toast notification
   */
  const showError = useCallback((message: string, options?: ToastOptions) => {
    toast.error(message, {
      title: options?.title || "Error",
      duration: options?.duration || 7000,
      action: options?.action
    });
  }, []);
  
  /**
   * Show a warning toast notification
   */
  const showWarning = useCallback((message: string, options?: ToastOptions) => {
    toast.warning(message, {
      title: options?.title || "Warning",
      duration: options?.duration || 5000,
      action: options?.action
    });
  }, []);
  
  /**
   * Show an info toast notification
   */
  const showInfo = useCallback((message: string, options?: ToastOptions) => {
    toast.info(message, {
      title: options?.title || "Information",
      duration: options?.duration || 5000,
      action: options?.action
    });
  }, []);
  
  /**
   * Show a toast with a custom title and settings
   */
  const showCustomToast = useCallback((
    type: ToastType,
    message: string,
    options?: ToastOptions
  ) => {
    if (type === 'success') {
      showSuccess(message, options);
    } else if (type === 'error') {
      showError(message, options);
    } else if (type === 'warning') {
      showWarning(message, options);
    } else {
      showInfo(message, options);
    }
  }, [showSuccess, showError, showWarning, showInfo]);
  
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
        onClick={(e) => {
          e.preventDefault();
          onAction();
        }}
        className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
      >
        {actionLabel}
      </button>
    );
    
    toast(message, {
      title: options?.title,
      duration: options?.duration || 10000, // Longer duration for action toasts
      action: actionButton
    });
  }, []);
  
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
