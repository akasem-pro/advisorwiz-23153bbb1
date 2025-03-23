
// This is the main export file for performance tracking functionality
// It re-exports functions from the more focused modules

// Core performance tracking
export {
  trackPerformance,
  getPerformanceData,
  clearPerformanceData,
  storeAnalyticsMetric
} from './performance/core';

// Web Vitals tracking
export { trackWebVitals } from './performance/webVitals';

// Function performance tracking
export { withPerformanceTracking } from './performance/functionTracking';

// Image optimization
export { 
  setupLazyLoading,
  optimizeImagesForCWV
} from './performance/imageOptimization';

// Resource hints
export { implementResourceHints } from './performance/resourceHints';

// Visitor analytics
export { trackVisitorActivity } from './analytics/visitorTracking';

// Feature usage tracking
export { trackFeatureUsage } from './analytics/featureTracking';

// AI interaction tracking
export { trackAIInteraction } from './analytics/aiTracking';

// Match history recording
export { recordMatchHistory } from './analytics/matchTracking';

// Consolidated function to initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Track web vitals
    trackWebVitals();
    
    // Track current page visit
    trackVisitorActivity(window.location.pathname);
    
    // Setup optimizations when DOM is loaded
    if (document.readyState === 'complete') {
      setupLazyLoading();
      optimizeImagesForCWV();
      implementResourceHints();
    } else {
      window.addEventListener('DOMContentLoaded', () => {
        setupLazyLoading();
        optimizeImagesForCWV();
        implementResourceHints();
      });
    }
    
    // Add event listeners for client-side navigation
    document.addEventListener('newpage', () => {
      setupLazyLoading();
      optimizeImagesForCWV();
      // Track new page navigation
      trackVisitorActivity(window.location.pathname);
    });
  }
};
