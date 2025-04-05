
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
  try {
    // Start tracking web vitals
    try {
      trackWebVitals();
    } catch (error) {
      console.warn("Error initializing web vitals tracking:", error);
    }
    
    // Initialize enhanced performance tracking
    try {
      initEnhancedPerformanceTracking();
    } catch (error) {
      console.warn("Error initializing enhanced performance tracking:", error);
    }
    
    // Record initial page load performance
    if (typeof window !== 'undefined') {
      try {
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
      } catch (error) {
        console.warn("Error recording performance marks:", error);
      }
    }
    console.log("Performance monitoring initialized");
  } catch (error) {
    console.error("Error initializing performance monitoring:", error);
    // Continue app execution even if performance monitoring fails
  }
};
