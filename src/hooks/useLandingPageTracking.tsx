
import { useEffect, useRef } from 'react';
import { createSectionViewTracker } from '../utils/analytics/landingPageTracking';

/**
 * Hook to track section views on the landing page
 */
export const useLandingPageTracking = () => {
  const observerRefs = useRef<{[key: string]: IntersectionObserver}>({});
  
  // Set up section view tracking
  const trackSectionView = (elementId: string, sectionName: string) => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      return;
    }
    
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Create observer if it doesn't exist yet
    if (!observerRefs.current[elementId]) {
      const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.25, // 25% visibility triggers callback
      };
      
      observerRefs.current[elementId] = new IntersectionObserver(
        createSectionViewTracker(elementId, sectionName),
        options
      );
    }
    
    // Start observing
    observerRefs.current[elementId].observe(element);
  };
  
  // Clean up observers on unmount
  useEffect(() => {
    return () => {
      Object.values(observerRefs.current).forEach(observer => {
        observer.disconnect();
      });
    };
  }, []);
  
  return { trackSectionView };
};

export default useLandingPageTracking;
