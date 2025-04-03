
import { MetricData, MAX_BUFFER_SIZE, FLUSH_INTERVAL } from './types';
import { persistMetricToStorage } from './storage';

// Buffer to store metrics before sending them
const metricsBuffer: MetricData[] = [];
let flushTimer: number | null = null;
let lastFlushTime = Date.now();

/**
 * Add a metric to the buffer
 */
export const addToBuffer = (metric: MetricData): void => {
  metricsBuffer.push(metric);
  
  // Persist metric if needed
  if (metric.persistOnPageLoad) {
    persistMetricToStorage(metric);
  }
  
  // Schedule a flush if the buffer is getting large
  if (metricsBuffer.length >= MAX_BUFFER_SIZE / 2) {
    scheduleFlush();
  }
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
 * Update the last flush time
 */
export const updateLastFlushTime = (): void => {
  lastFlushTime = Date.now();
};

/**
 * Check if the buffer should be flushed immediately
 */
export const shouldFlushImmediately = (): boolean => {
  return (
    metricsBuffer.length >= MAX_BUFFER_SIZE ||
    Date.now() - lastFlushTime >= FLUSH_INTERVAL * 2
  );
};

/**
 * Get the contents of the buffer
 */
export const getBufferContents = (): MetricData[] => {
  return [...metricsBuffer];
};

/**
 * Flush the buffer and send metrics
 */
export const flushBuffer = async (): Promise<void> => {
  if (metricsBuffer.length === 0) return;
  
  try {
    // In a real implementation, this would send metrics to a server
    console.log(`Flushing ${metricsBuffer.length} metrics`);
    
    // Process and group metrics
    const groupedMetrics = groupMetricsByName(metricsBuffer);
    
    // Clear the buffer
    metricsBuffer.length = 0;
    
    // Return the processed metrics (not really needed in production)
    return Promise.resolve();
  } catch (error) {
    console.error('Error flushing metrics buffer:', error);
    return Promise.reject(error);
  }
};

/**
 * Group metrics by name for more efficient processing
 */
const groupMetricsByName = (metrics: MetricData[]): Record<string, MetricData[]> => {
  const grouped: Record<string, MetricData[]> = {};
  
  metrics.forEach(metric => {
    if (!grouped[metric.name]) {
      grouped[metric.name] = [];
    }
    
    grouped[metric.name].push(metric);
  });
  
  return grouped;
};

/**
 * Schedule a flush of the metrics buffer
 */
const scheduleFlush = (): void => {
  if (flushTimer !== null) return;
  
  flushTimer = window.setTimeout(() => {
    flushBuffer();
    flushTimer = null;
    updateLastFlushTime();
  }, FLUSH_INTERVAL);
};

/**
 * Clear the metrics buffer
 */
export const clearMetricsBuffer = (): void => {
  metricsBuffer.length = 0;
};
