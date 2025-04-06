/**
 * Enhanced asynchronous error logging utility
 * Provides non-blocking error logging capabilities with enhanced formatting,
 * structured output, monitoring integration, and improved error traceability.
 */

// Queue for storing errors to be processed asynchronously
const errorQueue: Array<{
  id?: string;
  message: string;
  details: any;
  level: 'info' | 'warn' | 'error' | 'fatal';
  timestamp: Date;
  source?: string;
  code?: string;
  category?: string;
  sendToMonitoring?: boolean;
}> = [];

// Flag to track if processing is already in progress
let isProcessing = false;

// Configuration options
let logToDisk = false;
let logToConsole = true;
let logToMonitoring = false;

// Stats for monitoring health
const logStats = {
  totalLogs: 0,
  errorLogs: 0,
  warningLogs: 0,
  infoLogs: 0,
  lastProcessed: new Date(),
  monitoring: {
    successful: 0,
    failed: 0
  }
};

/**
 * Log an error asynchronously without blocking the main thread
 * Enhanced with monitoring integration and better metadata
 * 
 * @param message - Error message to log
 * @param details - Additional error details or context
 * @param level - Severity level of the error
 * @param source - Optional source of the error (component, function, etc.)
 * @param code - Optional error code for categorization
 * @param category - Optional error category
 * @param sendToMonitoring - Whether to send this error to the monitoring service
 */
export const logErrorAsync = (
  message: string,
  details?: any,
  level: 'info' | 'warn' | 'error' | 'fatal' = 'error',
  source?: string,
  code?: string,
  category?: string,
  sendToMonitoring: boolean = true
): void => {
  // Generate a unique ID if not present in details
  const id = details?.id || `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  // Add error to the queue
  errorQueue.push({
    id,
    message,
    details,
    level,
    timestamp: new Date(),
    source,
    code,
    category,
    sendToMonitoring: sendToMonitoring && logToMonitoring
  });
  
  // Update stats
  logStats.totalLogs++;
  if (level === 'error' || level === 'fatal') logStats.errorLogs++;
  if (level === 'warn') logStats.warningLogs++;
  if (level === 'info') logStats.infoLogs++;
  
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
  logStats.lastProcessed = new Date();
  
  // Use queueMicrotask to process errors without blocking the main thread
  queueMicrotask(() => {
    try {
      const error = errorQueue.shift();
      if (error) {
        // Format error information
        const formattedTimestamp = error.timestamp.toISOString();
        const sourceInfo = error.source ? ` [${error.source}]` : '';
        const codeInfo = error.code ? ` (${error.code})` : '';
        const categoryInfo = error.category ? ` {${error.category}}` : '';
        const idInfo = error.id ? ` #${error.id}` : '';
        
        // Prepare formatted log message
        const formattedMessage = 
          `[${formattedTimestamp}] [${error.level.toUpperCase()}]${idInfo}${categoryInfo}${sourceInfo}${codeInfo} ${error.message}`;
        
        // Log based on level with enhanced formatting
        if (logToConsole) {
          switch (error.level) {
            case 'info':
              console.info(formattedMessage, error.details);
              break;
            case 'warn':
              console.warn(formattedMessage, error.details);
              break;
            case 'error':
              console.error(formattedMessage, error.details);
              break;
            case 'fatal':
              console.error(formattedMessage, error.details);
              break;
          }
        }
        
        // Send to monitoring service if enabled
        if (error.sendToMonitoring) {
          sendToMonitoringService(error).catch(err => {
            console.error('Failed to send error to monitoring:', err);
            logStats.monitoring.failed++;
          });
        }
        
        // Save to persistent storage if enabled
        if (logToDisk) {
          saveToPersistentStorage(error).catch(err => {
            console.error('Failed to save error to persistent storage:', err);
          });
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
 * Mock function to send errors to a monitoring service
 * In a real application, this would integrate with Sentry, LogRocket, etc.
 */
async function sendToMonitoringService(error: any): Promise<void> {
  // Skip if monitoring is disabled
  if (!logToMonitoring) return;
  
  try {
    // This is where you would integrate with your monitoring service
    // Example for Sentry:
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureMessage(error.message, {
    //     level: error.level,
    //     tags: {
    //       source: error.source || 'unknown',
    //       code: error.code,
    //       category: error.category
    //     },
    //     extra: error.details
    //   });
    // }
    
    // For now, just log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.info(`[Monitor] Would send to monitoring service: ${error.message}`);
    }
    
    logStats.monitoring.successful++;
  } catch (err) {
    logStats.monitoring.failed++;
    console.error('Error sending to monitoring service:', err);
    throw err; // Re-throw for the caller to handle
  }
}

/**
 * Mock function to save errors to persistent storage
 * In a real application, this might save to IndexedDB, localStorage, or a server endpoint
 */
async function saveToPersistentStorage(error: any): Promise<void> {
  // Skip if disk logging is disabled
  if (!logToDisk) return;
  
  try {
    // This is where you would save to persistent storage
    // Example for localStorage:
    if (typeof window !== 'undefined' && window.localStorage) {
      const logs = JSON.parse(localStorage.getItem('error_logs') || '[]');
      logs.push({
        id: error.id,
        timestamp: error.timestamp,
        level: error.level,
        message: error.message,
        source: error.source,
        code: error.code,
        category: error.category,
        // Limit size of details to prevent localStorage size issues
        details: JSON.stringify(error.details).substring(0, 500)
      });
      
      // Keep only the last 100 logs to prevent storage issues
      if (logs.length > 100) {
        logs.shift();
      }
      
      localStorage.setItem('error_logs', JSON.stringify(logs));
    }
  } catch (err) {
    console.error('Error saving to persistent storage:', err);
    throw err; // Re-throw for the caller to handle
  }
}

/**
 * Flush all pending error logs immediately
 * Useful before app termination or during critical failures
 * 
 * @returns {number} Number of logs flushed
 */
export const flushErrorLogs = (): number => {
  const logCount = errorQueue.length;
  
  // Process all queued logs synchronously
  while (errorQueue.length > 0) {
    const error = errorQueue.shift();
    if (error) {
      const sourceInfo = error.source ? ` [${error.source}]` : '';
      const idInfo = error.id ? ` #${error.id}` : '';
      console.error(`[FLUSH]${idInfo}${sourceInfo} ${error.message}`, error.details);
      
      // Try to send to monitoring service synchronously
      if (error.sendToMonitoring && logToMonitoring) {
        try {
          // This is a synchronous mock - in reality you would use
          // a synchronous or guaranteed delivery method
          console.info(`[Monitor] Emergency flush to monitoring: ${error.message}`);
        } catch (e) {
          console.error('Failed to send to monitoring during flush:', e);
        }
      }
    }
  }
  
  return logCount;
};

/**
 * Register unhandled exception handlers to catch errors at global level
 * Enhanced with better diagnostics and monitoring integration
 * 
 * @param options - Configuration options for error handling
 */
export const registerGlobalErrorHandlers = (options?: {
  captureRejections?: boolean;
  captureExceptions?: boolean;
  captureBeforeUnload?: boolean;
  logToDisk?: boolean;
  logToConsole?: boolean;
  logToMonitoring?: boolean;
}): void => {
  if (typeof window !== 'undefined') {
    const opts = {
      captureRejections: true,
      captureExceptions: true,
      captureBeforeUnload: true,
      ...options
    };
    
    // Update configuration options
    if (options) {
      logToDisk = options.logToDisk ?? logToDisk;
      logToConsole = options.logToConsole ?? logToConsole;
      logToMonitoring = options.logToMonitoring ?? logToMonitoring;
    }
    
    // Handle unhandled promise rejections
    if (opts.captureRejections) {
      window.addEventListener('unhandledrejection', (event) => {
        logErrorAsync(
          'Unhandled Promise Rejection',
          {
            reason: event.reason,
            stack: event.reason?.stack,
            message: event.reason?.message
          },
          'error',
          'window.onunhandledrejection',
          'UNHANDLED_REJECTION',
          'UNKNOWN',
          true
        );
        
        // Prevent the default browser behavior (console error)
        // Only do this if you're handling the error appropriately
        // event.preventDefault();
      });
    }

    // Handle uncaught exceptions
    if (opts.captureExceptions) {
      window.addEventListener('error', (event) => {
        // Skip errors from network resources
        if (event.filename && (
          event.filename.includes('.js') ||
          event.filename.includes('.jsx') ||
          event.filename.includes('.ts') ||
          event.filename.includes('.tsx')
        )) {
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
            'window.onerror',
            'UNCAUGHT_EXCEPTION',
            'UNKNOWN',
            true
          );
        }
      });
    }
    
    // Handle before unload to flush any remaining logs
    if (opts.captureBeforeUnload) {
      window.addEventListener('beforeunload', () => {
        flushErrorLogs();
      });
    }
    
    // Log successful initialization
    console.info(`[Error Logger] Initialized with options: console=${logToConsole}, disk=${logToDisk}, monitoring=${logToMonitoring}`);
  }
};

/**
 * Get error logging statistics
 */
export const getErrorLogStats = (): typeof logStats => {
  return { ...logStats };
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

/**
 * Configure the error logger
 */
export const configureErrorLogger = (options: {
  logToConsole?: boolean;
  logToDisk?: boolean;
  logToMonitoring?: boolean;
}): void => {
  logToConsole = options.logToConsole ?? logToConsole;
  logToDisk = options.logToDisk ?? logToDisk;
  logToMonitoring = options.logToMonitoring ?? logToMonitoring;
  
  console.info(`[Error Logger] Reconfigured with: console=${logToConsole}, disk=${logToDisk}, monitoring=${logToMonitoring}`);
};
