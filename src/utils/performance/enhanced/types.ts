
/**
 * Types for enhanced performance tracking system
 */

// Interface for metric data
export interface MetricData {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
  persistOnPageLoad?: boolean;
}

// Constants
export const PERSISTED_METRICS_KEY = 'lovable_persisted_metrics';
export const FLUSH_INTERVAL = 2000; // 2 seconds
export const MAX_BUFFER_SIZE = 20;
