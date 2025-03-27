
import React from 'react';
import MinimalVariant from './social-share/MinimalVariant';
import HorizontalVariant from './social-share/HorizontalVariant';
import CardsVariant from './social-share/CardsVariant';
import ButtonsVariant from './social-share/ButtonsVariant';
import { ShareOptions } from './social-share/utils';

interface SocialSharePlusProps {
  title?: string;
  description?: string;
  url?: string;
  variant?: 'minimal' | 'buttons' | 'cards' | 'horizontal';
  showAppDownload?: boolean;
  className?: string;
}

const SocialSharePlus: React.FC<SocialSharePlusProps> = ({
  title = 'AdvisorWiz - Match with the Perfect Financial Advisor',
  description = 'Find your perfect financial match with AdvisorWiz',
  url = window.location.href,
  variant = 'buttons',
  showAppDownload = true,
  className = '',
}) => {
  const shareOptions: ShareOptions = {
    title,
    description,
    url
  };

  // Choose which variant to render based on prop
  switch (variant) {
    case 'minimal':
      return <MinimalVariant 
        shareOptions={shareOptions} 
        showAppDownload={showAppDownload} 
        className={className} 
      />;
    
    case 'horizontal':
      return <HorizontalVariant 
        shareOptions={shareOptions} 
        showAppDownload={showAppDownload} 
        className={className} 
      />;
    
    case 'cards':
      return <CardsVariant 
        shareOptions={shareOptions} 
        showAppDownload={showAppDownload} 
        className={className} 
      />;
    
    default: // 'buttons' variant (default)
      return <ButtonsVariant 
        shareOptions={shareOptions} 
        showAppDownload={showAppDownload} 
        className={className} 
      />;
  }
};

export default SocialSharePlus;
