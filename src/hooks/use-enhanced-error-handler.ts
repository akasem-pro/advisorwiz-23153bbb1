import { useCallback } from 'react';
import { toast } from 'sonner';
import { ErrorCategory, ErrorSeverity, reportToMonitoring } from '../utils/errorHandling/errorHandler';

interface ErrorHandlerOptions {
  showToast?: boolean;
  category?: ErrorCategory;
  severity?: ErrorSeverity;
  context?: Record<string, any>;
  monitored?: boolean;
}

/**
 * Enhanced hook for handling errors across the application
 * with monitoring capabilities
 */
export const useEnhancedErrorHandler = () => {
  /**
   * Handle an error with consistent logging and user feedback
   */
  const handleError = useCallback((
    error: Error | string | unknown,
    message?: string,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      category = ErrorCategory.UNKNOWN,
      severity = ErrorSeverity.MEDIUM,
      context = {},
      monitored = false
    } = options;
    
    // Format the error for logging
    const errorObj = error instanceof Error ? error : new Error(String(error));
    const errorMessage = message || errorObj.message;
    
    // Generate unique error ID for tracking
    const errorId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Log the error to the console
    console.error(`[${category}] ${errorMessage}`, {
      errorId,
      error,
      severity,
      context,
      timestamp: new Date()
    });
    
    // Show a toast notification if requested
    if (showToast) {
      toast.error(errorMessage, {
        description: severity === ErrorSeverity.HIGH || severity === ErrorSeverity.FATAL
          ? 'Please try again or contact support if the problem persists.'
          : undefined,
        duration: 
          severity === ErrorSeverity.LOW ? 3000 :
          severity === ErrorSeverity.MEDIUM ? 5000 :
          severity === ErrorSeverity.HIGH ? 7000 : 10000
      });
    }
    
    // Report to monitoring system if enabled
    reportToMonitoring(errorId, monitored);
    
    // Log the error asynchronously
    try {
      import('../utils/errorHandling/errorHandler').then(({ createError, handleError }) => {
        handleError(
          createError(
            errorMessage,
            category,
            severity,
            error,
            { ...context, errorId }
          ),
          false // Don't show another toast notification
        );
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
    
    return { errorObj, errorId }; // Return error info for potential chaining
  }, []);
  
  /**
   * Create a wrapped function that handles errors
   */
  const withErrorHandling = useCallback(<T extends (...args: any[]) => any>(
    fn: T,
    errorMessage?: string,
    options?: ErrorHandlerOptions
  ) => {
    return (...args: Parameters<T>): ReturnType<T> | null => {
      try {
        return fn(...args);
      } catch (error) {
        handleError(error, errorMessage, options);
        return null;
      }
    };
  }, [handleError]);
  
  /**
   * Create a wrapped async function that handles errors
   */
  const withAsyncErrorHandling = useCallback(<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    errorMessage?: string,
    options?: ErrorHandlerOptions
  ) => {
    return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | null> => {
      try {
        return await fn(...args);
      } catch (error) {
        handleError(error, errorMessage, options);
        return null;
      }
    };
  }, [handleError]);
  
  return {
    handleError,
    withErrorHandling,
    withAsyncErrorHandling
  };
};

export default useEnhancedErrorHandler;
