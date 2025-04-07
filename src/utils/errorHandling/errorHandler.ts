import { toast } from 'sonner';
import { logErrorAsync, flushErrorLogs, registerGlobalErrorHandlers } from './asyncErrorLogger';

// Enhanced error categories for better organization and specificity
export enum ErrorCategory {
  // Infrastructure errors
  NETWORK = 'network',
  SERVER = 'server',
  DATABASE = 'database',
  STORAGE = 'storage',
  CACHE = 'cache',
  
  // Authentication and authorization errors
  AUTH = 'authentication',
  AUTHORIZATION = 'authorization',
  
  // Data validation and processing errors
  VALIDATION = 'validation',
  DATA_PROCESSING = 'data_processing',
  DATA_INTEGRITY = 'data_integrity',
  
  // API interaction errors
  API_REQUEST = 'api_request',
  API_RESPONSE = 'api_response',
  THIRD_PARTY_API = 'third_party_api',
  
  // User interface errors
  UI_INTERACTION = 'ui_interaction',
  RENDERING = 'rendering',
  
  // Business logic errors
  BUSINESS_LOGIC = 'business_logic',
  WORKFLOW = 'workflow',
  
  // System errors
  INITIALIZATION = 'initialization',
  CONFIGURATION = 'configuration',
  RESOURCE = 'resource',
  
  // Uncategorized
  UNKNOWN = 'unknown'
}

// Severity levels for errors
export enum ErrorSeverity {
  LOW = 'low',       // Informational, doesn't affect functionality
  MEDIUM = 'medium', // Affects functionality but not critical
  HIGH = 'high',     // Critical error that prevents core functionality
  FATAL = 'fatal'    // Application cannot continue
}

// Enhanced error interface with additional metadata and ID
export interface AppError {
  id: string;         // Unique identifier for tracking
  message: string;    // User-friendly message
  category: ErrorCategory;
  severity: ErrorSeverity;
  originalError?: unknown;
  context?: Record<string, any>;
  timestamp: Date;
  sanitized: boolean; // Flag to indicate if sensitive data has been removed
  reported: boolean;  // Flag to indicate if the error has been reported to monitoring
  source?: string;    // Component or module where the error occurred
  userFriendlyMessage?: string; // Optional simplified message for end users
}

// Global error logging setting
let errorLoggingEnabled = true;
let monitoringEnabled = true;
let sanitizationEnabled = true;

// Sensitive data patterns to sanitize (regex patterns)
const SENSITIVE_PATTERNS = [
  // Email addresses
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  // Credit card numbers (basic pattern)
  /\b(?:\d{4}[ -]?){3}\d{4}\b/g,
  // API keys and tokens (common formats)
  /\b[A-Za-z0-9-_]{20,}\b/g,
  // Phone numbers
  /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
  // Social security numbers
  /\b\d{3}-\d{2}-\d{4}\b/g,
  // Password fields
  /password['"]?\s*:\s*['"].*?['"]/gi,
  // Auth tokens
  /bearer\s+[a-zA-Z0-9._-]+/gi
];

/**
 * Sanitize error messages and context to remove sensitive information
 */
function sanitizeErrorData(data: any): any {
  if (!sanitizationEnabled) return data;
  
  if (typeof data === 'string') {
    let sanitized = data;
    SENSITIVE_PATTERNS.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '[REDACTED]');
    });
    return sanitized;
  }
  
  if (data === null || data === undefined) return data;
  
  if (Array.isArray(data)) {
    return data.map(item => sanitizeErrorData(item));
  }
  
  if (typeof data === 'object') {
    const sanitizedObj: Record<string, any> = {};
    
    // Skip sanitization for specific error types
    if (data instanceof Error && data.name && data.message) {
      return {
        name: data.name,
        message: sanitizeErrorData(data.message),
        stack: data.stack ? sanitizeErrorData(data.stack) : undefined
      };
    }
    
    // Process all other objects
    for (const key in data) {
      // Skip sanitizing certain properties
      if (key === 'timestamp' || key === 'id' || key === 'category' || key === 'severity') {
        sanitizedObj[key] = data[key];
      } else {
        sanitizedObj[key] = sanitizeErrorData(data[key]);
      }
    }
    return sanitizedObj;
  }
  
  return data;
}

/**
 * Generate a unique ID for errors
 */
function generateErrorId(): string {
  return `error-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create a structured error object with enhanced metadata
 */
export function createError(
  message: string,
  category: ErrorCategory = ErrorCategory.UNKNOWN,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  originalError?: unknown,
  context?: Record<string, any>,
  source?: string
): AppError {
  const id = generateErrorId();
  const timestamp = new Date();
  
  // Sanitize sensitive data if enabled
  const sanitizedMessage = sanitizationEnabled ? sanitizeErrorData(message) : message;
  const sanitizedContext = sanitizationEnabled ? sanitizeErrorData(context) : context;
  
  // Create user-friendly version of the message
  const userFriendlyMessage = createUserFriendlyMessage(sanitizedMessage, severity);
  
  return {
    id,
    message: sanitizedMessage,
    category,
    severity,
    originalError,
    context: sanitizedContext,
    timestamp,
    sanitized: sanitizationEnabled,
    reported: false,
    source,
    userFriendlyMessage
  };
}

/**
 * Create a user-friendly error message based on severity and the original message
 */
function createUserFriendlyMessage(message: string, severity: ErrorSeverity): string {
  // For high and fatal errors, use a generic message
  if (severity === ErrorSeverity.HIGH || severity === ErrorSeverity.FATAL) {
    return "We encountered an unexpected error. Our team has been notified.";
  }
  
  // For medium errors, simplify the message
  if (severity === ErrorSeverity.MEDIUM) {
    // Extract the first sentence or phrase up to 100 characters
    const simplifiedMessage = message.split(/[.!?]/).filter(s => s.trim())[0];
    if (simplifiedMessage && simplifiedMessage.length <= 100) {
      return simplifiedMessage;
    }
    return "Something went wrong. Please try again.";
  }
  
  // For low severity, use the original message if it's concise
  if (message.length <= 150) {
    return message;
  }
  
  return "There was a minor issue. Please try again if needed.";
}

/**
 * Report error to monitoring service
 */
async function reportToMonitoring(error: AppError): Promise<void> {
  if (!monitoringEnabled) return;
  
  try {
    // Simulation of sending to a monitoring service
    console.info(`[Monitor] Reporting error ${error.id} to monitoring service`);
    
    // Here you would typically send the error to a service like Sentry, LogRocket, etc.
    // Example with Sentry (commented out):
    
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error.originalError || error.message, {
    //     level: error.severity,
    //     tags: { 
    //       category: error.category,
    //       source: error.source || 'unknown'
    //     },
    //     contexts: {
    //       context: error.context || {}
    //     }
    //   });
    // }
    
    // Mark as reported
    error.reported = true;
  } catch (reportingError) {
    // Don't let reporting errors cause more issues
    console.error('Error while reporting to monitoring:', reportingError);
  }
}

/**
 * Handle an error with consistent formatting, sanitization, and optional monitoring
 */
export function handleError(
  error: AppError | Error | string,
  showToast: boolean = true,
  reportToMonitoring: boolean = true,
  throwError: boolean = false
): AppError {
  // Convert to AppError if it's not already
  const appError: AppError = typeof error === 'string'
    ? createError(error)
    : 'category' in error && 'id' in error
      ? error as AppError
      : createError(error.message, ErrorCategory.UNKNOWN, ErrorSeverity.MEDIUM, error);
  
  // Ensure the error is sanitized
  if (!appError.sanitized && sanitizationEnabled) {
    appError.message = sanitizeErrorData(appError.message);
    if (appError.context) {
      appError.context = sanitizeErrorData(appError.context);
    }
    appError.sanitized = true;
  }
  
  // Log the error asynchronously if logging is enabled
  if (errorLoggingEnabled) {
    const logLevel = appError.severity === ErrorSeverity.FATAL || 
                    appError.severity === ErrorSeverity.HIGH ? 'error' : 
                    appError.severity === ErrorSeverity.MEDIUM ? 'warn' : 'info';
                    
    logErrorAsync(
      `[${appError.id}] [${appError.category.toUpperCase()}] ${appError.message}`,
      {
        severity: appError.severity,
        timestamp: appError.timestamp,
        context: appError.context,
        originalError: appError.originalError,
        source: appError.source
      },
      logLevel
    );
  }
  
  // Report to monitoring if enabled and requested
  if (reportToMonitoring && monitoringEnabled && !appError.reported) {
    // Fixed: Don't treat reportToMonitoring as a boolean, call the function directly
    void reportToMonitoring(appError);
  }
  
  // Show toast notification if requested - this is synchronous and user-facing
  if (showToast) {
    const message = appError.userFriendlyMessage || appError.message;
    
    toast.error(message, {
      description: appError.severity === ErrorSeverity.HIGH || appError.severity === ErrorSeverity.FATAL
        ? 'Please try again or contact support if the problem persists.'
        : undefined,
      duration: getSeverityDuration(appError.severity),
      id: appError.id // Use the error ID as the toast ID for deduplication
    });
  }
  
  // Throw the error if requested
  if (throwError) {
    throw new Error(`[${appError.id}] ${appError.message}`);
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
 * Enable or disable error monitoring
 */
export function setMonitoringEnabled(enabled: boolean): void {
  monitoringEnabled = enabled;
}

/**
 * Enable or disable sanitization of sensitive data
 */
export function setSanitizationEnabled(enabled: boolean): void {
  sanitizationEnabled = enabled;
}

/**
 * Create a safe wrapper for functions that might throw errors
 * with asynchronous error logging and sanitization
 */
export function withErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  errorMessage: string = 'An error occurred',
  category: ErrorCategory = ErrorCategory.UNKNOWN,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  showToast: boolean = true,
  reportToMonitoring: boolean = true,
  source?: string
): (...args: Parameters<T>) => ReturnType<T> | null {
  return (...args: Parameters<T>): ReturnType<T> | null => {
    try {
      return fn(...args);
    } catch (error) {
      handleError(
        createError(errorMessage, category, severity, error, { args }, source),
        showToast,
        reportToMonitoring
      );
      return null;
    }
  };
}

/**
 * Create a safe wrapper for async functions that might throw errors
 * with asynchronous error logging and sanitization
 */
export function withAsyncErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  errorMessage: string = 'An error occurred',
  category: ErrorCategory = ErrorCategory.UNKNOWN,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  showToast: boolean = true,
  reportToMonitoring: boolean = true,
  source?: string
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | null> {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | null> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(
        createError(errorMessage, category, severity, error, { args }, source),
        showToast,
        reportToMonitoring
      );
      return null;
    }
  };
}

/**
 * Initialize error handling system
 * Setup global error handlers
 */
export function initErrorHandling(options?: {
  enableLogging?: boolean;
  enableMonitoring?: boolean;
  enableSanitization?: boolean;
}): void {
  // Set global settings
  if (options) {
    if (options.enableLogging !== undefined) {
      errorLoggingEnabled = options.enableLogging;
    }
    if (options.enableMonitoring !== undefined) {
      monitoringEnabled = options.enableMonitoring;
    }
    if (options.enableSanitization !== undefined) {
      sanitizationEnabled = options.enableSanitization;
    }
  }
  
  // Use imported function directly instead of requiring it
  registerGlobalErrorHandlers();
  
  console.info('[Error Handling] Enhanced asynchronous error handling system initialized');
  console.info(`[Error Handling] Settings: logging=${errorLoggingEnabled}, monitoring=${monitoringEnabled}, sanitization=${sanitizationEnabled}`);
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
