
import { flushMetricsBuffer } from '../../utils/performance/enhanced';
import { clearMetricsBuffer, shouldFlushBuffer, getCurrentMetrics } from './metricsBuffer';
import { trackPerformanceMetric } from './trackingUtils';

/**
 * Flush metrics buffer
 */
export const flushMetrics = async (): Promise<void> => {
  const metrics = getCurrentMetrics();
  if (metrics.length === 0) return;
  
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
 * Initialize event listeners for auto-flushing
 */
export const initMetricsEventListeners = (): void => {
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
  
  // Periodic check for flushing based on buffer size
  setInterval(() => {
    if (shouldFlushBuffer()) {
      flushMetrics();
    }
  }, 10000); // Check every 10 seconds
};
