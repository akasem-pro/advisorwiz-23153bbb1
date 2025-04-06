/**
 * Core Analytics Service
 * 
 * Centralized analytics implementation with privacy controls,
 * performance optimization, and unified tracking interface.
 */
import { getCookieSettings } from '../../utils/analytics/trackers/cookieBanner';

// Define standard event types
export enum AnalyticsEventType {
  PAGE_VIEW = 'page_view',
  USER_INTERACTION = 'user_interaction',
  FEATURE_USAGE = 'feature_usage',
  CONVERSION = 'conversion',
  ERROR = 'error',
  PERFORMANCE = 'performance',
  CONSENT = 'consent'
}

// Interfaces for analytics data
export interface AnalyticsEvent {
  type: string;
  name: string;
  value?: number;
  timestamp: number;
  properties?: Record<string, any>;
}

export interface AnalyticsProvider {
  name: string;
  isEnabled: () => boolean;
  initialize: () => Promise<boolean>;
  trackEvent: (event: AnalyticsEvent) => Promise<boolean>;
}

// Configuration for tracking behavior
export interface AnalyticsConfig {
  batchSize: number;
  batchIntervalMs: number;
  samplingRate: number; // 0-1, 1 = track everything
  errorSamplingRate: number; // 0-1, higher rate for errors
  debug: boolean;
}

// Default configuration
const DEFAULT_CONFIG: AnalyticsConfig = {
  batchSize: 10,
  batchIntervalMs: 2000,
  samplingRate: 1.0, // Track everything by default
  errorSamplingRate: 1.0, // Track all errors
  debug: process.env.NODE_ENV === 'development'
};

// Event buffer for batching
let eventBuffer: AnalyticsEvent[] = [];
let flushTimeout: number | null = null;
let providers: AnalyticsProvider[] = [];
let config: AnalyticsConfig = DEFAULT_CONFIG;

/**
 * Initialize the analytics system
 */
export const initializeAnalytics = async (customConfig?: Partial<AnalyticsConfig>): Promise<void> => {
  // Apply custom configuration
  config = { ...DEFAULT_CONFIG, ...customConfig };
  
  // Log initialization in debug mode
  if (config.debug) {
    console.log('[Analytics] Initializing with config:', config);
  }
  
  // Initialize all providers
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
 * Register an analytics provider
 */
export const registerProvider = (provider: AnalyticsProvider): void => {
  providers.push(provider);
  if (config.debug) {
    console.log(`[Analytics] Provider ${provider.name} registered`);
  }
};

/**
 * Track an analytics event with sampling and privacy checks
 */
export const trackEvent = (
  eventType: string,
  eventName: string,
  eventValue: number = 1,
  properties?: Record<string, any>
): void => {
  // Check if this is a consent-related event
  const isConsentEvent = eventType === AnalyticsEventType.CONSENT || 
                          eventName.includes('consent') || 
                          eventName.includes('cookie');
  
  // If not a consent event, verify tracking is allowed
  if (!isConsentEvent && !isTrackingAllowed(eventType)) {
    return;
  }
  
  // Apply sampling (except for consent events)
  if (!isConsentEvent) {
    // Use appropriate sampling rate based on event type
    const samplingRate = eventType === AnalyticsEventType.ERROR 
      ? config.errorSamplingRate 
      : config.samplingRate;
    
    // Skip event based on sampling rate
    if (Math.random() > samplingRate) {
      return;
    }
  }
  
  // Create the event object
  const event: AnalyticsEvent = {
    type: eventType,
    name: eventName,
    value: eventValue,
    timestamp: Date.now(),
    properties
  };
  
  // Add to buffer
  eventBuffer.push(event);
  
  // Debug logging
  if (config.debug) {
    console.log(`[Analytics] Event tracked: ${eventType}.${eventName}`, properties);
  }
  
  // Schedule flush if needed
  scheduleFlush();
};

/**
 * Schedule a flush of the event buffer
 */
const scheduleFlush = (): void => {
  // If buffer exceeds batch size, flush immediately
  if (eventBuffer.length >= config.batchSize) {
    flushEvents();
    return;
  }
  
  // Otherwise schedule a delayed flush
  if (!flushTimeout) {
    flushTimeout = window.setTimeout(() => {
      flushEvents();
      flushTimeout = null;
    }, config.batchIntervalMs);
  }
};

/**
 * Flush events from the buffer to all providers
 */
export const flushEvents = async (): Promise<void> => {
  // Clear any pending flush
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
  
  // Nothing to flush
  if (eventBuffer.length === 0) {
    return;
  }
  
  // Get events and clear buffer
  const events = [...eventBuffer];
  eventBuffer = [];
  
  // Debug logging
  if (config.debug) {
    console.log(`[Analytics] Flushing ${events.length} events`);
  }
  
  // Send to all enabled providers
  for (const provider of providers) {
    if (provider.isEnabled()) {
      try {
        for (const event of events) {
          await provider.trackEvent(event);
        }
      } catch (error) {
        console.error(`[Analytics] Error in provider ${provider.name}:`, error);
        
        // Put events back in buffer on failure
        // But avoid infinite growth by limiting buffer size
        if (eventBuffer.length < 100) {
          eventBuffer = [...eventBuffer, ...events];
        }
      }
    }
  }
};

/**
 * Check if tracking is allowed for a given event type
 */
export const isTrackingAllowed = (eventType: string): boolean => {
  // Always allow essential events
  if (eventType === AnalyticsEventType.ERROR || 
      eventType === AnalyticsEventType.CONSENT) {
    return true;
  }
  
  // Get cookie settings
  const settings = getCookieSettings();
  
  // No consent means no tracking
  if (!settings.hasConsent) {
    return false;
  }
  
  // Check for specific permission based on event type
  switch (eventType) {
    case AnalyticsEventType.PAGE_VIEW:
    case AnalyticsEventType.PERFORMANCE:
      return settings.analytics;
    case AnalyticsEventType.CONVERSION:
    case AnalyticsEventType.USER_INTERACTION:
      return settings.marketing;
    case AnalyticsEventType.FEATURE_USAGE:
      return settings.personalization || settings.analytics;
    default:
      return settings.analytics;
  }
};

/**
 * Expose a method to clear all tracking data
 */
export const clearAnalyticsData = (): void => {
  eventBuffer = [];
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
};

/**
 * Simplified tracking helpers
 */
export const trackPageView = (
  pageName: string,
  path: string = window.location.pathname, 
  properties?: Record<string, any>
): void => {
  trackEvent(
    AnalyticsEventType.PAGE_VIEW, 
    pageName, 
    1, 
    { path, url: window.location.href, ...properties }
  );
};

export const trackInteraction = (
  action: string,
  target: string,
  properties?: Record<string, any>
): void => {
  trackEvent(
    AnalyticsEventType.USER_INTERACTION, 
    action, 
    1, 
    { target, ...properties }
  );
};

export const trackFeature = (
  featureName: string,
  action: string = 'used',
  properties?: Record<string, any>
): void => {
  trackEvent(
    AnalyticsEventType.FEATURE_USAGE, 
    `${featureName}_${action}`, 
    1, 
    properties
  );
};

export const trackPerformance = (
  metricName: string,
  value: number,
  properties?: Record<string, any>
): void => {
  trackEvent(
    AnalyticsEventType.PERFORMANCE, 
    metricName, 
    value, 
    properties
  );
};

export const trackError = (
  errorType: string,
  message: string,
  properties?: Record<string, any>
): void => {
  trackEvent(
    AnalyticsEventType.ERROR, 
    errorType, 
    1, 
    { message, ...properties }
  );
};

// Force flush on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    flushEvents();
  });
}
