
import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from './use-toast';
import { useFeedback } from '../context/FeedbackContext';
import { ErrorSeverity, ErrorCategory } from '../utils/errorHandling/errorHandler';
import { flushErrorLogs } from '../utils/errorHandling';
import { toast as sonnerToast } from 'sonner';

type FeedbackVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';

interface FeedbackItem {
  id: string;
  title?: string;
  description: string;
  variant: FeedbackVariant;
  timestamp: number;
  dismissable?: boolean;
  autoExpire?: boolean;
  expiryMs?: number;
  source?: string;
  errorDetails?: any;
  icon?: React.ReactNode;
}

interface EnhancedFeedbackOptions {
  title?: string;
  description?: string;
  variant?: FeedbackVariant;
  duration?: number;
  dismissable?: boolean;
  autoExpire?: boolean;
  icon?: React.ReactNode;
  errorDetails?: any;
  errorCategory?: ErrorCategory;
  errorSeverity?: ErrorSeverity;
  source?: string;
  persist?: boolean;
  groupSimilar?: boolean;
  action?: React.ReactNode;
  position?: 'top' | 'bottom' | 'inline';
}

/**
 * Enhanced feedback system with error grouping, history, and persistence
 */
export const useEnhancedFeedback = () => {
  const { toast } = useToast();
  const { isFeedbackEnabled } = useFeedback();
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackItem[]>([]);
  const [inlineFeedback, setInlineFeedback] = useState<FeedbackItem | null>(null);
  const activeToastsRef = useRef<Set<string>>(new Set());
  
  // Clean up expired feedback items
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setFeedbackHistory(prev => 
        prev.filter(item => 
          !item.autoExpire || 
          now - item.timestamp < (item.expiryMs || 5000)
        )
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Helper to generate unique ID
  const generateId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }, []);
  
  // Check if a similar feedback message is already active
  const isSimilarMessageActive = useCallback((description: string, variant: FeedbackVariant): boolean => {
    for (const item of feedbackHistory) {
      // Check if it's a similar message (same variant and similar description)
      if (
        item.variant === variant && 
        (
          item.description === description ||
          (item.description.length > 10 && description.length > 10 && 
           (item.description.includes(description) || description.includes(item.description)))
        )
      ) {
        return true;
      }
    }
    return false;
  }, [feedbackHistory]);
  
  // Add feedback to history
  const addToHistory = useCallback((feedbackItem: FeedbackItem) => {
    setFeedbackHistory(prev => [feedbackItem, ...prev].slice(0, 100)); // Limit history
  }, []);

  // Show a toast notification with enhanced features
  const showEnhancedToast = useCallback((options: EnhancedFeedbackOptions) => {
    if (!isFeedbackEnabled) return { id: '', dismiss: () => {} };
    
    const variant = options.variant || 'info';
    const description = options.description || '';
    
    // Skip if too similar to recent message and grouping is enabled
    if (options.groupSimilar && isSimilarMessageActive(description, variant)) {
      return { id: '', dismiss: () => {} };
    }
    
    // Create feedback item
    const id = generateId();
    const feedbackItem: FeedbackItem = {
      id,
      title: options.title,
      description,
      variant,
      timestamp: Date.now(),
      dismissable: options.dismissable !== false,
      autoExpire: options.autoExpire !== false,
      expiryMs: options.duration,
      source: options.source || 'user',
      errorDetails: options.errorDetails,
      icon: options.icon
    };
    
    // Add to history
    addToHistory(feedbackItem);
    
    // Track active toast
    activeToastsRef.current.add(id);
    
    // Show toast notification
    if (options.position === 'inline') {
      setInlineFeedback(feedbackItem);
    } else {
      // Use appropriate toast style based on variant
      const toastVariant = variant === 'error' ? 'destructive' : 'default';
      
      // For errors, also log to error handler
      if (variant === 'error' && options.errorDetails) {
        const severity = options.errorSeverity || ErrorSeverity.MEDIUM;
        const category = options.errorCategory || ErrorCategory.UNKNOWN;
        
        // Log to error system async
        import('../utils/errorHandling/errorHandler').then(({ createError, handleError }) => {
          handleError(
            createError(
              description,
              category,
              severity,
              options.errorDetails
            ),
            false // Don't show another toast since we're already showing one
          );
        });
      }
      
      // Use Shadcn toast or Sonner based on preference (Sonner supports more features)
      const useEnhancedToast = true; // Can be a setting
      
      if (useEnhancedToast) {
        sonnerToast[variant === 'error' ? 'error' : 
                   variant === 'success' ? 'success' : 
                   variant === 'warning' ? 'warning' : 
                   variant === 'loading' ? 'loading' : 'info'](
          options.title || '',
          {
            description,
            duration: options.duration || 5000,
            action: options.action,
            onDismiss: () => {
              activeToastsRef.current.delete(id);
            }
          }
        );
      } else {
        toast({
          title: options.title,
          description,
          variant: toastVariant,
          duration: options.duration || 5000,
          action: options.action,
        });
      }
    }
    
    // Return ID so caller can dismiss if needed
    return { 
      id, 
      dismiss: () => {
        dismissFeedback(id);
      }
    };
  }, [toast, isFeedbackEnabled, generateId, addToHistory, isSimilarMessageActive]);
  
  // Dismiss feedback by ID
  const dismissFeedback = useCallback((id: string) => {
    // Remove from active toasts
    activeToastsRef.current.delete(id);
    
    // Update inline feedback
    setInlineFeedback(prev => prev && prev.id === id ? null : prev);
    
    // Mark as dismissed in history (we don't remove it)
    setFeedbackHistory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, autoExpire: true, expiryMs: 0 } : item
      )
    );
  }, []);
  
  // Clear all feedback
  const clearAllFeedback = useCallback(() => {
    setInlineFeedback(null);
    activeToastsRef.current.clear();
    
    // We don't clear history, just mark everything as expired
    setFeedbackHistory(prev => 
      prev.map(item => ({ ...item, autoExpire: true, expiryMs: 0 }))
    );
    
    // Also clear all existing toasts
    sonnerToast.dismiss();
  }, []);
  
  // Convenience methods for different feedback types
  const showSuccess = useCallback((description: string, title?: string, options?: Partial<EnhancedFeedbackOptions>) => {
    return showEnhancedToast({
      title: title || 'Success',
      description,
      variant: 'success',
      duration: 5000,
      ...(options || {})
    });
  }, [showEnhancedToast]);
  
  const showError = useCallback((description: string, title?: string, options?: Partial<EnhancedFeedbackOptions>) => {
    return showEnhancedToast({
      title: title || 'Error',
      description,
      variant: 'error',
      duration: 7000, // Errors stay longer
      ...(options || {})
    });
  }, [showEnhancedToast]);
  
  const showWarning = useCallback((description: string, title?: string, options?: Partial<EnhancedFeedbackOptions>) => {
    return showEnhancedToast({
      title: title || 'Warning',
      description,
      variant: 'warning',
      duration: 6000,
      ...(options || {})
    });
  }, [showEnhancedToast]);
  
  const showInfo = useCallback((description: string, title?: string, options?: Partial<EnhancedFeedbackOptions>) => {
    return showEnhancedToast({
      title: title || 'Information',
      description,
      variant: 'info',
      duration: 5000,
      ...(options || {})
    });
  }, [showEnhancedToast]);
  
  const showLoading = useCallback((description: string, title?: string, options?: Partial<EnhancedFeedbackOptions>) => {
    return showEnhancedToast({
      title: title || 'Loading',
      description,
      variant: 'loading',
      duration: 30000, // Loading states can stay longer
      autoExpire: false, // Usually we want to control when to dismiss
      ...(options || {})
    });
  }, [showEnhancedToast]);
  
  // Show inline feedback
  const showInlineFeedback = useCallback((options: EnhancedFeedbackOptions) => {
    return showEnhancedToast({
      ...options,
      position: 'inline'
    });
  }, [showEnhancedToast]);
  
  // Clear inline feedback
  const clearInlineFeedback = useCallback(() => {
    setInlineFeedback(null);
  }, []);
  
  // Flush any pending error logs on severe errors
  useEffect(() => {
    const severeFeedback = feedbackHistory.find(
      item => item.variant === 'error' && 
      item.errorDetails?.severity === ErrorSeverity.HIGH || 
      item.errorDetails?.severity === ErrorSeverity.FATAL
    );
    
    if (severeFeedback) {
      flushErrorLogs();
    }
  }, [feedbackHistory]);
  
  return {
    // Core methods
    showEnhancedToast,
    dismissFeedback,
    clearAllFeedback,
    
    // Convenience methods
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    
    // Inline feedback
    showInlineFeedback,
    clearInlineFeedback,
    inlineFeedback,
    
    // History access
    feedbackHistory,
  };
};

// Export the hook
export default useEnhancedFeedback;
