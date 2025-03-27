
import React from 'react';
import { ArrowRight, Share2, Download, QrCode, Smartphone } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';
import SocialSharePlus from './SocialSharePlus';

interface AppShareWidgetProps {
  className?: string;
  variant?: 'standard' | 'compact' | 'expanded';
}

const AppShareWidget: React.FC<AppShareWidgetProps> = ({ 
  className = '',
  variant = 'standard'
}) => {
  const handleAppDownload = () => {
    trackUserBehavior('app_download_click', { source: 'app_share_widget' });
    window.location.href = '/download';
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Get the AdvisorWiz App</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Mobile access to your financial advisor
              </p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="default" 
                size="sm" 
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={handleAppDownload}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <SocialSharePlus 
                variant="minimal" 
                showAppDownload={false} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Expanded variant
  if (variant === 'expanded') {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <CardHeader className="pb-2">
          <CardTitle>AdvisorWiz Mobile App</CardTitle>
          <CardDescription>Your financial future in your pocket</CardDescription>
        </CardHeader>
        
        <CardContent className="p-4">
          <Tabs defaultValue="download">
            <TabsList className="w-full">
              <TabsTrigger value="download">Download</TabsTrigger>
              <TabsTrigger value="share">Share</TabsTrigger>
            </TabsList>
            
            <TabsContent value="download" className="space-y-4 mt-3">
              <div className="flex items-center space-x-4">
                <div className="bg-white border border-slate-200 rounded-xl p-2 flex-shrink-0">
                  <img 
                    src="/lovable-uploads/6dc09fb4-35e4-43a0-90fd-282d5deb27a4.png" 
                    alt="AdvisorWiz App" 
                    className="w-24 h-auto rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-1">AdvisorWiz Mobile</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Find advisors, manage appointments, and track your financial goals on the go.
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleAppDownload}
                      variant="default"
                      size="sm"
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      App Store
                    </Button>
                    <Button
                      onClick={handleAppDownload}
                      variant="default"
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      Google Play
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-100 dark:bg-navy-800 p-3 rounded-lg flex items-center space-x-3">
                <div className="bg-white p-2 rounded">
                  <QrCode className="h-8 w-8 text-navy-800" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Scan to Download</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Use your phone's camera to scan the QR code
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="share" className="mt-3">
              <SocialSharePlus variant="buttons" />
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="bg-slate-50 dark:bg-navy-800/50 pt-3 pb-3 px-4">
          <Button 
            variant="link" 
            className="w-full p-0 flex items-center justify-center text-teal-600 dark:text-teal-400 hover:text-teal-700"
            onClick={handleAppDownload}
          >
            Learn more about our mobile app
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Standard variant (default)
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle>Share AdvisorWiz</CardTitle>
        <CardDescription>Help others discover financial expertise</CardDescription>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          <SocialSharePlus variant="horizontal" showAppDownload={false} />
          
          <div className="border-t border-slate-200 dark:border-navy-700 pt-4 mt-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-full">
                <Smartphone className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h4 className="font-medium">Get the Mobile App</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Take AdvisorWiz on the go</p>
              </div>
            </div>
            
            <Button 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              onClick={handleAppDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download the App
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppShareWidget;
