
import React, { useEffect } from 'react';
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
  
  // Log routing for debugging
  useEffect(() => {
    console.log("AppRoutes - Current route:", location.pathname);
    console.log("AppRoutes - Mobile detection:", isMobile ? "Mobile device" : "Desktop device");
  }, [location, isMobile]);
  
  // Get all routes from the centralized configuration
  const allRoutes = getAllRoutes();
  
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
