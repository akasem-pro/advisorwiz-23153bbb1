import { flushMetricsBuffer } from '../../utils/performance/enhanced';

// Define core types
interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

// Storage key for persisted metrics
const PERSISTED_METRICS_KEY = 'lovable_persisted_metrics';

// In-memory buffer for metrics
const metricsBuffer: PerformanceMetric[] = [];

/**
 * Track a performance metric
 */
export const trackPerformanceMetric = (
  metricName: string,
  metricValue: number,
  options?: {
    tags?: Record<string, string>;
    persist?: boolean;  // Whether to persist this metric across page loads
    sendImmediately?: boolean;  // Whether to send immediately or batch
  }
): void => {
  try {
    const metric: PerformanceMetric = {
      name: metricName,
      value: metricValue,
      timestamp: Date.now(),
      tags: options?.tags
    };
    
    // Add to metrics buffer
    metricsBuffer.push(metric);
    
    // If persist is enabled, store in localStorage
    if (options?.persist) {
      persistMetric(metric);
    }
    
    // Add performance marker for DevTools analysis
    performance.mark(`${metricName}-${Date.now()}`);
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${metricName}: ${metricValue}`, options?.tags);
    }
    
    // Send immediately if requested
    if (options?.sendImmediately) {
      flushMetrics();
    }
    // Otherwise, flush if buffer gets too large
    else if (metricsBuffer.length >= 20) {
      flushMetrics();
    }
  } catch (error) {
    console.error('Error tracking performance metric:', error);
  }
};

/**
 * Persist metric to localStorage
 */
const persistMetric = (metric: PerformanceMetric): void => {
  try {
    const storedMetrics: PerformanceMetric[] = JSON.parse(
      localStorage.getItem(PERSISTED_METRICS_KEY) || '[]'
    );
    
    // Add the metric
    storedMetrics.push(metric);
    
    // Limit the number of stored metrics to prevent localStorage overflow
    const trimmedMetrics = storedMetrics.slice(-100);
    
    // Save back to localStorage
    localStorage.setItem(PERSISTED_METRICS_KEY, JSON.stringify(trimmedMetrics));
  } catch (error) {
    console.error('Error persisting performance metric:', error);
  }
};

/**
 * Get persisted metrics from localStorage
 */
export const getPersistedMetrics = (): PerformanceMetric[] => {
  try {
    return JSON.parse(localStorage.getItem(PERSISTED_METRICS_KEY) || '[]');
  } catch (error) {
    console.error('Error retrieving persisted metrics:', error);
    return [];
  }
};

/**
 * Clear persisted metrics
 */
export const clearPersistedMetrics = (): void => {
  localStorage.removeItem(PERSISTED_METRICS_KEY);
};

/**
 * Get current metrics from buffer
 */
export const getCurrentMetrics = (): PerformanceMetric[] => {
  return [...metricsBuffer];
};

/**
 * Clear metrics buffer
 */
export const clearMetricsBuffer = (): void => {
  metricsBuffer.length = 0;
};

/**
 * Flush metrics buffer
 */
export const flushMetrics = async (): Promise<void> => {
  if (metricsBuffer.length === 0) return;
  
  try {
    // Use the enhanced performance tracking flush mechanism
    await flushMetricsBuffer();
    
    // Clear the buffer after successful flush
    clearMetricsBuffer();
  } catch (error) {
    console.error('Error flushing performance metrics:', error);
  }
};

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

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = (): void => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Set up event listeners for page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushMetrics();
    }
  });
  
  // Set up event listener for before unload
  window.addEventListener('beforeunload', () => {
    flushMetrics();
  });
  
  // Log initialization
  console.log('[Performance] Performance monitoring initialized');
};
