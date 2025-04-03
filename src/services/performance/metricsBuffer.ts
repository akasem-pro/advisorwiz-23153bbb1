
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
