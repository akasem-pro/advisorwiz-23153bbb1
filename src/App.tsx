
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
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

// Pages
import Index from './pages/Index';
import Onboarding from './pages/Onboarding';
import AdvisorProfile from './pages/AdvisorProfile';
import ConsumerProfile from './pages/ConsumerProfile';
import MatchingInterface from './pages/MatchingInterface';
import Chat from './pages/Chat';
import Schedule from './pages/Schedule';
import NotFound from './pages/NotFound';
import FirmProfile from './pages/FirmProfile';
import ForFirms from './pages/ForFirms';
import ForAdvisors from './pages/ForAdvisors';
import ForConsumers from './pages/ForConsumers';
import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import LeadManagementPage from './pages/LeadManagementPage';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Sitemap from './pages/Sitemap';

import './App.css';

// Configure React Query for performance
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

// Critical resources to preload
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

// Domains to preconnect to
const preconnectDomains = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

// DNS prefetch domains
const dnsPrefetchDomains = [
  'https://www.google-analytics.com',
  'https://cdn.gpteng.co'
];

// Combine all global structured data
const globalStructuredData = [
  generateOrganizationSchema(),
  generateWebsiteSchema()
];

// PageTracker component to track page views
const PageTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Get the page title from the document or use a default
    const pageTitle = document.title || 'AdvisorWiz';
    
    // Track page view on route change
    trackPageView(pageTitle, location.pathname);
  }, [location]);
  
  return null;
};

function App() {
  // Initialize Tag Manager and track web vitals on mount
  useEffect(() => {
    // Initialize Google Tag Manager
    initializeTagManager();
    
    // Track performance metrics
    trackWebVitals();
    
    // Apply critical rendering optimizations
    optimizeCriticalRendering();
    
    // Set up lazy loading for images when DOM is loaded
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
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <meta name="theme-color" content="#1E3A8A" />
          <link rel="icon" href="/lovable-uploads/6212697e-73f6-458d-a12d-296c66576ee5.png" />
          <link rel="apple-touch-icon" href="/lovable-uploads/6212697e-73f6-458d-a12d-296c66576ee5.png" />
          
          {/* Global metadata */}
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
          {/* PageTracker component to track route changes */}
          <PageTracker />
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
            <Route path="/for-firms" element={<ForFirms />} />
            <Route path="/for-advisors" element={<ForAdvisors />} />
            <Route path="/for-consumers" element={<ForConsumers />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Privacy />} /> {/* Redirecting disclaimer to privacy for now */}
            <Route path="/cookies" element={<Privacy />} /> {/* Redirecting cookies to privacy for now */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
