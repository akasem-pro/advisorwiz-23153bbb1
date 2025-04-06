
import { trackUserBehavior, UserBehaviorEvent } from '../../utils/analytics/eventTracker';
import { trackGA4Event, trackGA4PageView } from '../../utils/analytics/ga4Integration';
import { getCookieSettings } from '../../utils/analytics/trackers/cookieBanner';
import { flushMetricsBuffer } from '../../utils/performance/enhanced';
import { supabase } from '../../integrations/supabase/client';

// Default settings for batching events
const DEFAULT_BATCH_SIZE = 10;
const DEFAULT_BATCH_INTERVAL_MS = 2000;

// Events waiting to be sent
let eventQueue: Array<{
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
}> = [];

// Is a flush already scheduled?
let flushScheduled = false;

// Configurable settings
let batchSize = DEFAULT_BATCH_SIZE;
let batchIntervalMs = DEFAULT_BATCH_INTERVAL_MS;

/**
 * Check if analytics tracking is allowed based on user consent
 */
export const isAnalyticsAllowed = (trackingType: 'analytics' | 'marketing' | 'personalization' = 'analytics'): boolean => {
  try {
    // Check for consent
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    
    // Check for specific permission
    const settings = getCookieSettings();
    
    // Essential cookies are always allowed
    if (trackingType === 'analytics') {
      return settings.analytics === true;
    } else if (trackingType === 'marketing') {
      return settings.marketing === true;
    } else if (trackingType === 'personalization') {
      return settings.personalization === true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to check analytics permissions:', error);
    return false;
  }
};

/**
 * Schedule a flush of the event queue
 */
const scheduleFlush = (): void => {
  if (flushScheduled) return;
  
  flushScheduled = true;
  
  // Use requestIdleCallback if available for better performance
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      flushEvents();
      flushScheduled = false;
    }, { timeout: batchIntervalMs });
  } else {
    setTimeout(() => {
      flushEvents();
      flushScheduled = false;
    }, batchIntervalMs);
  }
};

/**
 * Flush events from the queue
 */
const flushEvents = async (): Promise<void> => {
  if (eventQueue.length === 0) return;
  
  try {
    // Create a copy of the current queue and clear it
    const events = [...eventQueue];
    eventQueue = [];
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Flushing ${events.length} events`);
    }
    
    // Group by provider to minimize API calls
    const gaEvents = events.filter(e => isAnalyticsAllowed('analytics'));
    const marketingEvents = events.filter(e => isAnalyticsAllowed('marketing'));
    
    // Send to Google Analytics
    if (gaEvents.length > 0) {
      gaEvents.forEach(event => {
        trackGA4Event(event.name, event.properties);
      });
    }
    
    // Send to backend analytics if available
    if (supabase) {
      const batchPromises = [];
      
      // Process in batches
      for (let i = 0; i < events.length; i += batchSize) {
        const batch = events.slice(i, i + batchSize);
        
        // Skip if no analytics permission
        if (!isAnalyticsAllowed('analytics')) continue;
        
        try {
          // Insert into analytics_metrics table
          const { error } = await supabase.from('analytics_metrics').insert(
            batch.map(event => ({
              metric_type: 'event',
              metric_name: event.name,
              metric_value: 1,
              dimension_name: 'event_data',
              dimension_value: JSON.stringify(event.properties || {}),
              metric_date: new Date(event.timestamp).toISOString().split('T')[0]
            }))
          );
          
          if (error && process.env.NODE_ENV === 'development') {
            console.error('[Analytics] Error sending events to Supabase:', error);
          }
        } catch (err) {
          console.error('[Analytics] Error in batch processing:', err);
        }
      }
    }
    
    // Also flush performance metrics
    flushMetricsBuffer();
    
  } catch (error) {
    console.error('[Analytics] Error flushing events:', error);
    
    // Put events back in queue on failure, but avoid infinite growth
    if (eventQueue.length < 100) {
      eventQueue = [...eventQueue, ...eventQueue];
    }
  }
};

/**
 * Track a custom event
 */
export const trackEvent = (
  eventName: string, 
  properties?: Record<string, any>, 
  options?: {
    sendImmediately?: boolean;
    trackingType?: 'analytics' | 'marketing' | 'personalization';
  }
): void => {
  try {
    const opts = {
      sendImmediately: false,
      trackingType: 'analytics' as 'analytics' | 'marketing' | 'personalization',
      ...options
    };
    
    // Skip if not allowed (unless it's a consent-related event)
    const isCookieEvent = eventName.includes('cookie_') || eventName.includes('consent');
    if (!isCookieEvent && !isAnalyticsAllowed(opts.trackingType)) {
      return;
    }
    
    // Add to queue for batching
    eventQueue.push({
      name: eventName,
      properties,
      timestamp: Date.now()
    });
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Tracking event: ${eventName}`, properties);
    }
    
    // Send immediately or schedule
    if (opts.sendImmediately || eventQueue.length >= batchSize) {
      flushEvents();
    } else {
      scheduleFlush();
    }
    
    // Also track using the user behavior system for compatibility
    trackUserBehavior(eventName as any, properties);
    
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
};

/**
 * Track page views
 */
export const trackPageView = (
  pageTitle: string,
  pagePath: string = window.location.pathname,
  properties?: Record<string, any>
): void => {
  if (!isAnalyticsAllowed('analytics')) return;
  
  const fullProperties = {
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath,
    ...properties
  };
  
  // Track in GA4
  trackGA4PageView(pageTitle, pagePath, fullProperties);
  
  // Track as generic event for other systems
  trackEvent('page_view', fullProperties);
};

/**
 * Initialize analytics tracking
 */
export const initializeAnalytics = (config?: {
  batchSize?: number;
  batchIntervalMs?: number;
  samplingRate?: number;
}): void => {
  // Apply configuration if provided
  if (config) {
    if (config.batchSize) batchSize = config.batchSize;
    if (config.batchIntervalMs) batchIntervalMs = config.batchIntervalMs;
  }

  // Check if we have consent before initializing
  if (!localStorage.getItem('cookie-consent')) {
    return;
  }
  
  // Generate session ID if not exists
  if (!localStorage.getItem('session_id')) {
    localStorage.setItem('session_id', `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`);
  }
  
  // Set up flush on page unload
  window.addEventListener('beforeunload', () => {
    flushEvents();
  });
  
  // Set up navigation tracking for SPAs
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    
    // After navigation completes, track the page view
    setTimeout(() => {
      trackPageView(document.title, window.location.pathname);
    }, 0);
  };
  
  window.addEventListener('popstate', () => {
    setTimeout(() => {
      trackPageView(document.title, window.location.pathname);
    }, 0);
  });
  
  // Track initial page view
  trackPageView(document.title, window.location.pathname);
  
  console.log('[Analytics] Analytics tracking initialized');
};

// Initialize on import
if (typeof window !== 'undefined') {
  // Wait for cookie consent check
  setTimeout(() => {
    if (localStorage.getItem('cookie-consent')) {
      initializeAnalytics();
    }
  }, 100);
}

// Export core functions for direct use
export { UserBehaviorEvent };
