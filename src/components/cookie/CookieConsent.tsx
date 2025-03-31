
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent } from '../ui/sheet';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);
  
  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cookie-consent');
    
    // If no consent is found, show the consent popup after a short delay
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleAccept = () => {
    // Store consent in localStorage
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
    
    // Track the acceptance event
    trackUserBehavior('cookie_consent_accepted', {
      timestamp: new Date().toISOString()
    });
  };
  
  // If user has already given consent, don't render anything
  if (!showConsent) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-full max-w-md px-4 z-50">
      <div className="bg-slate-100 dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            This website uses cookies.
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            We use cookies to analyze website traffic and optimize your website experience. 
            By accepting our use of cookies, your data will be aggregated with all other user data.
          </p>
          <div className="mt-4">
            <Button 
              onClick={handleAccept}
              className="w-full bg-black hover:bg-gray-800 text-white"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
