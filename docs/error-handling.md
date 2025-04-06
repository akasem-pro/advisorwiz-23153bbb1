
# Error Handling System

## Overview

AdvisorWiz implements a comprehensive error handling system designed to provide robust error management with minimal impact on application performance. The system handles errors asynchronously, categorizes them by severity, and provides appropriate user feedback.

## Key Components

### Asynchronous Error Logger

The core of our error handling is the asynchronous error logger (`asyncErrorLogger.ts`), which provides:

- **Non-blocking error logging**: Errors are logged without blocking the main thread
- **Error queuing**: Errors are queued and processed asynchronously
- **Structured logging**: Errors are formatted consistently with timestamp, severity, and context
- **Automatic flushing**: Logs are automatically flushed on page unload

```typescript
// Example usage
import { logErrorAsync } from '@/utils/errorHandling/asyncErrorLogger';

try {
  // Your code here
} catch (error) {
  logErrorAsync(
    'Failed to process data', 
    error, 
    'error',
    'DataProcessor.process'
  );
}
```

### Error Categories and Severity

Errors are categorized by type and severity to facilitate prioritization and handling:

```typescript
enum ErrorCategory {
  NETWORK = 'network',
  AUTH = 'authentication',
  VALIDATION = 'validation',
  DATABASE = 'database',
  UNKNOWN = 'unknown'
}

enum ErrorSeverity {
  LOW = 'low',       // Informational, doesn't affect functionality
  MEDIUM = 'medium', // Affects functionality but not critical
  HIGH = 'high',     // Critical error that prevents core functionality
  FATAL = 'fatal'    // Application cannot continue
}
```

### Error Handlers

The application provides several utilities for handling errors:

1. **`handleError`**: General error handler that logs errors and shows toast notifications
2. **`withErrorHandling`**: Higher-order function that wraps synchronous functions with error handling
3. **`withAsyncErrorHandling`**: Higher-order function that wraps asynchronous functions with error handling
4. **`handleSupabaseError`**: Specialized handler for Supabase-related errors

### Global Error Handlers

The application registers global handlers for:

- Unhandled promise rejections
- Uncaught exceptions
- React error boundaries

## User Feedback

Errors are reported to users through:

1. **Toast Notifications**: For transient errors
2. **Inline Feedback**: For form validation and field-specific errors
3. **Error Pages**: For critical application errors

## Error Tracking and Analysis

Errors are tracked and analyzed through:

1. **Error Aggregation**: Similar errors are grouped for analysis
2. **Error Trends**: The system identifies increasing error rates
3. **Impact Assessment**: Errors are correlated with user actions and business metrics

## Best Practices

When working with the error handling system:

1. **Always categorize errors** by type and severity
2. **Provide context** including the source of the error
3. **Only show user-friendly messages** to end-users
4. **Log detailed technical information** for debugging
5. **Use higher-order error handling functions** for consistent handling

## Example Implementation

```typescript
import { 
  handleError, 
  createError, 
  ErrorCategory, 
  ErrorSeverity 
} from '@/utils/errorHandling';

try {
  const result = await fetchData();
  return result;
} catch (error) {
  handleError(
    createError(
      'Unable to load data', 
      ErrorCategory.NETWORK, 
      ErrorSeverity.MEDIUM,
      error
    ),
    true // Show toast notification
  );
  return null;
}
```

## Error Handling in Components

Use the `useEnhancedFeedback` hook for component-level error handling:

```typescript
const { showError } = useEnhancedFeedback();

try {
  // Component code
} catch (error) {
  showError('Failed to process request', 'Error', {
    errorDetails: error,
    errorSeverity: 'HIGH'
  });
}
```
