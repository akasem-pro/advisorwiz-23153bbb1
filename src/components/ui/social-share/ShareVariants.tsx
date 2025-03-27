
import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { Button } from '../button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../card';
import { handleShare, ShareOptions } from './utils';

// Shared interface for all variants
export interface ShareVariantProps {
  shareOptions: ShareOptions;
  showAppDownload?: boolean;
  className?: string;
}

// Factory function to get the appropriate variant component
export const getShareVariant = (variant: 'minimal' | 'buttons' | 'cards' | 'horizontal'): React.FC<ShareVariantProps> => {
  switch (variant) {
    case 'minimal':
      return MinimalVariant;
    case 'buttons':
      return ButtonsVariant;
    case 'cards':
      return CardsVariant;
    case 'horizontal':
      return HorizontalVariant;
    default:
      return ButtonsVariant;
  }
};

// Minimal Variant Implementation
const MinimalVariant: React.FC<ShareVariantProps> = ({
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

// Horizontal Variant Implementation
const HorizontalVariant: React.FC<ShareVariantProps> = ({
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

// Buttons Variant Implementation
const ButtonsVariant: React.FC<ShareVariantProps> = ({
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

// Cards Variant Implementation
const CardsVariant: React.FC<ShareVariantProps> = ({
  shareOptions,
  showAppDownload = true,
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Share AdvisorWiz</CardTitle>
          <CardDescription>Help others discover financial expertise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <div 
              className="bg-white p-3 rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer text-center flex flex-col items-center"
              onClick={() => handleShare('facebook', shareOptions)}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Facebook className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Facebook</span>
            </div>
            <div 
              className="bg-white p-3 rounded-lg border border-gray-200 hover:bg-sky-50 cursor-pointer text-center flex flex-col items-center"
              onClick={() => handleShare('twitter', shareOptions)}
            >
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mb-2">
                <Twitter className="h-5 w-5 text-sky-500" />
              </div>
              <span className="text-sm font-medium">Twitter</span>
            </div>
            <div 
              className="bg-white p-3 rounded-lg border border-gray-200 hover:bg-blue-50 cursor-pointer text-center flex flex-col items-center"
              onClick={() => handleShare('linkedin', shareOptions)}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Linkedin className="h-5 w-5 text-blue-700" />
              </div>
              <span className="text-sm font-medium">LinkedIn</span>
            </div>
            <div 
              className="bg-white p-3 rounded-lg border border-gray-200 hover:bg-amber-50 cursor-pointer text-center flex flex-col items-center"
              onClick={() => handleShare('email', shareOptions)}
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                <Mail className="h-5 w-5 text-amber-500" />
              </div>
              <span className="text-sm font-medium">Email</span>
            </div>
          </div>
          
          {showAppDownload && (
            <Button 
              className="w-full mt-3 bg-teal-500 hover:bg-teal-600 text-white"
              onClick={() => handleShare('app', shareOptions)}
            >
              <Download className="h-4 w-4 mr-2" />
              Get the AdvisorWiz App
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
