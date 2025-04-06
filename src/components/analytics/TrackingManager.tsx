
import React, { useEffect, useState } from 'react';
import { setupAnalytics } from '../../services/analytics';
import { getConsentSettings, ConsentType } from '../../services/analytics/consent';
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
 * Uses the centralized consent management system
 */
const TrackingManager: React.FC<TrackingManagerProps> = ({ config }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  // Check cookie settings and initialize trackers when component mounts
  useEffect(() => {
    if (isInitialized) return;
    
    const consentSettings = getConsentSettings();
    
    // Only initialize tracking scripts if user has given consent
    if (consentSettings[ConsentType.ANALYTICS] || consentSettings[ConsentType.MARKETING]) {
      const initAnalytics = async () => {
        // Configure analytics based on user consent
        const analyticsSetup = {
          googleAnalyticsId: consentSettings[ConsentType.ANALYTICS] && config.googleAnalytics ? 
                            config.googleAnalytics.measurementId : undefined,
          metaPixelId: consentSettings[ConsentType.MARKETING] && config.metaPixel ?
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

  // Listen for changes in consent
  useEffect(() => {
    const handleConsentChange = () => {
      setIsInitialized(false); // Reset to trigger reinitialization
    };
    
    // Listen for our custom event
    window.addEventListener('consent-updated', handleConsentChange);
    
    // Also listen for storage changes (for backward compatibility)
    window.addEventListener('storage', (event) => {
      if (event.key === 'cookie-settings' || event.key === 'cookie-consent') {
        handleConsentChange();
      }
    });
    
    return () => {
      window.removeEventListener('consent-updated', handleConsentChange);
      window.removeEventListener('storage', handleConsentChange);
    };
  }, []);

  // Render the cookie manager for user consent management
  return <CookieManager />;
};

export default TrackingManager;
