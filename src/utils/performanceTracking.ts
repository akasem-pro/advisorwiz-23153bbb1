
// This is the main export file for performance tracking functionality
// It re-exports functions from the more focused modules

// Importing the functions we need for initPerformanceOptimizations
import { trackWebVitals } from './performance/webVitals';
import { setupLazyLoading, optimizeImagesForCWV } from './performance/imageOptimization';
import { implementResourceHints } from './performance/resourceHints';

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

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Track web vitals
    trackWebVitals();
    
    // Optimize images for Core Web Vitals
    optimizeImagesForCWV();
    
    // Setup lazy loading for images
    setupLazyLoading();
    
    // Add resource hints
    implementResourceHints();
  }
};
