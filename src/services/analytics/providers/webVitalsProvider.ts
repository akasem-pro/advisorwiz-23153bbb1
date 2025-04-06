
import { trackPerformance } from '../core';

// Type definition for web vitals
type WebVitalName = 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';

/**
 * Initialize Web Vitals tracking
 */
export const initWebVitalsTracking = (): void => {
  try {
    // Only load in browser
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
        // Core Web Vitals
        onCLS(metric => {
          trackPerformance('web_vitals_cls', metric.value, {
            rating: getVitalRating('CLS', metric.value),
            metric_id: metric.id
          });
        });
        
        onFID(metric => {
          trackPerformance('web_vitals_fid', metric.value, {
            rating: getVitalRating('FID', metric.value),
            metric_id: metric.id
          });
        });
        
        onLCP(metric => {
          trackPerformance('web_vitals_lcp', metric.value, {
            rating: getVitalRating('LCP', metric.value),
            metric_id: metric.id
          });
        });
        
        // Additional metrics
        onFCP(metric => {
          trackPerformance('web_vitals_fcp', metric.value, {
            rating: getVitalRating('FCP', metric.value),
            metric_id: metric.id
          });
        });
        
        onTTFB(metric => {
          trackPerformance('web_vitals_ttfb', metric.value, {
            rating: getVitalRating('TTFB', metric.value),
            metric_id: metric.id
          });
        });
        
        // Experimental metric
        onINP(metric => {
          trackPerformance('web_vitals_inp', metric.value, {
            rating: getVitalRating('INP', metric.value),
            metric_id: metric.id
          });
        });
      });
    }
  } catch (error) {
    console.error('Error initializing Web Vitals tracking:', error);
  }
};

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
const getVitalRating = (name: WebVitalName, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = vitalThresholds[name];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
};
