
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import { Helmet } from 'react-helmet';
import StructuredData from './components/seo/StructuredData';
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema
} from './utils/jsonLdData';
import { trackWebVitals, setupLazyLoading } from './utils/performanceTracking';

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

// Combine all global structured data
const globalStructuredData = [
  generateOrganizationSchema(),
  generateWebsiteSchema()
];

function App() {
  // Track web vitals metrics on mount
  useEffect(() => {
    trackWebVitals();
    
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
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          
          {/* Global metadata */}
          <meta name="application-name" content="AdvisorWiz" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          
          {/* Preload critical assets */}
          <link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        </Helmet>
        <StructuredData data={globalStructuredData} />
        <Router>
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
            <Route path="/for-firms" element={<ForFirms />} />
            <Route path="/for-advisors" element={<ForAdvisors />} />
            <Route path="/for-consumers" element={<ForConsumers />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<ContactUs />} />
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
