
import React, { useEffect } from 'react';
import { StoreIcon, Smartphone, QrCode, Tablet, Download, ExternalLink, Share } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import AppLayout from '../components/layout/AppLayout';
import { trackAppStoreEvent } from '../utils/analytics/marketingHelper';
import { useUser } from '../context/UserContext';
import { generateAppInstallQRCode } from '../utils/analytics/marketingHelper';

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
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Download the AdvisorWiz App</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Get the best financial advising experience on your mobile device
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={() => handleAppStoreClick('app_store')}
                className="bg-black text-white hover:bg-gray-800"
              >
                <StoreIcon className="mr-2 h-5 w-5" />
                Download on App Store
              </Button>
              
              <Button 
                size="lg"
                onClick={() => handleAppStoreClick('play_store')}
                className="bg-green-600 hover:bg-green-700"
              >
                <StoreIcon className="mr-2 h-5 w-5" />
                Get it on Google Play
              </Button>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 max-w-sm mx-auto">
              <div className="flex justify-center mb-4">
                <QrCode className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Scan to Download</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Scan this QR code with your mobile device to download the app directly.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                {/* This would be a real QR code image in production */}
                <div className="bg-gray-100 w-40 h-40 mx-auto flex items-center justify-center">
                  <span className="text-xs text-gray-500">QR Code</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5 text-blue-500" />
                  Mobile App Features
                </CardTitle>
                <CardDescription>Enhanced mobile experience</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-1 rounded mr-2">✓</span>
                    <span>Real-time notifications for advisor matches</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-1 rounded mr-2">✓</span>
                    <span>Seamless video calls with financial advisors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-1 rounded mr-2">✓</span>
                    <span>Offline access to saved advisor profiles</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleAppStoreClick('app_store')}>
                  <Download className="mr-2 h-4 w-4" />
                  Download iOS App
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tablet className="mr-2 h-5 w-5 text-purple-500" />
                  Tablet Optimization
                </CardTitle>
                <CardDescription>Perfect for larger screens</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 p-1 rounded mr-2">✓</span>
                    <span>Enhanced dashboard view with detailed analytics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 p-1 rounded mr-2">✓</span>
                    <span>Side-by-side comparison of advisor profiles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 p-1 rounded mr-2">✓</span>
                    <span>Rich document viewing and annotations</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleAppStoreClick('play_store')}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Android App
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Share className="mr-2 h-5 w-5 text-teal-500" />
                  Share & Refer
                </CardTitle>
                <CardDescription>Invite friends and colleagues</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 p-1 rounded mr-2">✓</span>
                    <span>Send app invitations to contacts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 p-1 rounded mr-2">✓</span>
                    <span>Earn rewards for successful referrals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 p-1 rounded mr-2">✓</span>
                    <span>Track your referral progress and status</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Referral Program
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Download Today</h2>
            <p className="mb-6">
              Join thousands of users who are already experiencing the best way to connect with financial advisors.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => handleAppStoreClick('app_store')}
              >
                <StoreIcon className="mr-2 h-5 w-5" />
                App Store
              </Button>
              <Button 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => handleAppStoreClick('play_store')}
              >
                <StoreIcon className="mr-2 h-5 w-5" />
                Google Play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DownloadApp;
