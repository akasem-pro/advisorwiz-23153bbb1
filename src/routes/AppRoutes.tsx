
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getAllRoutes } from './config';
import MainRoutes from './MainRoutes';
import LandingPage from '../pages/LandingPage';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  // Log routing for debugging
  useEffect(() => {
    console.log("AppRoutes - Current route:", location.pathname);
  }, [location]);
  
  // Get all routes from the centralized configuration
  const allRoutes = getAllRoutes();
  
  return (
    <Routes>
      {/* Explicitly define the home route to LandingPage for a richer experience */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Explicitly define critical pages that need special handling */}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      
      {/* Include MainRoutes for all marketing pages */}
      <Route path="/*" element={<MainRoutes />} />
      
      {/* Then render all other routes (this might be redundant with the catch-all above) */}
      {allRoutes
        .filter(route => route.path !== '/' && 
                         route.path !== '/privacy' && 
                         route.path !== '/terms' && 
                         !route.path.includes('*')) 
        .map((route, index) => (
          <Route 
            key={`route-${index}`} 
            path={route.path} 
            element={route.element} 
          />
        ))}
    </Routes>
  );
};

export default AppRoutes;
