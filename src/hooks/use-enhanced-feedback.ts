import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from './use-toast';
import { toast as sonnerToast } from 'sonner';
import { useFeedback } from '../context/FeedbackContext';
import { ErrorSeverity, ErrorCategory } from '../utils/errorHandling/errorHandler';
import { flushErrorLogs } from '../utils/errorHandling';
import { type ToastActionElement } from '../components/ui/toast';

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
  action?: ToastActionElement;
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
  
  const generateId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }, []);
  
  const isSimilarMessageActive = useCallback((description: string, variant: FeedbackVariant): boolean => {
    for (const item of feedbackHistory) {
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
  
  const addToHistory = useCallback((feedbackItem: FeedbackItem) => {
    setFeedbackHistory(prev => [feedbackItem, ...prev].slice(0, 100)); // Limit history
  }, []);

  const showEnhancedToast = useCallback((options: EnhancedFeedbackOptions) => {
    if (!isFeedbackEnabled) return { id: '', dismiss: () => {} };
    
    const variant = options.variant || 'info';
    const description = options.description || '';
    
    if (options.groupSimilar && isSimilarMessageActive(description, variant)) {
      return { id: '', dismiss: () => {} };
    }
    
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
    
    addToHistory(feedbackItem);
    
    activeToastsRef.current.add(id);
    
    if (options.position === 'inline') {
      setInlineFeedback(feedbackItem);
    } else {
      const toastVariant = variant === 'error' ? 'destructive' : 'default';
      
      if (variant === 'error' && options.errorDetails) {
        const severity = options.errorSeverity || ErrorSeverity.MEDIUM;
        const category = options.errorCategory || ErrorCategory.UNKNOWN;
        
        import('../utils/errorHandling/errorHandler').then(({ createError, handleError }) => {
          handleError(
            createError(
              description,
              category,
              severity,
              options.errorDetails
            ),
            false
          );
        });
      }
      
      const useEnhancedToast = true;
      
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
    
    return { 
      id, 
      dismiss: () => {
        dismissFeedback(id);
      }
    };
  }, [toast, isFeedbackEnabled, generateId, addToHistory, isSimilarMessageActive]);
  
  const dismissFeedback = useCallback((id: string) => {
    activeToastsRef.current.delete(id);
    setInlineFeedback(prev => prev && prev.id === id ? null : prev);
    setFeedbackHistory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, autoExpire: true, expiryMs: 0 } : item
      )
    );
  }, []);
  
  const clearAllFeedback = useCallback(() => {
    setInlineFeedback(null);
    activeToastsRef.current.clear();
    setFeedbackHistory(prev => 
      prev.map(item => ({ ...item, autoExpire: true, expiryMs: 0 }))
    );
    sonnerToast.dismiss();
  }, []);
  
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
      duration: 7000,
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
      duration: 30000,
      autoExpire: false,
      ...(options || {})
    });
  }, [showEnhancedToast]);
  
  const showInlineFeedback = useCallback((options: EnhancedFeedbackOptions) => {
    return showEnhancedToast({
      ...options,
      position: 'inline'
    });
  }, [showEnhancedToast]);
  
  const clearInlineFeedback = useCallback(() => {
    setInlineFeedback(null);
  }, []);
  
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
    showEnhancedToast,
    dismissFeedback,
    clearAllFeedback,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    showInlineFeedback,
    clearInlineFeedback,
    inlineFeedback,
    feedbackHistory,
  };
};

export default useEnhancedFeedback;
