
/**
 * Utility functions for tracking and improving web performance
 */

// Track Core Web Vitals
export const trackWebVitals = () => {
  if (typeof window !== 'undefined') {
    // Check if the browser supports the Web Vitals API
    if ('web-vitals' in window) {
      import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getLCP(sendToAnalytics);
        getFCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
      });
    }
  }
};

// Send metrics to analytics
const sendToAnalytics = (metric: { name: string; value: number }) => {
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
