
import { PerformanceMetric } from './types';

// In-memory buffer for metrics
const metricsBuffer: PerformanceMetric[] = [];

/**
 * Add metric to buffer
 */
export const addToBuffer = (metric: PerformanceMetric): void => {
  metricsBuffer.push(metric);
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
 * Check if buffer should be flushed based on size
 */
export const shouldFlushBuffer = (): boolean => {
  return metricsBuffer.length >= 20;
};

/**
 * Flush the metrics buffer
 * Returns the metrics that were in the buffer and clears it
 */
export const flushBuffer = (): PerformanceMetric[] => {
  const metrics = getCurrentMetrics();
  clearMetricsBuffer();
  return metrics;
};

/**
 * Get the current contents of the buffer without clearing it
 */
export const getBufferContents = (): PerformanceMetric[] => {
  return getCurrentMetrics();
};
