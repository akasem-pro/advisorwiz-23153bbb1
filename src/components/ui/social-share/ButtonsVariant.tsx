
import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { Button } from '../button';
import { handleShare, ShareOptions } from './utils';

interface ButtonsVariantProps {
  shareOptions: ShareOptions;
  showAppDownload?: boolean;
  className?: string;
}

const ButtonsVariant: React.FC<ButtonsVariantProps> = ({
  shareOptions,
  showAppDownload = true,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium mb-1">Share AdvisorWiz</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Help others discover financial expertise</p>
      </div>
      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start bg-white hover:bg-blue-50 text-blue-600 border-blue-200"
          onClick={() => handleShare('facebook', shareOptions)}
        >
          <div className="bg-blue-100 p-1.5 rounded-md mr-3">
            <Facebook className="h-4 w-4 text-blue-600" />
          </div>
          <span>Share on Facebook</span>
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start bg-white hover:bg-sky-50 text-sky-500 border-sky-200"
          onClick={() => handleShare('twitter', shareOptions)}
        >
          <div className="bg-sky-100 p-1.5 rounded-md mr-3">
            <Twitter className="h-4 w-4 text-sky-500" />
          </div>
          <span>Share on Twitter</span>
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start bg-white hover:bg-blue-50 text-blue-700 border-blue-200"
          onClick={() => handleShare('linkedin', shareOptions)}
        >
          <div className="bg-blue-100 p-1.5 rounded-md mr-3">
            <Linkedin className="h-4 w-4 text-blue-700" />
          </div>
          <span>Share on LinkedIn</span>
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start bg-white hover:bg-amber-50 text-amber-500 border-amber-200"
          onClick={() => handleShare('email', shareOptions)}
        >
          <div className="bg-amber-100 p-1.5 rounded-md mr-3">
            <Mail className="h-4 w-4 text-amber-500" />
          </div>
          <span>Share via Email</span>
        </Button>
        
        {showAppDownload && (
          <Button 
            className="w-full bg-teal-500 hover:bg-teal-600 text-white mt-2 flex items-center justify-center"
            onClick={() => handleShare('app', shareOptions)}
          >
            <Download className="h-4 w-4 mr-2" />
            <span>Get the AdvisorWiz App</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ButtonsVariant;
