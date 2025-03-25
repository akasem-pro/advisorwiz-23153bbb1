import { trackPerformance, storeAnalyticsMetric } from './core';

// Local storage key for persisted metrics
const PERSISTED_METRICS_KEY = 'lovable_persisted_metrics';

// Interface for metric data
interface MetricData {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
  persistOnPageLoad?: boolean;
}

// Buffer for metrics that will be sent in batch
const metricsBuffer: MetricData[] = [];

/**
 * Track performance metric with improved batching and persistence
 */
export const trackEnhancedPerformance = (
  metricName: string,
  metricValue: number,
  options?: {
    tags?: Record<string, string>;
    persist?: boolean;  // Whether to persist this metric across page loads
    sendImmediately?: boolean;  // Whether to send immediately or batch
  }
) => {
  const metricData: MetricData = {
    name: metricName,
    value: metricValue,
    timestamp: Date.now(),
    tags: options?.tags,
    persistOnPageLoad: options?.persist
  };
  
  // Add to buffer
  metricsBuffer.push(metricData);
  
  // If persistable, also add to localStorage
  if (options?.persist) {
    persistMetricToStorage(metricData);
  }
  
  // Either send immediately or check if buffer should be flushed
  if (options?.sendImmediately) {
    flushMetricsBuffer();
  } else if (metricsBuffer.length >= 10) {
    flushMetricsBuffer();
  }
  
  // Also send to existing tracking for backward compatibility
  trackPerformance(metricName, metricValue, options?.tags);
};

/**
 * Persist metric to localStorage for retrieval on page reload
 */
const persistMetricToStorage = (metric: MetricData) => {
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
 * Flush the metrics buffer by sending all metrics to the analytics service
 */
export const flushMetricsBuffer = async (): Promise<void> => {
  if (metricsBuffer.length === 0) return;
  
  try {
    // Batch metrics for more efficient sending
    console.log(`Flushing ${metricsBuffer.length} performance metrics in batch`);
    
    // Send metrics to backend
    // In a real app, this would be an API call
    
    // For now, use the existing tracker for each metric
    metricsBuffer.forEach(metric => {
      storeAnalyticsMetric(metric.name, metric.value);
    });
    
    // Clear the buffer
    metricsBuffer.length = 0;
  } catch (error) {
    console.error('Error flushing metrics buffer:', error);
  }
};

/**
 * Restore and process persisted metrics from previous sessions
 */
export const processPersistedMetrics = (): void => {
  try {
    const persistedMetrics = JSON.parse(localStorage.getItem(PERSISTED_METRICS_KEY) || '[]');
    
    if (persistedMetrics.length > 0) {
      console.log(`Processing ${persistedMetrics.length} persisted metrics`);
      
      // Process each persisted metric
      persistedMetrics.forEach((metric: MetricData) => {
        // Add special tag to indicate this was from a previous session
        const tags = {
          ...(metric.tags || {}),
          persisted: 'true'
        };
        
        // Track the persisted metric
        trackPerformance(metric.name, metric.value, tags);
      });
      
      // Clear persisted metrics
      localStorage.removeItem(PERSISTED_METRICS_KEY);
    }
  } catch (error) {
    console.error('Error processing persisted metrics:', error);
  }
};

/**
 * Set up event listeners for page visibility changes to ensure metrics are flushed
 */
export const setupMetricsEventListeners = (): void => {
  // Flush metrics when page becomes hidden
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushMetricsBuffer();
    }
  });
  
  // Flush metrics before unload
  window.addEventListener('beforeunload', () => {
    flushMetricsBuffer();
  });
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
