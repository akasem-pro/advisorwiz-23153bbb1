
import * as webVitals from 'web-vitals';
import { storeAnalyticsMetric } from './core';

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
    } catch (error) {
      console.error('Failed to load web-vitals:', error);
    }
  }
};

// Consolidated function to send metrics to analytics
const sendToAnalytics = (metric: webVitals.Metric) => {
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
  
  // Store in Supabase analytics for dashboards
  storeAnalyticsMetric('web_vitals', Math.round(metric.value));
  
  // Log to console during development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
};
