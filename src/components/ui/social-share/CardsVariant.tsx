
import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '../button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../card';
import { handleShare, ShareOptions } from './utils';

interface CardsVariantProps {
  shareOptions: ShareOptions;
  showAppDownload?: boolean;
  className?: string;
}

const CardsVariant: React.FC<CardsVariantProps> = ({
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

export default CardsVariant;
