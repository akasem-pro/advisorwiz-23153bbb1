import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserProvider';
import { ThemeProvider } from './context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import { Helmet } from 'react-helmet';
import StructuredData from './components/seo/StructuredData';
import Preload from './components/seo/Preload';
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema
} from './utils/schemas';
import { initPerformanceOptimizations } from './utils/performanceTracking';
import { initializeTagManager, trackPageView } from './utils/tagManager';
import { AuthProvider } from './features/auth/context/AuthProvider';

// Implement React.lazy for code splitting
const Index = lazy(() => import('./pages/Index'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const AdvisorProfile = lazy(() => import('./pages/AdvisorProfile'));
const ConsumerProfile = lazy(() => import('./pages/ConsumerProfile'));
const MatchingInterface = lazy(() => import('./pages/MatchingInterface'));
const Chat = lazy(() => import('./pages/Chat'));
const Schedule = lazy(() => import('./pages/Schedule'));
const FirmProfile = lazy(() => import('./pages/FirmProfile'));
const LeadManagementPage = lazy(() => import('./pages/LeadManagementPage'));
const ConsumerDashboard = lazy(() => import('./pages/ConsumerDashboard'));
const AdvisorDashboard = lazy(() => import('./pages/AdvisorDashboard'));
const FirmDashboard = lazy(() => import('./pages/FirmDashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const ForFirms = lazy(() => import('./pages/ForFirms'));
const ForAdvisors = lazy(() => import('./pages/ForAdvisors'));
const ForConsumers = lazy(() => import('./pages/ForConsumers'));
const Pricing = lazy(() => import('./pages/Pricing'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Blog = lazy(() => import('./pages/Blog'));
const Careers = lazy(() => import('./pages/Careers'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const Resources = lazy(() => import('./pages/Resources'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Optimized loading fallback component
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-slate-600">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute stale time
      gcTime: 5 * 60 * 1000, // 5 minutes garbage collection time (formerly cacheTime)
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Don't refetch on window focus for better performance
    },
  },
});

const criticalResources = [
  {
    url: '/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png',
    as: 'image' as const,
    importance: 'high' as const,
  },
  {
    url: '/lovable-uploads/6212697e-73f6-458d-a12d-296c66576ee5.png',
    as: 'image' as const,
  }
];

const preconnectDomains = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

const dnsPrefetchDomains = [
  'https://www.google-analytics.com',
  'https://cdn.gpteng.co'
];

const globalStructuredData = [
  generateOrganizationSchema(),
  generateWebsiteSchema()
];

const PageTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    const pageTitle = document.title || 'AdvisorWiz';
    
    trackPageView(pageTitle, location.pathname);
  }, [location]);
  
  return null;
};

function AppWithAuth() {
  return (
    <AuthProvider>
      <PageTracker />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          <Route path="/advisor-profile" element={<AdvisorProfile />} />
          <Route path="/consumer-profile" element={<ConsumerProfile />} />
          <Route path="/matches" element={<MatchingInterface />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/firm-profile" element={<FirmProfile />} />
          <Route path="/firm/:id" element={<FirmProfile />} />
          <Route path="/leads" element={<LeadManagementPage />} />
          <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
          <Route path="/advisor-dashboard" element={<AdvisorDashboard />} />
          <Route path="/firm-dashboard" element={<FirmDashboard />} />
          <Route path="/settings" element={<Settings />} />
          
          <Route path="/for-firms" element={<ForFirms />} />
          <Route path="/for-advisors" element={<ForAdvisors />} />
          <Route path="/for-consumers" element={<ForConsumers />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Privacy />} />
          <Route path="/cookies" element={<Privacy />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

function App() {
  useEffect(() => {
    initPerformanceOptimizations();
    initializeTagManager();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider>
          <Helmet>
            <html lang="en" />
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <meta name="theme-color" content="#1E3A8A" />
            <link rel="icon" href="/lovable-uploads/6212697e-73f6-458d-a12d-296c66576ee5.png" />
            <link rel="apple-touch-icon" href="/lovable-uploads/6212697e-73f6-458d-a12d-296c66576ee5.png" />
            
            <meta name="application-name" content="AdvisorWiz" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
          </Helmet>
          <Preload 
            resources={criticalResources}
            preconnect={preconnectDomains}
            dnsPrefetch={dnsPrefetchDomains}
          />
          <StructuredData data={globalStructuredData} />
          <Router>
            <AppWithAuth />
          </Router>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
