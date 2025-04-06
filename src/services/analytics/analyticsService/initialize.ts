
import { updateConfig } from './config';
import { trackPageView } from './tracking';
import { flushEvents } from './eventQueue';

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
    updateConfig({
      batchSize: config.batchSize,
      batchIntervalMs: config.batchIntervalMs
    });
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
