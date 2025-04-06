/**
 * Analytics Buffer
 * Manages the event buffer and flushing logic
 */
import { AnalyticsEvent, AnalyticsProvider } from './types';
import { getConfig } from './config';

// Event buffer for batching
let eventBuffer: AnalyticsEvent[] = [];
let flushTimeout: number | null = null;
let providers: AnalyticsProvider[] = [];

/**
 * Add an event to the buffer
 */
export const addToBuffer = (event: AnalyticsEvent): void => {
  eventBuffer.push(event);
  
  const config = getConfig();
  
  // Debug logging
  if (config.debug) {
    console.log(`[Analytics] Event added to buffer: ${event.type}.${event.name}`, event.properties);
  }
  
  // Schedule flush if needed
  scheduleFlush();
};

/**
 * Schedule a flush of the event buffer
 */
export const scheduleFlush = (): void => {
  const config = getConfig();
  
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
  
  const config = getConfig();
  
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
 * Register an analytics provider
 */
export const registerProvider = (provider: AnalyticsProvider): void => {
  providers.push(provider);
  
  const config = getConfig();
  if (config.debug) {
    console.log(`[Analytics] Provider ${provider.name} registered`);
  }
};

/**
 * Get all registered providers
 */
export const getProviders = (): AnalyticsProvider[] => {
  return [...providers];
};

/**
 * Clear all events in the buffer
 */
export const clearBuffer = (): void => {
  eventBuffer = [];
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
};

// Force flush on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    flushEvents();
  });
}
