
import { PerformanceMetric, PERSISTED_METRICS_KEY } from './types';

/**
 * Persist metric to localStorage
 */
export const persistMetric = (metric: PerformanceMetric): void => {
  try {
    const storedMetrics: PerformanceMetric[] = JSON.parse(
      localStorage.getItem(PERSISTED_METRICS_KEY) || '[]'
    );
    
    // Add the metric
    storedMetrics.push(metric);
    
    // Limit the number of stored metrics to prevent localStorage overflow
    const trimmedMetrics = storedMetrics.slice(-100);
    
    // Save back to localStorage
    localStorage.setItem(PERSISTED_METRICS_KEY, JSON.stringify(trimmedMetrics));
  } catch (error) {
    console.error('Error persisting performance metric:', error);
  }
};

/**
 * Get persisted metrics from localStorage
 */
export const getPersistedMetrics = (): PerformanceMetric[] => {
  try {
    return JSON.parse(localStorage.getItem(PERSISTED_METRICS_KEY) || '[]');
  } catch (error) {
    console.error('Error retrieving persisted metrics:', error);
    return [];
  }
};

/**
 * Clear persisted metrics
 */
export const clearPersistedMetrics = (): void => {
  localStorage.removeItem(PERSISTED_METRICS_KEY);
};
