
import { useState, useEffect } from 'react';

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  hasConsent: boolean;
}

export const useCookieSettings = () => {
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true,
    analytics: false,
    marketing: false,
    personalization: false,
    hasConsent: false
  });
  
  useEffect(() => {
    // Check for consent
    const consent = localStorage.getItem('cookie-consent');
    
    // Load saved settings if they exist
    const savedSettings = localStorage.getItem('cookie-settings');
    
    if (consent) {
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings({
            ...parsedSettings,
            hasConsent: true
          });
        } catch (error) {
          console.error('Failed to parse cookie settings:', error);
        }
      } else {
        // Default to basic consent with only essential and analytics
        setSettings({
          essential: true,
          analytics: true,
          marketing: false,
          personalization: false,
          hasConsent: true
        });
      }
    }
  }, []);
  
  return settings;
};

export default useCookieSettings;
