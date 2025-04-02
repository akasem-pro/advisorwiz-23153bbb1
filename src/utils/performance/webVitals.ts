
/**
 * Web Vitals Performance Monitoring
 * 
 * Tracks and reports Core Web Vitals metrics for real-user monitoring
 * and integrates with analytics systems including A/B testing
 */

import { ReportHandler } from 'web-vitals';
import { trackConversion } from '../abTesting';
import { sendGA4Event } from '../analytics/ga4Integration';
import { storeAnalyticsMetric } from './core';

// Metric names from Core Web Vitals
type WebVitalName = 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';

// Thresholds based on Google's Core Web Vitals guidelines
const vitalThresholds = {
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
  FID: { good: 100, needsImprovement: 300 }, // First Input Delay (ms)
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint (ms)
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint (ms)
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte (ms)
  INP: { good: 200, needsImprovement: 500 }, // Interaction to Next Paint (ms)
};

/**
 * Get performance rating based on thresholds
 */
const getRating = (name: WebVitalName, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = vitalThresholds[name];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
};

/**
 * Report web vitals to analytics
 */
export const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (typeof onPerfEntry !== 'function') {
    return;
  }

  // Only load web-vitals when in the browser
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB, getINP }) => {
      // Core metrics
      getCLS(metric => {
        const rating = getRating('CLS', metric.value);
        storeAnalyticsMetric('vitals_cls', metric.value);
        processMetric(metric, rating, onPerfEntry);
      });
      
      getFID(metric => {
        const rating = getRating('FID', metric.value);
        storeAnalyticsMetric('vitals_fid', metric.value);
        processMetric(metric, rating, onPerfEntry);
      });
      
      getFCP(metric => {
        const rating = getRating('FCP', metric.value);
        storeAnalyticsMetric('vitals_fcp', metric.value);
        processMetric(metric, rating, onPerfEntry);
      });
      
      getLCP(metric => {
        const rating = getRating('LCP', metric.value);
        storeAnalyticsMetric('vitals_lcp', metric.value);
        processMetric(metric, rating, onPerfEntry);
      });
      
      getTTFB(metric => {
        const rating = getRating('TTFB', metric.value);
        storeAnalyticsMetric('vitals_ttfb', metric.value);
        processMetric(metric, rating, onPerfEntry);
      });
      
      // Experimental metric - measure responsiveness
      getINP(metric => {
        const rating = getRating('INP', metric.value);
        storeAnalyticsMetric('vitals_inp', metric.value);
        processMetric(metric, rating, onPerfEntry);
      });
    });
  }
};

/**
 * Process and report a web vital metric
 */
const processMetric = (
  metric: { name: string; value: number; id: string },
  rating: string,
  reportHandler: ReportHandler
): void => {
  // Call the provided handler
  reportHandler(metric);
  
  // Report to GA4
  sendGA4Event(`web_vital_${metric.name.toLowerCase()}`, {
    value: Math.round(metric.value * 100) / 100,
    rating,
    metric_id: metric.id,
    page_path: window.location.pathname
  });
  
  // Check if this is part of an A/B test
  checkABTestingIntegration(metric.name as WebVitalName, metric.value);
  
  // Alert if poor performance
  if (rating === 'poor') {
    console.warn(`Poor web vital detected: ${metric.name} = ${metric.value}`);
  }
};

/**
 * Check if current page is part of an A/B test and report metrics
 */
const checkABTestingIntegration = (metricName: WebVitalName, value: number): void => {
  try {
    // Check if we have stored experiment data
    const experimentData = sessionStorage.getItem('current_ab_test');
    if (experimentData) {
      const { experimentId, variantId } = JSON.parse(experimentData);
      
      // Track this metric as part of the A/B test
      if (experimentId && variantId) {
        // Get user ID if available
        const userId = localStorage.getItem('userId');
        
        if (userId) {
          // Send the web vital as conversion data for this experiment
          trackConversion(
            experimentId, 
            variantId, 
            `web_vital_${metricName.toLowerCase()}`,
            userId,
            { 
              metricName, 
              value, 
              page: window.location.pathname 
            }
          );
        }
      }
    }
  } catch (error) {
    console.error('Error integrating web vitals with A/B testing:', error);
  }
};

/**
 * Record a performance mark and measure
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
        storeAnalyticsMetric(measureName, duration);
      }
    }
  } catch (error) {
    console.error('Error recording performance mark:', error);
  }
};
