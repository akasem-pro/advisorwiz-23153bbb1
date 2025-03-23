
// Export DataResult interface for consistent return types
export interface DataResult<T> {
  data: T | null;
  error: string | null;
  isFromCache: boolean;
}

// Common performance tracking function
export const trackPerformance = (
  functionName: string, 
  executionTime: number, 
  inputSize: number = 0
): void => {
  try {
    // This could be expanded to actually log performance metrics
    console.debug(`Performance: ${functionName} took ${Math.round(executionTime)}ms for ${inputSize} items`);
  } catch (error) {
    console.error('Error tracking performance:', error);
  }
};
