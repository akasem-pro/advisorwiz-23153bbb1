
import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '../button';
import { handleShare, ShareOptions } from './utils';

interface HorizontalVariantProps {
  shareOptions: ShareOptions;
  showAppDownload?: boolean;
  className?: string;
}

const HorizontalVariant: React.FC<HorizontalVariantProps> = ({
  shareOptions,
  showAppDownload = true,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      <div className="text-center mb-3">
        <h3 className="text-lg font-medium mb-1">Share AdvisorWiz</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Help others discover financial expertise</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleShare('facebook', shareOptions)}
          className="bg-white hover:bg-blue-50 text-blue-600 border-blue-200"
        >
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleShare('twitter', shareOptions)}
          className="bg-white hover:bg-sky-50 text-sky-500 border-sky-200"
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleShare('linkedin', shareOptions)}
          className="bg-white hover:bg-blue-50 text-blue-700 border-blue-200"
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleShare('email', shareOptions)}
          className="bg-white hover:bg-amber-50 text-amber-500 border-amber-200"
        >
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
        {showAppDownload && (
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => handleShare('app', shareOptions)}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Get App
          </Button>
        )}
      </div>
    </div>
  );
};

export default HorizontalVariant;
