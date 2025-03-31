
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEvent } from '../services/analytics/analyticsService';

interface PageTrackingOptions {
  trackScrollDepth?: boolean;
  trackTimeOnPage?: boolean;
  customDimensions?: Record<string, string>;
}

/**
 * Hook to track page views and enhanced page metrics
 */
export const usePageTracking = (options: PageTrackingOptions = {}) => {
  const location = useLocation();
  const pageLoadTime = useRef(Date.now());
  const maxScrollDepth = useRef(0);
  const lastScrollTime = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Track initial page view and set up clean-up tracking
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
      scrollTimeout.current = setTimeout(() => {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, options.trackScrollDepth]);
  
  return null;
};
