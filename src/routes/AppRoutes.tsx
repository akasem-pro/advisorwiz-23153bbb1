
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAllRoutes } from './routeConfig';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './DashboardRoutes';
import MobileRoutes from './MobileRoutes';
import UtilityRoutes from './UtilityRoutes';
import { ReactNode } from 'react';
import { DashboardRouteType, hasDirect, hasProps } from './dashboard/types';

// Define common interfaces for route objects
interface RouteConfig {
  path: string;
  element: ReactNode;
}

interface RouteConfigWithProps {
  props: {
    path: string;
    element: ReactNode;
  };
}

type RouteItem = RouteConfig | RouteConfigWithProps;

// Type guard to check if a route has direct path and element
function isDirectRoute(route: RouteItem): route is RouteConfig {
  return 'path' in route && 'element' in route;
}

// Type guard to check if a route has props containing path and element
function isPropsRoute(route: RouteItem): route is RouteConfigWithProps {
  return 'props' in route && 
         route.props !== undefined && 
         typeof route.props === 'object' && 
         'path' in route.props && 
         'element' in route.props;
}

const AppRoutes: React.FC = () => {
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
      {Array.isArray(DashboardRoutes) && DashboardRoutes.map((route: DashboardRouteType, index) => {
        if (hasDirect(route)) {
          return (
            <Route 
              key={`dashboard-route-${index}`} 
              path={route.path} 
              element={route.element} 
            />
          );
        }
        
        if (hasProps(route)) {
          return (
            <Route 
              key={`dashboard-route-${index}`} 
              path={route.props.path} 
              element={route.props.element} 
            />
          );
        }
        
        return null;
      })}

      {/* Include routes from MobileRoutes */}
      {Array.isArray(MobileRoutes) && MobileRoutes.map((route, index) => {
        if (isDirectRoute(route)) {
          return (
            <Route 
              key={`mobile-route-${index}`} 
              path={route.path} 
              element={route.element} 
            />
          );
        }
        
        if (isPropsRoute(route)) {
          return (
            <Route 
              key={`mobile-route-${index}`} 
              path={route.props.path} 
              element={route.props.element} 
            />
          );
        }
        
        return null;
      })}

      {/* Include routes from UtilityRoutes */}
      {Array.isArray(UtilityRoutes) && UtilityRoutes.map((route, index) => {
        if (isDirectRoute(route)) {
          return (
            <Route 
              key={`utility-route-${index}`} 
              path={route.path} 
              element={route.element} 
            />
          );
        }
        
        if (isPropsRoute(route)) {
          return (
            <Route 
              key={`utility-route-${index}`} 
              path={route.props.path} 
              element={route.props.element} 
            />
          );
        }
        
        return null;
      })}
    </Routes>
  );
};

export default AppRoutes;
