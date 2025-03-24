
import { supabase } from '../../integrations/supabase/client';

// Interface for performance metrics
interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

// Array to store metrics locally for batching
const metricsBuffer: PerformanceMetric[] = [];

/**
 * Track a performance metric
 */
export const trackPerformance = (
  metricName: string,
  metricValue: number,
  tags?: Record<string, string>
): void => {
  try {
    const metric: PerformanceMetric = {
      name: metricName,
      value: metricValue,
      timestamp: Date.now(),
      tags
    };
    
    // Add to metrics buffer
    metricsBuffer.push(metric);
    
    // Log the metric for development
    console.log(`[Performance] ${metricName}: ${metricValue}`, tags);
    
    // If buffer gets too large, flush it
    if (metricsBuffer.length >= 10) {
      flushMetricsBuffer();
    }
  } catch (error) {
    console.error('Error tracking performance metric:', error);
  }
};

/**
 * Flush the metrics buffer by sending to backend or analytics service
 */
const flushMetricsBuffer = async (): Promise<void> => {
  if (metricsBuffer.length === 0) return;
  
  try {
    // In a real implementation, this would send the data to an analytics service
    console.log(`Flushing ${metricsBuffer.length} performance metrics`);
    
    // Clear the buffer after successfully sending the metrics
    metricsBuffer.length = 0;
  } catch (error) {
    console.error('Error flushing performance metrics:', error);
  }
};

/**
 * Get current performance data
 */
export const getPerformanceData = (): PerformanceMetric[] => {
  return [...metricsBuffer];
};

/**
 * Clear performance data
 */
export const clearPerformanceData = (): void => {
  metricsBuffer.length = 0;
};

/**
 * Store analytics metric - handles both string action types and numeric values
 * This is used by both performance tracking and analytics modules
 */
export const storeAnalyticsMetric = (
  metricType: string,
  metricNameOrValue: string | number,
  metricValue?: number
): void => {
  try {
    // Handle both formats:
    // storeAnalyticsMetric('page_view', 'home')
    // storeAnalyticsMetric('page_load_time', 1200)
    
    if (typeof metricNameOrValue === 'string' && metricValue !== undefined) {
      // Format: metricType, metricName, metricValue
      trackPerformance(`${metricType}_${metricNameOrValue}`, metricValue);
    } else if (typeof metricNameOrValue === 'string') {
      // Format: metricType, metricName (with implicit value of 1)
      trackPerformance(`${metricType}_${metricNameOrValue}`, 1);
    } else if (typeof metricNameOrValue === 'number') {
      // Format: metricType, metricValue
      trackPerformance(metricType, metricNameOrValue);
    }
  } catch (error) {
    console.error('Error storing analytics metric:', error);
  }
};
