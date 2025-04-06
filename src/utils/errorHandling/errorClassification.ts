
import { ErrorCategory, ErrorSeverity } from './errorHandler';

/**
 * Interface defining error classification rules
 */
export interface ErrorClassificationRule {
  category: ErrorCategory;
  defaultSeverity: ErrorSeverity;
  patterns: RegExp[];
  requiresUrgentAttention: boolean;
  shouldReport: boolean;
  retryable: boolean;
  userFacingMessage?: string;
}

/**
 * Predefined classification rules for common errors
 */
export const errorClassificationRules: ErrorClassificationRule[] = [
  // Network errors
  {
    category: ErrorCategory.NETWORK,
    defaultSeverity: ErrorSeverity.MEDIUM,
    patterns: [
      /network/i,
      /internet/i,
      /connection refused/i,
      /timeout/i,
      /offline/i,
      /cors/i,
      /socket/i
    ],
    requiresUrgentAttention: false,
    shouldReport: true,
    retryable: true,
    userFacingMessage: "Network connection issue. Please check your internet connection and try again."
  },
  
  // Authentication errors
  {
    category: ErrorCategory.AUTH,
    defaultSeverity: ErrorSeverity.MEDIUM,
    patterns: [
      /unauthorized/i,
      /unauthenticated/i,
      /invalid token/i,
      /invalid credentials/i,
      /login failed/i,
      /password incorrect/i,
      /jwt expired/i
    ],
    requiresUrgentAttention: false,
    shouldReport: true,
    retryable: false,
    userFacingMessage: "Your session has expired or you don't have permission. Please sign in again."
  },
  
  // Authorization errors
  {
    category: ErrorCategory.AUTHORIZATION,
    defaultSeverity: ErrorSeverity.MEDIUM,
    patterns: [
      /forbidden/i,
      /permission denied/i,
      /access denied/i,
      /not allowed/i,
      /insufficient privileges/i
    ],
    requiresUrgentAttention: false,
    shouldReport: true,
    retryable: false,
    userFacingMessage: "You don't have permission to perform this action."
  },
  
  // Database errors
  {
    category: ErrorCategory.DATABASE,
    defaultSeverity: ErrorSeverity.HIGH,
    patterns: [
      /database/i,
      /db error/i,
      /sql/i,
      /query failed/i,
      /connection pool/i,
      /foreign key/i,
      /constraint/i,
      /duplicate entry/i
    ],
    requiresUrgentAttention: true,
    shouldReport: true,
    retryable: false,
    userFacingMessage: "We're experiencing database issues. Please try again later."
  },
  
  // Validation errors
  {
    category: ErrorCategory.VALIDATION,
    defaultSeverity: ErrorSeverity.LOW,
    patterns: [
      /validation/i,
      /invalid input/i,
      /invalid format/i,
      /required field/i,
      /must be a/i,
      /too short/i,
      /too long/i
    ],
    requiresUrgentAttention: false,
    shouldReport: false,
    retryable: false,
    userFacingMessage: "Please check your input and try again."
  },
  
  // API errors
  {
    category: ErrorCategory.API_REQUEST,
    defaultSeverity: ErrorSeverity.MEDIUM,
    patterns: [
      /api/i,
      /endpoint/i,
      /request failed/i,
      /status code/i,
      /bad request/i,
      /not found/i
    ],
    requiresUrgentAttention: false,
    shouldReport: true,
    retryable: true,
    userFacingMessage: "Error connecting to service. Please try again."
  },
  
  // Third-party API errors
  {
    category: ErrorCategory.THIRD_PARTY_API,
    defaultSeverity: ErrorSeverity.MEDIUM,
    patterns: [
      /third party/i,
      /external service/i,
      /provider/i,
      /gateway/i
    ],
    requiresUrgentAttention: false,
    shouldReport: true,
    retryable: true,
    userFacingMessage: "Error with external service. Please try again later."
  },
  
  // Resource errors
  {
    category: ErrorCategory.RESOURCE,
    defaultSeverity: ErrorSeverity.MEDIUM,
    patterns: [
      /out of memory/i,
      /resource/i,
      /capacity/i,
      /limit exceeded/i,
      /quota/i
    ],
    requiresUrgentAttention: true,
    shouldReport: true,
    retryable: false,
    userFacingMessage: "System resources are currently limited. Please try again later."
  },
  
  // UI rendering errors
  {
    category: ErrorCategory.RENDERING,
    defaultSeverity: ErrorSeverity.MEDIUM,
    patterns: [
      /render/i,
      /component/i,
      /element/i,
      /dom/i,
      /react/i,
      /undefined is not an object/i,
      /cannot read property/i
    ],
    requiresUrgentAttention: false,
    shouldReport: true,
    retryable: false,
    userFacingMessage: "There was a display error. Please refresh the page."
  }
];

/**
 * Classify an error based on its message and context
 */
export function classifyError(
  errorMessage: string,
  context?: Record<string, any>
): {
  category: ErrorCategory;
  severity: ErrorSeverity;
  requiresUrgentAttention: boolean;
  shouldReport: boolean;
  retryable: boolean;
  userFacingMessage?: string;
} {
  // Default classification
  let classification = {
    category: ErrorCategory.UNKNOWN,
    severity: ErrorSeverity.MEDIUM,
    requiresUrgentAttention: false,
    shouldReport: true,
    retryable: false,
    userFacingMessage: "An unexpected error occurred. Please try again."
  };
  
  // Check against all classification rules
  for (const rule of errorClassificationRules) {
    if (rule.patterns.some(pattern => pattern.test(errorMessage))) {
      classification = {
        category: rule.category,
        severity: rule.defaultSeverity,
        requiresUrgentAttention: rule.requiresUrgentAttention,
        shouldReport: rule.shouldReport,
        retryable: rule.retryable,
        userFacingMessage: rule.userFacingMessage
      };
      break;
    }
  }
  
  // Additional severity adjustments based on context
  if (context) {
    // Increase severity for errors affecting multiple users
    if (context.affectedUsers && typeof context.affectedUsers === 'number' && context.affectedUsers > 10) {
      classification.severity = ErrorSeverity.HIGH;
      classification.requiresUrgentAttention = true;
    }
    
    // Increase severity for critical operations
    if (context.operationType === 'payment' || context.operationType === 'data_migration') {
      classification.severity = ErrorSeverity.HIGH;
      classification.requiresUrgentAttention = true;
    }
  }
  
  return classification;
}

/**
 * Get user-friendly message for an error category
 */
export function getUserFriendlyMessage(category: ErrorCategory): string {
  const rule = errorClassificationRules.find(r => r.category === category);
  return rule?.userFacingMessage || "An unexpected error occurred. Please try again.";
}
