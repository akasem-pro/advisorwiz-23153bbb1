
// Performance service type definitions

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

// Storage key for persisted metrics
export const PERSISTED_METRICS_KEY = 'lovable_persisted_metrics';
