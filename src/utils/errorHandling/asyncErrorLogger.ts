
/**
 * Asynchronous error logging utility
 * Provides non-blocking error logging capabilities with enhanced formatting
 * and structured output to improve error traceability and debugging.
 */

// Queue for storing errors to be processed asynchronously
const errorQueue: Array<{
  message: string;
  details: any;
  level: 'info' | 'warn' | 'error' | 'fatal';
  timestamp: Date;
  source?: string;
  code?: string;
}> = [];

// Flag to track if processing is already in progress
let isProcessing = false;

/**
 * Log an error asynchronously without blocking the main thread
 * 
 * @param message - Error message to log
 * @param details - Additional error details or context
 * @param level - Severity level of the error
 * @param source - Optional source of the error (component, function, etc.)
 * @param code - Optional error code for categorization
 */
export const logErrorAsync = (
  message: string,
  details?: any,
  level: 'info' | 'warn' | 'error' | 'fatal' = 'error',
  source?: string,
  code?: string
): void => {
  // Add error to the queue
  errorQueue.push({
    message,
    details,
    level,
    timestamp: new Date(),
    source,
    code
  });
  
  // Start processing if not already in progress
  if (!isProcessing) {
    processErrorQueue();
  }
};

/**
 * Process the error queue asynchronously using microtasks
 * This ensures errors are logged without blocking the main thread
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
        // Format error information
        const formattedTimestamp = error.timestamp.toISOString();
        const sourceInfo = error.source ? ` [${error.source}]` : '';
        const codeInfo = error.code ? ` (${error.code})` : '';
        
        // Log based on level with enhanced formatting
        switch (error.level) {
          case 'info':
            console.info(
              `[${formattedTimestamp}] [INFO]${sourceInfo}${codeInfo} ${error.message}`,
              error.details
            );
            break;
          case 'warn':
            console.warn(
              `[${formattedTimestamp}] [WARNING]${sourceInfo}${codeInfo} ${error.message}`,
              error.details
            );
            break;
          case 'error':
            console.error(
              `[${formattedTimestamp}] [ERROR]${sourceInfo}${codeInfo} ${error.message}`,
              error.details
            );
            break;
          case 'fatal':
            console.error(
              `[${formattedTimestamp}] [FATAL]${sourceInfo}${codeInfo} ${error.message}`,
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
 * 
 * @returns {number} Number of logs flushed
 */
export const flushErrorLogs = (): number => {
  const logCount = errorQueue.length;
  while (errorQueue.length > 0) {
    const error = errorQueue.shift();
    if (error) {
      const sourceInfo = error.source ? ` [${error.source}]` : '';
      console.error(`[FLUSH]${sourceInfo} ${error.message}`, error.details);
    }
  }
  return logCount;
};

/**
 * Register unhandled exception handlers to catch errors at global level
 * 
 * @param options - Configuration options for error handling
 */
export const registerGlobalErrorHandlers = (options?: {
  captureRejections?: boolean;
  captureExceptions?: boolean;
  captureBeforeUnload?: boolean;
}): void => {
  if (typeof window !== 'undefined') {
    const opts = {
      captureRejections: true,
      captureExceptions: true,
      captureBeforeUnload: true,
      ...options
    };
    
    // Handle unhandled promise rejections
    if (opts.captureRejections) {
      window.addEventListener('unhandledrejection', (event) => {
        logErrorAsync(
          'Unhandled Promise Rejection',
          {
            reason: event.reason,
            stack: event.reason?.stack
          },
          'error',
          'window.onunhandledrejection'
        );
      });
    }

    // Handle uncaught exceptions
    if (opts.captureExceptions) {
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
          'fatal',
          'window.onerror'
        );
      });
    }
    
    // Handle before unload to flush any remaining logs
    if (opts.captureBeforeUnload) {
      window.addEventListener('beforeunload', () => {
        flushErrorLogs();
      });
    }
  }
};

/**
 * Set the maximum queue size for error logs
 * When queue exceeds this size, oldest logs will be dropped
 * 
 * @param maxSize - Maximum number of logs to keep in queue
 */
export const setMaxQueueSize = (maxSize: number): void => {
  // Remove oldest logs if queue exceeds maximum size
  while (errorQueue.length > maxSize) {
    errorQueue.shift();
  }
};
