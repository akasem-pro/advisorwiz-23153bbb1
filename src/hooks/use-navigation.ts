
/**
 * Custom Navigation Hook
 * 
 * Provides optimized routing functionality with performance improvements,
 * analytics tracking, and A/B testing integration.
 * 
 * @module use-navigation
 */
import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics/pageTracker';
import { getVariant, trackConversion } from '../utils/abTesting';

/**
 * Options for the useNavigation hook
 */
interface UseNavigationOptions {
  /** Whether to track page views with analytics */
  trackAnalytics?: boolean;
  /** Enable A/B testing for navigation paths */
  enableABTesting?: boolean;
  /** Experiment ID for A/B testing navigation */
  experimentId?: string;
}

/**
 * Custom hook for optimized navigation handling
 * 
 * @param {UseNavigationOptions} options - Configuration options
 * @returns Navigation utilities and state
 */
export const useNavigation = (options: UseNavigationOptions = {}) => {
  const { 
    trackAnalytics = true,
    enableABTesting = false,
    experimentId = 'nav_optimization'
  } = options;
  
  const navigate = useNavigate();
  const location = useLocation();
  const debounceTimerRef = useRef<number | null>(null);
  
  /**
   * Get a potentially A/B tested version of a navigation path
   * 
   * @param {string} originalPath - The original path to navigate to
   * @returns {string} The potentially modified path based on A/B tests
   */
  const getTestedPath = useCallback((originalPath: string): string => {
    if (!enableABTesting) return originalPath;
    
    try {
      // Simple example of path testing - in a real implementation,
      // you might have variants with different paths
      const navVariants = [
        { id: 'control', value: { path: originalPath }, weight: 80 },
        { id: 'test_variant', value: { path: originalPath.includes('?') ? 
          `${originalPath}&variant=test` : `${originalPath}?variant=test` }, weight: 20 }
      ];
      
      // Get user ID from storage
      let userId: string | undefined;
      try {
        userId = localStorage.getItem('userId') || undefined;
      } catch {
        // Fall back to original path if localStorage isn't available
        return originalPath;
      }
      
      // Get the assigned variant for this navigation path
      const selectedVariant = getVariant(
        `${experimentId}_${originalPath.split('/')[1] || 'home'}`,
        navVariants,
        userId
      );
      
      return selectedVariant.value.path;
    } catch (error) {
      console.error('Error in A/B test path selection:', error);
      return originalPath;
    }
  }, [enableABTesting, experimentId]);
  
  /**
   * Debounced navigation to avoid frequent re-renders
   * 
   * @param {string} path - Path to navigate to
   * @param {object} state - Optional state to pass to the history
   */
  const navigateTo = useCallback((path: string, state?: any) => {
    if (path !== location.pathname) {
      // Clear previous timer if it exists
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
      
      // Get potentially A/B tested version of the path
      const testedPath = getTestedPath(path);
      
      // Set a small timeout to debounce rapid navigation requests
      debounceTimerRef.current = window.setTimeout(() => {
        console.log(`Navigating to: ${testedPath}`);
        navigate(testedPath, { state });
        debounceTimerRef.current = null;
      }, 10); // Small delay to batch nearby navigation requests
    }
  }, [navigate, location.pathname, getTestedPath]);
  
  /**
   * Track page views with debounce to avoid excessive analytics calls
   */
  useEffect(() => {
    if (!trackAnalytics) return;
    
    const pageTitle = document.title || 'AdvisorWiz';
    
    // Debounce analytics tracking slightly to ensure
    // the page has fully rendered before tracking
    const trackingTimer = window.setTimeout(() => {
      trackPageView(pageTitle, location.pathname);
      
      // If A/B testing is enabled, track path as a view conversion
      if (enableABTesting && experimentId) {
        try {
          const userId = localStorage.getItem('userId');
          if (userId) {
            // Track path view as a conversion
            trackConversion(
              `${experimentId}_${location.pathname.split('/')[1] || 'home'}`,
              'control', // Default to control - in a real app, retrieve the actual variant
              'view',
              userId
            );
          }
        } catch (error) {
          console.error('Error tracking A/B test navigation view:', error);
        }
      }
    }, 100);
    
    return () => {
      window.clearTimeout(trackingTimer);
    };
  }, [location.pathname, trackAnalytics, enableABTesting, experimentId]);
  
  /**
   * Clean up any pending timeouts
   */
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  
  return { 
    navigateTo, 
    currentPath: location.pathname,
    pathname: location.pathname,
    search: location.search,
    hash: location.hash
  };
};
