
import React from 'react';
import { Download, Share2, Smartphone, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';
import SocialSharePlus from '../ui/SocialSharePlus';
import AppShareWidget from '../ui/AppShareWidget';

interface ShareAndDownloadSectionProps {
  variant?: 'standard' | 'minimal' | 'full-width';
  className?: string;
  showTitle?: boolean;
}

const ShareAndDownloadSection: React.FC<ShareAndDownloadSectionProps> = ({
  variant = 'standard',
  className = '',
  showTitle = true
}) => {
  const handleAppDownload = () => {
    trackUserBehavior('app_download_click', { source: 'share_section' });
    window.location.href = '/download';
  };

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <section className={`py-6 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-navy-800/50 rounded-lg p-4 border border-slate-200 dark:border-navy-700">
            <div className="flex items-center">
              <Smartphone className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
              <span className="font-medium">Share AdvisorWiz or get the mobile app</span>
            </div>
            <div className="flex items-center gap-3">
              <SocialSharePlus variant="minimal" showAppDownload={false} />
              <div className="w-px h-6 bg-slate-300 dark:bg-navy-600"></div>
              <Button 
                size="sm" 
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={handleAppDownload}
              >
                <Download className="h-4 w-4 mr-1" />
                Get App
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Full-width variant
  if (variant === 'full-width') {
    return (
      <section className={`py-12 bg-gradient-to-r from-teal-500 to-teal-700 text-white ${className}`}>
        <div className="container mx-auto px-4">
          {showTitle && (
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold">Share AdvisorWiz</h2>
              <p className="mt-2 text-teal-100">Help others discover their perfect financial match</p>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-medium mb-4">Share With Your Network</h3>
              <p className="text-teal-100 mb-6">
                Know someone who could benefit from finding the right financial advisor? 
                Share AdvisorWiz with your friends, family, and colleagues.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg border border-white/20">
                <SocialSharePlus variant="horizontal" showAppDownload={false} className="justify-start" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Get the Mobile App</h3>
              <p className="text-teal-100 mb-6">
                Take AdvisorWiz with you wherever you go. Our mobile app makes it easier 
                than ever to connect with financial advisors and manage your finances.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 border border-white/10"
                  onClick={handleAppDownload}
                >
                  <img src="/lovable-uploads/ea20c450-6c61-4276-91db-5f04659e6193.png" alt="App Store" className="h-5 w-5 mr-2" />
                  App Store
                </Button>
                <Button 
                  size="lg"
                  className="bg-white text-teal-800 hover:bg-slate-100"
                  onClick={handleAppDownload}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Google Play
                </Button>
                <Button 
                  size="lg"
                  className="bg-teal-800/50 hover:bg-teal-800 text-white border border-white/10"
                  onClick={handleAppDownload}
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Standard variant (default)
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 dark:text-white">
              Share AdvisorWiz
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Help others discover their perfect financial match
            </p>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-medium">Share With Your Network</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-5">
                Know someone who could benefit from finding the right financial advisor? 
                Share AdvisorWiz with your friends, family, and colleagues.
              </p>
              
              <SocialSharePlus variant="buttons" showAppDownload={false} />
            </CardContent>
          </Card>
          
          <AppShareWidget variant="expanded" />
        </div>
      </div>
    </section>
  );
};

export default ShareAndDownloadSection;
