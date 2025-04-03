
import { trackWebVitals } from './performance/webVitals';
import { implementResourceHints } from './performance/resourceHints';
import { setupLazyLoading, optimizeImagesForCWV } from './performance/imageOptimization';
import { initEnhancedPerformanceTracking } from './performance/enhanced';
import { withPerformanceTracking } from './performance/functionTracking';

/**
 * Initialize all performance optimizations
 */
export const initPerformanceOptimizations = () => {
  // Track Web Vitals metrics
  trackWebVitals();
  
  // Implement resource hints (preconnect, etc.)
  implementResourceHints();
  
  // Setup lazy loading and image optimizations
  setupLazyLoading();
  optimizeImagesForCWV();
  
  // Initialize enhanced tracking system
  initEnhancedPerformanceTracking();
  
  // Log initialization
  console.log('[Performance] Performance optimizations initialized');
  
  // Run optimization on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', optimizeOnDOMContentLoaded);
  
  // Run optimization when navigating to new pages
  window.addEventListener('popstate', optimizeOnNavigation);
};

/**
 * Optimize performance when DOM is fully loaded
 */
const optimizeOnDOMContentLoaded = () => {
  // Defer non-critical scripts
  deferNonCriticalScripts();
  
  // Re-run image optimizations (for dynamically loaded content)
  optimizeImagesForCWV();
};

/**
 * Optimize performance when navigating to new pages
 */
const optimizeOnNavigation = () => {
  // Re-run optimizations when navigating
  optimizeImagesForCWV();
};

/**
 * Defer loading of non-critical scripts
 */
const deferNonCriticalScripts = () => {
  // Find all script tags
  const scripts = document.querySelectorAll('script:not([defer]):not([async])');
  
  scripts.forEach(script => {
    // Skip if it's an inline script without src
    if (!script.hasAttribute('src')) return;
    
    // Get the src attribute value
    const scriptSrc = script.getAttribute('src');
    
    // Skip if it's a critical script
    if (scriptSrc && (scriptSrc.includes('main.js') || scriptSrc.includes('vendor.js'))) return;
    
    // Add defer attribute
    script.setAttribute('defer', '');
  });
};

// Export the performance wrapper for functions
export { withPerformanceTracking };
