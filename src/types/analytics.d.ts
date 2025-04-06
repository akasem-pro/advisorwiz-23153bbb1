
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
  
  // Performance APIs
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
  
  // Add any other tracking globals here
}

/**
 * Consent settings for analytics tracking
 */
interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  hasConsent: boolean;
}

/**
 * Extended analytics event properties
 */
interface AnalyticsEventProps {
  [key: string]: any;
  
  // Common properties
  page_path?: string;
  page_title?: string;
  timestamp?: number;
  user_id?: string;
  session_id?: string;
  
  // Transaction properties
  transaction_id?: string;
  value?: number;
  currency?: string;
  
  // Item properties
  item_id?: string;
  item_name?: string;
  item_category?: string;
  
  // User properties
  user_type?: string;
  account_type?: string;
  subscription_status?: string;
}
