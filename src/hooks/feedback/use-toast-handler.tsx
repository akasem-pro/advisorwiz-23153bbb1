
import { useCallback } from "react";
import { toast } from "sonner";

// Define the toast types
type ToastType = 'success' | 'error' | 'warning' | 'info';

// Define the options type
interface ToastOptions {
  description?: string;
  duration?: number;
  action?: React.ReactNode;
  onDismiss?: () => void;
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
    
    // For Sonner, the first argument is the message (title)
    // and options are passed as the second argument
    toast[toastType]?.(feedbackItem.title || '', {
      description: feedbackItem.description,
      id: feedbackItem.id,
      duration: options.duration || 5000,
      action: options.action,
      onDismiss: onClose
    });
  }, []);
  
  /**
   * Show a success toast notification
   */
  const showSuccess = useCallback((message: string, options?: ToastOptions) => {
    // For Sonner, use message as first arg (title), and pass other options
    toast.success(options?.description || message, {
      duration: options?.duration || 5000,
      action: options?.action,
      onDismiss: options?.onDismiss
    });
  }, []);
  
  /**
   * Show an error toast notification
   */
  const showError = useCallback((message: string, options?: ToastOptions) => {
    // For Sonner, use message as first arg (title), and pass other options
    toast.error(options?.description || message, {
      duration: options?.duration || 7000,
      action: options?.action,
      onDismiss: options?.onDismiss
    });
  }, []);
  
  /**
   * Show a warning toast notification
   */
  const showWarning = useCallback((message: string, options?: ToastOptions) => {
    // For Sonner, use message as first arg (title), and pass other options
    toast.warning(options?.description || message, {
      duration: options?.duration || 5000,
      action: options?.action,
      onDismiss: options?.onDismiss
    });
  }, []);
  
  /**
   * Show an info toast notification
   */
  const showInfo = useCallback((message: string, options?: ToastOptions) => {
    // For Sonner, use message as first arg (title), and pass other options
    toast.info(options?.description || message, {
      duration: options?.duration || 5000,
      action: options?.action,
      onDismiss: options?.onDismiss
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
    
    // For Sonner, use message as first arg, and pass options
    toast(message, {
      description: options?.description,
      duration: options?.duration || 10000, // Longer duration for action toasts
      action: actionButton,
      onDismiss: options?.onDismiss
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
