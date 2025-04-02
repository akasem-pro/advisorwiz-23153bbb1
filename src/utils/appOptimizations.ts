/**
 * App Optimizations
 * Centralized initialization of all performance optimizations
 */

import { initAnimationOptimizations } from './animations/optimizedAnimations';
import { initAnimationMetrics } from './performance/animationMetrics';
import { initPerformanceOptimizations } from './performanceTracking';
import { initMobileOptimizations } from './mobileDOMOptimization';
import { setupErrorHandling } from './errorHandling';

/**
 * Initialize all app optimizations
 */
export const initAppOptimizations = (): void => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Set up error handling first to catch init errors
  setupErrorHandling();
  
  // Set up performance tracking
  initPerformanceOptimizations();
  
  // Initialize animation optimizations
  initAnimationOptimizations();
  
  // Initialize animation metrics
  initAnimationMetrics();
  
  // Initialize mobile optimizations
  initMobileOptimizations();
  
  console.log('[App] Performance optimizations initialized');
};

/**
 * Run optimizations as soon as possible
 */
if (typeof window !== 'undefined') {
  // Run immediately if document is already loaded
  if (document.readyState === 'complete') {
    initAppOptimizations();
  } else {
    // Otherwise wait for DOMContentLoaded
    window.addEventListener('DOMContentLoaded', initAppOptimizations);
  }
}
