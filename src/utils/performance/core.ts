
// Core performance tracking utility functions

/**
 * Tracks performance of a function
 * @param functionName Name of the function being tracked
 * @param executionTime Time taken in milliseconds
 * @param itemCount Optional number of items processed for context
 */
export function trackPerformance(
  functionName: string, 
  executionTime: number,
  itemCount: number = 0
): void {
  try {
    if (process.env.NODE_ENV === 'production') {
      // In production, we might want to send this to an analytics service
      console.debug(`[Performance] ${functionName}: ${Math.round(executionTime)}ms for ${itemCount} items`);
    } else {
      // In development, log more details for debugging
      const message = itemCount > 0 
        ? `${functionName} took ${Math.round(executionTime)}ms for ${itemCount} items (${Math.round(executionTime/itemCount)}ms/item)`
        : `${functionName} took ${Math.round(executionTime)}ms`;
      
      console.debug(`[Performance] ${message}`);
    }
  } catch (error) {
    // Fail silently - performance tracking should never affect the application
    console.error('[Performance] Error tracking performance', error);
  }
}

// Storage for performance metrics
const performanceData: Record<string, {
  totalTime: number;
  calls: number;
  avgTime: number;
  lastCalled: number;
}> = {};

/**
 * Get collected performance data for analysis
 */
export function getPerformanceData() {
  return performanceData;
}

/**
 * Clear collected performance data
 */
export function clearPerformanceData() {
  Object.keys(performanceData).forEach(key => {
    delete performanceData[key];
  });
}

/**
 * Store a metric in performance data
 */
export function storeAnalyticsMetric(metricName: string, value: number) {
  // This could be expanded to send data to a backend analytics service
  console.log(`[Analytics] ${metricName}: ${value}`);
}

/**
 * Create a debounced function that delays invoking func until after wait milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Create a throttled function that only invokes func at most once per threshold milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  threshold: number
): (...args: Parameters<T>) => void {
  let last: number = 0;
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    const now = Date.now();
    const remaining = threshold - (now - last);
    
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      
      last = now;
      func(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        last = Date.now();
        timeout = null;
        func(...args);
      }, remaining);
    }
  };
}
