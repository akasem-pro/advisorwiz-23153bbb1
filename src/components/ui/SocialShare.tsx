
import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  title?: string;
  description?: string;
  url?: string;
  className?: string;
  triggerClassName?: string;
  showAppDownload?: boolean;
}

const SocialShare: React.FC<SocialShareProps> = ({
  title = 'AdvisorWiz - Match with the Perfect Financial Advisor',
  description = 'Find your perfect financial match with AdvisorWiz',
  url = window.location.href,
  className = '',
  triggerClassName = '',
  showAppDownload = true,
}) => {
  const { toast } = useToast();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const handleShare = (platform: string) => {
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
          toast({
            title: "Link copied",
            description: "URL has been copied to your clipboard.",
          });
        }).catch(() => {
          toast({
            title: "Failed to copy",
            description: "Could not copy the link to clipboard.",
            variant: "destructive",
          });
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

  return (
    <div className={`${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={`flex items-center gap-2 bg-white dark:bg-navy-800 hover:bg-slate-50 dark:hover:bg-navy-700 shadow-sm border border-slate-200 dark:border-navy-700 ${triggerClassName}`}
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 p-2 bg-white dark:bg-navy-800 shadow-lg border border-slate-200 dark:border-navy-700 rounded-lg">
          <div className="px-2 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            Share AdvisorWiz
          </div>
          <DropdownMenuSeparator className="my-1 border-slate-200 dark:border-navy-700" />
          <DropdownMenuItem onClick={() => handleShare('facebook')} className="flex items-center p-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-navy-700 rounded-md transition-colors">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded-md mr-3">
              <Facebook className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-slate-700 dark:text-slate-300">Facebook</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('twitter')} className="flex items-center p-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-navy-700 rounded-md transition-colors">
            <div className="bg-sky-50 dark:bg-sky-900/30 p-1.5 rounded-md mr-3">
              <Twitter className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            </div>
            <span className="text-slate-700 dark:text-slate-300">Twitter</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('linkedin')} className="flex items-center p-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-navy-700 rounded-md transition-colors">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded-md mr-3">
              <Linkedin className="w-4 h-4 text-blue-700 dark:text-blue-400" />
            </div>
            <span className="text-slate-700 dark:text-slate-300">LinkedIn</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('email')} className="flex items-center p-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-navy-700 rounded-md transition-colors">
            <div className="bg-amber-50 dark:bg-amber-900/30 p-1.5 rounded-md mr-3">
              <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-slate-700 dark:text-slate-300">Email</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('copy')} className="flex items-center p-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-navy-700 rounded-md transition-colors">
            <div className="bg-purple-50 dark:bg-purple-900/30 p-1.5 rounded-md mr-3">
              <LinkIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-slate-700 dark:text-slate-300">Copy link</span>
          </DropdownMenuItem>
          
          {showAppDownload && (
            <>
              <DropdownMenuSeparator className="my-1 border-slate-200 dark:border-navy-700" />
              <DropdownMenuItem onClick={() => handleShare('app')} className="flex items-center p-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-navy-700 rounded-md transition-colors">
                <div className="bg-teal-50 dark:bg-teal-900/30 p-1.5 rounded-md mr-3">
                  <Download className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-300">Get the App</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SocialShare;
