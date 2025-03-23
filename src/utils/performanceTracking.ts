
// This is the main export file for performance tracking functionality
// It re-exports functions from the more focused modules

// Import the necessary modules
import { trackWebVitals as trackWebVitalsFunc } from './performance/webVitals';
import { setupLazyLoading, optimizeImagesForCWV } from './performance/imageOptimization';
import { implementResourceHints } from './performance/resourceHints';
import {
  trackPerformance,
  getPerformanceData,
  clearPerformanceData,
  storeAnalyticsMetric
} from './performance/core';
import { withPerformanceTracking } from './performance/functionTracking';
import { trackVisitorActivity } from './analytics/visitorTracking';
import { trackFeatureUsage } from './analytics/featureTracking';
import { trackAIInteraction } from './analytics/aiTracking';
import { recordMatchHistory } from './analytics/matchTracking';
import { 
  trackUserBehavior, 
  trackMatchingInteraction, 
  trackPageView,
  trackPreferenceUpdate,
  UserBehaviorEvent
} from './analytics/userBehaviorTracker';
import { trackUserEngagement } from './analytics/userEngagementTracker';
import { trackMatchEngagement } from './analytics/matchEngagementTracker';

// Core performance tracking
export {
  trackPerformance,
  getPerformanceData,
  clearPerformanceData,
  storeAnalyticsMetric
};

// Web Vitals tracking
export { trackWebVitalsFunc as trackWebVitals };

// Function performance tracking
export { withPerformanceTracking };

// Image optimization
export { setupLazyLoading, optimizeImagesForCWV };

// Resource hints
export { implementResourceHints };

// Visitor analytics
export { trackVisitorActivity };

// Feature usage tracking
export { trackFeatureUsage };

// AI interaction tracking
export { trackAIInteraction };

// Match history recording
export { recordMatchHistory };

// User behavior tracking
export { 
  trackUserBehavior, 
  trackMatchingInteraction, 
  trackPageView,
  trackPreferenceUpdate,
  UserBehaviorEvent
};

// User engagement tracking
export { trackUserEngagement };

// Match engagement tracking
export { trackMatchEngagement };

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Track web vitals
    trackWebVitalsFunc();
    
    // Optimize images for Core Web Vitals
    optimizeImagesForCWV();
    
    // Setup lazy loading for images
    setupLazyLoading();
    
    // Add resource hints
    implementResourceHints();
    
    // Track initial page view for analytics
    trackVisitorActivity(window.location.href);
    
    console.log('Performance optimizations initialized');
  }
};
