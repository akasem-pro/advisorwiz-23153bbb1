
import React, { useEffect } from 'react';
import { StoreIcon, Smartphone, QrCode, Tablet, Download, ExternalLink, Share, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import AppLayout from '../components/layout/AppLayout';
import { trackAppStoreEvent } from '../utils/analytics/marketingHelper';
import { useUser } from '../context/UserContext';
import { generateAppInstallQRCode } from '../utils/analytics/marketingHelper';
import SocialShare from '../components/ui/SocialShare';

const DownloadApp = () => {
  const { isAuthenticated, userType } = useUser();
  
  useEffect(() => {
    // Track page view
    trackAppStoreEvent('view', 'web', { 
      page: 'download',
      authenticated: isAuthenticated,
      user_type: userType || 'visitor'
    });
  }, [isAuthenticated, userType]);
  
  const handleAppStoreClick = (store: 'app_store' | 'play_store') => {
    trackAppStoreEvent('click', store, { page: 'download' });
    
    const url = store === 'app_store' 
      ? 'https://apps.apple.com/app/advisorwiz/id123456789'
      : 'https://play.google.com/store/apps/details?id=com.advisorwiz';
      
    window.open(url, '_blank');
  };
  
  const generateQRCode = () => {
    // In a real app, this would generate a QR code image
    return generateAppInstallQRCode('download_page', 'qr');
  };
  
  return (
    <AppLayout>
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-navy-900 dark:to-navy-800 py-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-navy-900 dark:text-white">
                Download the AdvisorWiz App
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
                Get personalized financial advice and connect with expert advisors anytime, anywhere
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  onClick={() => handleAppStoreClick('app_store')}
                  className="bg-black text-white hover:bg-gray-800 h-14 px-6 shadow-sm"
                >
                  <StoreIcon className="mr-2 h-5 w-5" />
                  Download on App Store
                </Button>
                
                <Button 
                  size="lg"
                  onClick={() => handleAppStoreClick('play_store')}
                  className="bg-teal-600 hover:bg-teal-700 text-white h-14 px-6 shadow-sm"
                >
                  <StoreIcon className="mr-2 h-5 w-5" />
                  Get it on Google Play
                </Button>
              </div>
              
              <div className="flex justify-center mb-12">
                <Card className="max-w-sm mx-auto bg-white dark:bg-navy-800 overflow-hidden shadow-md border border-slate-200 dark:border-navy-700">
                  <CardHeader className="pb-2">
                    <div className="flex justify-center mb-2">
                      <div className="bg-teal-50 dark:bg-teal-900/30 p-3 rounded-full">
                        <QrCode className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Scan to Download</CardTitle>
                    <CardDescription className="text-center">
                      Use your camera app to scan this QR code
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 flex justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700 w-48 h-48 flex items-center justify-center">
                      {/* This would be a real QR code image in production */}
                      <div className="bg-slate-100 w-40 h-40 flex items-center justify-center p-4">
                        <img src="/lovable-uploads/54700f01-bc3e-46e6-a14f-7cc0101fe21f.png" alt="QR Code" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <CardHeader>
                  <div className="mb-3">
                    <div className="bg-blue-50 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <CardTitle className="flex items-center">
                    Mobile Features
                  </CardTitle>
                  <CardDescription>Enhanced mobile experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1 rounded-full mr-2 mt-0.5">
                        <ChevronRight className="h-3 w-3" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">Real-time notifications for advisor matches</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1 rounded-full mr-2 mt-0.5">
                        <ChevronRight className="h-3 w-3" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">Seamless video calls with financial advisors</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1 rounded-full mr-2 mt-0.5">
                        <ChevronRight className="h-3 w-3" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">Offline access to saved advisor profiles</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20" 
                    onClick={() => handleAppStoreClick('app_store')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download iOS App
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                <CardHeader>
                  <div className="mb-3">
                    <div className="bg-purple-50 dark:bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Tablet className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <CardTitle className="flex items-center">
                    Tablet Optimization
                  </CardTitle>
                  <CardDescription>Perfect for larger screens</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <div className="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-1 rounded-full mr-2 mt-0.5">
                        <ChevronRight className="h-3 w-3" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">Enhanced dashboard view with detailed analytics</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-1 rounded-full mr-2 mt-0.5">
                        <ChevronRight className="h-3 w-3" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">Side-by-side comparison of advisor profiles</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-1 rounded-full mr-2 mt-0.5">
                        <ChevronRight className="h-3 w-3" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">Rich document viewing and annotations</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/20" 
                    onClick={() => handleAppStoreClick('play_store')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Android App
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-600"></div>
                <CardHeader>
                  <div className="mb-3">
                    <div className="bg-teal-50 dark:bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Share className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                  </div>
                  <CardTitle className="flex items-center">
                    Share & Refer
                  </CardTitle>
                  <CardDescription>Invite friends and colleagues</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <div className="bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 p-1 rounded-full mr-2 mt-0.5">
                        <ChevronRight className="h-3 w-3" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">Send app invitations to contacts</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 p-1 rounded-full mr-2 mt-0.5">
                        <ChevronRight className="h-3 w-3" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">Earn rewards for successful referrals</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 p-1 rounded-full mr-2 mt-0.5">
                        <ChevronRight className="h-3 w-3" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">Track your referral progress and status</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-teal-200 text-teal-600 hover:bg-teal-50 dark:border-teal-800 dark:text-teal-400 dark:hover:bg-teal-900/20">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Program
                  </Button>
                  <SocialShare className="flex-1" triggerClassName="w-full justify-center border-teal-200 text-teal-600 hover:bg-teal-50 dark:border-teal-800 dark:text-teal-400 dark:hover:bg-teal-900/20" showAppDownload={false} />
                </CardFooter>
              </Card>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white text-center shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Download Today</h2>
              <p className="mb-6 text-lg max-w-2xl mx-auto">
                Join thousands of users who are already experiencing the best way to connect with financial advisors.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-white text-blue-600 hover:bg-slate-100 h-12 shadow-sm"
                  onClick={() => handleAppStoreClick('app_store')}
                >
                  <StoreIcon className="mr-2 h-5 w-5" />
                  App Store
                </Button>
                <Button 
                  className="bg-white text-blue-600 hover:bg-slate-100 h-12 shadow-sm"
                  onClick={() => handleAppStoreClick('play_store')}
                >
                  <StoreIcon className="mr-2 h-5 w-5" />
                  Google Play
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DownloadApp;
