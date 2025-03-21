
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
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
import { trackWebVitals, setupLazyLoading, optimizeCriticalRendering } from './utils/performanceTracking';
import { initializeTagManager, trackPageView } from './utils/tagManager';
import { AuthProvider } from './components/auth/AuthProvider';
import AuthGuard from './components/auth/AuthGuard';

// Import all page components
import Index from './pages/Index';
import Onboarding from './pages/Onboarding';
import SignIn from './pages/SignIn';
import AdvisorProfile from './pages/AdvisorProfile';
import ConsumerProfile from './pages/ConsumerProfile';
import MatchingInterface from './pages/MatchingInterface';
import Chat from './pages/Chat';
import Schedule from './pages/Schedule';
import FirmProfile from './pages/FirmProfile';
import LeadManagementPage from './pages/LeadManagementPage';
import ConsumerDashboard from './pages/ConsumerDashboard';
import AdvisorDashboard from './pages/AdvisorDashboard';
import FirmDashboard from './pages/FirmDashboard';
import Settings from './pages/Settings';
import ForFirms from './pages/ForFirms';
import ForAdvisors from './pages/ForAdvisors';
import ForConsumers from './pages/ForConsumers';
import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Sitemap from './pages/Sitemap';
import Resources from './pages/Resources';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

import './App.css';

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

function App() {
  useEffect(() => {
    initializeTagManager();
    trackWebVitals();
    optimizeCriticalRendering();
    
    if (document.readyState === 'complete') {
      setupLazyLoading();
    } else {
      window.addEventListener('load', setupLazyLoading);
      return () => window.removeEventListener('load', setupLazyLoading);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider>
          <AuthProvider>
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
              <PageTracker />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/sign-in" element={<SignIn />} />
                
                <Route path="/advisor-profile" element={<AuthGuard><AdvisorProfile /></AuthGuard>} />
                <Route path="/consumer-profile" element={<AuthGuard><ConsumerProfile /></AuthGuard>} />
                <Route path="/matches" element={<AuthGuard><MatchingInterface /></AuthGuard>} />
                <Route path="/chat" element={<AuthGuard><Chat /></AuthGuard>} />
                <Route path="/chat/:id" element={<AuthGuard><Chat /></AuthGuard>} />
                <Route path="/schedule" element={<AuthGuard><Schedule /></AuthGuard>} />
                <Route path="/firm-profile" element={<AuthGuard><FirmProfile /></AuthGuard>} />
                <Route path="/firm/:id" element={<AuthGuard><FirmProfile /></AuthGuard>} />
                <Route path="/leads" element={<AuthGuard><LeadManagementPage /></AuthGuard>} />
                <Route path="/consumer-dashboard" element={<AuthGuard><ConsumerDashboard /></AuthGuard>} />
                <Route path="/advisor-dashboard" element={<AuthGuard><AdvisorDashboard /></AuthGuard>} />
                <Route path="/firm-dashboard" element={<AuthGuard><FirmDashboard /></AuthGuard>} />
                <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
                
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
            </Router>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
