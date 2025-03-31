
import React, { useEffect, useState } from 'react';
import { TrackingConfig } from '../../utils/analytics/trackers';
import { initializeGA4 } from '../../utils/analytics/trackers/googleAnalytics';
import { initializeMetaPixel } from '../../utils/analytics/trackers/metaPixel';
import { initializePinterestTag } from '../../utils/analytics/trackers/pinterestTag';
import { initializeGoogleAdSense } from '../../utils/analytics/trackers/googleAdSense';
import { getCookieSettings } from '../../utils/analytics/trackers/cookieBanner';
import { CookieManager } from '../cookie';

interface TrackingManagerProps {
  config: TrackingConfig;
}

/**
 * TrackingManager Component
 * Centralizes the initialization of all tracking scripts based on user consent settings
 */
const TrackingManager: React.FC<TrackingManagerProps> = ({ config }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  // Check cookie settings and initialize trackers when component mounts
  useEffect(() => {
    if (isInitialized) return;
    
    const cookieSettings = getCookieSettings();
    
    // Only initialize tracking scripts if user has given consent
    if (cookieSettings.hasConsent) {
      // Initialize Google Analytics if analytics cookies are allowed
      if (cookieSettings.analytics && config.googleAnalytics) {
        initializeGA4(config.googleAnalytics);
      }

      // Initialize marketing trackers if marketing cookies are allowed
      if (cookieSettings.marketing) {
        // Meta Pixel
        if (config.metaPixel) {
          initializeMetaPixel(config.metaPixel);
        }

        // Pinterest Tag
        if (config.pinterestTag) {
          initializePinterestTag(config.pinterestTag);
        }

        // Google AdSense
        if (config.googleAdSense) {
          initializeGoogleAdSense(config.googleAdSense);
        }
      }
      
      setIsInitialized(true);
    }
  }, [config, isInitialized]);

  // Listen for changes in storage (e.g. when cookie settings are updated in another tab)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'cookie-settings' || event.key === 'cookie-consent') {
        setIsInitialized(false); // Reset to trigger reinitialization
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Render the cookie manager for user consent management
  return <CookieManager />;
};

export default TrackingManager;
