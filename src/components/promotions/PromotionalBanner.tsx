
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';

interface PromotionalBannerProps {
  id: string;
  message: string;
  ctaText: string;
  ctaUrl: string;
  variant?: 'primary' | 'secondary' | 'accent';
  durationInSeconds?: number;
  persistent?: boolean;
  userId?: string;
  onCtaClick?: () => void;
  onDismiss?: () => void;
  title?: string;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  id,
  message,
  ctaText,
  ctaUrl,
  variant = 'primary',
  durationInSeconds,
  persistent = false,
  userId,
  onCtaClick,
  onDismiss,
  title
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Check if this banner was dismissed before
  useEffect(() => {
    if (persistent) return;
    
    const dismissedBanners = localStorage.getItem('dismissedBanners');
    if (dismissedBanners) {
      const parsed = JSON.parse(dismissedBanners);
      if (parsed.includes(id)) {
        setIsVisible(false);
      }
    }
  }, [id, persistent]);
  
  // Auto-hide after duration if specified
  useEffect(() => {
    if (!isVisible || !durationInSeconds) return;
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      trackBannerEvent('auto_hide');
    }, durationInSeconds * 1000);
    
    return () => clearTimeout(timer);
  }, [isVisible, durationInSeconds]);
  
  // Track banner events
  const trackBannerEvent = (action: 'view' | 'click' | 'dismiss' | 'auto_hide') => {
    trackUserBehavior(`promo_banner_${action}`, {
      banner_id: id,
      message,
      variant,
      user_id: userId
    });
  };
  
  // Track view once when component mounts
  useEffect(() => {
    if (isVisible) {
      trackBannerEvent('view');
    }
  }, []);
  
  const handleDismiss = () => {
    setIsVisible(false);
    
    // Remember this banner was dismissed
    if (!persistent) {
      const dismissedBanners = localStorage.getItem('dismissedBanners');
      const parsed = dismissedBanners ? JSON.parse(dismissedBanners) : [];
      parsed.push(id);
      localStorage.setItem('dismissedBanners', JSON.stringify(parsed));
    }
    
    trackBannerEvent('dismiss');
    
    // Call the custom dismiss handler if provided
    if (onDismiss) {
      onDismiss();
    }
  };
  
  const handleCtaClick = () => {
    trackBannerEvent('click');
    
    // Call the custom click handler if provided
    if (onCtaClick) {
      onCtaClick();
    }
  };
  
  if (!isVisible) return null;
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100';
      case 'secondary':
        return 'bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-100';
      case 'accent':
        return 'bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-900/20 dark:border-teal-800 dark:text-teal-100';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100';
    }
  };
  
  const getButtonVariant = () => {
    switch (variant) {
      case 'primary': return 'default';
      case 'secondary': return 'secondary';
      case 'accent': return 'default'; // Changed from 'accent' to 'default' since 'accent' is not supported
      default: return 'default';
    }
  };

  return (
    <div className={`w-full border-b py-3 px-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 ${getVariantStyles()}`}>
      <p className="font-medium text-center sm:text-left flex-grow">
        {message}
      </p>
      <div className="flex items-center gap-3 ml-auto">
        <Link to={ctaUrl}>
          <Button 
            variant={getButtonVariant()} 
            size="sm"
            onClick={handleCtaClick}
          >
            {ctaText}
          </Button>
        </Link>
        <button 
          onClick={handleDismiss}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PromotionalBanner;
