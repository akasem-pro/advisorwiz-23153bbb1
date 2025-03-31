
import React, { useState, useEffect } from 'react';
import CookieConsent from './CookieConsent';
import CookieSettings from './CookieSettings';
import { Button } from '../ui/button';
import { Settings } from 'lucide-react';

const CookieManager: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  
  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      setHasConsent(true);
    }
  }, []);
  
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
            onClick={() => setShowSettings(true)}
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
