
import React from 'react';
import { 
  Share, 
  Mail, 
  Instagram,
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  MessageSquare
} from 'lucide-react';
import { Button } from '../ui/button';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';
import { useUser } from '../../context/UserContext';

interface MarketingChannelProps {
  compact?: boolean;
  showTitle?: boolean;
  variant?: 'default' | 'light' | 'dark';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const MarketingChannelsWidget: React.FC<MarketingChannelProps> = ({
  compact = false,
  showTitle = true,
  variant = 'default',
  orientation = 'horizontal',
  className = ''
}) => {
  const { isAuthenticated, userType } = useUser();
  
  const handleShare = (channel: string) => {
    let shareUrl = encodeURIComponent(window.location.href);
    let shareText = encodeURIComponent('Check out AdvisorWiz - the platform that connects you with the perfect financial advisors!');
    let url;
    
    switch(channel) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      case 'email':
        url = `mailto:?subject=Check out AdvisorWiz&body=${shareText} ${decodeURIComponent(shareUrl)}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: 'AdvisorWiz',
            text: decodeURIComponent(shareText),
            url: decodeURIComponent(shareUrl),
          });
          trackUserBehavior('share', { channel: 'native', page: window.location.pathname });
          return;
        }
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    }
    
    trackUserBehavior('share', { channel, page: window.location.pathname });
    window.open(url, '_blank', 'width=600,height=400');
  };
  
  const handleDownload = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    let url;
    
    if (/android/i.test(userAgent)) {
      url = 'https://play.google.com/store/apps/details?id=com.advisorwiz';
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      url = 'https://apps.apple.com/app/advisorwiz/id123456789';
    } else {
      url = '/download';
    }
    
    trackUserBehavior('app_download_click', { 
      platform: /android/i.test(userAgent) ? 'android' : /iPad|iPhone|iPod/.test(userAgent) ? 'ios' : 'web',
      user_type: isAuthenticated ? userType : 'visitor'
    });
    
    window.open(url, '_blank');
  };
  
  const variantClasses = {
    default: 'bg-white shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700',
    light: 'bg-gray-50 border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700',
    dark: 'bg-gray-900 border border-gray-800 text-white'
  };
  
  const iconClasses = compact ? 'h-4 w-4' : 'h-5 w-5';
  
  return (
    <div className={`
      ${variantClasses[variant]} 
      ${orientation === 'horizontal' ? 'p-4' : 'p-4'} 
      rounded-lg ${className}
    `}>
      {showTitle && (
        <h3 className={`text-sm font-medium mb-3 ${variant === 'dark' ? 'text-gray-200' : 'text-gray-700 dark:text-gray-200'}`}>
          {compact ? 'Share' : 'Share AdvisorWiz'}
        </h3>
      )}
      
      <div className={`
        ${orientation === 'horizontal' ? 'flex flex-wrap' : 'flex flex-col'} 
        gap-2 items-center
      `}>
        <Button
          variant="outline"
          size={compact ? 'sm' : 'default'}
          className="flex-1"
          onClick={() => handleShare('facebook')}
        >
          <Facebook className={iconClasses} />
          {!compact && <span className="ml-2">Facebook</span>}
        </Button>
        
        <Button
          variant="outline"
          size={compact ? 'sm' : 'default'}
          className="flex-1"
          onClick={() => handleShare('twitter')}
        >
          <Twitter className={iconClasses} />
          {!compact && <span className="ml-2">Twitter</span>}
        </Button>
        
        <Button
          variant="outline"
          size={compact ? 'sm' : 'default'}
          className="flex-1"
          onClick={() => handleShare('linkedin')}
        >
          <Linkedin className={iconClasses} />
          {!compact && <span className="ml-2">LinkedIn</span>}
        </Button>
        
        <Button
          variant="outline"
          size={compact ? 'sm' : 'default'}
          className="flex-1"
          onClick={() => handleShare('email')}
        >
          <Mail className={iconClasses} />
          {!compact && <span className="ml-2">Email</span>}
        </Button>
        
        {!compact && (
          <Button
            variant="default"
            className="mt-2 w-full"
            onClick={handleDownload}
          >
            <Share className="mr-2 h-4 w-4" />
            Get the App
          </Button>
        )}
      </div>
    </div>
  );
};

export default MarketingChannelsWidget;
