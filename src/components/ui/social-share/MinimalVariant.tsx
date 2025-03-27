
import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Download } from 'lucide-react';
import { handleShare, ShareOptions } from './utils';

interface MinimalVariantProps {
  shareOptions: ShareOptions;
  showAppDownload?: boolean;
  className?: string;
}

const MinimalVariant: React.FC<MinimalVariantProps> = ({
  shareOptions,
  showAppDownload = true,
  className = '',
}) => {
  return (
    <div className={`flex space-x-3 ${className}`}>
      <button 
        onClick={() => handleShare('facebook', shareOptions)} 
        className="text-blue-600 hover:text-blue-800 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-5 w-5" />
      </button>
      <button 
        onClick={() => handleShare('twitter', shareOptions)} 
        className="text-sky-500 hover:text-sky-700 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-5 w-5" />
      </button>
      <button 
        onClick={() => handleShare('linkedin', shareOptions)} 
        className="text-blue-700 hover:text-blue-900 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-5 w-5" />
      </button>
      <button 
        onClick={() => handleShare('email', shareOptions)} 
        className="text-amber-500 hover:text-amber-700 transition-colors"
        aria-label="Share via Email"
      >
        <Mail className="h-5 w-5" />
      </button>
      {showAppDownload && (
        <button 
          onClick={() => handleShare('app', shareOptions)} 
          className="text-teal-500 hover:text-teal-700 transition-colors"
          aria-label="Get the App"
        >
          <Download className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default MinimalVariant;
