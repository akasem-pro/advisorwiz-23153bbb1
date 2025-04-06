
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getAllRoutes } from './config';
import MainRoutes from './MainRoutes';
import LandingPage from '../pages/LandingPage';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import { useIsMobile } from '../hooks/use-mobile';
import AppLayout from '../components/layout/AppLayout';
import MobileLayout from '../components/layout/MobileLayout';
import ConsumerProfile from '../pages/ConsumerProfile';
import AdvisorProfile from '../pages/AdvisorProfile';
import FirmProfile from '../pages/FirmProfile';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  
  // Get page layout based on device
  const PageLayout = isMobile ? MobileLayout : AppLayout;
  
  // Log routing for debugging
  useEffect(() => {
    console.log("AppRoutes - Current route:", location.pathname);
    console.log("AppRoutes - Mobile detection:", isMobile ? "Mobile device" : "Desktop device");
    
    if (!mounted) {
      console.log("AppRoutes - First render");
      setMounted(true);
    }
  }, [location, isMobile, mounted]);
  
  // Additional debugging to track render issues
  useEffect(() => {
    const timeout = setTimeout(() => {
      const rootElement = document.getElementById('root');
      if (rootElement) {
        console.log("Root element children count:", rootElement.childElementCount);
        if (rootElement.childElementCount === 0) {
          console.warn("AppRoutes - No children in root element after 500ms");
        }
      }
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [location.pathname]);
  
  return (
    <Routes>
      {/* Explicitly define the home route to LandingPage for a richer experience */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Profile pages - ensure ConsumerProfile is accessible to unauthenticated users */}
      <Route path="/consumer-profile" element={<PageLayout><ConsumerProfile /></PageLayout>} />
      <Route path="/advisor-profile" element={<PageLayout><AdvisorProfile /></PageLayout>} />
      <Route path="/firm-profile" element={<PageLayout><FirmProfile /></PageLayout>} />
      
      {/* Legal pages are defined at this level and use the appropriate layout */}
      <Route path="/privacy" element={<PageLayout><Privacy /></PageLayout>} />
      <Route path="/terms" element={<PageLayout><Terms /></PageLayout>} />
      
      {/* Include MainRoutes for all other pages */}
      <Route path="/*" element={<MainRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
