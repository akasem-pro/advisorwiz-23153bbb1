
import { toast } from 'sonner';
import { logErrorAsync, flushErrorLogs, registerGlobalErrorHandlers } from './asyncErrorLogger';

// Error categories for better organization
export enum ErrorCategory {
  NETWORK = 'network',
  AUTH = 'authentication',
  VALIDATION = 'validation',
  DATABASE = 'database',
  UNKNOWN = 'unknown'
}

// Severity levels for errors
export enum ErrorSeverity {
  LOW = 'low',       // Informational, doesn't affect functionality
  MEDIUM = 'medium', // Affects functionality but not critical
  HIGH = 'high',     // Critical error that prevents core functionality
  FATAL = 'fatal'    // Application cannot continue
}

// Error interface with additional metadata
export interface AppError {
  message: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  originalError?: unknown;
  context?: Record<string, any>;
  timestamp: Date;
}

// Global error logging setting
let errorLoggingEnabled = true;

/**
 * Create a structured error object
 */
export function createError(
  message: string,
  category: ErrorCategory = ErrorCategory.UNKNOWN,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  originalError?: unknown,
  context?: Record<string, any>
): AppError {
  return {
    message,
    category,
    severity,
    originalError,
    context,
    timestamp: new Date()
  };
}

/**
 * Handle an error with consistent formatting and asynchronous logging
 */
export function handleError(
  error: AppError | Error | string,
  showToast: boolean = true,
  throwError: boolean = false
): AppError {
  // Convert to AppError if it's not already
  const appError: AppError = typeof error === 'string'
    ? createError(error)
    : 'category' in error
      ? error as AppError
      : createError(error.message, ErrorCategory.UNKNOWN, ErrorSeverity.MEDIUM, error);
  
  // Log the error asynchronously if logging is enabled
  if (errorLoggingEnabled) {
    const logLevel = appError.severity === ErrorSeverity.FATAL || 
                    appError.severity === ErrorSeverity.HIGH ? 'error' : 
                    appError.severity === ErrorSeverity.MEDIUM ? 'warn' : 'info';
                    
    logErrorAsync(
      `[${appError.category.toUpperCase()}] ${appError.message}`,
      {
        severity: appError.severity,
        timestamp: appError.timestamp,
        context: appError.context,
        originalError: appError.originalError
      },
      logLevel
    );
  }
  
  // Show toast notification if requested - this is synchronous and user-facing
  if (showToast) {
    // Using sonner toast directly for error handling
    toast.error(appError.message, {
      description: appError.severity === ErrorSeverity.HIGH || appError.severity === ErrorSeverity.FATAL
        ? 'Please try again or contact support if the problem persists.'
        : undefined,
      duration: getSeverityDuration(appError.severity)
    });
  }
  
  // Throw the error if requested
  if (throwError) {
    throw new Error(appError.message);
  }
  
  return appError;
}

// Helper to get toast duration based on severity
function getSeverityDuration(severity: ErrorSeverity): number {
  switch (severity) {
    case ErrorSeverity.LOW:
      return 3000;
    case ErrorSeverity.MEDIUM:
      return 5000;
    case ErrorSeverity.HIGH:
      return 7000;
    case ErrorSeverity.FATAL:
      return 10000;
  }
}

/**
 * Enable or disable error logging
 */
export function setErrorLoggingEnabled(enabled: boolean): void {
  errorLoggingEnabled = enabled;
}

/**
 * Create a safe wrapper for functions that might throw errors
 * with asynchronous error logging
 */
export function withErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  errorMessage: string = 'An error occurred',
  category: ErrorCategory = ErrorCategory.UNKNOWN,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  showToast: boolean = true
): (...args: Parameters<T>) => ReturnType<T> | null {
  return (...args: Parameters<T>): ReturnType<T> | null => {
    try {
      return fn(...args);
    } catch (error) {
      handleError(
        createError(errorMessage, category, severity, error),
        showToast
      );
      return null;
    }
  };
}

/**
 * Create a safe wrapper for async functions that might throw errors
 * with asynchronous error logging
 */
export function withAsyncErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  errorMessage: string = 'An error occurred',
  category: ErrorCategory = ErrorCategory.UNKNOWN,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  showToast: boolean = true
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | null> {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | null> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(
        createError(errorMessage, category, severity, error),
        showToast
      );
      return null;
    }
  };
}

/**
 * Initialize error handling system
 * Setup global error handlers
 */
export function initErrorHandling(): void {
  // Use imported function directly instead of requiring it
  registerGlobalErrorHandlers();
  
  console.info('[Error Handling] Asynchronous error handling system initialized');
}

/**
 * Flush all pending error logs
 * Useful in shutdown scenarios or critical failures
 */
export function flushAllErrorLogs(): void {
  flushErrorLogs();
}

// Export for use in other modules
export { flushErrorLogs } from './asyncErrorLogger';
