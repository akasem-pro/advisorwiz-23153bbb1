
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { recordPerformanceMark } from '../../utils/performance/webVitals';
import ResourcePreload from './ResourcePreload';
import { trackEnhancedPerformance } from '../../utils/performance/enhanced';
import PerformanceMonitor from './PerformanceMonitor';

interface OptimizedAppRootProps {
  children: React.ReactNode;
}

/**
 * Performance-optimized application root component
 * - Tracks route changes
 * - Manages resource preloading
 * - Initializes performance monitoring
 */
const OptimizedAppRoot: React.FC<OptimizedAppRootProps> = ({ children }) => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  // Initialize performance tracking on mount
  useEffect(() => {
    // Record initial mount
    recordPerformanceMark('app-root-mounted');
    
    // Initialize app optimizations
    import('../../utils/appOptimizations').then(module => {
      module.initAppOptimizations();
    });
    
    setMounted(true);
  }, []);
  
  // Track route changes for performance monitoring
  useEffect(() => {
    if (mounted) {
      // Record route change start
      recordPerformanceMark('route-change-start');
      
      // Track route change in performance metrics
      trackEnhancedPerformance('route_change', performance.now(), {
        tags: {
          path: location.pathname,
          query: location.search ? 'true' : 'false'
        }
      });
      
      // Scroll to top on route change
      window.scrollTo(0, 0);
    }
  }, [location.pathname, mounted]);
  
  return (
    <>
      {/* Preload resources based on current route */}
      <ResourcePreload currentRoute={location.pathname} />
      
      {/* Render children (the actual app) */}
      {children}
      
      {/* Performance monitoring (only in development) */}
      {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
    </>
  );
};

export default OptimizedAppRoot;
