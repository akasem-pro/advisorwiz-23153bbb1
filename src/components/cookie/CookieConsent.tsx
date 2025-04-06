
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Shield } from 'lucide-react';
import { updateCookieSettings } from '../../utils/analytics/trackers/cookieBanner';
import { trackEvent } from '../../services/analytics/analyticsService';

// Cookie consent events
enum CookieConsentEvent {
  BANNER_SHOWN = 'cookie_banner_shown',
  CONSENT_ACCEPTED = 'cookie_consent_accepted',
  CONSENT_DECLINED = 'cookie_consent_declined',
  SETTINGS_OPENED = 'cookie_settings_opened',
  SETTINGS_SAVED = 'cookie_settings_saved'
}

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);
  
  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cookie-consent');
    
    // If no consent is found, show the consent popup after a short delay
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setShowConsent(true);
        // Track banner shown event (this works without consent)
        trackEvent(CookieConsentEvent.BANNER_SHOWN, {
          timestamp: Date.now()
        }, { sendImmediately: true });
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleAccept = () => {
    // Store consent in localStorage with default settings
    updateCookieSettings({
      essential: true,
      analytics: true,
      marketing: false,
      personalization: false
    });
    
    setShowConsent(false);
    
    // Track the acceptance event (this works without consent)
    trackEvent(CookieConsentEvent.CONSENT_ACCEPTED, { 
      settings: {
        analytics: true,
        marketing: false,
        personalization: false
      }
    }, { sendImmediately: true });
    
    // Initialize analytics now that we have consent
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  
  const handleDecline = () => {
    // Store minimal consent in localStorage
    updateCookieSettings({
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false
    });
    
    setShowConsent(false);
    
    // Track the decline event (this works without consent)
    trackEvent(CookieConsentEvent.CONSENT_DECLINED, { 
      settings: {
        analytics: false,
        marketing: false,
        personalization: false
      }
    }, { sendImmediately: true });
  };
  
  // If user has already given consent, don't render anything
  if (!showConsent) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-full max-w-lg px-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
              This website uses cookies
            </h3>
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We use cookies to improve your experience on our site, show you personalized content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies. You can also manage individual cookie preferences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
            <Button 
              variant="outline" 
              onClick={handleDecline}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Essential Only
            </Button>
            <Button 
              onClick={handleAccept}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
