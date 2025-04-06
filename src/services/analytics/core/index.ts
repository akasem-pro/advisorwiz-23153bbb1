
/**
 * Analytics Core Module
 * Main entry point for the analytics system
 */
// Export types
export * from './types';

// Export config
export { 
  getConfig,
  updateConfig,
  DEFAULT_CONFIG 
} from './config';

// Export privacy utils
export { 
  isTrackingAllowed,
  shouldSampleEvent
} from './privacy';

// Export buffer management
export { 
  flushEvents,
  registerProvider,
  getProviders,
  clearBuffer 
} from './buffer';

// Export tracking functions
export { 
  trackEvent,
  trackPageView,
  trackInteraction,
  trackFeature,
  trackPerformance,
  trackError
} from './tracking';

// Import required types and functions for initialization
import { AnalyticsConfig } from './types';
import { updateConfig, getConfig } from './config';
import { getProviders } from './buffer';

/**
 * Initialize the analytics system
 */
export const initializeAnalytics = async (customConfig?: Partial<AnalyticsConfig>): Promise<void> => {
  // Apply custom configuration
  if (customConfig) {
    updateConfig(customConfig);
  }
  
  const config = getConfig();
  
  // Log initialization in debug mode
  if (config.debug) {
    console.log('[Analytics] Initializing with config:', config);
  }
  
  // Initialize all providers
  const providers = getProviders();
  for (const provider of providers) {
    if (provider.isEnabled()) {
      try {
        await provider.initialize();
        if (config.debug) {
          console.log(`[Analytics] Provider ${provider.name} initialized`);
        }
      } catch (error) {
        console.error(`[Analytics] Failed to initialize provider ${provider.name}:`, error);
      }
    }
  }
};

/**
 * Expose a method to clear all tracking data
 */
import { clearBuffer } from './buffer';
export const clearAnalyticsData = (): void => {
  clearBuffer();
};
