
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Shield } from 'lucide-react';
import { 
  trackCookieConsentEvent, 
  CookieConsentEvent,
  updateCookieSettings
} from '../../utils/analytics/trackers';

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);
  
  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cookie-consent');
    
    // If no consent is found, show the consent popup after a short delay
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setShowConsent(true);
        // Track banner shown event
        trackCookieConsentEvent(CookieConsentEvent.BANNER_SHOWN);
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
    
    // Track the acceptance event
    trackCookieConsentEvent(CookieConsentEvent.CONSENT_ACCEPTED);
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
    
    // Track the decline event
    trackCookieConsentEvent(CookieConsentEvent.CONSENT_DECLINED);
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
          
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            We use cookies to enhance your browsing experience, analyze website traffic, and show personalized content. 
            By accepting, you consent to our use of cookies as described in our cookie policy.
          </p>
          
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button 
              onClick={handleAccept}
              className="bg-black hover:bg-gray-800 text-white flex-1"
            >
              Accept All
            </Button>
            <Button 
              onClick={handleDecline}
              variant="outline" 
              className="border-gray-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700 flex-1"
            >
              Essential Only
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
