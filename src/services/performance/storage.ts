import { PerformanceMetric, PERSISTED_METRICS_KEY } from './types';

/**
 * Persist metric to local storage
 */
export const persistMetric = (metric: PerformanceMetric): void => {
  try {
    // Get existing persisted metrics
    const persistedMetrics = getPersistedMetrics();
    
    // Add the new metric
    persistedMetrics.push(metric);
    
    // Limit the size to prevent excessive local storage usage (keep max 100 metrics)
    if (persistedMetrics.length > 100) {
      persistedMetrics.shift();
    }
    
    // Save back to local storage
    localStorage.setItem(PERSISTED_METRICS_KEY, JSON.stringify(persistedMetrics));
  } catch (error) {
    console.error('Error persisting performance metric:', error);
  }
};

/**
 * Get persisted metrics from local storage
 */
export const getPersistedMetrics = (): PerformanceMetric[] => {
  try {
    const storedMetrics = localStorage.getItem(PERSISTED_METRICS_KEY);
    return storedMetrics ? JSON.parse(storedMetrics) : [];
  } catch (error) {
    console.error('Error getting persisted metrics:', error);
    return [];
  }
};

/**
 * Clear persisted metrics from local storage
 */
export const clearPersistedMetrics = (): void => {
  try {
    localStorage.removeItem(PERSISTED_METRICS_KEY);
  } catch (error) {
    console.error('Error clearing persisted metrics:', error);
  }
};
