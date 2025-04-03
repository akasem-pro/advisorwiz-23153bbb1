import { MetricData, PERSISTED_METRICS_KEY } from './types';

/**
 * Persist metric to localStorage for retrieval on page reload
 * Uses a more efficient approach with size limits
 */
export const persistMetricToStorage = (metric: MetricData): void => {
  try {
    const existingMetrics = JSON.parse(localStorage.getItem(PERSISTED_METRICS_KEY) || '[]');
    existingMetrics.push(metric);
    
    // Keep only the most recent 100 metrics to avoid storage bloat
    const trimmedMetrics = existingMetrics.slice(-100);
    localStorage.setItem(PERSISTED_METRICS_KEY, JSON.stringify(trimmedMetrics));
  } catch (error) {
    console.error('Error persisting metric to storage:', error);
  }
};

/**
 * Retrieve persisted metrics from storage
 */
export const getPersistedMetrics = (): MetricData[] => {
  try {
    return JSON.parse(localStorage.getItem(PERSISTED_METRICS_KEY) || '[]');
  } catch (error) {
    console.error('Error retrieving persisted metrics:', error);
    return [];
  }
};

/**
 * Clear persisted metrics from storage
 */
export const clearPersistedMetrics = (): void => {
  try {
    localStorage.removeItem(PERSISTED_METRICS_KEY);
  } catch (error) {
    console.error('Error clearing persisted metrics:', error);
  }
};
