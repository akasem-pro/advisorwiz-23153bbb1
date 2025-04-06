
import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  trackPageView,
  trackInteraction,
  trackFeature,
  trackPerformance,
  trackError,
  AnalyticsEventType
} from '../services/analytics/core';

interface AnalyticsHookOptions {
  trackScrollDepth?: boolean;
  trackTimeOnPage?: boolean;
  customDimensions?: Record<string, string>;
}

/**
 * Hook to provide analytics tracking functionality in components
 */
export const useAnalytics = (options: AnalyticsHookOptions = {}) => {
  const location = useLocation();
  const pageLoadTime = useRef(Date.now());
  const maxScrollDepth = useRef(0);
  const lastScrollTime = useRef(0);
  const scrollTimeout = useRef<number | null>(null);
  
  // Track page view on mount and route changes
  useEffect(() => {
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
        trackPerformance('time_on_page', timeOnPage, {
          path: location.pathname,
          time_seconds: Math.round(timeOnPage / 1000)
        });
      }
    };
  }, [location.pathname]);
  
  // Set up scroll depth tracking
  useEffect(() => {
    if (options.trackScrollDepth === false) return;
    
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
            trackInteraction('scroll_depth_reached', String(milestone), {
              path: location.pathname,
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
    trackInteraction('click', target, properties);
  }, []);
  
  const trackView = useCallback((elementName: string, properties?: Record<string, any>) => {
    trackInteraction('view', elementName, properties);
  }, []);
  
  const trackFormSubmit = useCallback((formName: string, properties?: Record<string, any>) => {
    trackInteraction('form_submit', formName, properties);
  }, []);
  
  const trackFeatureUsage = useCallback((featureName: string, action: string = 'used', properties?: Record<string, any>) => {
    trackFeature(featureName, action, properties);
  }, []);
  
  return {
    trackClick,
    trackView,
    trackFormSubmit,
    trackFeatureUsage,
    trackError: trackError
  };
};

/**
 * Simple hook to just track page views
 */
export const usePageTracking = (pageName?: string, options: AnalyticsHookOptions = {}) => {
  const location = useLocation();
  
  useEffect(() => {
    const pageTitle = pageName || document.title;
    trackPageView(pageTitle, location.pathname, options.customDimensions);
  }, [location.pathname, pageName]);
  
  return null;
};

export default useAnalytics;
