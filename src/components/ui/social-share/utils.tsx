
import { toast } from 'sonner';

export interface ShareOptions {
  title?: string;
  description?: string;
  url?: string;
}

export const handleShare = (platform: string, options: ShareOptions) => {
  const url = options.url || window.location.href;
  const title = options.title || 'AdvisorWiz - Match with the Perfect Financial Advisor';
  const description = options.description || 'Find your perfect financial match with AdvisorWiz';
  
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
