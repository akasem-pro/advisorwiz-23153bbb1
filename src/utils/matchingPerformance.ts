
// We don't need any import from web-vitals here since we're using the browser's built-in performance API
// Removing the incorrect import of 'now' from web-vitals

interface PerformanceData {
  functionName: string;
  executionTime: number;
  inputSize: number;
  timestamp: number;
}

let performanceData: PerformanceData[] = [];
const MAX_ENTRIES = 100; // Maximum number of entries to keep

/**
 * Track the performance of a function execution
 */
export const trackPerformance = (
  functionName: string,
  executionTime: number,
  inputSize: number = 0
): void => {
  // Add new entry
  performanceData.push({
    functionName,
    executionTime,
    inputSize,
    timestamp: Date.now()
  });
  
  // Trim if exceeding max size
  if (performanceData.length > MAX_ENTRIES) {
    performanceData = performanceData.slice(-MAX_ENTRIES);
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `Performance: ${functionName} executed in ${executionTime.toFixed(2)}ms with input size ${inputSize}`
    );
  }
};

/**
 * Get performance data for analysis
 */
export const getPerformanceData = (): PerformanceData[] => {
  return [...performanceData];
};

/**
 * Clear performance data
 */
export const clearPerformanceData = (): void => {
  performanceData = [];
};

/**
 * Performance wrapper for functions
 */
export function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  fnName: string
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const startTime = performance.now();
    const result = fn(...args);
    const endTime = performance.now();
    
    trackPerformance(fnName, endTime - startTime, args.length);
    
    return result;
  };
}
