
import React, { useEffect, useState } from 'react';
import { setupAnalytics } from '../../services/analytics';
import { getCookieSettings } from '../../utils/analytics/trackers/cookieBanner';
import CookieManager from '../cookie/CookieManager';

interface TrackingManagerProps {
  config: {
    googleAnalytics?: {
      measurementId: string;
      debug?: boolean;
    };
    metaPixel?: {
      pixelId: string;
      debug?: boolean;
    };
    samplingRate?: number;
  };
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
      const initAnalytics = async () => {
        // Configure analytics based on user consent
        const analyticsSetup = {
          googleAnalyticsId: cookieSettings.analytics && config.googleAnalytics ? 
                            config.googleAnalytics.measurementId : undefined,
          metaPixelId: cookieSettings.marketing && config.metaPixel ?
                      config.metaPixel.pixelId : undefined,
          debug: process.env.NODE_ENV === 'development',
          sampling: config.samplingRate || 1.0
        };
        
        // Initialize the analytics system
        await setupAnalytics(analyticsSetup);
        
        setIsInitialized(true);
        console.log('[TrackingManager] Analytics initialized with user consent');
      };
      
      initAnalytics();
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
