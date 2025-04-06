
// Export all tracker modules for easy access

export * from './cookieBanner';
export * from './googleAnalytics';
export * from './metaPixel';
export * from './facebookMetaTag';
export * from './pinterestTag';
export * from './googleAdSense';

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
