
import { useCallback } from 'react';
import { toast } from 'sonner';
import { ErrorCategory, ErrorSeverity } from '../utils/errorHandling/errorHandler';

interface ErrorHandlerOptions {
  showToast?: boolean;
  category?: ErrorCategory;
  severity?: ErrorSeverity;
  context?: Record<string, any>;
}

/**
 * Standardized hook for handling errors across the application
 */
export const useErrorHandler = () => {
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
      context = {}
    } = options;
    
    // Format the error for logging
    const errorObj = error instanceof Error ? error : new Error(String(error));
    const errorMessage = message || errorObj.message;
    
    // Log the error to the console
    console.error(`[${category}] ${errorMessage}`, {
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
    
    // Log the error asynchronously
    try {
      import('../utils/errorHandling/errorHandler').then(({ createError, handleError }) => {
        handleError(
          createError(
            errorMessage,
            category,
            severity,
            error,
            context
          ),
          false // Don't show another toast notification
        );
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
    
    return errorObj; // Return the error for potential chaining
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

export default useErrorHandler;
