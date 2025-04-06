
import { trackPerformanceMetric } from './trackingUtils';
import { isAnalyticsAllowed } from '../analytics/analyticsService';

interface WebVital {
  id: string;
  name: string;
  value: number;
  delta: number;
  entries: PerformanceEntry[];
}

/**
 * Handle Web Vitals reporting
 */
export const reportWebVitals = (metric: WebVital): void => {
  // Only track if analytics is allowed
  if (!isAnalyticsAllowed('analytics')) {
    return;
  }
  
  const { name, value, delta } = metric;
  
  // Track the metric
  trackPerformanceMetric(`web_vital_${name.toLowerCase()}`, value, {
    tags: {
      metric_name: name,
      delta: String(delta.toFixed(3))
    },
    persist: true,
    sendImmediately: false
  });
  
  // Also report to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}: ${value}`);
  }
};

/**
 * Set up automated web vitals tracking
 */
export const setupWebVitalsTracking = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  // Load the web-vitals library dynamically
  import('web-vitals').then(({ onCLS, onFID, onLCP, onTTFB, onFCP }) => {
    // Core Web Vitals
    onCLS(reportWebVitals);
    onFID(reportWebVitals);
    onLCP(reportWebVitals);
    
    // Additional metrics
    onTTFB(reportWebVitals);
    onFCP(reportWebVitals);
  });
  
  // Track browser performance data
  if ('performance' in window) {
    // Wait until page is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;
        const tcpTime = perfData.connectEnd - perfData.connectStart;
        const serverTime = perfData.responseEnd - perfData.requestStart;
        const domLoadTime = perfData.domComplete - perfData.domLoading;
        
        // Track these metrics
        trackPerformanceMetric('page_load_time', pageLoadTime);
        trackPerformanceMetric('dns_time', dnsTime);
        trackPerformanceMetric('tcp_time', tcpTime);
        trackPerformanceMetric('server_response_time', serverTime);
        trackPerformanceMetric('dom_load_time', domLoadTime);
      }, 0);
    });
  }
};

// Configure web vitals right away (if we have consent)
if (typeof window !== 'undefined' && localStorage.getItem('cookie-consent')) {
  setupWebVitalsTracking();
}
