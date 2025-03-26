
import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, StoreIcon, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';

interface ASOBannerProps {
  variant?: 'app-store' | 'play-store' | 'both';
  position?: 'top' | 'bottom' | 'inline';
  className?: string;
}

const ASOBanner: React.FC<ASOBannerProps> = ({ 
  variant = 'both', 
  position = 'top',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated } = useUser();
  
  // Show banner after a delay for better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if this banner has been dismissed recently
      const lastDismissed = localStorage.getItem('aso_banner_dismissed');
      if (!lastDismissed || Date.now() - parseInt(lastDismissed) > 7 * 24 * 60 * 60 * 1000) {
        setIsVisible(true);
        trackUserBehavior('banner_view', { banner_type: 'aso', variant, position });
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [variant, position]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('aso_banner_dismissed', Date.now().toString());
    trackUserBehavior('banner_dismiss', { banner_type: 'aso', variant, position });
  };
  
  const handleStoreClick = (store: 'app_store' | 'play_store') => {
    trackUserBehavior('store_click', { store, banner_type: 'aso', variant, position });
    // These URLs would be replaced with actual app store URLs
    const url = store === 'app_store' 
      ? 'https://apps.apple.com/app/advisorwiz/id123456789'
      : 'https://play.google.com/store/apps/details?id=com.advisorwiz';
    window.open(url, '_blank');
  };
  
  if (!isVisible) return null;
  
  const positionClasses = {
    top: 'fixed top-0 left-0 right-0 z-50',
    bottom: 'fixed bottom-0 left-0 right-0 z-50',
    inline: 'relative w-full'
  };
  
  return (
    <div className={`${positionClasses[position]} ${className} bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 px-4 shadow-md`}>
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <Download className="h-5 w-5" />
          <span className="font-medium">Get the AdvisorWiz app for a better experience!</span>
          <div className="hidden sm:flex items-center">
            <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {(variant === 'app-store' || variant === 'both') && (
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => handleStoreClick('app_store')}
            >
              <StoreIcon className="h-4 w-4 mr-1" />
              App Store
            </Button>
          )}
          
          {(variant === 'play-store' || variant === 'both') && (
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => handleStoreClick('play_store')}
            >
              <StoreIcon className="h-4 w-4 mr-1" />
              Google Play
            </Button>
          )}
          
          <button
            onClick={handleDismiss}
            className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Dismiss"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ASOBanner;
