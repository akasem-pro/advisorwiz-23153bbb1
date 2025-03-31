
// Export all performance-related utilities from a central module
export * from './core';
export * from './enhancedPerformanceTracking';
export * from './functionTracking';
export * from './webVitals';

// Initialize performance tracking
export const initializePerformanceTracking = () => {
  // Import and initialize the required modules
  import('./webVitals').then(({ trackWebVitals }) => {
    trackWebVitals();
  });
  
  import('./enhancedPerformanceTracking').then(({ initEnhancedPerformanceTracking }) => {
    initEnhancedPerformanceTracking();
  });
  
  console.log('Performance tracking initialized');
};
