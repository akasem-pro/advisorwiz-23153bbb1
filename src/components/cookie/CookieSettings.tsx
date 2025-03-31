
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface CookieSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CookieSettings: React.FC<CookieSettingsProps> = ({ open, onOpenChange }) => {
  const [settings, setSettings] = useState({
    essential: true, // Essential cookies can't be disabled
    analytics: true,
    marketing: false,
    personalization: false,
  });

  const handleToggle = (type: 'analytics' | 'marketing' | 'personalization') => {
    setSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('cookie-settings', JSON.stringify(settings));
    localStorage.setItem('cookie-consent', 'accepted');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Advanced Tracking</DialogTitle>
          <DialogDescription>
            Control how we use cookies on this website
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Essential Cookies</h4>
              <p className="text-sm text-muted-foreground">
                Required for the website to function properly
              </p>
            </div>
            <Switch checked={settings.essential} disabled />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Analytics</h4>
              <p className="text-sm text-muted-foreground">
                Allow us to analyze website traffic and improve your experience
              </p>
            </div>
            <Switch 
              checked={settings.analytics} 
              onCheckedChange={() => handleToggle('analytics')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Marketing</h4>
              <p className="text-sm text-muted-foreground">
                Help us deliver relevant advertisements
              </p>
            </div>
            <Switch 
              checked={settings.marketing} 
              onCheckedChange={() => handleToggle('marketing')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Personalization</h4>
              <p className="text-sm text-muted-foreground">
                Remember your preferences and customize your experience
              </p>
            </div>
            <Switch 
              checked={settings.personalization} 
              onCheckedChange={() => handleToggle('personalization')}
            />
          </div>
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save preferences
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Keep this setting turned on to see insights and metrics on your{' '}
            <Link to="/admin/analytics" className="text-primary inline-flex items-center">
              Dashboard
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookieSettings;
