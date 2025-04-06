import { getConfig } from './config';
import { isAnalyticsAllowed } from './consent';
import { trackGA4Event } from '../../../utils/analytics/ga4Integration';
import { flushMetricsBuffer } from '../../../utils/performance/enhanced';
import { supabase } from '../../../integrations/supabase/client';
import { trackUserBehavior } from '../../../utils/analytics/eventTracker';

// Events waiting to be sent
let eventQueue: Array<{
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
}> = [];

// Is a flush already scheduled?
let flushScheduled = false;

/**
 * Add an event to the processing queue
 */
export const queueEvent = (
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
    const { batchSize } = getConfig();
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
 * Schedule a flush of the event queue
 */
export const scheduleFlush = (): void => {
  if (flushScheduled) return;
  
  flushScheduled = true;
  
  const { batchIntervalMs } = getConfig();
  
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
export const flushEvents = async (): Promise<void> => {
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
      const { batchSize } = getConfig();
      
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
 * Clear all events from the queue
 */
export const clearEventQueue = (): void => {
  eventQueue = [];
  if (flushScheduled && typeof window !== 'undefined') {
    if ('cancelIdleCallback' in window && flushScheduled) {
      // Not actually possible to cancel without keeping track of the ID
      // This is just for type safety
    }
    flushScheduled = false;
  }
};
