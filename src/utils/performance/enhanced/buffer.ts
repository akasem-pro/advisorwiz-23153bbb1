
import { storeAnalyticsMetric } from '../core';
import { MetricData, MAX_BUFFER_SIZE } from './types';

// Buffer for metrics that will be sent in batch
const metricsBuffer: MetricData[] = [];
let flushTimer: number | null = null;
let lastFlushTime = 0;

/**
 * Add metric to buffer
 */
export const addToBuffer = (metric: MetricData): void => {
  metricsBuffer.push(metric);
};

/**
 * Get current buffer contents
 */
export const getBufferContents = (): MetricData[] => {
  return [...metricsBuffer];
};

/**
 * Clear the metrics buffer
 */
export const clearBuffer = (): void => {
  metricsBuffer.length = 0;
};

/**
 * Check if buffer should be flushed immediately based on size or time
 */
export const shouldFlushImmediately = (): boolean => {
  const now = Date.now();
  return metricsBuffer.length >= MAX_BUFFER_SIZE || (now - lastFlushTime > 10000);
};

/**
 * Update the last flush time
 */
export const updateLastFlushTime = (): void => {
  lastFlushTime = Date.now();
};

/**
 * Get the current flush timer
 */
export const getFlushTimer = (): number | null => {
  return flushTimer;
};

/**
 * Set the flush timer
 */
export const setFlushTimer = (timer: number | null): void => {
  flushTimer = timer;
};

/**
 * Flush the metrics buffer with deduplication and grouping for more efficient processing
 */
export const flushBuffer = async (): Promise<void> => {
  if (metricsBuffer.length === 0) return;
  
  try {
    // Create a copy of the buffer for processing
    const metricsToSend = [...metricsBuffer];
    clearBuffer();
    
    // Group metrics by name for more efficient processing
    const metricsByName = metricsToSend.reduce((acc, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = [];
      }
      acc[metric.name].push(metric);
      return acc;
    }, {} as Record<string, MetricData[]>);
    
    // For each group, send only the most recent one
    Object.entries(metricsByName).forEach(([name, metrics]) => {
      // Sort by timestamp descending
      metrics.sort((a, b) => b.timestamp - a.timestamp);
      
      // Send only the most recent metric
      const mostRecent = metrics[0];
      storeAnalyticsMetric(mostRecent.name, mostRecent.value);
    });
  } catch (error) {
    console.error('Error flushing metrics buffer:', error);
    // Add back to buffer if sending fails - need to create a new metricsToSend variable here
    const failedMetrics = getBufferContents();
    failedMetrics.forEach(metric => addToBuffer(metric));
  }
};
