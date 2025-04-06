
/**
 * Analytics Buffer
 * Manages the event buffer and provider registry
 */
import { AnalyticsEvent, AnalyticsProvider } from './types';
import { getConfig } from './config';

// Event buffer
let eventBuffer: AnalyticsEvent[] = [];

// Provider registry
const providers: AnalyticsProvider[] = [];

/**
 * Add an event to the buffer
 */
export const addToBuffer = (event: AnalyticsEvent): void => {
  eventBuffer.push(event);
  
  const config = getConfig();
  if (eventBuffer.length >= config.batchSize) {
    flushEvents();
  }
};

/**
 * Clear the event buffer
 */
export const clearBuffer = (): void => {
  eventBuffer = [];
};

/**
 * Register an analytics provider
 */
export const registerProvider = (provider: AnalyticsProvider): void => {
  providers.push(provider);
};

/**
 * Get all registered providers
 */
export const getProviders = (): AnalyticsProvider[] => {
  return [...providers];
};

/**
 * Flush all events in the buffer to providers
 */
export const flushEvents = async (): Promise<void> => {
  if (eventBuffer.length === 0) {
    return;
  }
  
  const config = getConfig();
  const eventsToFlush = [...eventBuffer];
  
  // Clear buffer first to avoid duplicate sends if process fails
  clearBuffer();
  
  // Send to all enabled providers
  for (const provider of providers) {
    if (provider.isEnabled()) {
      try {
        for (const event of eventsToFlush) {
          await provider.trackEvent(event);
        }
        
        if (config.debug) {
          console.log(`[Analytics] Sent ${eventsToFlush.length} events to ${provider.name}`);
        }
      } catch (error) {
        console.error(`[Analytics] Error sending events to ${provider.name}:`, error);
        
        // Re-add events to buffer if send fails?
        // This could cause duplicates if some providers succeed and others fail
        // For now, we'll just log the error
      }
    }
  }
};

// Set up interval-based flushing
let flushInterval: number | null = null;

/**
 * Start the flush interval
 */
export const startFlushInterval = (): void => {
  const config = getConfig();
  
  if (flushInterval) {
    clearInterval(flushInterval);
  }
  
  flushInterval = window.setInterval(() => {
    flushEvents();
  }, config.batchIntervalMs);
};

/**
 * Stop the flush interval
 */
export const stopFlushInterval = (): void => {
  if (flushInterval) {
    clearInterval(flushInterval);
    flushInterval = null;
  }
};

// Start flush interval on module load
if (typeof window !== 'undefined') {
  startFlushInterval();
  
  // Flush events before page unload
  window.addEventListener('beforeunload', () => {
    flushEvents();
  });
}
