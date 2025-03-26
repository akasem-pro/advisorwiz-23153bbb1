
import React from 'react';
import { 
  Share, 
  Mail, 
  Instagram,
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  Download,
  QrCode,
  MessageSquare
} from 'lucide-react';
import { Button } from '../ui/button';
import { getButtonClasses } from '../ui/buttonStyles';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';
import { useUser } from '../../context/UserContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

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
    default: 'bg-white shadow-md border border-slate-200 dark:bg-navy-800 dark:border-navy-700',
    light: 'bg-slate-50 border border-slate-100 dark:bg-navy-800/50 dark:border-navy-700',
    dark: 'bg-navy-900 border border-navy-800 text-white'
  };
  
  return (
    <Card className={`
      ${variantClasses[variant]} 
      overflow-hidden
      ${className}
    `}>
      {showTitle && (
        <CardHeader className="pb-2">
          <CardTitle className={`text-base font-medium ${variant === 'dark' ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
            {compact ? 'Share' : 'Share AdvisorWiz'}
          </CardTitle>
          {!compact && (
            <CardDescription className={variant === 'dark' ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}>
              Help others discover financial expertise
            </CardDescription>
          )}
        </CardHeader>
      )}
      
      <CardContent className="p-4">
        <div className={`
          ${orientation === 'horizontal' ? 'flex flex-wrap' : 'flex flex-col'} 
          gap-3 items-center
        `}>
          <Button
            variant="outline"
            size={compact ? 'sm' : 'default'}
            onClick={() => handleShare('facebook')}
            className="flex-1 bg-white dark:bg-navy-800 border-slate-200 dark:border-navy-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700"
          >
            <div className="bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded-md mr-2">
              <Facebook className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            {!compact && <span className="text-slate-700 dark:text-slate-300">Facebook</span>}
          </Button>
          
          <Button
            variant="outline"
            size={compact ? 'sm' : 'default'}
            onClick={() => handleShare('twitter')}
            className="flex-1 bg-white dark:bg-navy-800 border-slate-200 dark:border-navy-700 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-200 dark:hover:border-sky-700"
          >
            <div className="bg-sky-50 dark:bg-sky-900/30 p-1.5 rounded-md mr-2">
              <Twitter className="h-4 w-4 text-sky-500 dark:text-sky-400" />
            </div>
            {!compact && <span className="text-slate-700 dark:text-slate-300">Twitter</span>}
          </Button>
          
          <Button
            variant="outline"
            size={compact ? 'sm' : 'default'}
            onClick={() => handleShare('linkedin')}
            className="flex-1 bg-white dark:bg-navy-800 border-slate-200 dark:border-navy-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700"
          >
            <div className="bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded-md mr-2">
              <Linkedin className="h-4 w-4 text-blue-700 dark:text-blue-400" />
            </div>
            {!compact && <span className="text-slate-700 dark:text-slate-300">LinkedIn</span>}
          </Button>
          
          <Button
            variant="outline"
            size={compact ? 'sm' : 'default'}
            onClick={() => handleShare('email')}
            className="flex-1 bg-white dark:bg-navy-800 border-slate-200 dark:border-navy-700 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-200 dark:hover:border-amber-700"
          >
            <div className="bg-amber-50 dark:bg-amber-900/30 p-1.5 rounded-md mr-2">
              <Mail className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            {!compact && <span className="text-slate-700 dark:text-slate-300">Email</span>}
          </Button>
        </div>
        
        {!compact && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-navy-700">
            <Button
              variant="default"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-sm"
              onClick={handleDownload}
            >
              <Download className="mr-2 h-4 w-4" />
              Get the App
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketingChannelsWidget;
