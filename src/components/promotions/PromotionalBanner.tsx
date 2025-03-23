
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';

interface PromotionalBannerProps {
  id: string;
  message: string;
  ctaText: string;
  ctaUrl: string;
  variant?: 'primary' | 'secondary' | 'accent';
  durationInSeconds?: number;
  userId?: string;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  id,
  message,
  ctaText,
  ctaUrl,
  variant = 'primary',
  durationInSeconds = 10,
  userId
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Track impression when banner is shown
    if (isVisible) {
      trackUserBehavior('promo_impression', userId, {
        promo_id: id,
        variant
      });
    }
    
    // Auto-hide after duration if specified
    if (durationInSeconds > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, durationInSeconds * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [id, isVisible, durationInSeconds, userId, variant]);
  
  if (!isVisible) return null;
  
  const handleClick = () => {
    // Track click when CTA is clicked
    trackUserBehavior('promo_click', userId, {
      promo_id: id,
      variant
    });
    
    // Navigate or open the URL
    if (ctaUrl.startsWith('http')) {
      window.open(ctaUrl, '_blank');
    } else {
      window.location.href = ctaUrl;
    }
  };
  
  const handleDismiss = () => {
    // Track dismiss when banner is closed
    trackUserBehavior('promo_dismiss', userId, {
      promo_id: id,
      variant
    });
    
    setIsVisible(false);
  };
  
  const variantClasses = {
    primary: 'bg-teal-600 text-white',
    secondary: 'bg-navy-800 text-white',
    accent: 'bg-amber-500 text-navy-900'
  };
  
  return (
    <div className={`relative px-4 py-3 ${variantClasses[variant]} animate-in fade-in slide-in-from-top`}>
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm md:text-base font-medium mr-4">{message}</p>
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            className="whitespace-nowrap bg-white text-navy-800 border-transparent hover:bg-slate-100"
            onClick={handleClick}
          >
            {ctaText}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 text-white hover:bg-black/10"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
