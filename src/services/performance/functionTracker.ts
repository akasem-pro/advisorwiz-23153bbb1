
import { trackPerformanceMetric } from './trackingUtils';

/**
 * Wraps a function with performance tracking
 * 
 * @param fn The function to track
 * @param name The name of the function for tracking
 * @returns The wrapped function with performance tracking
 */
export function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now();
    try {
      const result = fn(...args);

      // Handle promises
      if (result instanceof Promise) {
        return result.finally(() => {
          const duration = performance.now() - start;
          trackPerformanceMetric(`fn_${name}`, duration, {
            tags: { function_name: name, async: 'true' }
          });
        }) as ReturnType<T>;
      }

      // Handle synchronous functions
      const duration = performance.now() - start;
      trackPerformanceMetric(`fn_${name}`, duration, {
        tags: { function_name: name, async: 'false' }
      });
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      trackPerformanceMetric(`fn_${name}_error`, duration, {
        tags: { function_name: name, error: 'true' }
      });
      throw error;
    }
  }) as T;
}

/**
 * Track the performance of a function invocation
 * 
 * @param functionName The name of the function
 * @param duration The duration of the function execution in ms
 * @param metadata Additional metadata about the function execution
 */
export function trackFunctionPerformance(
  functionName: string,
  duration: number,
  metadata?: Record<string, any>
): void {
  trackPerformanceMetric(`fn_${functionName}`, duration, {
    tags: { ...metadata, function_name: functionName }
  });
}
