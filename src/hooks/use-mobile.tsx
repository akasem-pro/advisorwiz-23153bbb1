
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// Cache mobile status to avoid unnecessary recalculations
let cachedIsMobile: boolean | null = null;

/**
 * Hook for detecting mobile devices with optimized performance
 * Uses efficient detection logic and caching to minimize recomputation
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Use cached value if available (during navigation)
    if (cachedIsMobile !== null) return cachedIsMobile;
    
    // Initial calculation on first render
    return typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false;
  });

  React.useEffect(() => {
    // Only attach listener if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Use matchMedia for better performance compared to resize events
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Handler for media query changes
    const onChange = (e: MediaQueryListEvent) => {
      const newValue = e.matches;
      setIsMobile(newValue);
      cachedIsMobile = newValue; // Update cache
    };
    
    // Initial check and setup
    const initialValue = mql.matches;
    setIsMobile(initialValue);
    cachedIsMobile = initialValue;
    
    // Modern API for media query listeners
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    } 
    // Fallback for older browsers
    else {
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, []);

  return isMobile;
}

// Export an immediate detector function for non-hook use cases
export const checkIsMobile = (): boolean => {
  if (cachedIsMobile !== null) return cachedIsMobile;
  
  if (typeof window === 'undefined') return false;
  
  const isMobileValue = window.innerWidth < MOBILE_BREAKPOINT;
  cachedIsMobile = isMobileValue;
  return isMobileValue;
};
