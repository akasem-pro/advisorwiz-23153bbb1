
import React from 'react';
import { cn } from '@/lib/utils';
import { Facebook, Linkedin, Mail, Share2, Twitter, Link as LinkIcon, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../button';
import { ShareOptions } from './utils';

/* Minimal Variant */
export const MinimalVariant: React.FC<ShareVariantProps> = ({ 
  shareOptions, 
  showAppDownload = true,
  className = ''
}) => {
  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <Button 
        size="sm"
        variant="ghost"
        className="text-navy-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-full w-8 h-8 p-0"
        onClick={() => handleShare('facebook', shareOptions)}
      >
        <Facebook className="h-4 w-4" />
        <span className="sr-only">Share on Facebook</span>
      </Button>
      
      <Button 
        size="sm"
        variant="ghost"
        className="text-navy-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-full w-8 h-8 p-0"
        onClick={() => handleShare('twitter', shareOptions)}
      >
        <Twitter className="h-4 w-4" />
        <span className="sr-only">Share on Twitter</span>
      </Button>
      
      <Button 
        size="sm"
        variant="ghost"
        className="text-navy-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-full w-8 h-8 p-0"
        onClick={() => handleShare('linkedin', shareOptions)}
      >
        <Linkedin className="h-4 w-4" />
        <span className="sr-only">Share on LinkedIn</span>
      </Button>
      
      <Button 
        size="sm"
        variant="ghost"
        className="text-navy-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-full w-8 h-8 p-0"
        onClick={() => handleShare('copy', shareOptions)}
      >
        <LinkIcon className="h-4 w-4" />
        <span className="sr-only">Copy link</span>
      </Button>
    </div>
  );
};

/* Buttons Variant */
export const ButtonsVariant: React.FC<ShareVariantProps> = ({ 
  shareOptions, 
  showAppDownload = true,
  className = ''
}) => {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Button 
        size="sm"
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => handleShare('facebook', shareOptions)}
      >
        <Facebook className="h-4 w-4 text-blue-600" />
        <span>Facebook</span>
      </Button>
      
      <Button 
        size="sm"
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => handleShare('twitter', shareOptions)}
      >
        <Twitter className="h-4 w-4 text-sky-500" />
        <span>Twitter</span>
      </Button>
      
      <Button 
        size="sm"
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => handleShare('linkedin', shareOptions)}
      >
        <Linkedin className="h-4 w-4 text-blue-700" />
        <span>LinkedIn</span>
      </Button>
      
      <Button 
        size="sm"
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => handleShare('email', shareOptions)}
      >
        <Mail className="h-4 w-4 text-amber-600" />
        <span>Email</span>
      </Button>
      
      <Button 
        size="sm"
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => handleShare('copy', shareOptions)}
      >
        <LinkIcon className="h-4 w-4 text-purple-600" />
        <span>Copy Link</span>
      </Button>
      
      {showAppDownload && (
        <Button 
          size="sm"
          variant="default"
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 w-full mt-2"
          onClick={() => handleShare('app', shareOptions)}
        >
          <Download className="h-4 w-4" />
          <span>Get the App</span>
        </Button>
      )}
    </div>
  );
};

/* Cards Variant */
export const CardsVariant: React.FC<ShareVariantProps> = ({ 
  shareOptions, 
  showAppDownload = true,
  className = ''
}) => {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", className)}>
      <button
        className="flex flex-col items-center p-4 bg-white dark:bg-navy-800 rounded-lg border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
        onClick={() => handleShare('facebook', shareOptions)}
      >
        <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full mb-2">
          <Facebook className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="text-sm text-slate-700 dark:text-slate-300">Facebook</span>
      </button>
      
      <button
        className="flex flex-col items-center p-4 bg-white dark:bg-navy-800 rounded-lg border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
        onClick={() => handleShare('twitter', shareOptions)}
      >
        <div className="bg-sky-50 dark:bg-sky-900/30 p-2 rounded-full mb-2">
          <Twitter className="h-5 w-5 text-sky-500 dark:text-sky-400" />
        </div>
        <span className="text-sm text-slate-700 dark:text-slate-300">Twitter</span>
      </button>
      
      <button
        className="flex flex-col items-center p-4 bg-white dark:bg-navy-800 rounded-lg border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
        onClick={() => handleShare('linkedin', shareOptions)}
      >
        <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full mb-2">
          <Linkedin className="h-5 w-5 text-blue-700 dark:text-blue-400" />
        </div>
        <span className="text-sm text-slate-700 dark:text-slate-300">LinkedIn</span>
      </button>
      
      <button
        className="flex flex-col items-center p-4 bg-white dark:bg-navy-800 rounded-lg border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
        onClick={() => handleShare('email', shareOptions)}
      >
        <div className="bg-amber-50 dark:bg-amber-900/30 p-2 rounded-full mb-2">
          <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <span className="text-sm text-slate-700 dark:text-slate-300">Email</span>
      </button>
      
      <button
        className="flex flex-col items-center p-4 bg-white dark:bg-navy-800 rounded-lg border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
        onClick={() => handleShare('copy', shareOptions)}
      >
        <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-full mb-2">
          <LinkIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <span className="text-sm text-slate-700 dark:text-slate-300">Copy Link</span>
      </button>
      
      {showAppDownload && (
        <button
          className="flex flex-col items-center p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors col-span-2 sm:col-span-3 md:col-span-4"
          onClick={() => handleShare('app', shareOptions)}
        >
          <div className="bg-teal-100 dark:bg-teal-800/50 p-2 rounded-full mb-2">
            <Download className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          </div>
          <span className="text-sm text-slate-700 dark:text-slate-300">Get the App</span>
        </button>
      )}
    </div>
  );
};

/* Horizontal Variant */
export const HorizontalVariant: React.FC<ShareVariantProps> = ({ 
  shareOptions, 
  showAppDownload = true,
  className = ''
}) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center mb-3">
        <Share2 className="mr-2 h-4 w-4 text-navy-600 dark:text-slate-300" />
        <span className="text-sm font-medium text-navy-700 dark:text-slate-200">Share with friends</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-navy-800 rounded-md border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors text-sm"
          onClick={() => handleShare('facebook', shareOptions)}
        >
          <Facebook className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-slate-700 dark:text-slate-300">Facebook</span>
        </button>
        
        <button
          className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-navy-800 rounded-md border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors text-sm"
          onClick={() => handleShare('twitter', shareOptions)}
        >
          <Twitter className="h-4 w-4 text-sky-500 dark:text-sky-400" />
          <span className="text-slate-700 dark:text-slate-300">Twitter</span>
        </button>
        
        <button
          className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-navy-800 rounded-md border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors text-sm"
          onClick={() => handleShare('linkedin', shareOptions)}
        >
          <Linkedin className="h-4 w-4 text-blue-700 dark:text-blue-400" />
          <span className="text-slate-700 dark:text-slate-300">LinkedIn</span>
        </button>
        
        <button
          className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-navy-800 rounded-md border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors text-sm"
          onClick={() => handleShare('copy', shareOptions)}
        >
          <LinkIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <span className="text-slate-700 dark:text-slate-300">Copy Link</span>
        </button>
      </div>
      
      {showAppDownload && (
        <button
          className="flex items-center justify-center gap-2 mt-3 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors text-sm"
          onClick={() => handleShare('app', shareOptions)}
        >
          <Download className="h-4 w-4" />
          <span>Download Our App</span>
        </button>
      )}
    </div>
  );
};

// Helper function to handle sharing
const handleShare = (platform: string, options: ShareOptions) => {
  const { title, description, url } = options;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  let shareUrl = '';

  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      break;
    case 'email':
      shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`;
      break;
    case 'copy':
      navigator.clipboard.writeText(url).then(() => {
        toast("Link copied to clipboard");
      }).catch(() => {
        toast("Failed to copy link");
      });
      return;
    case 'app':
      window.location.href = '/download';
      return;
    default:
      return;
  }

  // Open share URL in a new window
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  }
};

// Factory function to get the appropriate variant component
export const getShareVariant = (variant: string): React.FC<ShareVariantProps> => {
  const variantsMap: Record<string, React.FC<ShareVariantProps>> = {
    minimal: MinimalVariant,
    buttons: ButtonsVariant,
    cards: CardsVariant,
    horizontal: HorizontalVariant
  };
  
  return variantsMap[variant] || ButtonsVariant;
};

// Types
export interface ShareVariantProps {
  shareOptions: ShareOptions;
  showAppDownload?: boolean;
  className?: string;
}
