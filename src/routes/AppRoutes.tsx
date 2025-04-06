
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAllRoutes } from './routeConfig';
import Home from '../pages/Home';
import MainRoutes from './MainRoutes';
import LandingPage from '../pages/LandingPage';

const AppRoutes: React.FC = () => {
  console.log("AppRoutes component rendering");
  
  // Get all routes from the centralized configuration
  const allRoutes = getAllRoutes();
  
  return (
    <Routes>
      {/* Explicitly define the home route to LandingPage for a richer experience */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Include MainRoutes for all marketing pages */}
      <Route path="/*" element={<MainRoutes />} />
      
      {/* Then render all other routes */}
      {allRoutes
        .filter(route => route.path !== '/') // Skip home route as we defined it explicitly
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
