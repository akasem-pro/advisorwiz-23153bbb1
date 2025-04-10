import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { Shield } from 'lucide-react';
import { getCookieSettings, updateCookieSettings } from '../../utils/analytics/trackers/cookieBanner';
import { trackEvent, AnalyticsEventType } from '../../services/analytics/core';

interface CookieSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Cookie consent events 
enum CookieConsentEvent {
  SETTINGS_OPENED = 'cookie_settings_opened',
  SETTINGS_SAVED = 'cookie_settings_saved'
}

const CookieSettings: React.FC<CookieSettingsProps> = ({ open, onOpenChange }) => {
  const [settings, setSettings] = useState({
    essential: true, // Essential cookies can't be disabled
    analytics: true,
    marketing: false,
    personalization: false,
  });

  // Load settings when dialog opens
  useEffect(() => {
    if (open) {
      const savedSettings = getCookieSettings();
      setSettings({
        essential: true,
        analytics: savedSettings.analytics,
        marketing: savedSettings.marketing,
        personalization: savedSettings.personalization
      });
      
      // Track settings opened event
      trackEvent(
        AnalyticsEventType.CONSENT, 
        CookieConsentEvent.SETTINGS_OPENED,
        1
      );
    }
  }, [open]);

  const handleToggle = (type: 'analytics' | 'marketing' | 'personalization') => {
    setSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSave = () => {
    // Save settings to localStorage
    updateCookieSettings(settings);
    
    // Track the settings update
    trackEvent(
      AnalyticsEventType.CONSENT,
      CookieConsentEvent.SETTINGS_SAVED,
      1,
      settings
    );
    
    // Close dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2 text-slate-900 dark:text-white">
            <Shield className="h-5 w-5" /> 
            Cookie Settings
          </DialogTitle>
          <DialogDescription className="text-slate-700 dark:text-slate-300">
            Control how we use cookies on this website
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium text-slate-900 dark:text-white">Essential Cookies</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Required for the website to function properly
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-xs mr-2 text-slate-500 dark:text-slate-400">Always On</span>
              <Switch 
                checked={settings.essential} 
                disabled 
                className="data-[state=checked]:bg-teal-600 data-[state=unchecked]:bg-slate-300"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium text-slate-900 dark:text-white">Analytics</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Allow us to analyze website traffic and improve your experience
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-xs mr-2 text-slate-500 dark:text-slate-400">
                {settings.analytics ? 'On' : 'Off'}
              </span>
              <Switch 
                checked={settings.analytics} 
                onCheckedChange={() => handleToggle('analytics')}
                className="data-[state=checked]:bg-teal-600 data-[state=unchecked]:bg-slate-300"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium text-slate-900 dark:text-white">Marketing</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Help us deliver relevant advertisements
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-xs mr-2 text-slate-500 dark:text-slate-400">
                {settings.marketing ? 'On' : 'Off'}
              </span>
              <Switch 
                checked={settings.marketing} 
                onCheckedChange={() => handleToggle('marketing')}
                className="data-[state=checked]:bg-teal-600 data-[state=unchecked]:bg-slate-300"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium text-slate-900 dark:text-white">Personalization</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Remember your preferences and customize your experience
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-xs mr-2 text-slate-500 dark:text-slate-400">
                {settings.personalization ? 'On' : 'Off'}
              </span>
              <Switch 
                checked={settings.personalization} 
                onCheckedChange={() => handleToggle('personalization')}
                className="data-[state=checked]:bg-teal-600 data-[state=unchecked]:bg-slate-300"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-slate-300 dark:border-slate-600">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700 text-white">
            Save preferences
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-4">
          <p>
            Your selection will be saved for this browser and device. You can change your preferences at any time.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookieSettings;
