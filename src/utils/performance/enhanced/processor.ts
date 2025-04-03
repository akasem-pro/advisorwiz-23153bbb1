
import { trackPerformance } from '../core';
import { getPersistedMetrics, clearPersistedMetrics } from './storage';

/**
 * Process persisted metrics from previous sessions
 */
export const processPersistedMetrics = (): void => {
  try {
    const persistedMetrics = getPersistedMetrics();
    
    if (persistedMetrics.length > 0) {
      console.log(`Processing ${persistedMetrics.length} persisted metrics`);
      
      // Process only unique metrics to avoid duplication
      const uniqueMetrics = new Map();
      
      persistedMetrics.forEach((metric) => {
        uniqueMetrics.set(metric.name, metric);
      });
      
      // Track the persisted metrics
      uniqueMetrics.forEach((metric) => {
        trackPerformance(metric.name, metric.value, {
          ...(metric.tags || {}),
          persisted: 'true'
        });
      });
      
      // Clear persisted metrics
      clearPersistedMetrics();
    }
  } catch (error) {
    console.error('Error processing persisted metrics:', error);
  }
};
