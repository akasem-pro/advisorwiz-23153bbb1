
/**
 * Asynchronous error logging utility
 * Provides non-blocking error logging capabilities
 */

// Queue for storing errors to be processed asynchronously
const errorQueue: Array<{
  message: string;
  details: any;
  level: 'info' | 'warn' | 'error' | 'fatal';
  timestamp: Date;
}> = [];

// Flag to track if processing is already in progress
let isProcessing = false;

/**
 * Log an error asynchronously without blocking the main thread
 */
export const logErrorAsync = (
  message: string,
  details?: any,
  level: 'info' | 'warn' | 'error' | 'fatal' = 'error'
): void => {
  // Add error to the queue
  errorQueue.push({
    message,
    details,
    level,
    timestamp: new Date()
  });
  
  // Start processing if not already in progress
  if (!isProcessing) {
    processErrorQueue();
  }
};

/**
 * Process the error queue asynchronously using microtasks
 */
const processErrorQueue = (): void => {
  if (errorQueue.length === 0) {
    isProcessing = false;
    return;
  }
  
  isProcessing = true;
  
  // Use queueMicrotask to process errors without blocking the main thread
  queueMicrotask(() => {
    try {
      const error = errorQueue.shift();
      if (error) {
        // Log based on level
        switch (error.level) {
          case 'info':
            console.info(
              `[${error.timestamp.toISOString()}] [INFO] ${error.message}`,
              error.details
            );
            break;
          case 'warn':
            console.warn(
              `[${error.timestamp.toISOString()}] [WARNING] ${error.message}`,
              error.details
            );
            break;
          case 'error':
            console.error(
              `[${error.timestamp.toISOString()}] [ERROR] ${error.message}`,
              error.details
            );
            break;
          case 'fatal':
            console.error(
              `[${error.timestamp.toISOString()}] [FATAL] ${error.message}`,
              error.details
            );
            break;
        }
      }
      
      // Process next error in queue
      processErrorQueue();
    } catch (err) {
      // If we encounter an error while logging, fallback to synchronous logging
      console.error('Error in asynchronous error logger:', err);
      isProcessing = false;
    }
  });
};

/**
 * Flush all pending error logs immediately
 * Useful before app termination or during critical failures
 */
export const flushErrorLogs = (): void => {
  while (errorQueue.length > 0) {
    const error = errorQueue.shift();
    if (error) {
      console.error(`[FLUSH] ${error.message}`, error.details);
    }
  }
};

/**
 * Register unhandled exception handlers to catch errors at global level
 */
export const registerGlobalErrorHandlers = (): void => {
  if (typeof window !== 'undefined') {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      logErrorAsync(
        'Unhandled Promise Rejection',
        {
          reason: event.reason,
          stack: event.reason?.stack
        },
        'error'
      );
    });

    // Handle uncaught exceptions
    window.addEventListener('error', (event) => {
      logErrorAsync(
        'Uncaught Exception',
        {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error
        },
        'fatal'
      );
    });
    
    // Handle before unload to flush any remaining logs
    window.addEventListener('beforeunload', () => {
      flushErrorLogs();
    });
  }
};
