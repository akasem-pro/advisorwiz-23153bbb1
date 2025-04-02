
import { useCallback } from 'react';
import { useToast } from '../use-toast';
import { toast as sonnerToast } from 'sonner';
import { EnhancedFeedbackOptions, FeedbackItem, FeedbackVariant } from './types';

/**
 * Hook for managing toast displays
 */
export const useToastHandler = () => {
  const { toast } = useToast();
  
  // Display a toast notification using either sonner or shadcn toast
  const showToastNotification = useCallback((
    feedbackItem: FeedbackItem, 
    options: EnhancedFeedbackOptions,
    onDismiss: () => void
  ) => {
    const variant = feedbackItem.variant;
    const useEnhancedToast = true; // Set to false to use shadcn/toast instead
    
    if (useEnhancedToast) {
      const toastMethod = getSonnerToastMethod(variant);
      
      sonnerToast[toastMethod](
        options.title || '',
        {
          description: feedbackItem.description,
          duration: options.duration || 5000,
          action: options.action,
          onDismiss
        }
      );
    } else {
      toast({
        title: options.title,
        description: feedbackItem.description,
        variant: variant === 'error' ? 'destructive' : 'default',
        duration: options.duration || 5000,
        action: options.action,
      });
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
