
/**
 * Performance monitoring entry point
 */

import { trackWebVitals, recordPerformanceMark } from './webVitals';
import { initEnhancedPerformanceTracking } from './enhanced';

// Re-export all performance utilities
export * from './core';
export { trackWebVitals, recordPerformanceMark };

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = () => {
  // Start tracking web vitals
  trackWebVitals();
  
  // Initialize enhanced performance tracking
  initEnhancedPerformanceTracking();
  
  // Record initial page load performance
  if (typeof window !== 'undefined') {
    // Record page load
    recordPerformanceMark('app-loaded');
    
    // Setup performance observer for long tasks
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.log('Long task detected:', entry);
          });
        });
        
        observer.observe({ type: 'longtask', buffered: true });
      } catch (e) {
        console.warn('PerformanceObserver for longtask not supported');
      }
    }
  }
};
