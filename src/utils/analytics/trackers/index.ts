
// Export all tracker modules for easy access

export * from './cookieBanner';
export * from './googleAnalytics';
export * from './metaPixel';
export * from './facebookMetaTag';
export * from './pinterestTag';
export * from './googleAdSense';

// Type definitions to help with global window objects
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    fbq?: any; // Changed to match the 'any' type in metaPixel.ts
    pintrk?: any;
    adsbygoogle: any[];
  }
}

// Types for tracking configuration
export interface TrackingConfig {
  googleAnalytics?: {
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
  };
  metaPixel?: {
    pixelId: string;
    advanced?: {
      autoConfig?: boolean;
      debug?: boolean;
    };
  };
  pinterestTag?: {
    tagId: string;
    debug?: boolean;
  };
  googleAdSense?: {
    adClient: string;
    options?: {
      pageLevelAds?: boolean;
      overlayAds?: boolean;
      analyticsEnabled?: boolean;
    };
  };
}
