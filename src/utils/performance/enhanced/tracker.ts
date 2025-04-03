
import { MetricData } from './types';
import { addToBuffer, shouldFlushImmediately } from './buffer';
import { persistMetricToStorage } from './storage';
import { scheduleFlush } from './scheduler';

/**
 * Track performance metric with improved batching and persistence
 */
export const trackEnhancedPerformance = (
  metricName: string,
  metricValue: number,
  options?: {
    tags?: Record<string, string>;
    persist?: boolean;  // Whether to persist this metric across page loads
    sendImmediately?: boolean;  // Whether to send immediately or batch
  }
): void => {
  // Create metric data object
  const now = Date.now();
  const metricData: MetricData = {
    name: metricName,
    value: metricValue,
    timestamp: now,
    tags: options?.tags,
    persistOnPageLoad: options?.persist
  };
  
  // Add to buffer
  addToBuffer(metricData);
  
  // If persistable, also add to localStorage
  if (options?.persist) {
    persistMetricToStorage(metricData);
  }
  
  // Either send immediately or schedule a flush
  if (options?.sendImmediately) {
    import('./index').then(module => module.flushMetricsBuffer());
  } else {
    scheduleFlush();
  }
};
