
import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile devices and viewport sizes
 * @returns boolean indicating if the current device is a mobile device
 */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Initial check
    checkIfMobile();
    
    // Set up resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  /**
   * Check if the device is mobile based on screen width or user agent
   */
  const checkIfMobile = () => {
    // Check based on screen width (common mobile breakpoint)
    const isMobileViewport = window.innerWidth < 768;
    
    // Also check user agent for mobile devices
    const isMobileUserAgent = 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    
    setIsMobile(isMobileViewport || isMobileUserAgent);
  };

  return isMobile;
};
