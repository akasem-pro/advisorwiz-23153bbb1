
// Export the main analytics service functions
export { 
  trackEvent, 
  trackPageView,
  isAnalyticsAllowed,
  initializeAnalytics,
  UserBehaviorEvent 
} from './analyticsService';

// Export hooks for React components
export { useAnalytics, usePageTracking } from '../../hooks/useAnalytics';

// Export types for better developer experience
export type { GA4EventParams, GA4EcommerceItem } from '../../utils/analytics/types';

// Export the analytics provider core components
export {
  AnalyticsEventType,
  type AnalyticsEvent,
  type AnalyticsProvider
} from './core';

// Export web vitals tracking
export { 
  initWebVitalsTracking as setupWebVitalsTracking,
  initWebVitalsTracking
} from './providers/webVitalsProvider';

/**
 * Initialize the application's analytics system
 */
export const setupAnalytics = async (config: {
  googleAnalyticsId?: string;
  metaPixelId?: string;
  debug?: boolean;
  sampling?: number; // 0-1, percentage of events to track
  batchSize?: number; // Number of events to batch before sending
  batchIntervalMs?: number; // Time interval for batching events
} = {}) => {
  // Import trackers conditionally to avoid unused code
  const { initializeGA4 } = await import('../../utils/analytics/trackers/googleAnalytics');
  
  // Check if we have consent
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) {
    return;
  }
  
  try {
    // Initialize Google Analytics if available
    if (config.googleAnalyticsId) {
      initializeGA4({
        measurementId: config.googleAnalyticsId,
        debug: config.debug
      });
    }
    
    // Initialize Meta Pixel if available
    if (config.metaPixelId) {
      const { initializeMetaPixel } = await import('../../utils/analytics/trackers/metaPixel');
      initializeMetaPixel({ pixelId: config.metaPixelId });
    }
    
    // Initialize our core analytics
    const { initializeAnalytics } = await import('./analyticsService');
    initializeAnalytics({
      batchSize: config.batchSize,
      batchIntervalMs: config.batchIntervalMs,
      samplingRate: config.sampling
    });
    
    // Set up web vitals tracking
    const { initWebVitalsTracking } = await import('./providers/webVitalsProvider');
    initWebVitalsTracking();
    
    return true;
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
    return false;
  }
};

// For backward compatibility with existing code
export const initializeAppAnalytics = setupAnalytics;
