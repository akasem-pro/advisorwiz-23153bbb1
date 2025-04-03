
import { trackEnhancedPerformance } from './tracker';
import { processPersistedMetrics } from './processor';
import { setupMetricsEventListeners } from './eventListeners';
import { getFlushTimer, setFlushTimer, updateLastFlushTime, flushBuffer } from './buffer';

/**
 * Flush the metrics buffer with deduplication and grouping for more efficient processing
 */
export const flushMetricsBuffer = async (): Promise<void> => {
  try {
    // Reset flush timer
    if (getFlushTimer() !== null) {
      window.clearTimeout(getFlushTimer());
      setFlushTimer(null);
    }
    
    updateLastFlushTime();
    
    // Flush the buffer
    await flushBuffer();
  } catch (error) {
    console.error('Error in flushMetricsBuffer:', error);
  }
};

/**
 * Initialize the enhanced performance tracking system
 */
export const initEnhancedPerformanceTracking = (): void => {
  // Process any metrics persisted from previous sessions
  processPersistedMetrics();
  
  // Set up event listeners
  setupMetricsEventListeners();
  
  // Log initialization
  console.log('Enhanced performance tracking initialized');
};

// Export the main tracking function
export { trackEnhancedPerformance };
