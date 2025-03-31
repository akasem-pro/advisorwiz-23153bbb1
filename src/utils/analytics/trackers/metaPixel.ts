
import { isTrackingAllowed } from './cookieBanner';

/**
 * Meta Pixel Configuration
 */
interface MetaPixelConfig {
  pixelId: string;
  advanced?: {
    autoConfig?: boolean;
    debug?: boolean;
  };
}

let isInitialized = false;

/**
 * Initialize Meta (Facebook) Pixel with the given configuration
 * Only initializes if user has consented to marketing cookies
 */
export const initializeMetaPixel = (config: MetaPixelConfig): void => {
  // Check if marketing tracking is allowed
  if (!isTrackingAllowed('marketing')) {
    console.log('Meta Pixel tracking is not permitted by user consent settings');
    return;
  }

  // Prevent duplicate initialization
  if (isInitialized) return;

  try {
    // Initialize Facebook Pixel
    // Fixed IIFE to properly handle function expression evaluation
    (function(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );
    
    // Initialize with pixel ID
    window.fbq('init', config.pixelId, {}, {
      autoConfig: config.advanced?.autoConfig !== false,
      debug: config.advanced?.debug === true
    });
    
    // Track initial page view
    window.fbq('track', 'PageView');
    
    isInitialized = true;
    
    if (config.advanced?.debug) {
      console.log('Meta Pixel initialized with ID:', config.pixelId);
    }
  } catch (error) {
    console.error('Failed to initialize Meta Pixel:', error);
  }
};

/**
 * Track a standard event with the Meta Pixel
 * @param eventName Name of the standard event
 * @param parameters Optional event parameters
 */
export const trackMetaPixelEvent = (
  eventName: string,
  parameters?: Record<string, any>
): void => {
  if (!isTrackingAllowed('marketing')) return;
  
  if ((window as any).fbq) {
    (window as any).fbq('track', eventName, parameters);
  }
};

/**
 * Track a custom event with the Meta Pixel
 * @param eventName Name of the custom event
 * @param parameters Optional event parameters
 */
export const trackMetaPixelCustomEvent = (
  eventName: string,
  parameters?: Record<string, any>
): void => {
  if (!isTrackingAllowed('marketing')) return;
  
  if ((window as any).fbq) {
    (window as any).fbq('trackCustom', eventName, parameters);
  }
};
