
/*
 * Example file demonstrating how to use the enhanced error handling system.
 * This file is for documentation purposes only and is not meant to be imported.
 */

import { 
  ErrorCategory, 
  ErrorSeverity,
  createError,
  handleError,
  withErrorHandling,
  withAsyncErrorHandling,
  classifyError
} from './index';

import { useEnhancedErrorHandler } from '../../hooks/use-enhanced-error-handler';

// Example 1: Basic error handling
function basicErrorHandling() {
  try {
    // Some code that might throw an error
    throw new Error("Network request failed");
  } catch (error) {
    // Handle with our enhanced error system
    handleError(
      createError(
        "Failed to fetch data",
        ErrorCategory.NETWORK,
        ErrorSeverity.MEDIUM,
        error,
        { operation: "fetchUserData", userId: "123" },
        "UserDataComponent"
      )
    );
  }
}

// Example 2: Using wrapper functions for error handling
const riskyFunction = () => {
  // Some code that might throw
  throw new Error("Validation failed");
};

const safeSyncFunction = withErrorHandling(
  riskyFunction,
  "Data validation failed",
  ErrorCategory.VALIDATION,
  ErrorSeverity.LOW
);

// Example 3: Handling async errors
const fetchData = async () => {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error(`API responded with ${response.status}`);
  }
  return response.json();
};

const safeFetchData = withAsyncErrorHandling(
  fetchData,
  "Failed to fetch data from API",
  ErrorCategory.API_REQUEST,
  ErrorSeverity.MEDIUM
);

// Example 4: Using the hook in a React component
function ExampleComponent() {
  const { 
    handleError, 
    withEnhancedErrorHandling, 
    withEnhancedAsyncErrorHandling,
    showRetryableError 
  } = useEnhancedErrorHandler();
  
  const handleClick = () => {
    try {
      // Some code that might throw
      throw new Error("Failed to process click");
    } catch (error) {
      handleError(error, "Error processing your request", {
        category: ErrorCategory.UI_INTERACTION,
        context: { action: 'button_click' }
      });
    }
  };
  
  // Example of a retryable error
  const fetchWithRetry = async () => {
    try {
      const result = await fetch('/api/data');
      return result.json();
    } catch (error) {
      showRetryableError(
        error as Error,
        fetchWithRetry, // The retry function
        {
          category: ErrorCategory.NETWORK,
          context: { endpoint: '/api/data' }
        }
      );
      return null;
    }
  };
  
  // Safe versions of functions using the hook's wrappers
  const safeHandleClick = withEnhancedErrorHandling(
    handleClick,
    "Error handling your click",
    { category: ErrorCategory.UI_INTERACTION }
  );
  
  const safeFetchData = withEnhancedAsyncErrorHandling(
    fetchWithRetry,
    "Failed to load data",
    { category: ErrorCategory.API_REQUEST }
  );
  
  return null; // React component would return JSX here
}

// Example 5: Auto-classification of errors
function autoClassifyExample() {
  try {
    // Some code that might throw
    throw new Error("Network connection timeout");
  } catch (error) {
    // Classify the error automatically based on its message
    const errorClassification = classifyError(
      error instanceof Error ? error.message : String(error)
    );
    
    // Use the classification to handle the error
    handleError(
      createError(
        "Operation failed",
        errorClassification.category,
        errorClassification.severity,
        error
      ),
      true,
      errorClassification.shouldReport
    );
  }
}
