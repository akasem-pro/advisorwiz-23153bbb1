
/**
 * Utility functions for tracking and improving web performance
 */

// Track Core Web Vitals
export const trackWebVitals = () => {
  if (typeof window !== 'undefined') {
    // Check if the browser supports the Web Vitals API
    try {
      import('web-vitals').then((webVitals) => {
        webVitals.onCLS(sendToAnalytics);
        webVitals.onFID(sendToAnalytics);
        webVitals.onLCP(sendToAnalytics);
        webVitals.onFCP(sendToAnalytics);
        webVitals.onTTFB(sendToAnalytics);
        webVitals.onINP(sendToAnalytics);
      });
    } catch (error) {
      console.error('Failed to load web-vitals:', error);
    }
  }
};

// Send metrics to analytics
const sendToAnalytics = (metric: { name: string; value: number; rating?: string; delta: number; entries: any[]; id: string; navigationType?: string }) => {
  // Check if gtag is available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      non_interaction: true,
    });
  }
  
  // You can also log to console during development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
};

// Lazy load images when they enter viewport
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',
      threshold: [0.01]
    });
    
    lazyImages.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img: Element) => {
      const imgEl = img as HTMLImageElement;
      if (imgEl.dataset.src) {
        imgEl.src = imgEl.dataset.src;
        imgEl.removeAttribute('data-src');
      }
    });
  }
};

// Reduce render-blocking resources
export const optimizeCriticalRendering = () => {
  // Add rel="preload" to critical CSS
  const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
  linkElements.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.includes('critical')) {
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'style');
      link.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");
    }
  });
  
  // Defer non-critical JavaScript
  const scriptElements = document.querySelectorAll('script:not([async]):not([defer])');
  scriptElements.forEach((script) => {
    if (!script.getAttribute('src')?.includes('critical')) {
      script.setAttribute('defer', '');
    }
  });
};

// Optimize images for Core Web Vitals
export const optimizeImagesForCWV = () => {
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach((img) => {
      if (!img.hasAttribute('loading') && !img.hasAttribute('fetchpriority')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Track web vitals
    trackWebVitals();
    
    // Setup lazy loading for images
    window.addEventListener('DOMContentLoaded', () => {
      setupLazyLoading();
      optimizeCriticalRendering();
      optimizeImagesForCWV();
    });
  }
};
