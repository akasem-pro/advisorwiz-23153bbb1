
import { useCallback } from 'react';
import { EnhancedFeedbackOptions, ErrorCategory, ErrorSeverity } from './types';
import { flushErrorLogs } from '../../utils/errorHandling';

/**
 * Hook for handling errors in feedback
 */
export const useErrorHandler = () => {
  // Handle errors with appropriate logging
  const handleErrorDetails = useCallback(async (
    description: string, 
    options: EnhancedFeedbackOptions
  ) => {
    if (options.errorDetails) {
      const severity = options.errorSeverity || ErrorSeverity.MEDIUM;
      const category = options.errorCategory || ErrorCategory.UNKNOWN;
      
      try {
        const { createError, handleError } = await import('../../utils/errorHandling/errorHandler');
        handleError(
          createError(
            description,
            category,
            severity,
            options.errorDetails
          ),
          false
        );
      } catch (error) {
        console.error('Failed to handle error:', error);
      }
    }
  }, []);
  
  // Check for severe errors and flush logs if needed
  const checkSevereFeedback = useCallback((feedbackHistory: any[]) => {
    const severeFeedback = feedbackHistory.find(
      item => item.variant === 'error' && 
      item.errorDetails?.severity === ErrorSeverity.HIGH || 
      item.errorDetails?.severity === ErrorSeverity.FATAL
    );
    
    if (severeFeedback) {
      flushErrorLogs();
    }
  }, []);
  
  return { handleErrorDetails, checkSevereFeedback };
};
