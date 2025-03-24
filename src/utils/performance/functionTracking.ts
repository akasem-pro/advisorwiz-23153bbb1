
import { trackPerformance } from './core';

// Performance wrapper for functions
export function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  fnName: string
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const startTime = performance.now();
    
    // Use performance mark for more detailed profiling in DevTools
    performance.mark(`${fnName}-start`);
    
    const result = fn(...args);
    
    const endTime = performance.now();
    performance.mark(`${fnName}-end`);
    performance.measure(fnName, `${fnName}-start`, `${fnName}-end`);
    
    trackPerformance(fnName, endTime - startTime, { argCount: args.length.toString() });
    
    return result;
  };
}
