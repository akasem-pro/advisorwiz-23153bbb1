
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAllRoutes } from './routeConfig';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './DashboardRoutes';
import MobileRoutes from './MobileRoutes';
import UtilityRoutes from './UtilityRoutes';

const AppRoutes = () => {
  console.log("AppRoutes component rendering");
  
  // Get all routes from the centralized configuration
  const allRoutes = getAllRoutes();
  
  return (
    <Routes>
      {/* Routes from centralized configuration */}
      {allRoutes.map((route, index) => (
        <Route 
          key={`route-config-${index}`} 
          path={route.path} 
          element={route.element} 
        />
      ))}
      
      {/* Include routes from MainRoutes for compatibility */}
      {typeof MainRoutes === 'function' && (
        <MainRoutes />
      )}
      
      {/* Include routes from AuthRoutes for compatibility */}
      {Array.isArray(AuthRoutes) && AuthRoutes.map((route, index) => (
        <Route 
          key={`auth-route-${index}`} 
          path={route.path} 
          element={route.element} 
        />
      ))}
      
      {/* Include routes from DashboardRoutes for compatibility */}
      {Array.isArray(DashboardRoutes) && DashboardRoutes.map((route, index) => (
        <Route 
          key={`dashboard-route-${index}`} 
          {...route.props} 
        />
      ))}

      {/* Include routes from MobileRoutes */}
      {Array.isArray(MobileRoutes) && MobileRoutes.map((route, index) => (
        <Route 
          key={`mobile-route-${index}`} 
          {...route.props} 
        />
      ))}

      {/* Include routes from UtilityRoutes */}
      {Array.isArray(UtilityRoutes) && UtilityRoutes.map((route, index) => (
        <Route 
          key={`utility-route-${index}`} 
          {...route.props} 
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
