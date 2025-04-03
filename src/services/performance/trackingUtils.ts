
import { PerformanceMetric } from './types';
import { addToBuffer } from './metricsBuffer';
import { persistMetric } from './storage';

/**
 * Track a performance metric
 */
export const trackPerformanceMetric = (
  metricName: string,
  metricValue: number,
  options?: {
    tags?: Record<string, string>;
    persist?: boolean;  // Whether to persist this metric across page loads
    sendImmediately?: boolean;  // Whether to send immediately or batch
  }
): void => {
  try {
    const metric: PerformanceMetric = {
      name: metricName,
      value: metricValue,
      timestamp: Date.now(),
      tags: options?.tags
    };
    
    // Add to metrics buffer
    addToBuffer(metric);
    
    // If persist is enabled, store in localStorage
    if (options?.persist) {
      persistMetric(metric);
    }
    
    // Add performance marker for DevTools analysis
    if (typeof performance !== 'undefined') {
      performance.mark(`${metricName}-${Date.now()}`);
    }
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${metricName}: ${metricValue}`, options?.tags);
    }
  } catch (error) {
    console.error('Error tracking performance metric:', error);
  }
};

/**
 * Record performance marks and measures
 */
export const recordPerformanceMark = (
  markName: string,
  measureName?: string,
  startMark?: string
): void => {
  if (typeof window === 'undefined' || !window.performance) return;
  
  try {
    // Record the mark
    performance.mark(markName);
    
    // Create a measure if requested
    if (measureName && startMark) {
      performance.measure(measureName, startMark, markName);
      
      // Get the measure and report it
      const measures = performance.getEntriesByName(measureName, 'measure');
      if (measures.length > 0) {
        const duration = measures[0].duration;
        trackPerformanceMetric(measureName, duration);
      }
    }
  } catch (error) {
    console.error('Error recording performance mark:', error);
  }
};
