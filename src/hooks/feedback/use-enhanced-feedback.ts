
import { useCallback, useEffect } from 'react';
import { useFeedback } from '../../context/FeedbackContext';
import { toast as sonnerToast } from 'sonner';
import { useToastHandler } from './use-toast-handler';
import { useFeedbackCore } from './use-feedback-core';
import { useErrorHandler } from './use-error-handler';
import { generateFeedbackId, isSimilarMessageActive, getSeverityDuration } from './feedback-utils';
import { EnhancedFeedbackOptions, FeedbackItem, FeedbackVariant } from './types';

/**
 * Enhanced feedback system with error grouping, history, and persistence
 * Includes accessibility features and optimized animations
 */
export const useEnhancedFeedback = () => {
  const { isFeedbackEnabled } = useFeedback();
  const { 
    feedbackHistory, 
    inlineFeedback, 
    activeToastsRef,
    addToHistory, 
    dismissFeedback, 
    clearAllFeedback,
    setInlineFeedback 
  } = useFeedbackCore();
  
  const { showToastNotification } = useToastHandler();
  const { handleErrorDetails, checkSevereFeedback } = useErrorHandler();
  
  // Check for severe errors and flush logs if needed
  useEffect(() => {
    checkSevereFeedback(feedbackHistory);
  }, [feedbackHistory, checkSevereFeedback]);
  
  // Show enhanced toast notification with proper ARIA attributes and animations
  const showEnhancedToast = useCallback((options: EnhancedFeedbackOptions) => {
    if (!isFeedbackEnabled) return { id: '', dismiss: () => {} };
    
    const variant = options.variant || 'info';
    const description = options.description || '';
    
    if (options.groupSimilar && isSimilarMessageActive(description, variant, feedbackHistory)) {
      return { id: '', dismiss: () => {} };
    }
    
    const id = generateFeedbackId();
    const feedbackItem: FeedbackItem = {
      id,
      title: options.title,
      description,
      variant,
      timestamp: Date.now(),
      dismissable: options.dismissable !== false,
      autoExpire: options.autoExpire !== false,
      expiryMs: options.duration || getSeverityDuration(options.errorSeverity || 'MEDIUM'),
      source: options.source || 'user',
      errorDetails: options.errorDetails,
      icon: options.icon,
      // Add ARIA attributes
      ariaRole: options.ariaRole,
      ariaLive: options.ariaLive,
      // Add animation type
      animationType: options.animationType || 'fade'
    };
    
    addToHistory(feedbackItem);
    activeToastsRef.current.add(id);
    
    if (options.position === 'inline') {
      setInlineFeedback(feedbackItem);
    } else {
      // Show toast notification
      showToastNotification(feedbackItem, options, () => {
        activeToastsRef.current.delete(id);
      });
      
      // Handle error if present
      if (variant === 'error' && options.errorDetails) {
        handleErrorDetails(description, options);
      }
    }
    
    return { 
      id, 
      dismiss: () => {
        dismissFeedback(id);
      }
    };
  }, [
    isFeedbackEnabled, 
    feedbackHistory, 
    addToHistory, 
    activeToastsRef, 
    setInlineFeedback, 
    showToastNotification, 
    handleErrorDetails,
    dismissFeedback
  ]);
  
  // Show a success toast with accessibility features
  const showSuccess = useCallback((description: string, title?: string, options?: Partial<EnhancedFeedbackOptions>) => {
    return showEnhancedToast({
      title: title || 'Success',
      description,
      variant: 'success',
      duration: 5000,
      ariaRole: 'status',
      ariaLive: 'polite',
      animationType: options?.animationType || 'fade',
      ...(options || {})
    });
  }, [showEnhancedToast]);
  
  // Show an error toast with accessibility features
  const showError = useCallback((description: string, title?: string, options?: Partial<EnhancedFeedbackOptions>) => {
    return showEnhancedToast({
      title: title || 'Error',
      description,
      variant: 'error',
      duration: 7000,
      ariaRole: 'alert',
      ariaLive: 'assertive',
      animationType: options?.animationType || 'fade',
      ...(options || {})
    });
  }, [showEnhancedToast]);
  
  // Show a warning toast with accessibility features
  const showWarning = useCallback((description: string, title?: string, options?: Partial<EnhancedFeedbackOptions>) => {
    return showEnhancedToast({
      title: title || 'Warning',
      description,
      variant: 'warning',
      duration: 6000,
      ariaRole: 'alert',
      ariaLive: 'assertive',
      animationType: options?.animationType || 'slide',
      ...(options || {})
    });
  }, [showEnhancedToast]);
  
  // Show an info toast with accessibility features
  const showInfo = useCallback((description: string, title?: string, options?: Partial<EnhancedFeedbackOptions>) => {
    return showEnhancedToast({
      title: title || 'Information',
      description,
      variant: 'info',
      duration: 5000,
      ariaRole: 'status',
      ariaLive: 'polite',
      animationType: options?.animationType || 'fade',
      ...(options || {})
    });
  }, [showEnhancedToast]);
  
  // Show a loading toast with accessibility features
  const showLoading = useCallback((description: string, title?: string, options?: Partial<EnhancedFeedbackOptions>) => {
    return showEnhancedToast({
      title: title || 'Loading',
      description,
      variant: 'loading',
      duration: 30000,
      autoExpire: false,
      ariaRole: 'status',
      ariaLive: 'polite',
      animationType: options?.animationType || 'scale',
      ...(options || {})
    });
  }, [showEnhancedToast]);
  
  // Show inline feedback with accessibility features
  const showInlineFeedback = useCallback((options: EnhancedFeedbackOptions) => {
    return showEnhancedToast({
      ...options,
      position: 'inline'
    });
  }, [showEnhancedToast]);
  
  // Clear inline feedback
  const clearInlineFeedback = useCallback(() => {
    setInlineFeedback(null);
  }, [setInlineFeedback]);
  
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
