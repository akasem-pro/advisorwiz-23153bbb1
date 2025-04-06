
/**
 * Global type definitions for analytics integrations
 */

// This centralizes all window augmentations for tracking libraries
// to avoid conflicts between multiple declarations
interface Window {
  dataLayer: any[];
  gtag?: (...args: any[]) => void;
  fbq?: any;
  pintrk?: any;
  adsbygoogle?: any[];
  // Add any other tracking globals here
}
