
import { isTrackingAllowed } from './cookieBanner';

/**
 * Google Analytics 4 Configuration
 */
interface GA4Config {
  measurementId: string;
  cookieOptions?: {
    domain?: string;
    expires?: number;
    path?: string;
    secure?: boolean;
    sameSite?: 'None' | 'Lax' | 'Strict';
  };
  consentMode?: boolean;
  debug?: boolean;
}

let isInitialized = false;

/**
 * Initialize Google Analytics 4 with the given configuration
 * Will only initialize if user has consented to analytics cookies
 */
export const initializeGA4 = (config: GA4Config): void => {
  // Check if analytics tracking is allowed
  if (!isTrackingAllowed('analytics')) {
    console.log('Google Analytics tracking is not permitted by user consent settings');
    return;
  }

  // Prevent duplicate initialization
  if (isInitialized) return;

  try {
    // Create script element for GA4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
    
    // Add the script to the document
    document.head.appendChild(script);
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Define gtag function
    function gtag(...args: any[]) {
      window.dataLayer!.push(arguments);
    }
    
    // Assign gtag to window
    window.gtag = gtag;
    
    // Initialize gtag with configuration
    window.gtag('js', new Date());
    window.gtag('config', config.measurementId, {
      cookie_domain: config.cookieOptions?.domain,
      cookie_expires: config.cookieOptions?.expires,
      cookie_path: config.cookieOptions?.path,
      cookie_flags: config.cookieOptions?.sameSite 
        ? `SameSite=${config.cookieOptions.sameSite};${config.cookieOptions.secure ? 'Secure' : ''}`
        : undefined
    });

    isInitialized = true;
    
    if (config.debug) {
      console.log('Google Analytics 4 initialized with ID:', config.measurementId);
    }
    
    // Set consent mode if enabled
    if (config.consentMode) {
      const cookieSettings = JSON.parse(localStorage.getItem('cookie-settings') || '{}');
      
      window.gtag('consent', 'update', {
        'analytics_storage': cookieSettings.analytics ? 'granted' : 'denied',
        'ad_storage': cookieSettings.marketing ? 'granted' : 'denied',
        'personalization_storage': cookieSettings.personalization ? 'granted' : 'denied'
      });
    }
  } catch (error) {
    console.error('Failed to initialize Google Analytics:', error);
  }
};

/**
 * Send an event to Google Analytics 4
 * @param eventName Name of the event
 * @param eventParams Event parameters 
 */
export const trackGA4Event = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (!isTrackingAllowed('analytics')) return;
  
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};
