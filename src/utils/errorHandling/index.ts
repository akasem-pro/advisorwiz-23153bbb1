
import { initErrorHandling } from './errorHandler';
import { ErrorSeverity as HandlerErrorSeverity } from './errorHandler';
import { ErrorSeverity as SupabaseErrorSeverity } from './supabaseErrorHandler';

// Re-export with renamed enums to avoid conflicts
export { HandlerErrorSeverity, SupabaseErrorSeverity };

// Export everything else
export * from './errorHandler';
export * from './supabaseErrorHandler';
export * from './asyncErrorLogger';

// Override the ErrorSeverity re-exports to avoid duplicates
export { HandlerErrorSeverity as ErrorSeverity };

/**
 * Initialize the asynchronous error handling system
 */
export function setupErrorHandling(): void {
  initErrorHandling();
}

export default setupErrorHandling;
