
import { useState, useCallback } from 'react';
import { useToast } from './use-toast';
import { useFeedback } from '../context/FeedbackContext';

type FeedbackType = 'success' | 'error' | 'warning' | 'info';

interface FeedbackOptions {
  title?: string;
  description: string;
  duration?: number;
  action?: React.ReactNode;
  variant?: FeedbackType;
  // For in-page feedback
  dismissable?: boolean;
  position?: 'top' | 'bottom' | 'inline';
  icon?: React.ReactNode;
  autoDisappear?: boolean;
}

export const useFeedbackSystem = () => {
  const { toast } = useToast();
  const { isFeedbackEnabled } = useFeedback();
  const [inlineFeedback, setInlineFeedback] = useState<FeedbackOptions | null>(null);
  
  // Show a toast notification
  const showToast = useCallback((options: FeedbackOptions) => {
    if (!isFeedbackEnabled) return;
    
    // Map variant to the toast variant
    const variant = options.variant === 'error' ? 'destructive' : 'default';
    
    toast({
      title: options.title || "",
      description: options.description,
      duration: options.duration || 5000,
      action: options.action,
      variant
    });
  }, [toast, isFeedbackEnabled]);
  
  // Success feedback
  const showSuccess = useCallback((description: string, title?: string, options?: Partial<FeedbackOptions>) => {
    showToast({
      title: title || 'Success',
      description,
      variant: 'success',
      ...(options || {})
    });
  }, [showToast]);
  
  // Error feedback
  const showError = useCallback((description: string, title?: string, options?: Partial<FeedbackOptions>) => {
    showToast({
      title: title || 'Error',
      description,
      variant: 'error',
      duration: 7000, // Errors stay longer
      ...(options || {})
    });
  }, [showToast]);
  
  // Warning feedback
  const showWarning = useCallback((description: string, title?: string, options?: Partial<FeedbackOptions>) => {
    showToast({
      title: title || 'Warning',
      description,
      variant: 'warning',
      ...(options || {})
    });
  }, [showToast]);
  
  // Info feedback
  const showInfo = useCallback((description: string, title?: string, options?: Partial<FeedbackOptions>) => {
    showToast({
      title: title || 'Information',
      description,
      variant: 'info',
      ...(options || {})
    });
  }, [showToast]);
  
  // Show inline feedback in the page
  const showInlineFeedback = useCallback((options: FeedbackOptions) => {
    if (!isFeedbackEnabled) return;
    setInlineFeedback(options);
  }, [isFeedbackEnabled]);
  
  // Clear inline feedback
  const clearInlineFeedback = useCallback(() => {
    setInlineFeedback(null);
  }, []);
  
  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showInlineFeedback,
    clearInlineFeedback,
    inlineFeedback
  };
};
