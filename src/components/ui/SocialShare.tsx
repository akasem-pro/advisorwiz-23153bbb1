
import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
}

const SocialShare: React.FC<SocialShareProps> = ({
  title = 'AdvisorWiz - Match with the Perfect Financial Advisor',
  description = 'Find your perfect financial match with AdvisorWiz',
  url = window.location.href,
  className = '',
  triggerClassName = '',
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
      default:
        return;
    }

    // Open share URL in a new window
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={`flex items-center gap-2 ${triggerClassName}`}
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => handleShare('facebook')} className="cursor-pointer">
            <Facebook className="w-4 h-4 mr-2" />
            <span>Facebook</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('twitter')} className="cursor-pointer">
            <Twitter className="w-4 h-4 mr-2" />
            <span>Twitter</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('linkedin')} className="cursor-pointer">
            <Linkedin className="w-4 h-4 mr-2" />
            <span>LinkedIn</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('email')} className="cursor-pointer">
            <Mail className="w-4 h-4 mr-2" />
            <span>Email</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare('copy')} className="cursor-pointer">
            <LinkIcon className="w-4 h-4 mr-2" />
            <span>Copy link</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SocialShare;
