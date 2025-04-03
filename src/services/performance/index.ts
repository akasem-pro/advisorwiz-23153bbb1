
// Performance service entry point
import { trackPerformanceMetric, recordPerformanceMark } from './trackingUtils';
import { withPerformanceTracking } from './functionTracker';
import { flushMetrics, initMetricsEventListeners } from './metricsService';
import { getPersistedMetrics, clearPersistedMetrics } from './storage';
import { getCurrentMetrics, clearMetricsBuffer } from './metricsBuffer';

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = (): void => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Initialize metrics event listeners
  initMetricsEventListeners();
  
  // Log initialization
  console.log('[Performance] Performance monitoring initialized');
};

export {
  trackPerformanceMetric,
  recordPerformanceMark,
  withPerformanceTracking,
  flushMetrics,
  getPersistedMetrics,
  clearPersistedMetrics,
  getCurrentMetrics,
  clearMetricsBuffer,
};
