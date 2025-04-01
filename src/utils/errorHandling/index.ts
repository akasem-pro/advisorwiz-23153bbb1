
import { initErrorHandling } from './errorHandler';

export * from './errorHandler';
export * from './supabaseErrorHandler';
export * from './asyncErrorLogger';

/**
 * Initialize the asynchronous error handling system
 */
export function setupErrorHandling(): void {
  initErrorHandling();
}

export default setupErrorHandling;
