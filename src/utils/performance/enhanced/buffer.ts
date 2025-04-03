
import { MetricData, MAX_BUFFER_SIZE, PERSISTED_METRICS_KEY } from './types';
import { saveMetricsToStorage } from './storage';

// In-memory buffer for performance metrics
let metricsBuffer: MetricData[] = [];
let flushInProgress = false;

/**
 * Add a metric to the in-memory buffer
 * @param metric The performance metric to add
 */
export const addToBuffer = (metric: MetricData): void => {
  // Add to buffer
  metricsBuffer.push(metric);
  
  // If buffer exceeds max size, remove oldest metrics
  while (metricsBuffer.length > MAX_BUFFER_SIZE) {
    metricsBuffer.shift();
  }
};

/**
 * Flush the metrics buffer to storage
 * @returns True if the buffer was flushed successfully
 */
export const flushBuffer = async (): Promise<boolean> => {
  // Prevent multiple flush operations from running simultaneously
  if (flushInProgress || metricsBuffer.length === 0) {
    return false;
  }
  
  try {
    flushInProgress = true;
    
    // Get metrics to persist
    const persistedMetrics = metricsBuffer.filter(m => m.persistOnPageLoad);
    
    // Save persistent metrics to storage
    if (persistedMetrics.length > 0) {
      await saveMetricsToStorage(PERSISTED_METRICS_KEY, persistedMetrics);
    }
    
    // Clear the buffer after successful processing
    metricsBuffer = [];
    
    return true;
  } catch (error) {
    console.error('Error flushing performance metrics buffer:', error);
    return false;
  } finally {
    flushInProgress = false;
  }
};

/**
 * Get the current contents of the metrics buffer
 * @returns Array of metrics currently in the buffer
 */
export const getBufferContents = (): MetricData[] => {
  return [...metricsBuffer];
};

/**
 * Clear the metrics buffer without persisting
 */
export const clearMetricsBuffer = (): void => {
  metricsBuffer = [];
};
