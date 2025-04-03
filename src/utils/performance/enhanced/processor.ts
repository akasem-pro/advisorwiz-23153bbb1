
import { getPersistedMetrics, clearPersistedMetrics } from './storage';
import { trackEnhancedPerformance } from './tracker';

/**
 * Process metrics that were persisted from previous sessions
 */
export const processPersistedMetrics = (): void => {
  try {
    // Get persisted metrics
    const persistedMetrics = getPersistedMetrics();
    
    // Process each metric
    if (persistedMetrics.length > 0) {
      console.log(`Processing ${persistedMetrics.length} persisted metrics`);
      
      // Re-track each persisted metric
      persistedMetrics.forEach(metric => {
        trackEnhancedPerformance(
          `persisted_${metric.name}`,
          metric.value,
          {
            tags: { ...metric.tags, persisted: 'true' },
            persist: false // Don't persist these again
          }
        );
      });
      
      // Clear persisted metrics after processing
      clearPersistedMetrics();
    }
  } catch (error) {
    console.error('Error processing persisted metrics:', error);
  }
};
