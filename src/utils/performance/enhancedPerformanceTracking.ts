
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

// Buffer for metrics that will be sent in batch - using Set to automatically deduplicate similar events
const metricsBuffer: MetricData[] = [];
let flushTimer: number | null = null;
let lastFlushTime = 0;
const FLUSH_INTERVAL = 2000; // 2 seconds
const MAX_BUFFER_SIZE = 20;

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
  // Avoid tracking duplicate events in short succession
  const now = Date.now();
  const metricData: MetricData = {
    name: metricName,
    value: metricValue,
    timestamp: now,
    tags: options?.tags,
    persistOnPageLoad: options?.persist
  };
  
  // Add to buffer
  metricsBuffer.push(metricData);
  
  // If persistable, also add to localStorage
  if (options?.persist) {
    persistMetricToStorage(metricData);
  }
  
  // Either send immediately or schedule a flush
  if (options?.sendImmediately) {
    flushMetricsBuffer();
  } else {
    scheduleFlush();
  }
};

/**
 * Schedule a flush of the metrics buffer with debouncing
 */
const scheduleFlush = () => {
  const now = Date.now();
  
  // Don't schedule a flush if one is already pending
  if (flushTimer !== null) {
    return;
  }
  
  // Flush immediately if buffer is getting large or it's been a while since last flush
  if (metricsBuffer.length >= MAX_BUFFER_SIZE || (now - lastFlushTime > 10000)) {
    flushMetricsBuffer();
  } else {
    flushTimer = window.setTimeout(flushMetricsBuffer, FLUSH_INTERVAL);
  }
};

/**
 * Persist metric to localStorage for retrieval on page reload
 * Uses a more efficient approach with size limits
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
 * Flush the metrics buffer with deduplication and grouping for more efficient processing
 */
export const flushMetricsBuffer = async (): Promise<void> => {
  if (metricsBuffer.length === 0) return;
  
  try {
    // Reset flush timer
    if (flushTimer !== null) {
      window.clearTimeout(flushTimer);
      flushTimer = null;
    }
    
    lastFlushTime = Date.now();
    
    // Create a copy of the buffer for processing
    const metricsToSend = [...metricsBuffer];
    metricsBuffer.length = 0;
    
    // Group metrics by name for more efficient processing
    const metricsByName = metricsToSend.reduce((acc, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = [];
      }
      acc[metric.name].push(metric);
      return acc;
    }, {} as Record<string, MetricData[]>);
    
    // For each group, send only the most recent one
    Object.entries(metricsByName).forEach(([name, metrics]) => {
      // Sort by timestamp descending
      metrics.sort((a, b) => b.timestamp - a.timestamp);
      
      // Send only the most recent metric
      const mostRecent = metrics[0];
      storeAnalyticsMetric(mostRecent.name, mostRecent.value);
    });
  } catch (error) {
    console.error('Error flushing metrics buffer:', error);
    // Add back to buffer if sending fails
    metricsBuffer.push(...metricsBuffer);
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
      
      // Process only unique metrics to avoid duplication
      const uniqueMetrics = new Map<string, MetricData>();
      
      persistedMetrics.forEach((metric: MetricData) => {
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
      localStorage.removeItem(PERSISTED_METRICS_KEY);
    }
  } catch (error) {
    console.error('Error processing persisted metrics:', error);
  }
};

/**
 * Set up optimized event listeners for page visibility changes
 * Uses passive event listeners for better performance
 */
export const setupMetricsEventListeners = (): void => {
  // Flush metrics when page becomes hidden
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushMetricsBuffer();
    }
  }, { passive: true });
  
  // Flush metrics before unload - use capture to ensure it runs
  window.addEventListener('beforeunload', () => {
    flushMetricsBuffer();
  }, { capture: true });
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
