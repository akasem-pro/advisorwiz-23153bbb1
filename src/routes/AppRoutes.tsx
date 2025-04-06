
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getAllRoutes } from './config';
import MainRoutes from './MainRoutes';
import LandingPage from '../pages/LandingPage';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import { useIsMobile } from '../hooks/use-mobile';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  
  // Log routing for debugging
  useEffect(() => {
    console.log("AppRoutes - Current route:", location.pathname);
    console.log("AppRoutes - Mobile detection:", isMobile ? "Mobile device" : "Desktop device");
    
    if (!mounted) {
      console.log("AppRoutes - First render");
      setMounted(true);
    }
  }, [location, isMobile, mounted]);
  
  // Get all routes from the centralized configuration
  const allRoutes = getAllRoutes();
  
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
      
      {/* These routes need to be defined at this level for proper handling */}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      
      {/* Include MainRoutes for all other pages */}
      <Route path="/*" element={<MainRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
