
// Main exports file for performance tracking functionality
// Re-exports functions from more focused modules

// Import from core performance module
import {
  trackPerformance,
  getPerformanceData,
  clearPerformanceData,
  storeAnalyticsMetric
} from './performance/core';

// Import from function tracking module
import { withPerformanceTracking } from './performance/functionTracking';

// Import from web vitals module
import { trackWebVitals as trackWebVitalsFunc } from './performance/webVitals';

// Import from image optimization module
import { setupLazyLoading, optimizeImagesForCWV } from './performance/imageOptimization';

// Import from resource hints module
import { implementResourceHints } from './performance/resourceHints';

// Import from analytics modules
import { trackVisitorActivity } from './analytics/visitorTracking';
import { trackFeatureUsage } from './analytics/eventTracker';
import { trackAIInteraction } from './analytics/aiTracking';
import { recordMatchHistory } from './analytics/matchTracker';
import { 
  trackUserBehavior, 
  trackMatchingInteraction, 
  trackPageView,
  trackPreferenceUpdate,
  UserBehaviorEvent
} from './analytics/userBehaviorTracker';
import { trackFeatureEngagement } from './analytics/userEngagementTracker';
import { trackMatchEngagement } from './analytics/matchEngagementTracker';
import { 
  trackABTestExposure, 
  trackABTestConversion 
} from './analytics/abTestTracker';

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

// Analytics exports
export { 
  // Visitor tracking
  trackVisitorActivity,
  
  // Feature usage tracking
  trackFeatureUsage,
  
  // AI interaction tracking
  trackAIInteraction,
  
  // Match history tracking
  recordMatchHistory,
  
  // User behavior tracking
  trackUserBehavior,
  trackMatchingInteraction, 
  trackPageView,
  trackPreferenceUpdate,
  UserBehaviorEvent,
  
  // Engagement tracking
  trackFeatureEngagement,
  trackMatchEngagement,
  
  // A/B Testing tracking
  trackABTestExposure,
  trackABTestConversion
};

/**
 * Initialize all performance optimizations
 */
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
