
import * as webVitals from 'web-vitals';

// Consolidated performance tracking data
interface PerformanceData {
  functionName: string;
  executionTime: number;
  inputSize: number;
  timestamp: number;
}

let performanceData: PerformanceData[] = [];
const MAX_ENTRIES = 100;

// Initialize and track all web vitals
export const trackWebVitals = () => {
  if (typeof window !== 'undefined') {
    try {
      webVitals.onCLS(sendToAnalytics);
      webVitals.onFID(sendToAnalytics);
      webVitals.onLCP(sendToAnalytics);
      webVitals.onFCP(sendToAnalytics);
      webVitals.onTTFB(sendToAnalytics);
      webVitals.onINP(sendToAnalytics);
    } catch (error) {
      console.error('Failed to load web-vitals:', error);
    }
  }
};

// Consolidated function to send metrics to analytics
const sendToAnalytics = (metric: webVitals.Metric) => {
  // Check if gtag is available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      non_interaction: true,
      metric_id: metric.id,
      metric_rating: metric.navigationType || 'unknown'
    });
  }
  
  // Log to console during development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
};

// Track the performance of a function execution
export const trackPerformance = (
  functionName: string,
  executionTime: number,
  inputSize: number = 0
): void => {
  // Add new entry
  performanceData.push({
    functionName,
    executionTime,
    inputSize,
    timestamp: Date.now()
  });
  
  // Trim if exceeding max size
  if (performanceData.length > MAX_ENTRIES) {
    performanceData = performanceData.slice(-MAX_ENTRIES);
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `Performance: ${functionName} executed in ${executionTime.toFixed(2)}ms with input size ${inputSize}`
    );
  }
};

// Get performance data for analysis
export const getPerformanceData = (): PerformanceData[] => {
  return [...performanceData];
};

// Clear performance data
export const clearPerformanceData = (): void => {
  performanceData = [];
};

// Performance wrapper for functions
export function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  fnName: string
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const startTime = performance.now();
    
    // Use performance mark for more detailed profiling in DevTools
    performance.mark(`${fnName}-start`);
    
    const result = fn(...args);
    
    const endTime = performance.now();
    performance.mark(`${fnName}-end`);
    performance.measure(fnName, `${fnName}-start`, `${fnName}-end`);
    
    trackPerformance(fnName, endTime - startTime, args.length);
    
    return result;
  };
}

// Setup lazy loading for images
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

// Consolidated function to initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Track web vitals
    trackWebVitals();
    
    // Setup optimizations when DOM is loaded
    if (document.readyState === 'complete') {
      setupLazyLoading();
      optimizeImagesForCWV();
      implementResourceHints();
    } else {
      window.addEventListener('DOMContentLoaded', () => {
        setupLazyLoading();
        optimizeImagesForCWV();
        implementResourceHints();
      });
    }
    
    // Add event listeners for client-side navigation
    document.addEventListener('newpage', () => {
      setupLazyLoading();
      optimizeImagesForCWV();
    });
  }
};

// Optimize images for Core Web Vitals (extracted from previous version)
export const optimizeImagesForCWV = () => {
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach((img) => {
      if (!img.hasAttribute('loading') && !img.hasAttribute('fetchpriority')) {
        img.setAttribute('loading', 'lazy');
        
        // Add decoding async for better performance
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      }
    });
  }
  
  // Add fetchpriority="high" to LCP image
  const heroImages = document.querySelectorAll('.hero-image img, .primary-image img');
  heroImages.forEach((img) => {
    if (!img.hasAttribute('fetchpriority')) {
      img.setAttribute('fetchpriority', 'high');
      img.removeAttribute('loading'); // Don't lazy-load LCP images
    }
  });
};

// Implement resource hints (extracted from previous version)
export const implementResourceHints = () => {
  const head = document.head;
  
  // Common domains to preconnect to
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com'
  ];
  
  // Add preconnect hints
  preconnectDomains.forEach(domain => {
    if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      head.appendChild(link);
    }
  });
};
