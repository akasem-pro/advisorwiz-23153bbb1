/**
 * Mobile DOM optimization utilities
 * Enhances performance on mobile devices by optimizing DOM interaction
 */

/**
 * Apply optimizations for Core Web Vitals metrics on mobile
 */
export const optimizeMobileDOM = () => {
  if (typeof window === 'undefined') return;

  // Set content-visibility for off-screen images
  optimizeOffScreenContent();
  
  // Add loading attribute to images
  optimizeImageLoading();
  
  // Use passive event listeners for touch events
  usePassiveEventListeners();
  
  // Set proper viewport height for mobile (fixes iOS issues)
  setMobileViewportHeight();
};

/**
 * Optimize content that is off screen using content-visibility
 */
const optimizeOffScreenContent = () => {
  // Check if content-visibility is supported
  if ('contentVisibility' in document.documentElement.style) {
    const nonCriticalSections = document.querySelectorAll('.mobile-section:not(.critical)');
    
    nonCriticalSections.forEach(section => {
      // @ts-ignore - TypeScript doesn't know about contentVisibility yet
      section.style.contentVisibility = 'auto';
      section.style.contain = 'content';
    });
  }
};

/**
 * Add proper loading attributes to images
 * - loading="eager" for above-fold critical images
 * - loading="lazy" for below-fold images
 */
const optimizeImageLoading = () => {
  // Critical images - above the fold
  const criticalImages = document.querySelectorAll('.mobile-lcp-image, .hero-image img');
  criticalImages.forEach(img => {
    if (img instanceof HTMLImageElement) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
    }
  });
  
  // Non-critical images - below the fold
  const nonCriticalImages = document.querySelectorAll('img:not(.mobile-lcp-image):not(.hero-image img)');
  nonCriticalImages.forEach(img => {
    if (img instanceof HTMLImageElement && !img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    }
  });
};

/**
 * Use passive event listeners for touch events to improve scrolling performance
 */
const usePassiveEventListeners = () => {
  const supportsPassive = (() => {
    let result = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function() { result = true; return true; }
      });
      // @ts-ignore - TypeScript doesn't know about passive option
      window.addEventListener('testPassive', null, opts);
      // @ts-ignore - TypeScript doesn't know about passive option
      window.removeEventListener('testPassive', null, opts);
    } catch (e) {}
    return result;
  })();
  
  if (supportsPassive) {
    // Apply passive listeners to common touch/scroll events
    const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];
    passiveEvents.forEach(eventName => {
      document.addEventListener(eventName, e => {}, { passive: true });
    });
  }
};

/**
 * Set correct viewport height for mobile browsers (fixes iOS issues)
 * This addresses the iOS Safari 100vh problem
 */
const setMobileViewportHeight = () => {
  const setViewportProperty = () => {
    // First we get the viewport height and multiply it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  // Set the initial value
  setViewportProperty();
  
  // Update the height on resize and orientation change
  window.addEventListener('resize', setViewportProperty);
  window.addEventListener('orientationchange', setViewportProperty);
};

/**
 * Initialize mobile optimizations
 * Call this from your main application entry point
 */
export const initMobileOptimizations = () => {
  // Initialize immediately if document is already loaded
  if (document.readyState === 'complete') {
    optimizeMobileDOM();
  } else {
    // Otherwise wait for DOMContentLoaded
    window.addEventListener('DOMContentLoaded', optimizeMobileDOM);
  }
  
  // Run additional optimizations after full page load
  window.addEventListener('load', () => {
    // Delay non-critical optimizations
    setTimeout(() => {
      // Add intersection observer for lazy-loading components
      setupIntersectionObserver();
    }, 500);
  });
};

/**
 * Setup intersection observer for lazy loading components when they enter viewport
 */
const setupIntersectionObserver = () => {
  if ('IntersectionObserver' in window) {
    const lazyLoadObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Handle lazy loading for different element types
          if (element.classList.contains('mobile-lazy-component')) {
            element.classList.add('mobile-loaded');
            element.classList.remove('mobile-lazy-component');
          }
          
          // Stop observing this element
          lazyLoadObserver.unobserve(element);
        }
      });
    }, {
      rootMargin: '100px', // Start loading 100px before the item enters viewport
      threshold: 0.01
    });
    
    // Start observing elements that should be lazy loaded
    document.querySelectorAll('.mobile-lazy-component').forEach(element => {
      lazyLoadObserver.observe(element);
    });
  }
};
