
// Performance service exports

// Export types
export * from './types';

// Export core utilities
export { trackPerformanceMetric, recordPerformanceMark } from './trackingUtils';

// Export function tracking utilities
export { withPerformanceTracking, trackFunctionPerformance } from './functionTracker';

// Export storage utilities
export { persistMetric, getPersistedMetrics, clearPersistedMetrics } from './storage';

// Export buffer utilities
export { 
  addToBuffer, 
  clearMetricsBuffer as flushBuffer, 
  getCurrentMetrics as getBufferContents 
} from './metricsBuffer';
