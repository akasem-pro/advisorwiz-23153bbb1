
import React from 'react';
import { Download, Star, ArrowRight, Search, TrendingUp, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';

interface MobileAppPromotionProps {
  className?: string;
}

const MobileAppPromotion: React.FC<MobileAppPromotionProps> = ({
  className = '',
}) => {
  const handleDownloadClick = (platform: string) => {
    trackUserBehavior('app_download_click', { platform });
  };
  
  return (
    <div className={cn("bg-white dark:bg-navy-800 rounded-lg shadow-md border border-slate-200 dark:border-navy-700 overflow-hidden", className)}>
      <div className="flex flex-col md:flex-row">
        {/* App Showcase Image */}
        <div className="md:w-2/5 bg-gradient-to-br from-teal-500 to-teal-700 dark:from-navy-600 dark:to-navy-800 p-6 flex items-center justify-center">
          <div className="relative max-w-[200px]">
            <img 
              src="/lovable-uploads/6dc09fb4-35e4-43a0-90fd-282d5deb27a4.png" 
              alt="AdvisorWiz Mobile App" 
              className="w-full h-auto drop-shadow-xl rounded-2xl"
            />
            <div className="absolute -top-3 -right-3 bg-yellow-400 text-navy-900 text-xs font-bold px-2 py-1 rounded-full">
              NEW!
            </div>
          </div>
        </div>
        
        {/* App Info */}
        <div className="md:w-3/5 p-6">
          <div className="flex items-center mb-2">
            <Smartphone className="h-5 w-5 mr-2 text-teal-500" />
            <h3 className="text-xl font-semibold text-navy-900 dark:text-white">AdvisorWiz Mobile App</h3>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="flex mr-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-300">Available now on iOS & Android</span>
          </div>
          
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Take financial advisory connections on the go with our feature-packed mobile app. 
            Connect with advisors, manage appointments, and track your financial goals from anywhere.
          </p>
          
          <Tabs defaultValue="features" className="w-full mb-4">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-0">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-teal-700 dark:text-teal-400 text-xs">✓</span>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Real-time advisor matching</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-teal-700 dark:text-teal-400 text-xs">✓</span>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Secure in-app messaging</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-teal-700 dark:text-teal-400 text-xs">✓</span>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Financial goal tracking dashboard</span>
                </li>
              </ul>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-0">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-navy-700 dark:text-navy-300 text-xs">✓</span>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Find advisors matching your criteria, anytime</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-navy-700 dark:text-navy-300 text-xs">✓</span>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Get financial advice on-demand</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-navy-700 dark:text-navy-300 text-xs">✓</span>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Schedule meetings with a few taps</span>
                </li>
              </ul>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-0">
              <div className="space-y-3 text-sm">
                <div className="pb-2 border-b border-slate-200 dark:border-navy-700">
                  <div className="flex items-center mb-1">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Sarah M.</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    "Found my perfect financial advisor in minutes. The app is intuitive and user-friendly!"
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Michael T.</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    "The mobile app has completely transformed how I manage my investments and communicate with my advisor."
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <Button
              className="bg-black text-white hover:bg-gray-800 flex-1 h-10"
              onClick={() => handleDownloadClick('apple')}
            >
              <img src="/lovable-uploads/ea20c450-6c61-4276-91db-5f04659e6193.png" alt="App Store" className="h-5 w-5 mr-2" />
              App Store
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700 flex-1 h-10"
              onClick={() => handleDownloadClick('android')}
            >
              <Download className="h-4 w-4 mr-2" />
              Google Play
            </Button>
          </div>
          
          <div className="mt-4">
            <Link to="/download" className="text-teal-600 dark:text-teal-400 text-sm hover:underline inline-flex items-center">
              Learn more about our mobile app <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* SEO and Marketing Info Footer */}
      <div className="bg-slate-50 dark:bg-navy-900 p-4 border-t border-slate-200 dark:border-navy-700">
        <h4 className="text-sm font-medium text-navy-900 dark:text-white mb-2">Why AdvisorWiz Mobile?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start">
            <Search className="h-4 w-4 text-teal-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h5 className="text-xs font-medium text-navy-800 dark:text-slate-200">Find Advisors Faster</h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Our intelligent matching algorithm connects you with the perfect financial advisor in seconds.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <TrendingUp className="h-4 w-4 text-teal-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h5 className="text-xs font-medium text-navy-800 dark:text-slate-200">Track Your Progress</h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Set financial goals and monitor your progress with interactive dashboards and alerts.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Smartphone className="h-4 w-4 text-teal-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h5 className="text-xs font-medium text-navy-800 dark:text-slate-200">Seamless Experience</h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Switch between web and mobile effortlessly with our cross-platform synchronization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppPromotion;
