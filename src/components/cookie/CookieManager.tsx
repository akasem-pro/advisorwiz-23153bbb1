
import React, { useState, useEffect } from 'react';
import CookieConsent from './CookieConsent';
import CookieSettings from './CookieSettings';
import { Button } from '../ui/button';
import { Settings } from 'lucide-react';
import { getCookieSettings } from '../../utils/analytics/trackers/cookieBanner';
import { trackInteraction, AnalyticsEventType } from '../../services/analytics/core';

const CookieManager: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  
  useEffect(() => {
    // Check if user has already given consent
    const cookieSettings = getCookieSettings();
    setHasConsent(cookieSettings.hasConsent);
    
    // Listen for storage events (when settings are updated in another tab)
    const handleStorageChange = () => {
      const updatedSettings = getCookieSettings();
      setHasConsent(updatedSettings.hasConsent);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleOpenSettings = () => {
    setShowSettings(true);
    // Track this interaction
    trackInteraction('open_cookie_settings', 'button', {
      source: 'cookie_settings_button'
    });
  };
  
  return (
    <>
      {/* Consent popup */}
      <CookieConsent />
      
      {/* Settings dialog */}
      <CookieSettings
        open={showSettings}
        onOpenChange={setShowSettings}
      />
      
      {/* Settings button (only shown if user has already given consent) */}
      {hasConsent && (
        <div className="fixed bottom-4 right-4 z-40">
          <Button
            variant="outline"
            size="icon"
            onClick={handleOpenSettings}
            className="rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700"
            aria-label="Cookie Settings"
          >
            <Settings className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            <span className="sr-only">Cookie Settings</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default CookieManager;
