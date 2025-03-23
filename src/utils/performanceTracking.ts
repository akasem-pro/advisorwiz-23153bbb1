
// This is the main export file for performance tracking functionality
// It re-exports functions from the more focused modules

// Import the necessary modules
import { trackWebVitals } from './performance/webVitals';
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

// Core performance tracking
export {
  trackPerformance,
  getPerformanceData,
  clearPerformanceData,
  storeAnalyticsMetric
};

// Web Vitals tracking
export { trackWebVitals };

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

// User behavior metrics tracking
export const trackUserEngagement = async (
  eventType: string,
  userId?: string,
  details?: Record<string, any>
): Promise<void> => {
  try {
    await storeAnalyticsMetric(
      'user_engagement',
      eventType,
      1,
      'user_id',
      userId
    );
    
    if (details) {
      // Store additional details as separate metrics
      for (const [key, value] of Object.entries(details)) {
        if (typeof value === 'number') {
          await storeAnalyticsMetric(
            'user_engagement_detail',
            `${eventType}_${key}`,
            value,
            'user_id',
            userId
          );
        } else if (typeof value === 'string') {
          await storeAnalyticsMetric(
            'user_engagement_detail',
            `${eventType}_${key}`,
            1,
            key,
            value
          );
        }
      }
    }
    
    console.log(`User engagement tracked: ${eventType}`, details);
  } catch (error) {
    console.error('Failed to track user engagement:', error);
  }
};

// Track specifically matching-related events
export const trackMatchEngagement = async (
  action: 'view' | 'click' | 'contact' | 'schedule' | 'feedback',
  matchId: string,
  score: number,
  userId?: string,
  details?: Record<string, any>
): Promise<void> => {
  try {
    await storeAnalyticsMetric(
      'match_engagement',
      action,
      score,
      'match_id',
      matchId
    );
    
    // Also track as general user engagement
    await trackUserEngagement(`match_${action}`, userId, {
      match_id: matchId,
      score,
      ...details
    });
    
    console.log(`Match engagement tracked: ${action}`, { matchId, score, details });
  } catch (error) {
    console.error('Failed to track match engagement:', error);
  }
};

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
    
    // Track initial page view for analytics
    trackVisitorActivity(window.location.href);
    
    console.log('Performance optimizations initialized');
  }
};
