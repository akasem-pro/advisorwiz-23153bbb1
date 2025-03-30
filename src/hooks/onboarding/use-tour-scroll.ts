
import { useCallback } from 'react';

/**
 * Custom hook for handling element scrolling during onboarding tour
 */
export const useTourScroll = () => {
  // Helper function to scroll to element
  const scrollToElement = useCallback((selector: string) => {
    try {
      const element = document.querySelector(selector);
      if (element && selector !== 'body') {
        // Scroll the element into view with smooth behavior
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add a highlight class temporarily to make the element more visible
        element.classList.add('tour-highlight');
        setTimeout(() => {
          element.classList.remove('tour-highlight');
        }, 1500);
      }
    } catch (err) {
      console.error('Error scrolling to element:', err);
    }
  }, []);

  return scrollToElement;
};
