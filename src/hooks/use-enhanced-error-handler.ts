
import { useCallback } from 'react';
import { toast } from 'sonner';
import { 
  ErrorCategory, 
  ErrorSeverity,
  handleError,
  createError,
  withErrorHandling,
  withAsyncErrorHandling,
  classifyError
} from '../utils/errorHandling';

interface EnhancedErrorHandlerOptions {
  showToast?: boolean;
  category?: ErrorCategory;
  severity?: ErrorSeverity;
  context?: Record<string, any>;
  source?: string;
  monitored?: boolean;
  retryable?: boolean;
  sanitizeSensitiveData?: boolean;
  userFriendlyMessage?: string;
}

/**
 * Enhanced error handling hook with sensitivity to different error types,
 * intelligent categorization, sanitization, and monitoring integration
 */
export const useEnhancedErrorHandler = () => {
  /**
   * Intelligently handle an error with auto-categorization, monitoring, and sanitization
   */
  const handleError = useCallback((
    error: Error | string | unknown,
    message?: string,
    options: EnhancedErrorHandlerOptions = {}
  ) => {
    // Extract error message
    const errorMessage = typeof error === 'string' 
      ? error 
      : error instanceof Error 
        ? error.message 
        : String(error);
    
    // Use error classification to determine category and severity if not provided
    const errorClassification = classifyError(errorMessage, options.context);
    
    const {
      showToast = true,
      category = errorClassification.category,
      severity = errorClassification.severity,
      context = {},
      source = 'app',
      monitored = errorClassification.shouldReport,
      sanitizeSensitiveData = true,
      userFriendlyMessage = errorClassification.userFacingMessage
    } = options;
    
    // Create a structured error object
    const appError = createError(
      message || errorMessage,
      category,
      severity,
      error,
      context,
      source
    );
    
    // If a user-friendly message was provided or generated, add it
    if (userFriendlyMessage) {
      appError.userFriendlyMessage = userFriendlyMessage;
    }
    
    // The third parameter to handleError needs to be a boolean, not a string
    // We're passing the monitored flag to indicate if this error should be reported to monitoring
    return handleError(appError, showToast, monitored);
  }, []);
  
  /**
   * Create a wrapped function that handles errors with enhanced features
   */
  const withEnhancedErrorHandling = useCallback(<T extends (...args: any[]) => any>(
    fn: T,
    errorMessage?: string,
    options?: EnhancedErrorHandlerOptions
  ) => {
    return withErrorHandling(
      fn,
      errorMessage || 'An error occurred',
      options?.category || ErrorCategory.UNKNOWN,
      options?.severity || ErrorSeverity.MEDIUM,
      options?.showToast !== undefined ? options.showToast : true,
      options?.monitored !== undefined ? options.monitored : true,
      options?.source
    );
  }, []);
  
  /**
   * Create a wrapped async function that handles errors with enhanced features
   */
  const withEnhancedAsyncErrorHandling = useCallback(<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    errorMessage?: string,
    options?: EnhancedErrorHandlerOptions
  ) => {
    return withAsyncErrorHandling(
      fn,
      errorMessage || 'An error occurred',
      options?.category || ErrorCategory.UNKNOWN,
      options?.severity || ErrorSeverity.MEDIUM,
      options?.showToast !== undefined ? options.showToast : true,
      options?.monitored !== undefined ? options.monitored : true,
      options?.source
    );
  }, []);
  
  /**
   * Show a retryable error with a retry button
   */
  const showRetryableError = useCallback((
    error: Error | string,
    retryFn: () => void,
    options?: EnhancedErrorHandlerOptions
  ) => {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorClassification = classifyError(errorMessage, options?.context);
    
    // Set default options based on error classification
    const finalOptions = {
      category: errorClassification.category,
      severity: errorClassification.severity,
      retryable: errorClassification.retryable,
      ...options
    };
    
    // Create a more detailed error
    handleError(error, undefined, {
      ...finalOptions,
      showToast: false // Don't show the default toast
    });
    
    // Show a custom toast with retry button
    toast.error(
      finalOptions.userFriendlyMessage || errorClassification.userFacingMessage || errorMessage,
      {
        action: {
          label: 'Retry',
          onClick: retryFn
        },
        description: finalOptions.severity === ErrorSeverity.HIGH ? 
          'This error is preventing normal operation.' : undefined
      }
    );
  }, [handleError]);
  
  return {
    handleError,
    withEnhancedErrorHandling,
    withEnhancedAsyncErrorHandling,
    showRetryableError,
    // Export error categories and severities for convenience
    ErrorCategory,
    ErrorSeverity
  };
};

export default useEnhancedErrorHandler;
