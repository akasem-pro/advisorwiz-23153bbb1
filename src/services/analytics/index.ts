
import {
  initializeAnalytics,
  registerProvider,
  trackPageView,
  trackInteraction,
  trackFeature,
  trackPerformance,
  trackError,
  clearAnalyticsData,
  AnalyticsEventType
} from './core';
import { createGoogleAnalyticsProvider } from './providers/googleAnalyticsProvider';

/**
 * Initialize the application's analytics system
 */
export const initializeAppAnalytics = async (
  config: {
    googleAnalyticsId?: string;
    debug?: boolean;
    samplingRate?: number;
    batchSize?: number;
    batchIntervalMs?: number;
  } = {}
) => {
  try {
    // Register providers
    if (config.googleAnalyticsId) {
      registerProvider(createGoogleAnalyticsProvider(
        config.googleAnalyticsId,
        config.debug
      ));
    }
    
    // Initialize the analytics core
    await initializeAnalytics({
      debug: config.debug,
      samplingRate: config.samplingRate,
      batchSize: config.batchSize,
      batchIntervalMs: config.batchIntervalMs
    });
    
    // Return success
    return true;
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
    return false;
  }
};

// Export everything from core for direct use
export {
  trackPageView,
  trackInteraction,
  trackFeature,
  trackPerformance,
  trackError,
  clearAnalyticsData,
  AnalyticsEventType
};

// Export hooks (re-export to have them available from the same module)
export { useAnalytics, usePageTracking } from '../../hooks/useAnalytics';
