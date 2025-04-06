
import { lazy, ComponentType } from 'react';

/**
 * Enhanced lazy loading utility with retry logic and performance tracking
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  componentName: string
): React.LazyExoticComponent<T> {
  return lazy(() => {
    // Track component load start
    if (typeof window !== 'undefined' && window.performance) {
      performance.mark(`${componentName}-load-start`);
    }
    
    return importFn()
      .then(module => {
        // Track component load end
        if (typeof window !== 'undefined' && window.performance) {
          performance.mark(`${componentName}-load-end`);
          performance.measure(
            `${componentName}-load-time`,
            `${componentName}-load-start`,
            `${componentName}-load-end`
          );
        }
        return module;
      })
      .catch(error => {
        console.error(`Error loading component ${componentName}:`, error);
        // Retry once after a short delay
        return new Promise(resolve => {
          setTimeout(() => {
            console.log(`Retrying load for ${componentName}...`);
            resolve(importFn());
          }, 1000);
        });
      });
  });
}

/**
 * Get the optimal preload strategy based on component importance
 */
export function getPreloadStrategy(
  importance: 'high' | 'medium' | 'low' = 'medium'
): { prefetch: boolean; preload: boolean; preconnect: boolean } {
  switch (importance) {
    case 'high':
      return { prefetch: true, preload: true, preconnect: true };
    case 'medium':
      return { prefetch: true, preload: false, preconnect: true };
    case 'low':
      return { prefetch: false, preload: false, preconnect: true };
    default:
      return { prefetch: false, preload: false, preconnect: false };
  }
}

/**
 * Prefetch a component when user is likely to need it
 */
export function prefetchComponent(path: string): void {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = path;
  link.as = 'script';
  document.head.appendChild(link);
}
