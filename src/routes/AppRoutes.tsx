
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAllRoutes } from './routeConfig';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './DashboardRoutes';
import MobileRoutes from './MobileRoutes';
import UtilityRoutes from './UtilityRoutes';
import { ReactNode } from 'react';

// Define a common interface for route objects
interface RouteConfig {
  path: string;
  element: ReactNode;
  props?: Record<string, any>;
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
      {Array.isArray(DashboardRoutes) && DashboardRoutes.map((route, index) => {
        if (route && typeof route === 'object') {
          // Handle routes with path and element properties
          if ('path' in route && 'element' in route) {
            const typedRoute = route as RouteConfig;
            return (
              <Route 
                key={`dashboard-route-${index}`} 
                path={typedRoute.path} 
                element={typedRoute.element} 
              />
            );
          }
          // Handle routes with props object containing path and element
          if ('props' in route && route.props && 
              typeof route.props === 'object' && 
              'path' in route.props && 
              'element' in route.props) {
            return (
              <Route 
                key={`dashboard-route-${index}`} 
                path={route.props.path as string} 
                element={route.props.element as ReactNode} 
              />
            );
          }
        }
        return null;
      })}

      {/* Include routes from MobileRoutes */}
      {Array.isArray(MobileRoutes) && MobileRoutes.map((route, index) => {
        if (route && typeof route === 'object') {
          // Handle routes with path and element properties
          if ('path' in route && 'element' in route) {
            const typedRoute = route as RouteConfig;
            return (
              <Route 
                key={`mobile-route-${index}`} 
                path={typedRoute.path} 
                element={typedRoute.element} 
              />
            );
          }
          // Handle routes with props object containing path and element
          if ('props' in route && route.props && 
              typeof route.props === 'object' && 
              'path' in route.props && 
              'element' in route.props) {
            return (
              <Route 
                key={`mobile-route-${index}`} 
                path={route.props.path as string} 
                element={route.props.element as ReactNode} 
              />
            );
          }
        }
        return null;
      })}

      {/* Include routes from UtilityRoutes */}
      {Array.isArray(UtilityRoutes) && UtilityRoutes.map((route, index) => {
        if (route && typeof route === 'object') {
          // Handle routes with path and element properties
          if ('path' in route && 'element' in route) {
            const typedRoute = route as RouteConfig;
            return (
              <Route 
                key={`utility-route-${index}`} 
                path={typedRoute.path} 
                element={typedRoute.element} 
              />
            );
          }
          // Handle routes with props object containing path and element
          if ('props' in route && route.props && 
              typeof route.props === 'object' && 
              'path' in route.props && 
              'element' in route.props) {
            return (
              <Route 
                key={`utility-route-${index}`} 
                path={route.props.path as string} 
                element={route.props.element as ReactNode} 
              />
            );
          }
        }
        return null;
      })}
    </Routes>
  );
};

export default AppRoutes;
