
import { trackWebVitals } from './performance/webVitals';
import { implementResourceHints } from './performance/resourceHints';
import { setupLazyLoading, optimizeImagesForCWV } from './performance/imageOptimization';
import { initEnhancedPerformanceTracking } from './performance/enhancedPerformanceTracking';
import { withPerformanceTracking } from './performance/functionTracking';

/**
 * Initialize essential performance optimizations immediately
 * and defer non-critical ones
 */
export const initPerformanceOptimizations = () => {
  // Critical optimizations that should run immediately
  // These directly impact Core Web Vitals and initial rendering
  implementResourceHints();
  setupLazyLoading();
  
  // Use deferred initialization for less critical optimizations
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Track Web Vitals metrics - slightly deferred to not impact FCP
      trackWebVitals();
      
      // Initialize enhanced tracking system with lower priority
      initEnhancedPerformanceTracking();
      
      // Log initialization
      console.log('[Performance] Performance optimizations initialized');
    }, { timeout: 3000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      trackWebVitals();
      initEnhancedPerformanceTracking();
    }, 1000);
  }
  
  // Run optimization on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', optimizeOnDOMContentLoaded);
  
  // Run optimization when navigating to new pages
  window.addEventListener('popstate', optimizeOnNavigation);
};

/**
 * Optimize performance when DOM is fully loaded
 */
const optimizeOnDOMContentLoaded = () => {
  // Optimize images for CWV (LCP, CLS)
  optimizeImagesForCWV();
  
  // Defer non-critical scripts to improve TTI
  deferNonCriticalScripts();
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
