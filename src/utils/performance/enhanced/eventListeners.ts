
import { flushMetricsBuffer } from './index';

/**
 * Set up optimized event listeners for page visibility changes
 * Uses passive event listeners for better performance
 */
export const setupMetricsEventListeners = (): void => {
  // Flush metrics when page becomes hidden
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushMetricsBuffer();
    }
  }, { passive: true });
  
  // Flush metrics before unload - use capture to ensure it runs
  window.addEventListener('beforeunload', () => {
    flushMetricsBuffer();
  }, { capture: true });
};
