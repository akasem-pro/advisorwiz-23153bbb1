
/**
 * Web Vitals Monitoring System
 * 
 * Collects, analyzes, and reports Core Web Vitals metrics to various analytics endpoints.
 * Integrates with A/B testing to compare performance between variants.
 * 
 * @module webVitals
 */
import * as webVitals from 'web-vitals';
import { storeAnalyticsMetric } from './core';
import { sendGA4Event } from '../analytics/ga4Integration';
import { getVariant } from '../abTesting';

/**
 * Thresholds for good performance metrics
 * Based on Google's Core Web Vitals recommendations
 * @see https://web.dev/vitals/
 */
const PERFORMANCE_THRESHOLDS = {
  CLS: 0.1,  // Cumulative Layout Shift (unitless)
  FID: 100,  // First Input Delay (ms)
  LCP: 2500, // Largest Contentful Paint (ms)
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 800, // Time to First Byte (ms)
  INP: 200   // Interaction to Next Paint (ms)
};

/**
 * Rating tiers for performance metrics
 */
export type MetricRating = 'good' | 'needs-improvement' | 'poor';

/**
 * Initialize and track all web vitals
 * @param {string} [experimentId] - Optional A/B test experiment ID for performance comparison
 */
export const trackWebVitals = (experimentId?: string): void => {
  if (typeof window !== 'undefined') {
    try {
      webVitals.onCLS(metric => sendToAnalytics(metric, experimentId));
      webVitals.onFID(metric => sendToAnalytics(metric, experimentId));
      webVitals.onLCP(metric => sendToAnalytics(metric, experimentId));
      webVitals.onFCP(metric => sendToAnalytics(metric, experimentId));
      webVitals.onTTFB(metric => sendToAnalytics(metric, experimentId));
      webVitals.onINP(metric => sendToAnalytics(metric, experimentId));
      
      console.log('Web Vitals tracking initialized');
    } catch (error) {
      console.error('Failed to load web-vitals:', error);
    }
  }
};

/**
 * Enhanced function to send metrics to analytics with threshold checking and A/B test integration
 * 
 * @param {webVitals.Metric} metric - The web vital metric to report
 * @param {string} [experimentId] - Optional A/B test experiment ID
 */
const sendToAnalytics = (metric: webVitals.Metric, experimentId?: string): void => {
  try {
    // Get current A/B test variant if experiment ID is provided
    let variantId: string | undefined;
    if (experimentId) {
      const userId = getUserIdFromStorage();
      if (userId) {
        // This is just getting the current variant, not assigning a new one
        variantId = getCurrentVariant(experimentId, userId);
      }
    }
    
    // Check if gtag is available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: metric.name,
        value: Math.round(metric.value),
        non_interaction: true,
        metric_id: metric.id,
        metric_rating: metric.navigationType || 'unknown',
        variant_id: variantId // Include variant ID if available
      });
    }
    
    // Use GA4 integration with A/B test data
    sendGA4Event('web_vital_measured', {
      metric_name: metric.name,
      metric_value: Math.round(metric.value),
      metric_id: metric.id,
      metric_rating: getMetricRating(metric),
      experiment_id: experimentId,
      variant_id: variantId
    });
    
    // Store in analytics system for dashboards
    storeAnalyticsMetric('web_vitals', Math.round(metric.value), {
      metricName: metric.name,
      experimentId,
      variantId
    });
    
    // Check against thresholds and log issues
    checkMetricAgainstThreshold(metric, experimentId, variantId);
    
    // Log to console during development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}: ${Math.round(metric.value)}${variantId ? ` (variant: ${variantId})` : ''}`);
    }
  } catch (error) {
    console.error('Error sending web vitals to analytics:', error);
  }
};

/**
 * Get the current user ID from storage for A/B test tracking
 */
const getUserIdFromStorage = (): string | undefined => {
  try {
    return localStorage.getItem('userId') || undefined;
  } catch {
    return undefined;
  }
};

/**
 * Get the current variant for an experiment
 */
const getCurrentVariant = (experimentId: string, userId: string): string | undefined => {
  try {
    // Simple implementation - in a real app, this would check what variant
    // the user is already assigned to rather than creating a new assignment
    const storedVariant = localStorage.getItem(`exp_${experimentId}`);
    if (storedVariant) {
      return storedVariant;
    }
    return undefined;
  } catch {
    return undefined;
  }
};

/**
 * Function to determine if a metric exceeds recommended thresholds
 * 
 * @param {webVitals.Metric} metric - The metric to check
 * @param {string} [experimentId] - Optional A/B test experiment ID
 * @param {string} [variantId] - Optional A/B test variant ID
 */
const checkMetricAgainstThreshold = (
  metric: webVitals.Metric, 
  experimentId?: string,
  variantId?: string
): void => {
  const { name, value } = metric;
  
  // @ts-ignore - TypeScript doesn't know our threshold keys match metric names
  const threshold = PERFORMANCE_THRESHOLDS[name];
  if (!threshold) return;
  
  // Check if metric exceeds threshold
  const exceeds = name === 'CLS' ? value > threshold : value >= threshold;
  
  if (exceeds) {
    // Send alert to analytics with A/B test info if available
    sendGA4Event('web_vital_threshold_exceeded', {
      metric_name: name,
      metric_value: Math.round(value),
      threshold: threshold,
      experiment_id: experimentId,
      variant_id: variantId
    });
    
    // Log warning for developers
    console.warn(
      `[Performance Alert] ${name} value (${Math.round(value)}) exceeds recommended threshold (${threshold})${
        experimentId ? ` for experiment ${experimentId}${variantId ? `, variant ${variantId}` : ''}` : ''
      }`
    );
  }
};

/**
 * Get performance rating based on metric value
 * @param {webVitals.Metric} metric - The web vital metric
 * @returns {MetricRating} Performance rating category
 */
const getMetricRating = (metric: webVitals.Metric): MetricRating => {
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
