
import { isTrackingAllowed } from './cookieBanner';

/**
 * Google AdSense Configuration
 */
interface AdSenseConfig {
  adClient: string;
  options?: {
    pageLevelAds?: boolean;
    overlayAds?: boolean;
    analyticsEnabled?: boolean;
  };
}

let isInitialized = false;

/**
 * Initialize Google AdSense with the given configuration
 * Only initializes if user has consented to marketing cookies
 */
export const initializeGoogleAdSense = (config: AdSenseConfig): void => {
  // Check if marketing tracking is allowed
  if (!isTrackingAllowed('marketing')) {
    console.log('Google AdSense is not permitted by user consent settings');
    return;
  }

  // Prevent duplicate initialization
  if (isInitialized) return;

  try {
    // Create script element for AdSense
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adClient}`;
    script.crossOrigin = 'anonymous';
    
    // Add the script to the document
    document.head.appendChild(script);
    
    // Initialize AdSense options
    window.adsbygoogle = window.adsbygoogle || [];
    
    if (config.options?.pageLevelAds) {
      // Enable page-level ads
      (window.adsbygoogle as any).push({
        google_ad_client: config.adClient,
        enable_page_level_ads: true
      });
    }
    
    isInitialized = true;
    console.log('Google AdSense initialized with client ID:', config.adClient);
  } catch (error) {
    console.error('Failed to initialize Google AdSense:', error);
  }
};
