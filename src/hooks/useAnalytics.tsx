
import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent, trackPageView, isAnalyticsAllowed } from '../services/analytics/analyticsService';

interface AnalyticsOptions {
  trackScrollDepth?: boolean;
  trackTimeOnPage?: boolean;
  customDimensions?: Record<string, string>;
  sendImmediately?: boolean;
}

/**
 * Hook to provide analytics tracking functionality in components
 */
export const useAnalytics = (options: AnalyticsOptions = {}) => {
  const location = useLocation();
  const pageLoadTime = useRef(Date.now());
  const maxScrollDepth = useRef(0);
  const lastScrollTime = useRef(0);
  const scrollTimeout = useRef<number | null>(null);
  
  // Track page view on mount and route changes
  useEffect(() => {
    // Don't track if consent not given
    if (!isAnalyticsAllowed('analytics')) return;
    
    // Reset metrics
    pageLoadTime.current = Date.now();
    maxScrollDepth.current = 0;
    
    // Track page view
    const pageTitle = document.title;
    trackPageView(pageTitle, location.pathname, options.customDimensions);
    
    // Track time on page when leaving
    return () => {
      if (options.trackTimeOnPage !== false) {
        const timeOnPage = Date.now() - pageLoadTime.current;
        trackEvent('page_time', {
          path: location.pathname,
          time_ms: timeOnPage,
          time_seconds: Math.round(timeOnPage / 1000)
        });
      }
    };
  }, [location.pathname]);
  
  // Set up scroll depth tracking
  useEffect(() => {
    if (options.trackScrollDepth === false || !isAnalyticsAllowed('analytics')) return;
    
    const handleScroll = () => {
      // Throttle scroll events
      if (Date.now() - lastScrollTime.current < 100) return;
      lastScrollTime.current = Date.now();
      
      // Calculate scroll depth
      const scrollTop = window.scrollY;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
      const roundedDepth = Math.round(scrollPercent);
      
      // Record maximum scroll depth
      if (roundedDepth > maxScrollDepth.current) {
        maxScrollDepth.current = roundedDepth;
      }
      
      // Clear previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Set new timeout to track depth after scrolling stops
      scrollTimeout.current = window.setTimeout(() => {
        // Track scroll depth milestones (25%, 50%, 75%, 90%, 100%)
        const milestones = [25, 50, 75, 90, 100];
        
        for (const milestone of milestones) {
          if (maxScrollDepth.current >= milestone) {
            trackEvent('scroll_depth', {
              path: location.pathname,
              depth: milestone,
              actual_depth: maxScrollDepth.current
            });
            break; // Only track the highest milestone reached
          }
        }
      }, 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [location.pathname, options.trackScrollDepth]);
  
  // Event tracking functions
  const trackClick = useCallback((target: string, properties?: Record<string, any>) => {
    trackEvent('click', { target, ...properties }, { 
      sendImmediately: options.sendImmediately 
    });
  }, [options.sendImmediately]);
  
  const trackView = useCallback((elementName: string, properties?: Record<string, any>) => {
    trackEvent('view', { element: elementName, ...properties }, { 
      sendImmediately: options.sendImmediately 
    });
  }, [options.sendImmediately]);
  
  const trackFormSubmit = useCallback((formName: string, properties?: Record<string, any>) => {
    trackEvent('form_submit', { form: formName, ...properties }, { 
      sendImmediately: options.sendImmediately 
    });
  }, [options.sendImmediately]);
  
  const trackFeatureUsage = useCallback((featureName: string, action: string = 'used', properties?: Record<string, any>) => {
    trackEvent(`feature_${action}`, { feature: featureName, ...properties }, { 
      sendImmediately: options.sendImmediately 
    });
  }, [options.sendImmediately]);
  
  const trackError = useCallback((errorType: string, message: string, properties?: Record<string, any>) => {
    trackEvent('error', { type: errorType, message, ...properties }, { 
      sendImmediately: true // Always send errors immediately
    });
  }, []);
  
  return {
    trackClick,
    trackView,
    trackFormSubmit,
    trackFeatureUsage,
    trackError
  };
};

/**
 * Simple hook to just track page views
 */
export const usePageTracking = (pageName?: string, options: AnalyticsOptions = {}) => {
  const location = useLocation();
  
  useEffect(() => {
    if (!isAnalyticsAllowed('analytics')) return;
    
    const pageTitle = pageName || document.title;
    trackPageView(pageTitle, location.pathname, options.customDimensions);
  }, [location.pathname, pageName]);
  
  return null;
};

export default useAnalytics;
