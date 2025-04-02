
import * as webVitals from 'web-vitals';
import { storeAnalyticsMetric } from './core';
import { sendGA4Event } from '../analytics/ga4Integration';

// Thresholds for good performance metrics (ms)
const PERFORMANCE_THRESHOLDS = {
  CLS: 0.1, // Cumulative Layout Shift (unitless)
  FID: 100, // First Input Delay (ms)
  LCP: 2500, // Largest Contentful Paint (ms)
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 800, // Time to First Byte (ms)
  INP: 200 // Interaction to Next Paint (ms)
};

// Initialize and track all web vitals
export const trackWebVitals = () => {
  if (typeof window !== 'undefined') {
    try {
      webVitals.onCLS(sendToAnalytics);
      webVitals.onFID(sendToAnalytics);
      webVitals.onLCP(sendToAnalytics);
      webVitals.onFCP(sendToAnalytics);
      webVitals.onTTFB(sendToAnalytics);
      webVitals.onINP(sendToAnalytics);
      
      console.log('Web Vitals tracking initialized');
    } catch (error) {
      console.error('Failed to load web-vitals:', error);
    }
  }
};

// Enhanced function to send metrics to analytics with threshold checking
const sendToAnalytics = (metric: webVitals.Metric) => {
  try {
    // Check if gtag is available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: metric.name,
        value: Math.round(metric.value),
        non_interaction: true,
        metric_id: metric.id,
        metric_rating: metric.navigationType || 'unknown'
      });
    }
    
    // Use GA4 integration
    sendGA4Event('web_vital_measured', {
      metric_name: metric.name,
      metric_value: Math.round(metric.value),
      metric_id: metric.id,
      metric_rating: getMetricRating(metric)
    });
    
    // Store in Supabase analytics for dashboards
    storeAnalyticsMetric('web_vitals', Math.round(metric.value));
    
    // Check against thresholds and log issues
    checkMetricAgainstThreshold(metric);
    
    // Log to console during development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}: ${Math.round(metric.value)}`);
    }
  } catch (error) {
    console.error('Error sending web vitals to analytics:', error);
  }
};

// Function to determine if a metric exceeds recommended thresholds
const checkMetricAgainstThreshold = (metric: webVitals.Metric): void => {
  const { name, value } = metric;
  
  // @ts-ignore - TypeScript doesn't know our threshold keys match metric names
  const threshold = PERFORMANCE_THRESHOLDS[name];
  if (!threshold) return;
  
  // Check if metric exceeds threshold
  const exceeds = name === 'CLS' ? value > threshold : value >= threshold;
  
  if (exceeds) {
    // Send alert to analytics
    sendGA4Event('web_vital_threshold_exceeded', {
      metric_name: name,
      metric_value: Math.round(value),
      threshold: threshold
    });
    
    // Log warning for developers
    console.warn(
      `[Performance Alert] ${name} value (${Math.round(value)}) exceeds recommended threshold (${threshold})`
    );
  }
};

// Get performance rating based on metric value
const getMetricRating = (metric: webVitals.Metric): 'good' | 'needs-improvement' | 'poor' => {
  const { name, value } = metric;
  
  // @ts-ignore - TypeScript doesn't know our threshold keys match metric names
  const threshold = PERFORMANCE_THRESHOLDS[name];
  if (!threshold) return 'good';
  
  if (name === 'CLS') {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }
  
  // For timing metrics (lower is better)
  if (value <= threshold * 0.75) return 'good';
  if (value <= threshold * 1.5) return 'needs-improvement';
  return 'poor';
};
