
import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics/pageTracker';

/**
 * Custom hook for optimized navigation handling
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const debounceTimerRef = useRef<number | null>(null);
  
  // Debounced navigation to avoid frequent re-renders
  const navigateTo = useCallback((path: string) => {
    if (path !== location.pathname) {
      // Clear previous timer if it exists
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
      
      // Set a small timeout to debounce rapid navigation requests
      debounceTimerRef.current = window.setTimeout(() => {
        console.log(`Navigating to: ${path}`);
        navigate(path);
        debounceTimerRef.current = null;
      }, 10); // Small delay to batch nearby navigation requests
    }
  }, [navigate, location.pathname]);
  
  // Track page views with debounce to avoid excessive analytics calls
  useEffect(() => {
    const pageTitle = document.title || 'AdvisorWiz';
    
    // Debounce analytics tracking slightly to ensure
    // the page has fully rendered before tracking
    const trackingTimer = window.setTimeout(() => {
      trackPageView(pageTitle, location.pathname);
    }, 100);
    
    return () => {
      window.clearTimeout(trackingTimer);
    };
  }, [location.pathname]);
  
  // Clean up any pending timeouts
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  
  return { 
    navigateTo, 
    currentPath: location.pathname 
  };
};
