import React from 'react';
import { Download, Smartphone, CheckCircle, Zap, LockIcon, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import AppLayout from '../components/layout/AppLayout';
import PageSEO from '../components/seo/PageSEO';
import ShareAndDownloadSection from '../components/marketing/ShareAndDownloadSection';
import { trackUserBehavior } from '../utils/analytics/eventTracker';

const DownloadApp = () => {
  const trackDownload = (platform: string) => {
    trackUserBehavior('app_download', { platform: platform });
  };

  return (
    <AppLayout>
      <PageSEO
        title="Download the AdvisorWiz Mobile App | Financial Advisor Matching"
        description="Download our mobile app to connect with financial advisors, manage your appointments, and track your financial goals on the go. Available for iOS and Android."
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 dark:text-white mb-4">
            Download the AdvisorWiz Mobile App
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Take your financial future into your hands with our feature-rich mobile app. 
            Connect with advisors, track goals, and manage appointments anytime, anywhere.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div className="flex justify-center md:justify-end">
            <div className="relative max-w-[280px]">
              <img
                src="/lovable-uploads/6dc09fb4-35e4-43a0-90fd-282d5deb27a4.png"
                alt="AdvisorWiz Mobile App Interface"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-navy-900 font-bold px-3 py-1 rounded-full text-sm">
                NEW!
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-serif font-semibold text-navy-900 dark:text-white mb-4">
              Your Financial Partner in Your Pocket
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              The AdvisorWiz mobile app brings powerful financial advisory connections to your fingertips. 
              Whether you're looking for an advisor, managing appointments, or tracking your financial goals, 
              our app makes it simple and efficient.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-navy-800 dark:text-white">Smart Advisor Matching</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Our AI-powered algorithm connects you with advisors who match your specific needs and preferences.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-navy-800 dark:text-white">Secure Messaging</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Communicate directly with your financial advisor through our secure, end-to-end encrypted messaging system.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-navy-800 dark:text-white">Financial Dashboard</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Track your investments, goals, and progress with our intuitive visual dashboard.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-navy-800 dark:text-white">Calendar Integration</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Schedule appointments with your advisor that sync directly with your device calendar.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => trackDownload('ios')}
              >
                <img src="/lovable-uploads/ea20c450-6c61-4276-91db-5f04659e6193.png" alt="App Store" className="h-5 w-5 mr-2" />
                Download on App Store
              </Button>
              
              <Button 
                size="lg"
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => trackDownload('android')}
              >
                <Download className="h-5 w-5 mr-2" />
                Get it on Google Play
              </Button>
            </div>
          </div>
        </div>
        
        {/* App Features Tabs */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-semibold text-navy-900 dark:text-white text-center mb-8">
            App Features
          </h2>
          
          <Tabs defaultValue="consumers" className="max-w-4xl mx-auto">
            <TabsList className="w-full grid grid-cols-3 mb-8">
              <TabsTrigger value="consumers">For Consumers</TabsTrigger>
              <TabsTrigger value="advisors">For Advisors</TabsTrigger>
              <TabsTrigger value="firms">For Firms</TabsTrigger>
            </TabsList>
            
            <TabsContent value="consumers" className="mt-0">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-navy-800 p-5 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700">
                  <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 dark:text-white mb-2">
                    Advisor Discovery
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Browse profiles of qualified financial advisors who match your specific needs, preferences, and financial goals.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-navy-800 p-5 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700">
                  <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 dark:text-white mb-2">
                    Real-time Messaging
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Chat directly with financial advisors, ask questions, and get personalized advice through our secure messaging system.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-navy-800 p-5 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700">
                  <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                    <LockIcon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 dark:text-white mb-2">
                    Secure Document Sharing
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Securely share financial documents with your advisor through our encrypted file sharing system.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advisors" className="mt-0">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-navy-800 p-5 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700">
                  <div className="h-12 w-12 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center mb-4">
                    <Share2 className="h-6 w-6 text-navy-600 dark:text-navy-300" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 dark:text-white mb-2">
                    Client Acquisition
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Connect with potential clients who match your expertise and grow your advisory practice.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-navy-800 p-5 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700">
                  <div className="h-12 w-12 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-navy-600 dark:text-navy-300" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 dark:text-white mb-2">
                    Client Management
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Manage client relationships, track interactions, and organize client information efficiently.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-navy-800 p-5 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700">
                  <div className="h-12 w-12 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center mb-4">
                    <LockIcon className="h-6 w-6 text-navy-600 dark:text-navy-300" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 dark:text-white mb-2">
                    Schedule Management
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Set availability, manage appointments, and sync with your existing calendar systems.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="firms" className="mt-0">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-navy-800 p-5 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700">
                  <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                    <Share2 className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 dark:text-white mb-2">
                    Team Management
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Manage your advisory team, assign clients, and track team performance through the mobile app.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-navy-800 p-5 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700">
                  <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 dark:text-white mb-2">
                    Performance Analytics
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Access real-time analytics on client acquisition, advisor performance, and business growth.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-navy-800 p-5 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700">
                  <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                    <LockIcon className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-navy-900 dark:text-white mb-2">
                    Compliance Tools
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Ensure your advisory team maintains regulatory compliance with built-in compliance monitoring tools.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* App Store Badges */}
        <div className="bg-gradient-to-r from-teal-500 to-navy-600 rounded-lg p-8 text-white text-center mb-16">
          <h2 className="text-2xl font-serif font-semibold mb-4">
            Download AdvisorWiz Today
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Take the first step towards better financial connections. Download our app now and experience 
            the future of financial advisory services.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-black text-white hover:bg-gray-800 border border-white/20"
              onClick={() => trackDownload('ios')}
            >
              <img src="/lovable-uploads/ea20c450-6c61-4276-91db-5f04659e6193.png" alt="App Store" className="h-5 w-5 mr-2" />
              Download on App Store
            </Button>
            
            <Button 
              size="lg"
              className="bg-white text-navy-900 hover:bg-slate-100"
              onClick={() => trackDownload('android')}
            >
              <Download className="h-5 w-5 mr-2" />
              Get it on Google Play
            </Button>
          </div>
        </div>
        
        {/* Share AdvisorWiz Section */}
        <ShareAndDownloadSection variant="full-width" className="-mx-4 md:-mx-8 lg:-mx-16 mb-16" />
        
        {/* SEO section with keywords */}
        <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-navy-800 p-6 rounded-lg border border-slate-200 dark:border-navy-700">
          <h2 className="text-xl font-medium text-navy-900 dark:text-white mb-3">
            Why Choose the AdvisorWiz Mobile App?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            The AdvisorWiz mobile app is designed to make finding and connecting with financial advisors simpler and more efficient. 
            Whether you're a consumer looking for guidance, an advisor seeking clients, or a firm managing a team of advisors, 
            our app provides the tools you need to succeed.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-navy-800 dark:text-slate-200 mb-2">For Investors & Consumers:</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                <li>Find certified financial advisors</li>
                <li>Get personalized retirement planning advice</li>
                <li>Investment management on the go</li>
                <li>Secure wealth management consultations</li>
                <li>Estate planning and tax optimization</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-navy-800 dark:text-slate-200 mb-2">For Financial Professionals:</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                <li>Grow your client base</li>
                <li>Streamline client communications</li>
                <li>Manage appointments efficiently</li>
                <li>Track client engagement</li>
                <li>Secure document sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DownloadApp;
