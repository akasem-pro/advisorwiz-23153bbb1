
import React from 'react';
import { getShareVariant } from './social-share/ShareVariants';
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

  // Get the appropriate variant component using the factory function
  const VariantComponent = getShareVariant(variant);

  // Render the variant with the shared props
  return (
    <div className="my-3">
      <VariantComponent 
        shareOptions={shareOptions} 
        showAppDownload={showAppDownload} 
        className={className} 
      />
    </div>
  );
};

export default SocialSharePlus;
