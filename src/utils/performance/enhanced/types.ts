
// Types for performance metrics

export interface MetricData {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
  persistOnPageLoad?: boolean;
}

// Configuration
export const MAX_BUFFER_SIZE = 50;
export const FLUSH_INTERVAL = 10000; // 10 seconds
