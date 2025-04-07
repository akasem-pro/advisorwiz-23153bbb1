
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
import NotFound from '../pages/NotFound';
import PageErrorBoundary from '../components/error/PageErrorBoundary';
import { lazyLoad } from '../utils/optimization/lazyComponentLoader';

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
  
  return (
    <PageErrorBoundary>
      <Routes>
        {/* Explicitly define the home route to LandingPage for a richer experience */}
        <Route 
          path="/" 
          element={
            <PageErrorBoundary>
              <LandingPage />
            </PageErrorBoundary>
          } 
        />
        
        {/* Profile pages - ensure ConsumerProfile is accessible to unauthenticated users */}
        <Route 
          path="/consumer-profile" 
          element={
            <PageErrorBoundary>
              <PageLayout><ConsumerProfile /></PageLayout>
            </PageErrorBoundary>
          } 
        />
        <Route 
          path="/advisor-profile" 
          element={
            <PageErrorBoundary>
              <PageLayout><AdvisorProfile /></PageLayout>
            </PageErrorBoundary>
          } 
        />
        <Route 
          path="/firm-profile" 
          element={
            <PageErrorBoundary>
              <PageLayout><FirmProfile /></PageLayout>
            </PageErrorBoundary>
          } 
        />
        
        {/* Legal pages are defined at this level and use the appropriate layout */}
        <Route 
          path="/privacy" 
          element={
            <PageErrorBoundary>
              <PageLayout><Privacy /></PageLayout>
            </PageErrorBoundary>
          } 
        />
        <Route 
          path="/terms" 
          element={
            <PageErrorBoundary>
              <PageLayout><Terms /></PageLayout>
            </PageErrorBoundary>
          } 
        />
        
        {/* Include MainRoutes for all other pages */}
        <Route path="/*" element={<MainRoutes />} />
      </Routes>
    </PageErrorBoundary>
  );
};

export default AppRoutes;
