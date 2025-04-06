
import { recordPerformanceMark } from './webVitals';

interface PerformanceTrackingOptions {
  functionName?: string;
  componentName?: string;
  threshold?: number;
  logPerformance?: boolean;
  trackInAnalytics?: boolean;
}

/**
 * Higher-order function that wraps a function with performance tracking
 */
export function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  options: PerformanceTrackingOptions = {}
): T {
  const {
    functionName = fn.name || 'anonymous',
    threshold = 100,
    logPerformance = true,
    trackInAnalytics = false
  } = options;
  
  const wrappedFunction = function(this: any, ...args: Parameters<T>): ReturnType<T> {
    // Function start mark
    const startMarkName = `${functionName}-start`;
    const endMarkName = `${functionName}-end`;
    const measureName = `${functionName}-execution-time`;
    
    recordPerformanceMark(startMarkName);
    
    try {
      // Execute the original function
      const result = fn.apply(this, args);
      
      // Handle promises
      if (result instanceof Promise) {
        return result.then((value) => {
          // Record end mark after promise resolves
          recordPerformanceMark(endMarkName);
          measurePerformance();
          return value;
        }).catch((error) => {
          // Record end mark even if promise rejects
          recordPerformanceMark(endMarkName);
          measurePerformance();
          throw error;
        }) as ReturnType<T>;
      }
      
      // Record end mark for synchronous functions
      recordPerformanceMark(endMarkName);
      measurePerformance();
      return result;
    } catch (error) {
      // Record end mark even if function throws
      recordPerformanceMark(endMarkName);
      measurePerformance();
      throw error;
    }
    
    function measurePerformance() {
      if (typeof window === 'undefined' || !window.performance) return;
      
      try {
        // Measure execution time
        window.performance.measure(measureName, startMarkName, endMarkName);
        
        // Get the measurement
        const measurements = window.performance.getEntriesByName(measureName, 'measure');
        const duration = measurements.length > 0 ? measurements[0].duration : 0;
        
        // Log if above threshold or if logging is always enabled
        if (logPerformance && (duration > threshold || trackInAnalytics)) {
          console.log(`⏱️ ${functionName} took ${duration.toFixed(2)}ms to execute`);
        }
        
        // Track in analytics if enabled and above threshold
        if (trackInAnalytics && duration > threshold) {
          // Import analytics service dynamically to avoid circular dependencies
          import('../../services/analytics/analyticsService').then(module => {
            module.trackEvent('performance_metric', {
              function_name: functionName,
              duration_ms: Math.round(duration),
              threshold_ms: threshold
            });
          }).catch(err => {
            console.error('Failed to track performance in analytics:', err);
          });
        }
        
        // Clean up performance entries
        window.performance.clearMarks(startMarkName);
        window.performance.clearMarks(endMarkName);
        window.performance.clearMeasures(measureName);
      } catch (error) {
        console.error('Error measuring performance:', error);
      }
    }
  } as unknown as T;
  
  return wrappedFunction;
}

/**
 * Component performance tracking HOC
 */
export function trackComponentPerformance<T extends React.ComponentType<any>>(
  Component: T, 
  options: PerformanceTrackingOptions = {}
): T {
  // Implementation would go here
  return Component;
}
