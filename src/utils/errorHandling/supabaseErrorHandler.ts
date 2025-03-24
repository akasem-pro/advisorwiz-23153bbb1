
import { toast } from 'sonner';

/**
 * Error severity levels for Supabase operations
 */
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

/**
 * Handles Supabase operation errors with appropriate logging and UI feedback
 * 
 * @param message - The error message to display
 * @param shouldToast - Whether to show a toast notification
 * @param severity - The severity level of the error
 * @param error - The original error object for logging
 */
export const handleSupabaseError = (
  message: string,
  shouldToast: boolean = true,
  severity: ErrorSeverity = ErrorSeverity.ERROR,
  error?: any
): void => {
  // Log the error with appropriate level
  if (severity === ErrorSeverity.CRITICAL || severity === ErrorSeverity.ERROR) {
    console.error(`[Supabase ${severity}]`, message, error);
  } else if (severity === ErrorSeverity.WARNING) {
    console.warn(`[Supabase ${severity}]`, message, error);
  } else {
    console.info(`[Supabase ${severity}]`, message, error);
  }

  // Show toast notification if requested
  if (shouldToast) {
    switch (severity) {
      case ErrorSeverity.ERROR:
      case ErrorSeverity.CRITICAL:
        toast.error(message);
        break;
      case ErrorSeverity.WARNING:
        toast.warning(message);
        break;
      case ErrorSeverity.INFO:
        toast.info(message);
        break;
    }
  }
};

/**
 * Standard error messages for common Supabase errors
 */
export const SUPABASE_ERROR_MESSAGES = {
  CONNECTION: 'Unable to connect to the server. Please check your internet connection.',
  AUTHENTICATION: 'Authentication error. Please sign in again.',
  PERMISSION: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource could not be found.',
  SERVER: 'Server error. Please try again later.',
  UNKNOWN: 'An unknown error occurred. Please try again.',
};
