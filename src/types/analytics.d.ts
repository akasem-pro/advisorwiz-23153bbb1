
/**
 * Global type definitions for analytics integrations
 */

// This centralizes all window augmentations for tracking libraries
interface Window {
  // Google Analytics / Tag Manager
  dataLayer: any[];
  gtag?: (...args: any[]) => void;
  
  // Meta/Facebook Pixel
  fbq?: any;
  
  // Pinterest Tag
  pintrk?: any;
  
  // Google AdSense
  adsbygoogle: any[];
  
  // Add any other tracking globals here
}
