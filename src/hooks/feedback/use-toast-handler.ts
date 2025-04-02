
import { useCallback } from 'react';
import { useToast } from '../use-toast';
import { toast as sonnerToast } from 'sonner';
import { EnhancedFeedbackOptions, FeedbackItem, FeedbackVariant } from './types';
import { animateElement } from '../../utils/animations/optimizedAnimations';

/**
 * Hook for managing toast displays with enhanced animation and accessibility
 */
export const useToastHandler = () => {
  const { toast } = useToast();
  
  // Get the appropriate ARIA role based on variant
  const getAriaRole = (variant: FeedbackVariant, specified?: string): 'alert' | 'status' | 'log' => {
    if (specified) return specified as 'alert' | 'status' | 'log';
    
    switch (variant) {
      case 'error': return 'alert';
      case 'warning': return 'alert';
      case 'success': return 'status';
      case 'info': return 'status';
      case 'loading': return 'status';
      default: return 'status';
    }
  };
  
  // Get the appropriate ARIA live setting based on variant
  const getAriaLive = (variant: FeedbackVariant, specified?: string): 'assertive' | 'polite' | 'off' => {
    if (specified) return specified as 'assertive' | 'polite' | 'off';
    
    switch (variant) {
      case 'error': return 'assertive';
      case 'warning': return 'assertive';
      case 'success': return 'polite';
      case 'info': return 'polite';
      case 'loading': return 'polite';
      default: return 'polite';
    }
  };
  
  // Display a toast notification using either sonner or shadcn toast with enhanced animations
  const showToastNotification = useCallback((
    feedbackItem: FeedbackItem, 
    options: EnhancedFeedbackOptions,
    onDismiss: () => void
  ) => {
    const variant = feedbackItem.variant;
    const useEnhancedToast = true; // Set to false to use shadcn/toast instead
    
    // Set up ARIA attributes
    const ariaRole = getAriaRole(variant, options.ariaRole);
    const ariaLive = getAriaLive(variant, options.ariaLive);
    
    if (useEnhancedToast) {
      const toastMethod = getSonnerToastMethod(variant);
      
      sonnerToast[toastMethod](
        options.title || '',
        {
          description: feedbackItem.description,
          duration: options.duration || 5000,
          action: options.action,
          onDismiss,
          // Add ARIA attributes
          role: ariaRole,
          'aria-live': ariaLive,
          // Add custom animations via data attribute
          // Sonner will pick this up for custom animations
          unstyled: options.animationType ? true : false,
          className: options.animationType ? `animate-${options.animationType}` : undefined
        }
      );
    } else {
      toast({
        title: options.title,
        description: feedbackItem.description,
        variant: variant === 'error' ? 'destructive' : 'default',
        duration: options.duration || 5000,
        action: options.action,
        // Add ARIA attributes via className for shadcn toast
        className: `${options.animationType ? `animate-${options.animationType}` : ''} toast-${variant}`
      });
    }
    
    // Apply optimized animations to toast elements
    if (options.animationType) {
      // Find last toast element and animate it
      setTimeout(() => {
        const toastElements = document.querySelectorAll('[data-sonner-toast]');
        if (toastElements.length > 0) {
          const lastToast = toastElements[toastElements.length - 1] as HTMLElement;
          
          if (lastToast) {
            switch (options.animationType) {
              case 'fade':
                animateElement(lastToast, { opacity: '1' }, { duration: 300, easing: 'ease-out' });
                break;
              case 'slide':
                animateElement(lastToast, { transform: 'translateY(0)' }, { duration: 300, easing: 'ease-out' });
                break;
              case 'scale':
                animateElement(lastToast, { transform: 'scale(1)', opacity: '1' }, { duration: 300, easing: 'ease-out' });
                break;
            }
          }
        }
      }, 50);
    }
  }, [toast]);
  
  return { showToastNotification };
};

// Helper to get the appropriate sonner toast method
function getSonnerToastMethod(variant: FeedbackVariant): 'error' | 'success' | 'warning' | 'loading' | 'info' {
  switch (variant) {
    case 'error': return 'error';
    case 'success': return 'success';
    case 'warning': return 'warning';
    case 'loading': return 'loading';
    default: return 'info';
  }
}
