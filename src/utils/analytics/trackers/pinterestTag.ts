
import { isTrackingAllowed } from './cookieBanner';

/**
 * Pinterest Tag Configuration
 */
interface PinterestTagConfig {
  tagId: string;
  debug?: boolean;
}

let isInitialized = false;

/**
 * Initialize Pinterest Tag with the given configuration
 * Only initializes if user has consented to marketing cookies
 */
export const initializePinterestTag = (config: PinterestTagConfig): void => {
  // Check if marketing tracking is allowed
  if (!isTrackingAllowed('marketing')) {
    console.log('Pinterest Tag tracking is not permitted by user consent settings');
    return;
  }

  // Prevent duplicate initialization
  if (isInitialized) return;

  try {
    // Load Pinterest Tag script - Fixed IIFE to properly handle function expression evaluation
    (function(e) {
      if (!window.pintrk) {
        window.pintrk = function() {
          window.pintrk.queue.push(Array.prototype.slice.call(arguments));
        };
        
        window.pintrk.queue = [];
        window.pintrk.version = "3.0";
        
        const n = e.createElement("script");
        n.async = true;
        n.src = "https://s.pinimg.com/ct/core.js";
        
        const p = e.getElementsByTagName("script")[0];
        p.parentNode.insertBefore(n, p);
      }
    })(document);
    
    // Initialize with tag ID
    window.pintrk('load', config.tagId);
    
    // Track initial page visit
    window.pintrk('page');
    
    isInitialized = true;
    
    if (config.debug) {
      console.log('Pinterest Tag initialized with ID:', config.tagId);
    }
  } catch (error) {
    console.error('Failed to initialize Pinterest Tag:', error);
  }
};

/**
 * Track a standard event with the Pinterest Tag
 * @param eventName Name of the standard event
 * @param parameters Optional event parameters
 */
export const trackPinterestEvent = (
  eventName: string,
  parameters?: Record<string, any>
): void => {
  if (!isTrackingAllowed('marketing')) return;
  
  if (window.pintrk) {
    window.pintrk('track', eventName, parameters);
  }
};

/**
 * Track a custom event with the Pinterest Tag
 * @param eventName Name of the custom event
 * @param parameters Optional event parameters
 */
export const trackPinterestCustomEvent = (
  eventName: string,
  parameters?: Record<string, any>
): void => {
  if (!isTrackingAllowed('marketing')) return;
  
  if (window.pintrk) {
    window.pintrk('track', 'custom', parameters || {});
  }
};
