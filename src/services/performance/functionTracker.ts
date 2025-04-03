
import { trackPerformanceMetric } from './trackingUtils';

/**
 * Performance monitoring for functions
 */
export function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  fnName: string
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const startTime = performance.now();
    
    // Use performance mark for more detailed profiling in DevTools
    performance.mark(`${fnName}-start`);
    
    try {
      const result = fn(...args);
      
      // Handle promises specially
      if (result instanceof Promise) {
        return result.finally(() => {
          const endTime = performance.now();
          const duration = endTime - startTime;
          
          performance.mark(`${fnName}-end`);
          performance.measure(fnName, `${fnName}-start`, `${fnName}-end`);
          
          trackPerformanceMetric(`function_${fnName}`, duration, {
            tags: {
              async: 'true',
              argCount: args.length.toString()
            }
          });
        }) as ReturnType<T>;
      }
      
      // For synchronous functions
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      performance.mark(`${fnName}-end`);
      performance.measure(fnName, `${fnName}-start`, `${fnName}-end`);
      
      trackPerformanceMetric(`function_${fnName}`, duration, {
        tags: {
          async: 'false',
          argCount: args.length.toString()
        }
      });
      
      return result;
    } catch (error) {
      // Still track performance even if there's an error
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      trackPerformanceMetric(`function_${fnName}_error`, duration, {
        tags: {
          error: 'true',
          errorType: error instanceof Error ? error.name : 'unknown'
        }
      });
      
      throw error;
    }
  };
}
