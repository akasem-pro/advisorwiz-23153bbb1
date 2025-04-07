
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getAllRoutes } from './config';
import NotFound from '../pages/NotFound';
import { PageLoadingFallback } from '../components/LazyComponents';
import PageErrorBoundary from '../components/error/PageErrorBoundary';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import LandingPage from '../pages/LandingPage'; // Direct import for root route

const MainRoutes: React.FC = () => {
  const routes = getAllRoutes();
  
  console.log("MainRoutes - Loading with routes:", routes.map(r => r.path).join(', '));
  
  return (
    <Routes>
      {/* Root route with direct component to ensure it always loads */}
      <Route 
        path="/" 
        element={
          <PageErrorBoundary>
            <LandingPage />
          </PageErrorBoundary>
        } 
      />
      
      {/* Map all configured routes except for root which we handle separately */}
      {routes.filter(route => route.path !== '/').map((route) => {
        // Check if this is a dashboard route that needs the dashboard layout
        const isDashboardRoute = route.path.startsWith('/advisor-dashboard') || 
                               route.path === '/analytics' || 
                               route.path === '/admin-analytics' ||
                               route.path === '/schedule' || 
                               route.path === '/chat' || 
                               route.path === '/leads' || 
                               route.path === '/team' ||
                               route.path === '/settings';
        
        console.log(`Rendering route: ${route.path}, isDashboard: ${isDashboardRoute}, element:`, !!route.element);
        
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PageErrorBoundary>
                <Suspense fallback={<PageLoadingFallback />}>
                  {isDashboardRoute ? (
                    <DashboardLayout>
                      {route.element}
                    </DashboardLayout>
                  ) : (
                    route.element
                  )}
                </Suspense>
              </PageErrorBoundary>
            }
          />
        );
      })}
      
      {/* Common redirects for alternate route paths */}
      <Route path="/signup" element={<Navigate to="/sign-up" replace />} />
      <Route path="/login" element={<Navigate to="/sign-in" replace />} />
      <Route path="/signin" element={<Navigate to="/sign-in" replace />} />
      <Route path="/dashboard" element={<Navigate to="/advisor-dashboard" replace />} />
      
      {/* Catch-all route for 404 - must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
