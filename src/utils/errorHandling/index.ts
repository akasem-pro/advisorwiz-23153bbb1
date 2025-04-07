
import { initErrorHandling } from './errorHandler';
import { 
  ErrorCategory, 
  ErrorSeverity,
  AppError,
  createError,
  handleError,
  withErrorHandling,
  withAsyncErrorHandling,
  setErrorLoggingEnabled,
  setMonitoringEnabled,
  setSanitizationEnabled,
  flushAllErrorLogs
} from './errorHandler';

import {
  logErrorAsync,
  flushErrorLogs,
  registerGlobalErrorHandlers,
  configureErrorLogger,
  getErrorLogStats,
  setMaxQueueSize
} from './asyncErrorLogger';

import {
  classifyError,
  getUserFriendlyMessage,
  errorClassificationRules
} from './errorClassification';

// Export all error handling utilities and enums directly
export {
  // Core error handling functions
  initErrorHandling,
  createError,
  handleError,
  withErrorHandling,
  withAsyncErrorHandling,
  
  // Configuration functions
  setErrorLoggingEnabled,
  setMonitoringEnabled,
  setSanitizationEnabled,
  
  // Logging utilities
  logErrorAsync,
  flushErrorLogs,
  flushAllErrorLogs,
  registerGlobalErrorHandlers,
  configureErrorLogger,
  getErrorLogStats,
  setMaxQueueSize,
  
  // Classification utilities
  classifyError,
  getUserFriendlyMessage,
  errorClassificationRules,
  
  // Enums - export directly so they can be used as values
  ErrorCategory,
  ErrorSeverity
};

// Export interface as type
export type { AppError };

/**
 * Initialize the enhanced error handling system with sensible defaults
 */
export function setupErrorHandling(options?: {
  enableLogging?: boolean;
  enableMonitoring?: boolean;
  enableSanitization?: boolean;
  logToConsole?: boolean;
  logToDisk?: boolean;
  logToMonitoring?: boolean;
}): void {
  // Configure the error logger
  configureErrorLogger({
    logToConsole: options?.logToConsole !== undefined ? options.logToConsole : true,
    logToDisk: options?.logToDisk !== undefined ? options.logToDisk : false,
    logToMonitoring: options?.logToMonitoring !== undefined ? options.logToMonitoring : true
  });
  
  // Initialize the error handler
  initErrorHandling({
    enableLogging: options?.enableLogging !== undefined ? options.enableLogging : true,
    enableMonitoring: options?.enableMonitoring !== undefined ? options.enableMonitoring : true,
    enableSanitization: options?.enableSanitization !== undefined ? options.enableSanitization : true
  });
  
  console.info('[Error Handling] Enhanced error handling system setup complete');
}

export default setupErrorHandling;
